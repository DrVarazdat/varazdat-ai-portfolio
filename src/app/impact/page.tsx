import Link from "next/link";

export default function ImpactHub() {
  // Statistics (PDF Page 39)
  const impactStats = [
    { value: "5,000+", label: "Students Trained Globally" },
    { value: "100+", label: "Workshops Delivered" },
    { value: "20+", label: "AI Courses Developed" },
    { value: "99%", label: "Positive Feedback" },
  ];

  // Professional Milestones & Awards (PDF Page 43/44)
  const milestones = [
    { year: "2024", title: "Top Researcher in Human-AI Collaboration", org: "Global AI Summit", type: "Award" },
    { year: "2023", title: "Excellence in AI Education", org: "Armenian Tech Foundation", type: "Award" },
    { year: "2022", title: "Accelerated composition optimization paper published", org: "Materials & Design (Scopus)", type: "Publication" },
    { year: "2019", title: "Co-Founded Luseen Mobile", org: "Tech Startup", type: "Milestone" },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-neutralLight py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-aiPurple font-bold tracking-widest uppercase text-sm mb-4 block">Trust & Credibility</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepBlue mb-6 leading-tight">Impact in Action</h1>
          <p className="text-xl text-neutralDark mb-10 leading-relaxed">
            Objective evidence of expertise, research advancements, and the measurable success of students and corporate partners.
          </p>
        </div>
      </section>

      {/* IMPACT STATISTICS GRID */}
      <section className="py-20 bg-deepBlue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {impactStats.map((stat, i) => (
            <div key={i} className="p-6">
              <div className="text-4xl md:text-5xl font-black text-cyan mb-3">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-wide text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONES & AWARDS (PDF Page 44) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-12 text-center">Milestones & Recognition</h2>
          
          <div className="space-y-6">
            {milestones.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 bg-neutralLight rounded-2xl border border-gray-100 hover:border-aiPurple hover:shadow-md transition-all items-start sm:items-center">
                <div className="text-2xl font-black text-cyan">{item.year}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-deepBlue mb-1">{item.title}</h3>
                  <p className="text-neutralDark text-sm">{item.org}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="px-3 py-1 bg-white text-xs font-bold text-gray-500 uppercase rounded border border-gray-200">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA APPEARANCES (PDF Page 21 Data) */}
      <section className="py-24 bg-neutralLight border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-12 text-center">Media & Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-aiPurple uppercase mb-2 block">Morning Light Interview</span>
              <h3 className="font-bold text-deepBlue text-lg mb-4">Discussion on AI Adoption in Armenia</h3>
              <a href="https://www.youtube.com/watch?v=XEaSVpPTIzc" target="_blank" rel="noreferrer" className="text-sm font-bold text-cyan hover:underline">Watch on YouTube →</a>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-aiPurple uppercase mb-2 block">Tech News (Itel.am)</span>
              <h3 className="font-bold text-deepBlue text-lg mb-4">The Role of Deep Learning in Modern Startups</h3>
              <a href="#" className="text-sm font-bold text-cyan hover:underline">Read Article →</a>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-aiPurple uppercase mb-2 block">ARDY Academy</span>
              <h3 className="font-bold text-deepBlue text-lg mb-4">Masterclass: Machine Learning Fundamentals</h3>
              <a href="#" className="text-sm font-bold text-cyan hover:underline">Watch Highlight →</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}