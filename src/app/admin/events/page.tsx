"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Keynote");
  const [organization, setOrganization] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (data) setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('events').insert([{
      title, category, organization, event_date: eventDate, location, link, description: ""
    }]);
    setTitle(""); setOrganization(""); setEventDate(""); setLocation(""); setLink(""); // Reset
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if(confirm("Delete this event?")) {
      await supabase.from('events').delete().eq('id', id);
      fetchEvents();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* ADD NEW EVENT FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-extrabold text-deepBlue mb-6">Add New Event / Talk</h2>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" placeholder="Event Title (e.g. AI in Education)" value={title} onChange={e=>setTitle(e.target.value)} className="p-3 border rounded-xl w-full" />
            <input required type="text" placeholder="Organization (e.g. Global Tech Summit)" value={organization} onChange={e=>setOrganization(e.target.value)} className="p-3 border rounded-xl w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="p-3 border rounded-xl w-full bg-white">
              <option>Keynote</option>
              <option>Workshop</option>
              <option>Panel Discussion</option>
              <option>Podcast</option>
            </select>
            <input required type="text" placeholder="Date (e.g. Nov 15, 2024)" value={eventDate} onChange={e=>setEventDate(e.target.value)} className="p-3 border rounded-xl w-full" />
            <input required type="text" placeholder="Location (e.g. Berlin, Germany)" value={location} onChange={e=>setLocation(e.target.value)} className="p-3 border rounded-xl w-full" />
          </div>

          <input type="text" placeholder="Registration Link (Optional)" value={link} onChange={e=>setLink(e.target.value)} className="p-3 border rounded-xl w-full" />
          
          <button type="submit" className="bg-cyan text-deepBlue font-bold py-3 px-8 rounded-xl hover:bg-deepBlue hover:text-white transition-colors">
            Save Event to Database
          </button>
        </form>
      </div>

      {/* LIST OF EVENTS */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-extrabold text-deepBlue mb-6">Upcoming Events Calendar</h2>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex justify-between items-center p-4 bg-neutralLight rounded-xl border border-gray-100">
              <div>
                <span className="px-2 py-1 bg-aiPurple text-white text-[10px] font-bold uppercase rounded mr-2">{event.category}</span>
                <h3 className="font-bold text-deepBlue inline">{event.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{event.event_date} • {event.location} • {event.organization}</p>
              </div>
              <button onClick={() => handleDelete(event.id)} className="text-red-500 font-bold text-sm px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50">Delete</button>
            </div>
          ))}
          {events.length === 0 && <p className="text-gray-500 italic">No events in the database yet.</p>}
        </div>
      </div>

    </div>
  );
}