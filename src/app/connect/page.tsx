"use client";

export default function ConnectHub() {
  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* HERO & CONTACT FORM */}
      <section className="bg-deepBlue py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you are looking for corporate training, academic collaboration, or a keynote speaker, Dr. Avetisyan is ready to help you accelerate your AI journey.
            </p>
            <div className="space-y-4 font-medium text-gray-300">
              <p className="flex items-center gap-4 hover:text-cyan cursor-pointer transition-colors"><span className="text-2xl">📧</span> contact@varazdat.ai</p>
              <p className="flex items-center gap-4 hover:text-cyan cursor-pointer transition-colors"><span className="text-2xl">💼</span> LinkedIn /in/varazdat</p>
              <p className="flex items-center gap-4 hover:text-cyan cursor-pointer transition-colors"><span className="text-2xl">📱</span> Telegram @varazdat_ai</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-deepBlue mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">I am interested in...</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-neutralDark focus:ring-2 focus:ring-aiPurple focus:outline-none bg-neutralLight">
                  <option>Corporate Training & Consulting</option>
                  <option>Academic Collaboration</option>
                  <option>Booking a Speaker</option>
                  <option>Course Enrollment Question</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-neutralDark focus:ring-2 focus:ring-aiPurple bg-neutralLight" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-neutralDark focus:ring-2 focus:ring-aiPurple bg-neutralLight" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-neutralDark focus:ring-2 focus:ring-aiPurple bg-neutralLight" />
              <textarea rows={4} placeholder="How can we collaborate?" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-neutralDark focus:ring-2 focus:ring-aiPurple bg-neutralLight"></textarea>
              <button type="submit" className="w-full bg-aiPurple text-white font-bold py-4 rounded-xl hover:bg-deepBlue transition-colors uppercase tracking-wide">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MULTI-CV DOWNLOAD SYSTEM (PDF Page 18) */}
      <section className="py-24 bg-neutralLight">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-4">Download Curriculum Vitae</h2>
          <p className="text-neutralDark mb-12">Select the version of Dr. Avetisyan's CV most relevant to your needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-cyan hover:shadow-md transition-all group flex flex-col items-center">
              <span className="text-4xl mb-4">🎓</span>
              <h3 className="font-bold text-deepBlue mb-2">Academic CV</h3>
              <p className="text-xs text-gray-500 text-center mb-6">Focuses on publications, research, and university teaching.</p>
              <span className="text-sm font-bold text-aiPurple group-hover:underline mt-auto">Download PDF &darr;</span>
            </a>
            <a href="#" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-cyan hover:shadow-md transition-all group flex flex-col items-center">
              <span className="text-4xl mb-4">💼</span>
              <h3 className="font-bold text-deepBlue mb-2">Corporate Resume</h3>
              <p className="text-xs text-gray-500 text-center mb-6">Focuses on CTO experience, consulting, and enterprise AI.</p>
              <span className="text-sm font-bold text-aiPurple group-hover:underline mt-auto">Download PDF &darr;</span>
            </a>
            <a href="#" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-cyan hover:shadow-md transition-all group flex flex-col items-center">
              <span className="text-4xl mb-4">🎤</span>
              <h3 className="font-bold text-deepBlue mb-2">Speaker Kit</h3>
              <p className="text-xs text-gray-500 text-center mb-6">Short bio, headshots, and past conference talks.</p>
              <span className="text-sm font-bold text-aiPurple group-hover:underline mt-auto">Download ZIP &darr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS CALENDAR (PDF Page 18/19) */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <h2 className="text-3xl font-extrabold text-deepBlue">Upcoming Events</h2>
            <p className="text-sm font-bold text-cyan uppercase tracking-widest">Live Calendar</p>
          </div>

          <div className="space-y-4">
            {/* Event 1 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-neutralLight rounded-2xl border border-gray-100 hover:border-aiPurple transition-all gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-white px-4 py-2 rounded-xl text-center shadow-sm border border-gray-200">
                  <span className="block text-xs font-bold text-gray-500 uppercase">NOV</span>
                  <span className="block text-2xl font-black text-deepBlue">15</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-aiPurple text-white text-[10px] font-bold uppercase rounded mb-2 inline-block">Keynote</span>
                  <h3 className="text-xl font-bold text-deepBlue mb-1">AI in European Higher Education</h3>
                  <p className="text-sm text-neutralDark">Berlin, Germany • Hybrid Event</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-white text-deepBlue text-sm font-bold border border-gray-200 rounded-lg hover:bg-gray-50">Add to Calendar</button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-deepBlue text-white text-sm font-bold rounded-lg hover:bg-aiPurple">Register</button>
              </div>
            </div>

             {/* Event 2 */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-neutralLight rounded-2xl border border-gray-100 hover:border-aiPurple transition-all gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-white px-4 py-2 rounded-xl text-center shadow-sm border border-gray-200">
                  <span className="block text-xs font-bold text-gray-500 uppercase">DEC</span>
                  <span className="block text-2xl font-black text-deepBlue">02</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-cyan text-deepBlue text-[10px] font-bold uppercase rounded mb-2 inline-block">Workshop</span>
                  <h3 className="text-xl font-bold text-deepBlue mb-1">RAG Systems for Enterprise</h3>
                  <p className="text-sm text-neutralDark">Online Webinar via Zoom</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-white text-deepBlue text-sm font-bold border border-gray-200 rounded-lg hover:bg-gray-50">Add to Calendar</button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-deepBlue text-white text-sm font-bold rounded-lg hover:bg-aiPurple">Register</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}