"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image"; // Added for image preview

export default function AdminHomepage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  
  // AI Generator State
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Modal State
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false); // Added upload state
  const [showHtmlCode, setShowHtmlCode] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from('homepage_blocks').select('*').order('sort_order', { ascending: true });
    if (data) setBlocks(data);
  };

  useEffect(() => { fetchData(); }, []);

  // --- 100% ORIGINAL DATA SEEDER ---
  const restoreDefaults = async () => {
    if(!confirm("This will load the original data into the database. Proceed?")) return;
    const defaults = [
      { sort_order: 1, section_id: 'hero', title: 'Hero Section (Top)', is_active: true, content: { headline: "Bridging Research, Education, and Industry Through Intelligent Technologies", subheadline: "A place for personalized solutions.", image: "/images/hero.png", tags: ["Educator", "Researcher", "Technologist", "Entrepreneur", "Innovator"],  buttons: [{ text: "Explore Courses", link: "/learn", style: "primary" },{ text: "Request Consultation", link: "/transform", style: "secondary" }] } },
      { sort_order: 2, section_id: 'bio', title: 'Meet Dr. Varazdat', is_active: true, content: { title: "Meet Dr. Varazdat Avetisyan", bio: "With over a decade of experience navigating the complexities of the evolving AI ecosystem, Dr. Avetisyan doesn't just teach technology—he builds bridges. Whether you are an academic institution developing cutting-edge curriculum, a corporation seeking digital transformation, or a student beginning your AI journey, he translates deep technical research into real-world, actionable implementation.", linkText: "Learn More", linkUrl: "/about" } },
      { sort_order: 3, section_id: 'differentiators', title: 'What Sets Him Apart', is_active: true, content: { title: "What Sets Him Apart", subtitle: "A unique combination of academic excellence, industry leadership, and international experience.", cards: [{ type: "bullets", title: "Academic Leadership", bullets: ["PhD in Computer Engineering", "University Professor", "AI & Computer Science Educator", "Advanced Research", "International Academic Collaborations"], linkUrl: "/impact", linkText: "Learn More →" }, { type: "bullets", title: "Industry Leadership", bullets: ["CTO & Co-Founder, Luseen Mobile", "Corporate AI Consultant", "Technology Strategy", "Software Engineering", "Digital Transformation"], linkUrl: "/transform", linkText: "Learn More →" }, { type: "bullets", title: "Education & Training", bullets: ["AI Course Development", "University Teaching", "Corporate Training", "Curriculum Development", "Workshops & Mentorship"], linkUrl: "/learn", linkText: "Learn More →" }, { type: "timeline", title: "International Experience", desc: "Professional training, workshops, lectures, and academic exchange programs across Europe and beyond.", events: [{ year: "2024 • Berlin, Germany", name: "AI Ethics Keynote" }, { year: "2023 • Paris, France", name: "Curriculum Development" }], linkUrl: "/impact", linkText: "View Timeline →" }] } },
      { sort_order: 4, section_id: 'expertise', title: 'Core Expertise Cards', is_active: true, content: { title: "Core Expertise", subtitle: "Specialized domains bridging the gap between theory and practical application.", tags: ["Artificial Intelligence", "Generative AI", "Data Science", "Machine Learning", "Deep Learning", "Prompt Engineering", "AI Agents", "Computer Science Education", "Educational Innovation", "Digital Transformation"] } },
      { sort_order: 5, section_id: 'trust', title: 'Trust, Stats & Logos', is_active: true, content: { partnersTitle: "Trusted By & Affiliated With", stats: [{ value: "10+", label: "Years of Experience" }, { value: "5,000+", label: "Students Trained" }, { value: "100+", label: "Workshops Delivered" }, { value: "20+", label: "AI Courses Developed" }], partners: ["UFAR", "NPUA", "Luseen Mobile", "FAST Foundation", "SASTIC", "ARDY Academy", "Microsoft", "Picsart"] } },
      { sort_order: 6, section_id: 'journey', title: 'Choose Your Journey', is_active: true, content: { title: "Choose Your Journey", subtitle: "Select the path that best matches your goals to access tailored resources, opportunities, and solutions.", cards: [{ title: "Learn", desc: "Develop AI and technology skills through courses, videos, educational resources, and learning opportunities.", link: "/learn", btnText: "Explore Learning →" }, { title: "Transform", desc: "Discover consulting, corporate training, AI adoption, and digital transformation services.", link: "/transform", btnText: "Transform Your Organization →" }, { title: "Collaborate", desc: "Explore research, publications, speaking engagements, academic partnerships, and professional collaborations.", link: "/collaborate", btnText: "Collaborate →" }, { title: "Impact", desc: "Discover awards, talks, media appearances, achievements, partnerships, and measurable impact.", link: "/impact", btnText: "See the Impact →" }] } }
    ];
    await supabase.from('homepage_blocks').delete().neq('id', '0'); 
    await supabase.from('homepage_blocks').insert(defaults);
    fetchData();
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-section', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, prompt }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await supabase.from('homepage_blocks').insert([{ title: title, section_id: 'custom_' + Date.now(), is_custom: true, content: { ai_html: data.html }, sort_order: blocks.length + 1 }]);
      alert("✅ AI successfully added the section!");
      setTitle(""); setPrompt(""); fetchData();
    } catch (error: any) { alert("Error: " + error.message); } finally { setIsGenerating(false); }
  };

  const moveUp = async (i: number) => { if(i===0) return; let b=[...blocks]; let t=b[i-1]; b[i-1]=b[i]; b[i]=t; setBlocks(b); await Promise.all(b.map((bl, j) => supabase.from('homepage_blocks').update({ sort_order: j }).eq('id', bl.id))); };
  const moveDown = async (i: number) => { if(i===blocks.length-1) return; let b=[...blocks]; let t=b[i+1]; b[i+1]=b[i]; b[i]=t; setBlocks(b); await Promise.all(b.map((bl, j) => supabase.from('homepage_blocks').update({ sort_order: j }).eq('id', bl.id))); };
  const toggleVisibility = async (id: string, stat: boolean) => { await supabase.from('homepage_blocks').update({ is_active: !stat }).eq('id', id); fetchData(); };
  const deleteBlock = async (id: string) => { if(confirm("Are you sure?")) { await supabase.from('homepage_blocks').delete().eq('id', id); fetchData(); } };

  // --- IMAGE UPLOAD LOGIC ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

      if (uploadError) {
        alert("Upload failed. Make sure you created a public storage bucket named 'images' in Supabase.");
        throw uploadError;
      }

      // Get Public URL
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
      
      // Update form state with new image URL
      updateField('image', publicUrlData.publicUrl);
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // --- EDITING LOGIC ---
  const openEditor = (block: any) => { setEditingBlock(block); setEditData(block.content || {}); setShowHtmlCode(false); };
  const saveEdit = async () => { await supabase.from('homepage_blocks').update({ content: editData }).eq('id', editingBlock.id); alert("Saved successfully!"); setEditingBlock(null); fetchData(); };

  const updateField = (key: string, val: any) => setEditData({ ...editData, [key]: val });
  const updateArrayItem = (key: string, index: number, val: any) => { const arr = [...(editData[key] || [])]; arr[index] = val; updateField(key, arr); };
  const removeArrayItem = (key: string, index: number) => { const arr = [...(editData[key] || [])]; arr.splice(index, 1); updateField(key, arr); };
  const addArrayItem = (key: string, defaultVal: any) => { const arr = [...(editData[key] || [])]; arr.push(defaultVal); updateField(key, arr); };

  // A common input style variable to ensure text is ALWAYS black/dark gray and clearly visible
  const inputClass = "w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  // --- HUMAN FRIENDLY FORM RENDERER ---
  const renderHumanForm = () => {
    const sId = editingBlock?.section_id;

    if (sId === 'hero') return (
      <div className="space-y-6">
        <div><label className="text-sm font-bold text-gray-700">Headline</label><textarea rows={2} value={editData.headline} onChange={e=>updateField('headline', e.target.value)} className={inputClass}/></div>
        <div><label className="text-sm font-bold text-gray-700">Sub-headline</label><input type="text" value={editData.subheadline} onChange={e=>updateField('subheadline', e.target.value)} className={inputClass}/></div>
        
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <label className="text-sm font-bold text-gray-700 block mb-3">Hero Image</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative border-4 border-white shadow-md shrink-0">
              {editData.image ? <img src={editData.image} alt="Hero Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">No Image</div>}
            </div>
            <div className="flex-grow">
              <label className="relative cursor-pointer bg-deepBlue hover:bg-aiPurple text-white font-bold py-2 px-4 rounded-lg transition-colors inline-block mb-2">
                {isUploading ? "Uploading..." : "Upload New Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </label>
              <input type="text" value={editData.image || ""} onChange={e=>updateField('image', e.target.value)} className={inputClass} placeholder="Or enter URL here..."/>
            </div>
          </div>
        </div>
        
        {/* HERO BUTTONS EDITOR */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Call to Action Buttons</label>
          {(editData.buttons || []).map((btn: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2 bg-gray-50 p-3 rounded-xl border border-gray-200 items-center">
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Button Text" value={btn.text} onChange={e=>{ const b = [...editData.buttons]; b[i].text = e.target.value; updateField('buttons', b); }} className={inputClass + " !mt-0"} />
                <input type="text" placeholder="URL (/link)" value={btn.link} onChange={e=>{ const b = [...editData.buttons]; b[i].link = e.target.value; updateField('buttons', b); }} className={inputClass + " !mt-0"} />
              </div>
              <div>
                <select value={btn.style} onChange={e=>{ const b = [...editData.buttons]; b[i].style = e.target.value; updateField('buttons', b); }} className={inputClass + " !mt-0 mb-2 h-[46px]"}>
                  <option value="primary">Primary (Purple)</option>
                  <option value="secondary">Secondary (White Outline)</option>
                </select>
              </div>
              <button onClick={()=>{ const b = [...editData.buttons]; b.splice(i,1); updateField('buttons', b); }} className="px-4 h-[46px] bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold border border-red-200 transition-colors">X</button>
            </div>
          ))}
          <button onClick={()=>{ const b=[...(editData.buttons||[])]; b.push({text: "New Button", link: "/", style: "primary"}); updateField('buttons', b); }} className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold p-3 rounded-xl w-full mt-2 transition-colors">+ Add Button</button>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Expertise Tags</label>
          {(editData.tags || []).map((tag: string, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" value={tag} onChange={e=>updateArrayItem('tags', i, e.target.value)} className={inputClass + " !mt-0"} />
              <button onClick={()=>removeArrayItem('tags', i)} className="px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold border border-red-200 transition-colors">X</button>
            </div>
          ))}
          <button onClick={()=>addArrayItem('tags', "New Tag")} className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold p-3 rounded-xl w-full mt-2 transition-colors">+ Add Tag</button>
        </div>
      </div>
    );

    if (sId === 'bio') return (
      <div className="space-y-6">
        <div><label className="text-sm font-bold text-gray-700">Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass}/></div>
        <div><label className="text-sm font-bold text-gray-700">Biography</label><textarea rows={6} value={editData.bio} onChange={e=>updateField('bio', e.target.value)} className={inputClass}/></div>
        <div className="flex gap-4">
          <div className="flex-1"><label className="text-sm font-bold text-gray-700">Button Text</label><input type="text" value={editData.linkText} onChange={e=>updateField('linkText', e.target.value)} className={inputClass}/></div>
          <div className="flex-1"><label className="text-sm font-bold text-gray-700">Button Link</label><input type="text" value={editData.linkUrl} onChange={e=>updateField('linkUrl', e.target.value)} className={inputClass}/></div>
        </div>
      </div>
    );

    if (sId === 'expertise') return (
      <div className="space-y-6">
        <div><label className="text-sm font-bold text-gray-700">Main Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass}/></div>
        <div><label className="text-sm font-bold text-gray-700">Subtitle</label><input type="text" value={editData.subtitle} onChange={e=>updateField('subtitle', e.target.value)} className={inputClass}/></div>
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Expertise Boxes</label>
          <div className="grid grid-cols-2 gap-2">
            {(editData.tags || []).map((tag: string, i: number) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={tag} onChange={e=>updateArrayItem('tags', i, e.target.value)} className={inputClass} />
                <button onClick={()=>removeArrayItem('tags', i)} className="px-3 mt-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold">X</button>
              </div>
            ))}
          </div>
          <button onClick={()=>addArrayItem('tags', "New Skill")} className="text-sm bg-blue-50 text-blue-600 font-bold p-3 rounded-xl w-full mt-4">+ Add Skill Box</button>
        </div>
      </div>
    );

    if (sId === 'differentiators') return (
      <div className="space-y-6">
        <div><label className="text-sm font-bold text-gray-700">Section Title</label><input type="text" value={editData.title} onChange={e=>updateField('title', e.target.value)} className={inputClass}/></div>
        <div><label className="text-sm font-bold text-gray-700">Section Subtitle</label><input type="text" value={editData.subtitle} onChange={e=>updateField('subtitle', e.target.value)} className={inputClass}/></div>
        
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 block">Manage Cards</label>
          {(editData.cards || []).map((card: any, i: number) => (
            <div key={i} className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm relative">
              <button onClick={()=>removeArrayItem('cards', i)} className="absolute top-4 right-4 text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-md font-bold hover:bg-red-200">Delete</button>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Card Title</label>
              <input type="text" value={card.title} onChange={e=>{ const c = [...editData.cards]; c[i].title = e.target.value; updateField('cards', c); }} className={inputClass + " mb-4"} />
              
              {/* NORMAL BULLETS EDITOR */}
              {card.type === 'bullets' && (
                <div className="mt-2 pl-4 border-l-2 border-aiPurple">
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Bullet Points</label>
                  {(card.bullets || []).map((b: string, j: number) => (
                    <div key={j} className="flex gap-2 mb-2">
                      <input type="text" value={b} onChange={e=>{ const c = [...editData.cards]; c[i].bullets[j] = e.target.value; updateField('cards', c); }} className={inputClass + " !mt-0"} />
                      <button onClick={()=>{ const c = [...editData.cards]; c[i].bullets.splice(j,1); updateField('cards', c); }} className="px-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 font-bold">X</button>
                    </div>
                  ))}
                  <button onClick={()=>{ const c = [...editData.cards]; if(!c[i].bullets) c[i].bullets=[]; c[i].bullets.push("New Bullet"); updateField('cards', c); }} className="text-sm font-bold text-blue-600 mt-2 block">+ Add Bullet</button>
                </div>
              )}

              {/* TIMELINE EDITOR (International Experience) */}
              {card.type === 'timeline' && (
                <div className="mt-2 pl-4 border-l-2 border-cyan">
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Timeline Events</label>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Card Description</label>
                  <textarea rows={2} value={card.desc} onChange={e=>{ const c = [...editData.cards]; c[i].desc = e.target.value; updateField('cards', c); }} className={inputClass + " mb-4"} />
                  
                  {(card.events || []).map((evt: any, j: number) => (
                    <div key={j} className="flex gap-2 mb-2 bg-white p-2 rounded border">
                      <input type="text" placeholder="Year / Info" value={evt.year} onChange={e=>{ const c = [...editData.cards]; c[i].events[j].year = e.target.value; updateField('cards', c); }} className={inputClass + " !mt-0 w-1/3"} />
                      <input type="text" placeholder="Event Name" value={evt.name} onChange={e=>{ const c = [...editData.cards]; c[i].events[j].name = e.target.value; updateField('cards', c); }} className={inputClass + " !mt-0 flex-1"} />
                      <button onClick={()=>{ const c = [...editData.cards]; c[i].events.splice(j,1); updateField('cards', c); }} className="px-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 font-bold">X</button>
                    </div>
                  ))}
                  <button onClick={()=>{ const c = [...editData.cards]; if(!c[i].events) c[i].events=[]; c[i].events.push({year: "2024", name: "New Event"}); updateField('cards', c); }} className="text-sm font-bold text-cyan mt-2 block">+ Add Timeline Event</button>
                </div>
              )}

              {/* CARD LINK EDITOR */}
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <div className="flex-1"><label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Button Text</label><input type="text" value={card.linkText} onChange={e=>{ const c = [...editData.cards]; c[i].linkText = e.target.value; updateField('cards', c); }} className={inputClass + " !mt-0"} /></div>
                <div className="flex-1"><label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Button URL</label><input type="text" value={card.linkUrl} onChange={e=>{ const c = [...editData.cards]; c[i].linkUrl = e.target.value; updateField('cards', c); }} className={inputClass + " !mt-0"} /></div>
              </div>
            </div>
          ))}
          {/* UPDATED: Automatically creates a bullet-type card when adding */}
          <button onClick={() => updateArrayItem('cards', editData.cards ? editData.cards.length : 0, { type: "bullets", title: "New Card", bullets: ["New Point"], linkText: "Learn More →", linkUrl: "/" })} className="w-full p-3 bg-aiPurple text-white rounded-xl font-bold">+ Add New Card</button>
        </div>
      </div>
    );

    if (sId === 'trust') return (
      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Statistics (Numbers)</label>
          <div className="grid grid-cols-2 gap-4">
            {(editData.stats || []).map((stat: any, i: number) => (
              <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50 relative">
                <button onClick={()=>{ const arr=[...editData.stats]; arr.splice(i,1); updateField('stats', arr); }} className="absolute top-2 right-2 text-red-500 font-bold hover:bg-red-100 rounded-full w-6 h-6 flex items-center justify-center">X</button>
                <label className="text-xs font-bold text-gray-500">Value (e.g. 10+)</label>
                <input type="text" value={stat.value} onChange={e=>{ const arr=[...editData.stats]; arr[i].value = e.target.value; updateField('stats', arr); }} className={inputClass + " mb-3 !p-2"} />
                <label className="text-xs font-bold text-gray-500">Label (e.g. Years)</label>
                <input type="text" value={stat.label} onChange={e=>{ const arr=[...editData.stats]; arr[i].label = e.target.value; updateField('stats', arr); }} className={inputClass + " !p-2"} />
              </div>
            ))}
          </div>
          <button onClick={()=>{ const arr=[...(editData.stats||[])]; arr.push({value:"0", label:"New Stat"}); updateField('stats', arr); }} className="text-sm bg-blue-50 text-blue-600 font-bold p-3 rounded-xl w-full mt-3">+ Add Statistic</button>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Partner Logos / Text</label>
          <input type="text" placeholder="Section Title" value={editData.partnersTitle} onChange={e=>updateField('partnersTitle', e.target.value)} className={inputClass + " mb-4"}/>
          <div className="grid grid-cols-2 gap-2">
            {(editData.partners || []).map((partner: string, i: number) => (
              <div key={i} className="flex gap-2 mb-1">
                <input type="text" value={partner} onChange={e=>updateArrayItem('partners', i, e.target.value)} className={inputClass + " !mt-0 !p-2"} />
                <button onClick={()=>removeArrayItem('partners', i)} className="px-3 bg-red-50 text-red-600 rounded-lg font-bold">X</button>
              </div>
            ))}
          </div>
          <button onClick={()=>addArrayItem('partners', "New Partner")} className="text-sm bg-blue-50 text-blue-600 font-bold p-3 rounded-xl w-full mt-3">+ Add Partner</button>
        </div>
      </div>
    );

    if (editingBlock?.is_custom) return (
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div>
            <p className="text-sm font-bold text-blue-900">AI Generated Section</p>
            <p className="text-xs text-blue-700">Preview how it looks, or edit the raw code.</p>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); setShowHtmlCode(!showHtmlCode); }} 
            className="text-sm bg-white border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold text-blue-700 transition-colors"
          >
            {showHtmlCode ? "👁️ View Visual Preview" : "⚙️ Advanced: Edit Code"}
          </button>
        </div>

        {showHtmlCode ? (
          <div>
            <p className="text-xs text-orange-500 mb-2 font-bold">⚠️ Be careful! Editing raw HTML might break the layout.</p>
            <textarea rows={15} value={editData.ai_html} onChange={e=>updateField('ai_html', e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl bg-gray-900 text-green-400 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500"/>
          </div>
        ) : (
          <div className="w-full border-4 border-gray-100 rounded-2xl p-6 overflow-hidden bg-white shadow-inner relative">
             <div className="absolute top-2 right-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-50 uppercase tracking-widest">Live Preview</div>
             <p className="text-xs text-gray-500 mb-4">This is a live visual preview. To edit text, click "Advanced: Edit Code" above and carefully change the white text.</p>
             <div 
               className="pointer-events-none text-neutralDark [&>h1]:text-2xl [&>h1]:font-extrabold [&>h2]:text-xl [&>h2]:font-bold [&>h1]:mb-4 [&>h2]:mb-2 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>button]:bg-deepBlue [&>button]:text-white [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-lg"
               dangerouslySetInnerHTML={{ __html: (editData.ai_html || "").replace(/\\n/g, '').replace(/\n/g, '').replace(/\\"/g, '"') }} 
             />
          </div>
        )}
      </div>
    );

    return <p className="text-red-500">Form for this section is not available.</p>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative pb-20">
      
      {/* HUMAN-FRIENDLY EDITOR MODAL */}
      {editingBlock && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh]">
            <h2 className="text-2xl font-extrabold text-deepBlue mb-2">Edit Section: {editingBlock.title}</h2>
            <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">Make your changes below. Text is now clearly visible and editable.</p>
            
            <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
              {renderHumanForm()}
            </div>
            
            <div className="flex gap-4 pt-6 border-t mt-4 shrink-0">
              <button onClick={saveEdit} className="bg-deepBlue text-white px-8 py-3 rounded-xl font-bold hover:bg-aiPurple w-full md:w-auto transition-colors shadow-lg shadow-deepBlue/20">Save & Update Site</button>
              <button onClick={()=>setEditingBlock(null)} className="text-gray-500 font-bold px-4 hover:text-black hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* AI GENERATOR */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-deepBlue mb-4">Add a Custom AI Section</h2>
        <form onSubmit={handleGenerate} className="space-y-4">
          <input required type="text" placeholder="Section Name (e.g. Newsletter Signup)" value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          <textarea required placeholder="What should it look like?" rows={3} value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
          <button type="submit" disabled={isGenerating} className="w-full bg-deepBlue text-white font-bold py-4 rounded-xl hover:bg-aiPurple transition-colors uppercase tracking-wide">
            {isGenerating ? "AI is designing your section... ⏳" : "✨ Generate & Add to Homepage"}
          </button>
        </form>
      </div>

      {/* DRAG, DROP, HIDE, DELETE MANAGER */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-deepBlue">Manage Homepage Layout & Content</h2>
          {blocks.length === 0 ? (
            <button onClick={restoreDefaults} className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-red-600 animate-pulse">
              ⚠️ Database Empty - Click here to inject Original Content!
            </button>
          ) : (
            <div className="flex gap-4">
              <button onClick={restoreDefaults} className="text-xs bg-gray-200 text-gray-700 font-bold px-3 py-2 rounded hover:bg-gray-300 transition-colors">Reset Defaults</button>
              <a href="/" target="_blank" className="px-6 py-2 bg-neutralLight text-deepBlue font-bold rounded-lg border border-gray-200 hover:border-cyan transition-all shadow-sm">Preview Site ↗</a>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className={`flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 rounded-xl border ${block.is_active ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-dashed opacity-60'}`}>
              <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="px-3 py-1 hover:bg-gray-200 text-xs">▲</button>
                  <div className="h-px w-full bg-gray-200"></div>
                  <button onClick={() => moveDown(index)} disabled={index === blocks.length - 1} className="px-3 py-1 hover:bg-gray-200 text-xs">▼</button>
                </div>
                <div>
                  <h3 className="font-bold text-deepBlue text-lg flex items-center gap-2">
                    {block.title} {!block.is_active && <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">Hidden</span>}
                  </h3>
                  <p className="text-xs text-gray-400">Type: {block.is_custom ? 'AI Custom' : 'Standard Component'}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 md:ml-4">
                <button onClick={() => openEditor(block)} className="px-4 py-2 bg-cyan/10 text-deepBlue font-bold rounded-lg border border-cyan/30 text-sm hover:bg-cyan hover:text-white transition-colors">
                  ✏️ Edit
                </button>
                <button onClick={() => toggleVisibility(block.id, block.is_active)} className="px-4 py-2 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
                  {block.is_active ? "👁️ Hide" : "👁️‍🗨️ Show"}
                </button>
                <button onClick={() => deleteBlock(block.id)} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-100 text-sm hover:bg-red-600 hover:text-white transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}} />
    </div>
  );
}