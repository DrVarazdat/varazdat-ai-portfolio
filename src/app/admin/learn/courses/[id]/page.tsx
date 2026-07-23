"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CourseEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | null>(null);
  
  const [course, setCourse] = useState<any>({
    curriculum: [], prerequisites: [], outcomes: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isUploading, setIsUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const resolvedParams = await params;
      setCourseId(resolvedParams.id);
      
      const { data } = await supabase.from('courses').select('*').eq('id', resolvedParams.id).single();
      if (data) {
        setCourse({
          ...data,
          curriculum: data.curriculum || [],
          prerequisites: data.prerequisites || [],
          outcomes: data.outcomes || []
        });
      }
      setLoading(false);
    }
    load();
  }, [params]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('courses').update(course).eq('id', courseId);
    if (error) alert("Error saving: " + error.message);
    else alert("✅ Course saved successfully!");
    setSaving(false);
  };

  const updateField = (field: string, value: any) => setCourse({ ...course, [field]: value });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `course-${field}-${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      updateField(field, data.publicUrl);
      alert("✅ Image uploaded successfully!");
    } catch (err: any) { 
      alert("Upload failed: " + err.message); 
    } finally {
      setIsUploading(false);
    }
  };

  // --- THE FIX: BROWSER-SIDE PDF PARSING ---
  const handleAIGenerate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setAiLoading(true);
    try {
      let extractedText = "";

      // 1. Read the PDF directly inside the browser
      if (file.type === 'application/pdf') {
        // Dynamically import pdfjs to prevent SSR build errors
        const pdfjsLib = await import('pdfjs-dist');
        // Point to the secure CDN worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Loop through all pages and extract the text
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item: any) => item.str).join(" ") + " ";
        }
      } else if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else {
        throw new Error("Invalid file type. Please upload a PDF or TXT.");
      }

      // 2. Send ONLY the extracted text to our API
      const res = await fetch('/api/generate-course-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // 3. Auto-fill the course editor fields
      setCourse({ 
        ...course, 
        title: data.title || course.title,
        category: data.category || course.category,
        format: data.format || course.format,
        status: data.status || course.status,
        short_description: data.description || course.short_description,
        start_date: data.nextDate || course.start_date
      });

      alert("✅ AI successfully extracted the course details!");
    } catch (err: any) {
      alert("AI Parsing failed: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const addModule = () => updateField('curriculum', [...course.curriculum, { title: "New Module", lessons: ["New Lesson"] }]);
  const updateModuleTitle = (idx: number, title: string) => { const c = [...course.curriculum]; c[idx].title = title; updateField('curriculum', c); };
  const addLesson = (idx: number) => { const c = [...course.curriculum]; c[idx].lessons.push("New Lesson"); updateField('curriculum', c); };
  const updateLesson = (mIdx: number, lIdx: number, val: string) => { const c = [...course.curriculum]; c[mIdx].lessons[lIdx] = val; updateField('curriculum', c); };
  const removeModule = (idx: number) => { const c = [...course.curriculum]; c.splice(idx, 1); updateField('curriculum', c); };
  const removeLesson = (mIdx: number, lIdx: number) => { const c = [...course.curriculum]; c[mIdx].lessons.splice(lIdx, 1); updateField('curriculum', c); };
  const addListItem = (field: string) => updateField(field, [...course[field], "New Item"]);
  const updateListItem = (field: string, idx: number, val: string) => { const list = [...course[field]]; list[idx] = val; updateField(field, list); };
  const removeListItem = (field: string, idx: number) => { const list = [...course[field]]; list.splice(idx, 1); updateField(field, list); };

  const inputClass = "w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-cyan focus:outline-none";

  if (loading) return <div className="p-20 text-center text-xl font-bold">Loading Editor...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32">
      
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <div>
          <Link href="/admin/learn/courses" className="text-cyan font-bold hover:underline mb-2 inline-block">&larr; Back to Courses</Link>
          <h1 className="text-3xl font-extrabold text-deepBlue">Editing: {course.title}</h1>
        </div>
        <div className="flex gap-4">
          <a href={`/learn/courses/${course.slug}`} target="_blank" className="bg-gray-100 text-deepBlue px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Preview</a>
          <button onClick={handleSave} disabled={saving || isUploading} className="bg-deepBlue text-white px-8 py-3 rounded-xl font-bold hover:bg-aiPurple transition-colors shadow-lg">
            {saving ? "Saving..." : isUploading ? "Uploading..." : "💾 Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-aiPurple to-cyan p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2"><span>✨</span> AI Auto-Fill from Syllabus</h2>
          <p className="text-white/90 text-sm max-w-xl">Upload a PDF or TXT file of your course syllabus. The AI will instantly read it and auto-fill the Title, Description, Format, Level, and Start Date below.</p>
        </div>
        <label className="cursor-pointer bg-white text-deepBlue font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-md flex-shrink-0 uppercase tracking-wide">
          {aiLoading ? "🤖 AI IS READING PDF..." : "UPLOAD PDF / TXT"}
          <input type="file" accept=".pdf,.txt" onChange={handleAIGenerate} disabled={aiLoading} className="hidden" />
        </label>
      </div>

      <div className="flex gap-2">
        {['general', 'curriculum', 'requirements'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-t-xl font-bold capitalize transition-colors ${activeTab === tab ? 'bg-deepBlue text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-b-3xl rounded-tr-3xl shadow-sm border border-gray-200 -mt-8">
        
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div><label className="font-bold text-sm text-gray-700">Course Title</label><input type="text" value={course.title} onChange={e=>updateField('title', e.target.value)} className={inputClass}/></div>
              <div><label className="font-bold text-sm text-gray-700">URL Slug</label><input type="text" value={course.slug} onChange={e=>updateField('slug', e.target.value)} className={inputClass}/></div>
              <div><label className="font-bold text-sm text-gray-700">Short Description (Catalog)</label><textarea rows={3} value={course.short_description} onChange={e=>updateField('short_description', e.target.value)} className={inputClass}/></div>
              <div><label className="font-bold text-sm text-gray-700">Full Description (Page)</label><textarea rows={6} value={course.full_description} onChange={e=>updateField('full_description', e.target.value)} className={inputClass}/></div>
            </div>
            
            <div>
              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-deepBlue">Course Settings</h3>
                <div><label className="font-bold text-sm text-gray-700">Status</label><select value={course.status} onChange={e=>updateField('status', e.target.value)} className={inputClass}><option>Active</option><option>Upcoming</option><option>Past</option><option>Draft</option></select></div>
                <div><label className="font-bold text-sm text-gray-700">Format</label><select value={course.format} onChange={e=>updateField('format', e.target.value)} className={inputClass}><option>Online</option><option>In-person</option><option>Hybrid</option></select></div>
                <div><label className="font-bold text-sm text-gray-700">Location (if In-person)</label><input type="text" value={course.location || ""} onChange={e=>updateField('location', e.target.value)} placeholder="e.g. Yerevan, Armenia" className={inputClass}/></div>
                <div><label className="font-bold text-sm text-gray-700">Start Date</label><input type="text" value={course.start_date || ""} onChange={e=>updateField('start_date', e.target.value)} className={inputClass}/></div>
              </div>

              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-6">
                <h3 className="font-bold text-deepBlue">Course Images</h3>
                <div>
                  <label className="font-bold text-sm text-gray-700 block mb-2">Thumbnail (Learn Page Box)</label>
                  {course.thumbnail && <img src={course.thumbnail} className="w-full h-32 object-cover rounded-lg mb-2 border border-gray-200" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'thumbnail')} className="text-sm w-full text-gray-700" disabled={isUploading} />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <label className="font-bold text-sm text-gray-700 block mb-2">Hero Image (Detailed Course Page)</label>
                  {course.hero_image && <img src={course.hero_image} className="w-full h-32 object-cover rounded-lg mb-2 border border-gray-200" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero_image')} className="text-sm w-full text-gray-700" disabled={isUploading} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deepBlue border-b pb-4">Modules & Lessons</h2>
            {course.curriculum.map((mod: any, mIdx: number) => (
              <div key={mIdx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative">
                <button onClick={() => removeModule(mIdx)} className="absolute top-4 right-4 text-red-500 font-bold hover:bg-red-100 px-3 py-1 rounded">Delete Module</button>
                <input type="text" value={mod.title} onChange={e => updateModuleTitle(mIdx, e.target.value)} className="w-2/3 p-3 border-b-2 border-aiPurple font-bold text-lg bg-transparent text-gray-900 focus:outline-none mb-4" placeholder="Module Title" />
                
                <div className="space-y-2 pl-4 border-l-2 border-cyan">
                  {mod.lessons.map((lesson: string, lIdx: number) => (
                    <div key={lIdx} className="flex gap-2">
                      <input type="text" value={lesson} onChange={e => updateLesson(mIdx, lIdx, e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:ring-1 focus:ring-cyan" placeholder="Lesson Name" />
                      <button onClick={() => removeLesson(mIdx, lIdx)} className="text-gray-400 hover:text-red-500 px-2 font-bold">X</button>
                    </div>
                  ))}
                  <button onClick={() => addLesson(mIdx)} className="text-sm font-bold text-cyan mt-2 hover:underline">+ Add Lesson</button>
                </div>
              </div>
            ))}
            <button onClick={addModule} className="w-full py-4 border-2 border-dashed border-aiPurple text-aiPurple font-bold rounded-xl hover:bg-purple-50">+ Add New Module</button>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-bold text-deepBlue mb-4">What You Will Learn (Outcomes)</h2>
              {course.outcomes.map((item: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2"><input type="text" value={item} onChange={e=>updateListItem('outcomes', i, e.target.value)} className={inputClass} /><button onClick={()=>removeListItem('outcomes', i)} className="text-red-500 font-bold px-3">X</button></div>
              ))}
              <button onClick={()=>addListItem('outcomes')} className="text-sm font-bold text-aiPurple mt-2">+ Add Outcome</button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-bold text-deepBlue mb-4">Prerequisites</h2>
              {course.prerequisites.map((item: string, i: number) => (
                <div key={i} className="flex gap-2 mb-2"><input type="text" value={item} onChange={e=>updateListItem('prerequisites', i, e.target.value)} className={inputClass} /><button onClick={()=>removeListItem('prerequisites', i)} className="text-red-500 font-bold px-3">X</button></div>
              ))}
              <button onClick={()=>addListItem('prerequisites')} className="text-sm font-bold text-cyan mt-2">+ Add Prerequisite</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}