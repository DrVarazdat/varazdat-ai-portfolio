import Link from "next/link";

export default function VideoCoursesPage() {
  // Exact Categories from PDF Page 7
  const categories = ["All", "AI", "Data Science", "Python", "Machine Learning", "Prompt Engineering"];

  // Video Course Cards based on PDF Page 6 & 7 requirements
  const videoCourses = [
    { id: "1", title: "Introduction to Large Language Models", category: "AI", duration: "45 mins", desc: "A comprehensive breakdown of how LLMs work under the hood." },
    { id: "2", title: "Data Wrangling with Pandas & Python", category: "Data Science", duration: "1 hr 15 mins", desc: "Master data manipulation and cleaning techniques using Python." },
    { id: "3", title: "Building Neural Networks from Scratch", category: "Machine Learning", duration: "2 hrs", desc: "Understand backpropagation and forward passes through hands-on code." },
    { id: "4", title: "Advanced Prompting Strategies", category: "Prompt Engineering", duration: "30 mins", desc: "Techniques for zero-shot, few-shot, and chain-of-thought prompting." },
    { id: "5", title: "Python Async Architecture for AI", category: "Python", duration: "50 mins", desc: "Learn how to write scalable, asynchronous Python code for AI APIs." },
    { id: "6", title: "Autonomous AI Agents Deep Dive", category: "AI", duration: "1 hr 30 mins", desc: "Architecture patterns for goal-oriented autonomous software agents." },
  ];

  return (
    <div className="w-full bg-neutralLight min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-4">Video Library</h1>
          <p className="text-lg text-neutralDark max-w-2xl mx-auto">
            Free and premium video lectures, tutorials, and deep-dive technical sessions by Dr. Varazdat Avetisyan.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS (PDF Page 7) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                index === 0 
                  ? "bg-aiPurple text-white shadow-md" 
                  : "bg-white text-neutralDark hover:bg-deepBlue hover:text-white border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* VIDEO CARDS GRID (PDF Page 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoCourses.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all flex flex-col">
              
              {/* THUMBNAIL PLACEHOLDER WITH PLAY ICON */}
              <div className="h-48 bg-deepBlue relative flex items-center justify-center group cursor-pointer">
                <div className="w-16 h-16 bg-aiPurple/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
                  {video.duration}
                </span>
                <span className="absolute top-3 left-3 bg-cyan text-deepBlue text-xs font-bold px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-deepBlue mb-2">{video.title}</h3>
                <p className="text-neutralDark text-sm mb-6 flex-grow">{video.desc}</p>
                
                <Link 
                  href={`/videos/${video.id}`}
                  className="w-full py-2 bg-neutralLight text-deepBlue text-center rounded-lg font-bold hover:bg-aiPurple hover:text-white transition-colors"
                >
                  Watch Video Lecture
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}