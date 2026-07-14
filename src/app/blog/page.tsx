import Link from "next/link";

export default function BlogPage() {
  // Categories mapped from PDF Page 9
  const categories = [
    "Artificial Intelligence", "Generative AI", "Data Science", 
    "Machine Learning", "Education", "AI Agents", 
    "Prompt Engineering", "Technology Trends"
  ];

  // Placeholder Articles
  const articles = [
    { id: 1, title: "The Future of Generative AI in Higher Education", category: "Education", readTime: "5 min read", date: "Oct 12, 2024", desc: "How large language models are shifting paradigms in university assignments and grading structures." },
    { id: 2, title: "Building Agentic Workflows with LangChain", category: "AI Agents", readTime: "8 min read", date: "Sep 28, 2024", desc: "A technical deep dive into structuring autonomous agents capable of multi-step reasoning." },
    { id: 3, title: "Data Science vs Machine Learning: The Real Difference", category: "Data Science", readTime: "4 min read", date: "Sep 15, 2024", desc: "Clearing up the industry confusion between statistical data analysis and predictive modeling." },
    { id: 4, title: "Advanced Prompting for Corporate Teams", category: "Prompt Engineering", readTime: "6 min read", date: "Aug 30, 2024", desc: "How non-technical managers can leverage few-shot prompting to increase daily productivity." },
  ];

  return (
    <div className="w-full bg-neutralLight min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER & SEARCH BAR (PDF Page 9 Features) */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-6">Thoughts & Insights</h1>
          
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search articles on AI, Data Science, etc..." 
              className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-aiPurple text-neutralDark pr-12"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-aiPurple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* MAIN ARTICLE LIST */}
          <div className="lg:w-2/3 space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                  <span className="text-aiPurple">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-deepBlue mb-3 hover:text-cyan transition-colors cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-neutralDark mb-6 leading-relaxed">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex gap-2">
                    {/* Tags (PDF Page 9) */}
                    <span className="px-2 py-1 bg-neutralLight text-gray-600 text-xs rounded border border-gray-200">AI</span>
                    <span className="px-2 py-1 bg-neutralLight text-gray-600 text-xs rounded border border-gray-200">Tech</span>
                  </span>
                  <Link href={`/blog/${article.id}`} className="text-deepBlue font-bold hover:text-aiPurple text-sm underline underline-offset-4">
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR (Categories & Newsletter) */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* CATEGORIES WIDGET */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-deepBlue mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <a href="#" className="text-neutralDark hover:text-aiPurple text-sm flex items-center justify-between group">
                      <span>{cat}</span>
                      <span className="bg-neutralLight px-2 py-0.5 rounded text-xs text-gray-500 group-hover:bg-aiPurple group-hover:text-white transition-colors">
                        {Math.floor(Math.random() * 10) + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEWSLETTER SUBSCRIPTION (PDF Page 9) */}
            <div className="bg-deepBlue p-6 rounded-2xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-2">Join the Newsletter</h3>
              <p className="text-sm text-gray-300 mb-6">Get the latest AI insights and course updates delivered straight to your inbox.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan"
                />
                <button type="submit" className="w-full bg-cyan text-deepBlue font-bold py-3 rounded-lg hover:bg-white transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}