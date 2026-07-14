import Link from "next/link";

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK BUTTON */}
        <Link href="/videos" className="inline-flex items-center text-aiPurple font-bold mb-6 hover:underline">
          &larr; Back to Video Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* MAIN PLAYER & CONTENT (PDF Page 7) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* EMBEDDED YOUTUBE PLAYER CONTAINER */}
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Video Lecture"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-deepBlue mb-4">
                Lecture #{resolvedParams.id}: Advanced AI System Architecture
              </h1>
              <p className="text-neutralDark leading-relaxed">
                In this video lecture, Dr. Varazdat Avetisyan explores modern architectural patterns for building resilient, high-throughput artificial intelligence applications.
              </p>
            </div>

            {/* LECTURE NOTES (PDF Page 7) */}
            <div className="bg-neutralLight p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold text-deepBlue mb-4">Lecture Notes</h2>
              <ul className="space-y-2 text-neutralDark text-sm list-disc list-inside">
                <li>00:00 - Introduction and context setting</li>
                <li>10:15 - Core architectural principles of Generative AI systems</li>
                <li>25:40 - Evaluating model benchmarks vs real-world performance</li>
                <li>40:00 - Q&A with software engineering students</li>
              </ul>
            </div>

            {/* DOWNLOADABLE RESOURCES (PDF Page 7) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-deepBlue mb-4">Downloadable Resources</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-deepBlue text-white rounded-lg text-sm font-bold hover:bg-aiPurple transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Download Slides (.PDF)
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-deepBlue rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors border border-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  Source Code (GitHub)
                </a>
              </div>
            </div>

          </div>

          {/* SIDEBAR: RELATED VIDEOS (PDF Page 7) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-deepBlue mb-6">Related Videos</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 p-3 bg-neutralLight rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="w-24 h-16 bg-deepBlue rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs">
                    Thumb
                  </div>
                  <div>
                    <h3 className="font-bold text-deepBlue text-sm line-clamp-2">Understanding Neural Network Weights</h3>
                    <p className="text-xs text-gray-500 mt-1">25 mins</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}