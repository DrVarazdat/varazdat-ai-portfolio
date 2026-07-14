export default function ProjectsPage() {
    // Categories from PDF Page 8
    const categories = [
      "All", "AI Projects", "Data Science Projects", 
      "Educational Projects", "Mobile Applications", "Research Projects"
    ];
  
    // Specific Featured Projects requested on PDF Page 8
    const projects = [
      { 
        title: "AI Educational Assistant", 
        category: "Educational Projects", 
        desc: "A personalized AI tutor capable of adapting to individual student learning curves and providing real-time code execution and debugging assistance.",
        tech: ["Python", "OpenAI GPT-4", "FastAPI", "React"],
        github: "https://github.com/",
        demo: "https://demo.com"
      },
      { 
        title: "Enterprise RAG System", 
        category: "AI Projects", 
        desc: "Retrieval-Augmented Generation system allowing secure enterprise document querying using vector databases and strict access control.",
        tech: ["LangChain", "Pinecone", "Next.js", "Llama-2"],
        github: "https://github.com/",
        demo: null
      },
      { 
        title: "Autonomous Trading AI Agent", 
        category: "AI Agents", 
        desc: "An experimental multi-agent framework where specialized AI agents collaborate to analyze market trends and execute simulated trades.",
        tech: ["Python", "AutoGPT", "Pandas", "Alpaca API"],
        github: "https://github.com/",
        demo: "https://demo.com"
      },
      { 
        title: "Computer Vision Quality Control", 
        category: "Data Science Projects", 
        desc: "Deep learning model trained to detect microscopic defects in manufacturing lines with 99.4% accuracy.",
        tech: ["PyTorch", "OpenCV", "YOLOv8", "CUDA"],
        github: "https://github.com/",
        demo: null
      },
      { 
        title: "Luseen E-Commerce Integration", 
        category: "Mobile Applications", 
        desc: "AI-driven recommendation engine integrated into native mobile e-commerce platforms to boost conversion rates.",
        tech: ["Swift", "Kotlin", "AWS Personalize", "Node.js"],
        github: null,
        demo: "https://demo.com"
      },
    ];
  
    return (
      <div className="w-full bg-neutralLight min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-4">Projects & Portfolio</h1>
            <p className="text-lg text-neutralDark max-w-2xl mx-auto">
              A showcase of AI integrations, RAG systems, autonomous agents, and software engineering solutions.
            </p>
          </div>
  
          {/* CATEGORY TABS (PDF Page 8) */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat, index) => (
              <button 
                key={index}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  index === 0 
                    ? "bg-deepBlue text-white" 
                    : "bg-white text-neutralDark hover:bg-aiPurple hover:text-white border border-gray-200 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
  
          {/* PROJECTS GRID (Fields matching PDF Page 8) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                
                {/* SCREENSHOT PLACEHOLDER */}
                <div className="h-64 bg-gradient-to-tr from-gray-100 to-gray-300 relative flex items-center justify-center border-b border-gray-100">
                  <span className="text-gray-400 font-medium">Project Screenshot Placeholder</span>
                  <span className="absolute top-4 right-4 bg-aiPurple text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    {project.category}
                  </span>
                </div>
  
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-deepBlue mb-3">{project.title}</h3>
                  <p className="text-neutralDark text-sm mb-6 flex-grow leading-relaxed">{project.desc}</p>
                  
                  {/* TECHNOLOGIES USED */}
                  <div className="mb-8">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="bg-neutralLight text-deepBlue px-3 py-1 rounded text-xs font-semibold border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
  
                  {/* LINKS (GitHub & Live Demo) */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-neutralDark hover:text-aiPurple transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        View Source
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-cyan hover:text-deepBlue transition-colors ml-auto">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
  
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </div>
    );
  }