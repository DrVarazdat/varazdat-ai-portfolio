"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPages() {
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchLinks = async () => {
    const { data } = await supabase.from('navbar_links').select('*').order('sort_order', { ascending: true });
    if (data) setNavLinks(data);
  };

  useEffect(() => { fetchLinks(); }, []);

  const restoreDefaults = async () => {
    await supabase.from('navbar_links').insert([
      { title: 'Learn', href: '/learn', sort_order: 1 },
      { title: 'Transform', href: '/transform', sort_order: 2 },
      { title: 'Collaborate', href: '/collaborate', sort_order: 3 },
      { title: 'Impact', href: '/impact', sort_order: 4 }
    ]);
    fetchLinks();
    alert("Database fixed! Reload your website.");
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, purpose })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      await supabase.from('dynamic_pages').insert([{ title, slug, purpose, html_content: data.html }]);
      
      await supabase.from('navbar_links').insert([{ title, href: `/p/${slug}`, sort_order: navLinks.length + 1 }]);

      alert("✅ AI successfully designed the page!");
      window.location.reload(); 
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveEdit = async (id: string) => {
    await supabase.from('navbar_links').update({ title: editTitle }).eq('id', id);
    setEditingId(null);
    fetchLinks();
  };

  const handleDeleteLink = async (id: string, href: string) => {
    if(confirm("Are you sure you want to remove this from the Navbar?")) {
      await supabase.from('navbar_links').delete().eq('id', id);
      if (href.startsWith('/p/')) {
        const slug = href.replace('/p/', '');
        await supabase.from('dynamic_pages').delete().eq('slug', slug);
      }
      window.location.reload(); 
    }
  };

  // --- ARROW REORDERING LOGIC ---
  const updateSortOrderInDB = async (newOrderedLinks: any[]) => {
    const updates = newOrderedLinks.map((link, i) => 
      supabase.from('navbar_links').update({ sort_order: i }).eq('id', link.id)
    );
    await Promise.all(updates);
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    let _navLinks = [...navLinks];
    const temp = _navLinks[index - 1];
    _navLinks[index - 1] = _navLinks[index];
    _navLinks[index] = temp;
    
    setNavLinks(_navLinks);
    await updateSortOrderInDB(_navLinks);
  };

  const moveDown = async (index: number) => {
    if (index === navLinks.length - 1) return;
    let _navLinks = [...navLinks];
    const temp = _navLinks[index + 1];
    _navLinks[index + 1] = _navLinks[index];
    _navLinks[index] = temp;
    
    setNavLinks(_navLinks);
    await updateSortOrderInDB(_navLinks);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="bg-gradient-to-r from-aiPurple to-cyan p-8 rounded-3xl text-white shadow-xl">
        <h1 className="text-3xl font-extrabold mb-2">🤖 AI Page Builder</h1>
        <p>Type a name and a job. The AI will design the UI and instantly add it to your website's Navbar.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <form onSubmit={handleGenerate} className="space-y-4">
          <input required type="text" placeholder="Page Title (e.g. Sponsors)" value={title} onChange={e=>setTitle(e.target.value)} className="p-4 border rounded-xl w-full text-neutralDark" />
          <textarea required placeholder="What is the job of this page? (e.g. A page to showcase sponsorship packages)" rows={3} value={purpose} onChange={e=>setPurpose(e.target.value)} className="p-4 border rounded-xl w-full text-neutralDark"></textarea>
          <button type="submit" disabled={isGenerating} className="w-full bg-deepBlue text-white font-bold py-4 rounded-xl hover:bg-aiPurple transition-colors uppercase tracking-wide">
            {isGenerating ? "AI is designing your UI... Please wait ⏳" : "✨ Generate UI & Add to Navbar"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-deepBlue">Manage Navbar Links</h2>
            <p className="text-sm text-gray-500 mt-1">Use the up and down arrows to reorder your menu.</p>
          </div>
          {navLinks.length === 0 && (
            <button onClick={restoreDefaults} className="bg-aiPurple text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-deepBlue">
              ⚠️ Database Empty - Click here to restore default links!
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {navLinks.map((link, index) => (
            <div 
              key={link.id} 
              className="flex justify-between items-center p-4 bg-neutralLight rounded-xl border border-gray-200 transition-all hover:shadow-md hover:border-cyan"
            >
              
              <div className="flex items-center gap-4 w-full">
                
                {/* UP/DOWN ARROWS CONTROL PAD */}
                {editingId !== link.id && (
                  <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                    <button 
                      onClick={() => moveUp(index)} 
                      disabled={index === 0} 
                      className="px-3 py-1 hover:bg-gray-100 hover:text-deepBlue text-gray-500 disabled:opacity-20 disabled:hover:bg-white text-xs transition-colors"
                    >
                      ▲
                    </button>
                    <div className="h-px w-full bg-gray-200"></div>
                    <button 
                      onClick={() => moveDown(index)} 
                      disabled={index === navLinks.length - 1} 
                      className="px-3 py-1 hover:bg-gray-100 hover:text-deepBlue text-gray-500 disabled:opacity-20 disabled:hover:bg-white text-xs transition-colors"
                    >
                      ▼
                    </button>
                  </div>
                )}
                
                {/* EDITING MODE VS VIEWING MODE */}
                {editingId === link.id ? (
                  <div className="flex flex-grow gap-4 mr-4">
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="p-2 border rounded-lg w-full text-black" autoFocus />
                    <button onClick={() => saveEdit(link.id)} className="bg-cyan text-deepBlue font-bold px-4 rounded-lg">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 font-bold px-4 hover:text-black">Cancel</button>
                  </div>
                ) : (
                  <div className="flex-grow">
                    <h3 className="font-bold text-deepBlue text-lg">{link.title}</h3>
                    <p className="text-xs text-gray-500">Path: {link.href}</p>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              {editingId !== link.id && (
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <button onClick={() => { setEditingId(link.id); setEditTitle(link.title); }} className="px-4 py-2 bg-white text-deepBlue font-bold rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition-colors">Edit Name</button>
                  <button onClick={() => handleDeleteLink(link.id, link.href)} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg text-sm hover:bg-red-100 transition-colors">Delete</button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}