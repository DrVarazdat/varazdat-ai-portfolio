"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LearnHub() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Fetch dynamic layout blocks from Admin Dashboard
      const { data: bData } = await supabase.from('learn_page_blocks').select('*').eq('is_active', true).order('sort_order', { ascending: true });
      if (bData) setBlocks(bData);

      // Fetch courses from Database
      const { data: cData } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (cData) setCourses(cData);
      
      setLoading(false);
    }
    loadData();
  }, []);

  // Filtering Logic
  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === "All" || course.status === filter || course.format === filter || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-pulse text-2xl text-deepBlue font-bold">Loading Learning Hub...</div></div>;
  
  if (!blocks || blocks.length === 0) return <div className="py-32 text-center text-red-500 font-bold bg-neutralLight min-h-screen">Database Empty. Please go to Admin Dashboard to inject content.</div>;

  return (
    <div className="w-full bg-neutralLight min-h-screen">
      
      {blocks.map(block => {
        const content = block.content || {};

        // ================= 1. HERO & SEARCH =================
        if (block.section_id === 'learn_hero') return (
          <section key={block.id} className="bg-deepBlue text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">{content.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                {content.subtitle}
              </p>
              
              <div className="max-w-2xl mx-auto relative mb-6 ">
                <input 
                  type="text" 
                  placeholder={content.searchPlaceholder} 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-deepBlue bg-neutralLight focus:outline-none focus:ring-4 focus:ring-cyan shadow-xl"
                />
              </div>
            </div>
          </section>
        );

        // ================= 2. COURSE RECOMMENDATION QUIZ =================
        if (block.section_id === 'learn_quiz') return (
          <section key={block.id} className="py-12 -mt-10 relative z-10">
            <div className="max-w-5xl mx-auto px-4">
              <div className="bg-gradient-to-r from-aiPurple to-deepBlue rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between text-white gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
                  <p className="text-gray-200">{content.desc}</p>
                </div>
                <Link href={content.btnLink || "#"} className="flex-shrink-0 px-8 py-4 bg-cyan text-deepBlue font-bold rounded-xl hover:bg-white transition-all shadow-lg text-center w-full md:w-auto uppercase tracking-wide">
                  {content.btnText}
                </Link>
              </div>
            </div>
          </section>
        );

        // ================= 3. COURSE CATALOG WITH FILTERS =================
        if (block.section_id === 'learn_catalog') return (
          <section key={block.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <h2 className="text-3xl font-extrabold text-deepBlue">{content.title}</h2>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {["All", "Active", "Upcoming", "Past", "Online", "In-person"].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        filter === f ? "bg-deepBlue text-white shadow-md" : "bg-white text-neutralDark border border-gray-200 hover:border-aiPurple"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                    
                    {/* Header Image Area with Dynamic Status Badges */}
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-300 relative flex items-center justify-center p-4">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 font-medium">Cover Image</span>
                      )}
                      
                      {/* Dark overlay for text readability if there's an image */}
                      {course.thumbnail && <div className="absolute inset-0 bg-black/20"></div>}
                      
                      <div className="absolute top-4 left-4 flex gap-2 flex-col items-start z-10">
                        <span className={`px-3 py-1 rounded text-xs font-bold shadow-sm uppercase tracking-wide text-white ${
                          course.status === "Active" ? "bg-green-600" : course.status === "Upcoming" ? "bg-cyan text-deepBlue" : "bg-gray-600"
                        }`}>
                          {course.status}
                        </span>
                        <span className="px-3 py-1 rounded text-xs font-bold bg-white text-deepBlue shadow-sm uppercase tracking-wide border border-gray-200">
                          {course.format}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-aiPurple uppercase tracking-widest mb-2">{course.category} Level</span>
                      <h3 className="text-2xl font-bold text-deepBlue mb-3">{course.title}</h3>
                      <p className="text-neutralDark text-sm mb-6 flex-grow">{course.short_description || "No description provided."}</p>
                      
                      <div className="text-sm font-semibold text-gray-500 mb-6 bg-neutralLight p-3 rounded-lg border border-gray-100">
                        <span className="block text-xs uppercase tracking-wide text-gray-400 mb-1">Status Date</span>
                        {course.start_date || course.next_date || "Available Now"}
                      </div>
                      
                      {/* FIXED: ALL courses now point to the details page so users can always see the curriculum! */}
                      <Link href={`/learn/courses/${course.slug}`} className="w-full py-3 bg-deepBlue dark:bg-cyan dark:text-deepBlue text-white text-center rounded-lg font-bold hover:bg-aiPurple dark:hover:bg-white transition-colors block uppercase tracking-wide text-sm">
                        {course.status === "Active" ? "Enroll Now" : "View Course Details"}
                      </Link>
                    </div>

                  </div>
                ))}
                
                {filteredCourses.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-200">
                    <p className="text-lg font-bold text-gray-500">No courses match your search or filter.</p>
                    <button onClick={() => {setFilter("All"); setSearch("");}} className="mt-4 text-aiPurple font-bold underline">Clear Filters</button>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

        // ================= 4. EDUCATIONAL RESOURCES & VIDEOS =================
        if (block.section_id === 'learn_resources') return (
          <section key={block.id} className="bg-white py-20 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {(content.cards || []).map((card: any, i: number) => (
                <div key={i} className="bg-neutralLight p-10 rounded-3xl border border-gray-100">
                  <h3 className="text-2xl font-extrabold text-deepBlue mb-4">{card.title}</h3>
                  <p className="text-neutralDark mb-6">{card.desc}</p>
                  <Link href={card.btnLink || "#"} className="text-aiPurple font-bold hover:underline">
                    {card.btnText}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        );

        return null;
      })}

    </div>
  );
}