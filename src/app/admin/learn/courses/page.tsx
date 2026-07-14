"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminCoursesManager() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCourses = async () => {
    setLoading(true);
    const { data } = await supabase.from('courses').select('*').order('sort_order', { ascending: true });
    if (data) setCourses(data);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  // --- ACTIONS ---
  const toggleFeature = async (id: string, isFeatured: boolean) => {
    await supabase.from('courses').update({ is_featured: !isFeatured }).eq('id', id);
    fetchCourses();
  };

  const deleteCourse = async (id: string) => {
    if(confirm("Are you sure? This deletes the course completely!")) {
      await supabase.from('courses').delete().eq('id', id);
      fetchCourses();
    }
  };

  const duplicateCourse = async (course: any) => {
    const { id, created_at, ...courseCopy } = course;
    courseCopy.title = `${course.title} (Copy)`;
    courseCopy.slug = `${course.slug}-copy-${Date.now()}`;
    courseCopy.status = "Draft";
    courseCopy.sort_order = courses.length;
    await supabase.from('courses').insert([courseCopy]);
    fetchCourses();
  };

  const createBlankCourse = async () => {
    const newSlug = `new-course-${Date.now()}`;
    const { data, error } = await supabase.from('courses').insert([{ 
      title: "Untitled Course", 
      slug: newSlug, 
      status: "Draft",
      sort_order: courses.length 
    }]).select().single();
    
    if (data) {
      // Instantly route them to the new editor page!
      router.push(`/admin/learn/courses/${data.id}`);
    }
  };

  // --- SORTING ARROWS ---
  const updateSortOrderInDB = async (newOrderedCourses: any[]) => {
    const updates = newOrderedCourses.map((c, i) => supabase.from('courses').update({ sort_order: i }).eq('id', c.id));
    await Promise.all(updates);
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    let _courses = [...courses];
    let temp = _courses[index - 1];
    _courses[index - 1] = _courses[index];
    _courses[index] = temp;
    setCourses(_courses);
    await updateSortOrderInDB(_courses);
  };

  const moveDown = async (index: number) => {
    if (index === courses.length - 1) return;
    let _courses = [...courses];
    let temp = _courses[index + 1];
    _courses[index + 1] = _courses[index];
    _courses[index] = temp;
    setCourses(_courses);
    await updateSortOrderInDB(_courses);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Upcoming': return 'bg-cyan text-deepBlue border-cyan';
      case 'Past': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Draft': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-deepBlue">Manage Courses</h1>
          <p className="text-gray-500 mt-2">Create, edit, duplicate, and organize all courses in the Learning Hub.</p>
        </div>
        <button onClick={createBlankCourse} className="bg-deepBlue text-white px-6 py-3 rounded-xl font-bold hover:bg-aiPurple transition-colors shadow-md">
          + Create New Course
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <div className="col-span-5">Course Info & Sorting</div>
          <div className="col-span-2">Format & Level</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? <div className="p-10 text-center text-gray-500">Loading courses...</div> : 
           courses.length === 0 ? <div className="p-10 text-center text-gray-500">No courses found. Click "+ Create New Course"!</div> : 
           courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              
              <div className="col-span-5 flex items-center gap-4">
                {/* UP/DOWN ARROWS */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="px-3 py-1 hover:bg-gray-100 hover:text-deepBlue text-gray-500 disabled:opacity-20 text-xs">▲</button>
                  <div className="h-px w-full bg-gray-200"></div>
                  <button onClick={() => moveDown(index)} disabled={index === courses.length - 1} className="px-3 py-1 hover:bg-gray-100 hover:text-deepBlue text-gray-500 disabled:opacity-20 text-xs">▼</button>
                </div>
                
                <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-300">
                  {course.thumbnail ? <img src={course.thumbnail} className="w-full h-full object-cover"/> : <span className="flex items-center justify-center h-full text-[10px] text-gray-400">No Img</span>}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-deepBlue flex items-center gap-2 truncate">{course.title} {course.is_featured && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">★ Featured</span>}</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[200px]">/courses/{course.slug}</p>
                </div>
              </div>
              
              <div className="col-span-2 flex flex-col items-start gap-1">
                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">{course.format}</span>
                <span className="text-xs text-gray-500">{course.category}</span>
              </div>
              
              <div className="col-span-2"><span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(course.status)}`}>{course.status}</span></div>
              
              <div className="col-span-3 flex justify-end gap-2 flex-wrap">
                <button onClick={() => toggleFeature(course.id, course.is_featured)} className={`px-2 py-1.5 rounded-lg text-xs font-bold border transition-colors ${course.is_featured ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}`}>★</button>
                <button onClick={() => duplicateCourse(course)} className="px-2 py-1.5 bg-white text-gray-600 font-bold rounded-lg border border-gray-200 text-xs hover:bg-gray-50 transition-colors">Copy</button>
                
                {/* ROUTES TO THE NEW COURSE EDITOR WE ARE ABOUT TO BUILD! */}
                <Link href={`/admin/learn/courses/${course.id}`} className="px-3 py-1.5 bg-cyan text-deepBlue font-bold rounded-lg border border-cyan text-xs hover:bg-deepBlue hover:text-white transition-colors">
                  ✏️ Edit
                </Link>
                
                <button onClick={() => deleteCourse(course.id)} className="px-2 py-1.5 bg-red-50 text-red-600 font-bold rounded-lg border border-red-100 text-xs hover:bg-red-600 hover:text-white transition-colors">X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}