"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLearnLayout() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});

  const fetchBlocks = async () => {
    const { data } = await supabase.from('learn_page_blocks').select('*').order('sort_order', { ascending: true });
    if (data) setBlocks(data);
  };

  useEffect(() => { fetchBlocks(); }, []);

  // --- RESTORE DEFAULTS ---
  const restoreDefaults = async () => {
    if(!confirm("Restore default layout? This will fix any color or text glitches!")) return;
    
    const defaults = [
      { sort_order: 1, section_id: 'learn_hero', title: 'Hero Section', is_active: true, content: { title: "The Learning Ecosystem", subtitle: "Discover the most relevant courses, resources, and learning pathways designed to help you master Artificial Intelligence.", searchPlaceholder: "Search for a specific course or topic..." } },
      { sort_order: 2, section_id: 'learn_quiz', title: 'Quiz Banner', is_active: true, content: { title: "Unsure where to begin?", desc: "Take our 60-second interactive quiz to find the perfect AI learning roadmap tailored to your exact goals and experience level.", btnText: "Start the Quiz", btnLink: "/learn/quiz" } },
      { sort_order: 3, section_id: 'learn_catalog', title: 'Course Catalog', is_active: true, content: { title: "Complete Course Catalog" } },
      { sort_order: 4, section_id: 'learn_resources', title: 'Resources & Testimonials', is_active: true, content: { cards: [{ title: "Video Playlists", desc: "Access recorded lectures organized into logical progressions.", btnText: "Browse Video Library →", btnLink: "/videos" }, { title: "Student Testimonials", desc: "See how Dr. Avetisyan's teaching style has impacted careers.", btnText: "Read Success Stories →", btnLink: "/impact" }] } }
    ];

    // Delete existing blocks
    await supabase.from('learn_page_blocks').delete().neq('section_id', 'none'); 
    
    // Insert fresh defaults
    const { error } = await supabase.from('learn_page_blocks').insert(defaults);
    
    if (error) {
      alert("❌ Error saving to database: " + error.message);
    } else {
      alert("✅ Data injected perfectly! Check your Learn page now.");
      fetchBlocks();
    }
  };

  // --- DELETING A BLOCK ---
  const deleteBlock = async (id: string) => {
    if(confirm("Are you sure you want to completely delete this section?")) {
      await supabase.from('learn_page_blocks').delete().eq('id', id);
      fetchBlocks();
    }
  };

  // --- ARROW LOGIC ---
  const moveUp = async (i: number) => { if(i===0) return; let b=[...blocks]; let t=b[i-1]; b[i-1]=b[i]; b[i]=t; setBlocks(b); await Promise.all(b.map((bl, j) => supabase.from('learn_page_blocks').update({ sort_order: j }).eq('id', bl.id))); };
  const moveDown = async (i: number) => { if(i===blocks.length-1) return; let b=[...blocks]; let t=b[i+1]; b[i+1]=b[i]; b[i]=t; setBlocks(b); await Promise.all(b.map((bl, j) => supabase.from('learn_page_blocks').update({ sort_order: j }).eq('id', bl.id))); };
  const toggleVisibility = async (id: string, stat: boolean) => { await supabase.from('learn_page_blocks').update({ is_active: !stat }).eq('id', id); fetchBlocks(); };

  // --- EDITOR LOGIC ---
  const openEditor = (block: any) => { setEditingBlock(block); setEditData(block.content || {}); };
  const saveEdit = async () => { await supabase.from('learn_page_blocks').update({ content: editData }).eq('id', editingBlock.id); alert("Saved!"); setEditingBlock(null); fetchBlocks(); };
  
  const updateField = (k: string, v: any) => setEditData({...editData, [k]: v});
  const updateCard = (i: number, k: string, v: any) => { const c = [...editData.cards]; c[i][k] = v; updateField('cards', c); };
  const inputClass = "w-full p-3 border rounded-lg bg-gray-50 text-black focus:ring-2 focus:ring-cyan mb-4";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* EDIT MODAL */}
      {editingBlock && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-deepBlue mb-6">Editing: {editingBlock.title}</h2>
            
            {editingBlock.section_id === 'learn_hero' && (
              <>
                <label className="font-bold text-sm text-gray-700">Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass} />
                <label className="font-bold text-sm text-gray-700">Subtitle</label><textarea value={editData.subtitle} onChange={e=>updateField('subtitle', e.target.value)} rows={3} className={inputClass} />
                <label className="font-bold text-sm text-gray-700">Search Bar Placeholder</label><input type="text" value={editData.searchPlaceholder} onChange={e=>updateField('searchPlaceholder', e.target.value)} className={inputClass} />
              </>
            )}

            {editingBlock.section_id === 'learn_quiz' && (
              <>
                <label className="font-bold text-sm text-gray-700">Banner Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass} />
                <label className="font-bold text-sm text-gray-700">Banner Description</label><textarea value={editData.desc} onChange={e=>updateField('desc', e.target.value)} rows={3} className={inputClass} />
                <div className="flex gap-4">
                  <div className="flex-1"><label className="font-bold text-sm text-gray-700">Button Text</label><input type="text" value={editData.btnText} onChange={e=>updateField('btnText', e.target.value)} className={inputClass} /></div>
                  <div className="flex-1"><label className="font-bold text-sm text-gray-700">Button Link</label><input type="text" value={editData.btnLink} onChange={e=>updateField('btnLink', e.target.value)} className={inputClass} /></div>
                </div>
              </>
            )}

            {editingBlock.section_id === 'learn_catalog' && (
              <><label className="font-bold text-sm text-gray-700">Section Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass} /></>
            )}

            {editingBlock.section_id === 'learn_resources' && (
              <div>
                {(editData.cards || []).map((card: any, i: number) => (
                  <div key={i} className="p-4 border rounded-xl mb-4 bg-gray-50 relative">
                    <button onClick={()=>{const c=[...editData.cards]; c.splice(i,1); updateField('cards', c);}} className="absolute top-2 right-2 text-red-500 font-bold hover:bg-red-100 rounded px-2">X</button>
                    <label className="font-bold text-xs text-gray-700">Card Title</label><input type="text" value={card.title} onChange={e=>updateCard(i, 'title', e.target.value)} className={inputClass} />
                    <label className="font-bold text-xs text-gray-700">Description</label><textarea value={card.desc} onChange={e=>updateCard(i, 'desc', e.target.value)} rows={2} className={inputClass} />
                    <div className="flex gap-2">
                      <div className="flex-1"><label className="font-bold text-xs text-gray-700">Btn Text</label><input type="text" value={card.btnText} onChange={e=>updateCard(i, 'btnText', e.target.value)} className={inputClass} /></div>
                      <div className="flex-1"><label className="font-bold text-xs text-gray-700">Btn Link</label><input type="text" value={card.btnLink} onChange={e=>updateCard(i, 'btnLink', e.target.value)} className={inputClass} /></div>
                    </div>
                  </div>
                ))}
                <button onClick={()=>{const c=[...(editData.cards||[])]; c.push({title:"New", desc:"Desc", btnText:"Click", btnLink:"/"}); updateField('cards', c);}} className="w-full p-3 bg-blue-50 text-blue-600 font-bold rounded-lg">+ Add Card</button>
              </div>
            )}

            <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
              <button onClick={saveEdit} className="bg-deepBlue text-white px-8 py-3 rounded-xl font-bold hover:bg-aiPurple">Save Content</button>
              <button onClick={()=>setEditingBlock(null)} className="text-gray-500 font-bold px-4 hover:text-black">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN UI */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-deepBlue">Manage Learn Page Layout</h2>
          <div className="flex gap-4">
             {/* THE RESET BUTTON: Use this to instantly fix your dark colors! */}
             <button onClick={restoreDefaults} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all text-xs uppercase tracking-widest">
               Reset to Default
             </button>
             <a href="/learn" target="_blank" className="px-6 py-2 bg-neutralLight text-deepBlue font-bold rounded-lg border border-gray-200 hover:border-cyan">Preview Learn Page ↗</a>
          </div>
        </div>
        
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className={`flex justify-between items-center p-4 rounded-xl border ${block.is_active ? 'bg-neutralLight border-gray-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
              <div className="flex items-center gap-4">
                <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="px-3 py-1 hover:bg-gray-100 text-xs text-gray-500">▲</button>
                  <div className="h-px w-full bg-gray-200"></div>
                  <button onClick={() => moveDown(index)} disabled={index === blocks.length - 1} className="px-3 py-1 hover:bg-gray-100 text-xs text-gray-500">▼</button>
                </div>
                <h3 className="font-bold text-deepBlue text-lg">{block.title}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditor(block)} className="px-4 py-2 bg-cyan text-deepBlue font-bold rounded-lg text-sm hover:bg-white border border-cyan">✏️ Edit</button>
                <button onClick={() => toggleVisibility(block.id, block.is_active)} className="px-4 py-2 bg-white text-deepBlue font-bold rounded-lg text-sm border border-gray-200 text-gray-600">{block.is_active ? "👁️ Hide" : "👁️‍🗨️ Show"}</button>
                {/* MISSING DELETE BUTTON ADDED HERE! */}
                <button onClick={() => deleteBlock(block.id)} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg text-sm border border-red-100 hover:bg-red-600 hover:text-white transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}