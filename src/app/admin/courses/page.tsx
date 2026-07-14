"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Beginner");
  const [format, setFormat] = useState("Online");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const [nextDate, setNextDate] = useState("");

  // Fetch Courses
  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (data) setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add Course
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); // Auto-generate slug

    const { error } = await supabase.from('courses').insert([{
      title, slug, category, format, status, description, next_date: nextDate
    }]);

    if (error) {
      alert("Error adding course: " + error.message);
    } else {
      alert("Course added successfully!");
      setTitle(""); setDescription(""); setNextDate(""); // Reset form
      fetchCourses(); // Refresh list
    }
  };

  // Delete Course
  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this course?")) {
      await supabase.from('courses').delete().eq('id', id);
      fetchCourses();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* ADD NEW COURSE FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-extrabold text-deepBlue mb-6">Add New Course</h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" placeholder="Course Title (e.g. Generative AI 101)" value={title} onChange={e=>setTitle(e.target.value)} className="p-3 border rounded-xl w-full" />
            <input required type="text" placeholder="Next Date (e.g. Starts Oct 15 / Available Now)" value={nextDate} onChange={e=>setNextDate(e.target.value)} className="p-3 border rounded-xl w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="p-3 border rounded-xl w-full bg-white">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select value={format} onChange={e=>setFormat(e.target.value)} className="p-3 border rounded-xl w-full bg-white">
              <option>Online</option>
              <option>In-person</option>
              <option>Hybrid</option>
            </select>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="p-3 border rounded-xl w-full bg-white">
              <option>Active</option>
              <option>Upcoming</option>
              <option>Past</option>
            </select>
          </div>

          <textarea required placeholder="Short Description..." rows={3} value={description} onChange={e=>setDescription(e.target.value)} className="p-3 border rounded-xl w-full"></textarea>
          
          <button type="submit" className="bg-aiPurple text-white font-bold py-3 px-8 rounded-xl hover:bg-deepBlue transition-colors">
            Save Course to Database
          </button>
        </form>
      </div>

      {/* LIST OF COURSES */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-extrabold text-deepBlue mb-6">Existing Courses</h2>
        {loading ? <p>Loading courses...</p> : (
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="flex justify-between items-center p-4 bg-neutralLight rounded-xl border border-gray-100">
                <div>
                  <h3 className="font-bold text-deepBlue">{course.title}</h3>
                  <p className="text-xs text-gray-500">{course.format} • {course.status} • {course.next_date}</p>
                </div>
                <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 font-bold text-sm px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50">
                  Delete
                </button>
              </div>
            ))}
            {courses.length === 0 && <p className="text-gray-500 italic">No courses in the database yet.</p>}
          </div>
        )}
      </div>

    </div>
  );
}