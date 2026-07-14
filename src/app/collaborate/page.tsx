import Link from "next/link";

export default function CollaborateHub() {
  return (
    <div className="w-full bg-neutralLight min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-white py-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-aiPurple font-bold tracking-widest uppercase text-sm mb-4 block">Academic & Professional Network</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepBlue mb-6 leading-tight">Let's Build the Future Together</h1>
          <p className="text-xl text-neutralDark mb-10 leading-relaxed">
            From joint research publications to university curriculum development and international speaking engagements.
          </p>
          <Link href="/connect" className="inline-block px-10 py-4 bg-aiPurple text-white font-extrabold uppercase tracking-wide rounded-xl hover:bg-deepBlue transition-all shadow-xl hover:-translate-y-1">
            Submit a Collaboration Request
          </Link>
        </div>
      </section>

      {/* CONTENT GRID (PDF Page 43 Sections) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* RESEARCH & PROJECTS */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-deepBlue mb-6 flex items-center gap-3">
                <span className="text-3xl">🔬</span> Research & Projects
              </h2>
              <p className="text-neutralDark mb-6">Current focus areas include Generative AI in Education, Human-AI Collaboration, and accelerated material design via deep learning.</p>
              <ul className="space-y-3 text-sm font-bold text-deepBlue mb-8">
                <li>→ Active AI Projects</li>
                <li>→ Open Research Opportunities</li>
                <li>→ GitHub Repositories</li>
              </ul>
              <Link href="/impact" className="text-aiPurple font-bold hover:underline">View All Projects</Link>
            </div>

            {/* PUBLICATIONS */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-deepBlue mb-6 flex items-center gap-3">
                <span className="text-3xl">📚</span> Publications
              </h2>
              <p className="text-neutralDark mb-6">Peer-reviewed papers, academic journals, and industry whitepapers.</p>
              <div className="bg-neutralLight p-4 rounded-xl border border-gray-200 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Latest Paper (Scopus)</p>
                <p className="text-sm font-bold text-deepBlue">Accelerated composition optimization of hybrid perovskites via data-driven materials design</p>
              </div>
              <Link href="/impact" className="text-aiPurple font-bold hover:underline">View Full Citation List</Link>
            </div>

            {/* SPEAKING & MEDIA */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-deepBlue mb-6 flex items-center gap-3">
                <span className="text-3xl">🎤</span> Speaking & Media
              </h2>
              <p className="text-neutralDark mb-6">Available for Keynotes, Panel Discussions, Guest Lectures, and Podcast Interviews.</p>
              <div className="flex gap-2 flex-wrap mb-6">
                <span className="px-3 py-1 bg-cyan text-deepBlue text-xs font-bold rounded">Tech Talks</span>
                <span className="px-3 py-1 bg-cyan text-deepBlue text-xs font-bold rounded">Workshops</span>
                <span className="px-3 py-1 bg-cyan text-deepBlue text-xs font-bold rounded">Press Coverage</span>
              </div>
              <Link href="/impact" className="text-aiPurple font-bold hover:underline">Download Media Kit</Link>
            </div>

            {/* COLLABORATIONS & UNIVERSITIES */}
            <div className="bg-deepBlue p-10 rounded-3xl shadow-xl text-white">
              <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-white">
                <span className="text-3xl">🏛️</span> Institutional Partnerships
              </h2>
              <p className="text-gray-300 mb-6">Currently affiliated with UFAR, NPUA, and FAST Foundation. Open to academic curriculum exchanges and NGO advisory roles.</p>
              
              <div className="bg-white/10 p-5 rounded-xl border border-white/20 mb-6">
                <h3 className="font-bold text-cyan mb-2">Current Opportunity</h3>
                <p className="text-sm text-gray-200">Looking for university partners interested in adopting specialized AI ethics and Prompt Engineering curriculums.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}