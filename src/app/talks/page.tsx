export default function TalksPage() {
  // Exact Categories from PDF Page 7
  const categories = [
    "Conference Talks", "Keynotes", "Workshops", 
    "Panel Discussions", "Podcasts", "Interviews", 
    "Guest Articles", "Media Mentions"
  ];

  // Entries mapped with exact required fields from PDF Page 7
  const events = [
    { title: "The Future of AI in Higher Education", category: "Keynotes", org: "Armenian Tech Summit", date: "October 2024", location: "Yerevan, Armenia", desc: "Keynote address exploring how Generative AI tools are reshaping curriculum design and student evaluation.", link: "#" },
    { title: "Building RAG Systems with LLMs", category: "Workshops", org: "FAST Foundation", date: "August 2024", location: "Online / Hybrid", desc: "A 3-hour practical workshop for enterprise developers on Retrieval-Augmented Generation.", link: "#" },
    { title: "AI Ethics & Digital Transformation", category: "Panel Discussions", org: "SASTIC Conference", date: "May 2024", location: "Yerevan, Armenia", desc: "Panel discussion with regional tech leaders on responsible AI development and deployment.", link: "#" },
    { title: "Demystifying Machine Learning", category: "Podcasts", org: "Tech Talks Armenia", date: "March 2024", location: "Audio Episode", desc: "In-depth podcast discussion regarding AI adoption challenges in Eastern Europe.", link: "#" },
  ];

  return (
    <div className="w-full bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-4">Talks, Events & Media</h1>
          <p className="text-lg text-neutralDark max-w-2xl mx-auto">
            A comprehensive record of keynotes, conference talks, media appearances, podcasts, and community workshops.
          </p>
        </div>

        {/* CATEGORY TABS (PDF Page 7) */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                index === 0 
                  ? "bg-deepBlue text-white" 
                  : "bg-neutralLight text-neutralDark hover:bg-aiPurple hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EVENTS LIST (PDF Page 7 Structure) */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 justify-between items-start">
              
              <div className="space-y-3 flex-grow">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <span className="bg-aiPurple text-white px-3 py-1 rounded-full uppercase">{event.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-cyan font-semibold">{event.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{event.location}</span>
                </div>

                <h3 className="text-2xl font-bold text-deepBlue">{event.title}</h3>
                <p className="text-aiPurple font-semibold text-sm">{event.org}</p>
                <p className="text-neutralDark text-sm leading-relaxed">{event.desc}</p>
                
                {/* Photo Gallery Placeholder requested on Page 7 */}
                <div className="flex gap-2 pt-2">
                  <div className="w-16 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">Photo 1</div>
                  <div className="w-16 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">Photo 2</div>
                </div>
              </div>

              {/* VIDEO / EVENT LINK */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <a 
                  href={event.link}
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-neutralLight text-deepBlue font-bold rounded-lg hover:bg-deepBlue hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 text-aiPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Watch Recording
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}