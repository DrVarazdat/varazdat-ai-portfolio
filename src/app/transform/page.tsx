import Link from "next/link";
import Image from "next/image";

export default function TransformHub() {
  // Services (PDF Page 42)
  const services = [
    { title: "AI Consulting", icon: "🧠", desc: "Strategic advisory for enterprises looking to integrate AI into their workflows securely and efficiently." },
    { title: "Corporate Training", icon: "📈", desc: "Customized upskilling programs to prepare your workforce, from engineers to executives, for the AI era." },
    { title: "Digital Transformation", icon: "⚙️", desc: "End-to-end strategy for adopting Generative AI and modern data architectures across your organization." }
  ];

  // Industries Served (PDF Page 42)
  const industries = ["Finance & Banking", "Healthcare Tech", "E-commerce", "Higher Education", "Telecommunications", "Software Development"];

  // Clickable Partners Data (Image Placeholders & Links)
  const partnerLogos = [
    { name: "UFAR", img: "/images/partner1.png", link: "https://www.instagram.com/" },
    { name: "FAST", img: "/images/partner2.png", link: "https://fast.foundation" },
    { name: "SASTIC", img: "/images/partner1.png", link: "https://sastic.org" },
    { name: "Luseen", img: "/images/partner2.png", link: "https://luseen.com" },
    { name: "Picsart", img: "/images/partner1.png", link: "https://picsart.com" },
    { name: "Microsoft", img: "/images/partner2.png", link: "https://microsoft.com" }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-deepBlue text-white py-24 border-b-8 border-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-2/3">
            <span className="text-cyan font-bold tracking-widest uppercase text-sm mb-4 block">Corporate & Enterprise Solutions</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">Transform Your Organization</h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Bridge the gap between AI hype and real-world ROI. Partner with Dr. Varazdat Avetisyan to build robust AI adoption strategies and upskill your teams.
            </p>
            <Link href="/connect" className="inline-block px-10 py-4 bg-cyan text-deepBlue font-extrabold uppercase tracking-wide rounded-xl hover:bg-white transition-all shadow-xl hover:-translate-y-1">
              Request a Consultation
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-2xl p-8 text-center">
              <p className="text-lg font-medium text-gray-300 italic">"He gets it. He understands my needs, and he is the right professional to help me achieve my goals." <br/><br/> <span className="text-sm font-bold text-cyan not-italic">— Core Brand Promise</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES (PDF Page 42) */}
      <section className="py-24 bg-neutralLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-deepBlue mb-4">How We Can Work Together</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:border-cyan transition-all hover:shadow-xl">
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-deepBlue mb-4">{service.title}</h3>
                <p className="text-neutralDark leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES & SUCCESS STORIES (PDF Page 42) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-8">Industries Served</h2>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind, i) => (
                <span key={i} className="px-5 py-3 bg-neutralLight text-deepBlue font-bold rounded-lg border border-gray-200">
                  {ind}
                </span>
              ))}
            </div>
            
            <div className="mt-12">
              <h2 className="text-3xl font-extrabold text-deepBlue mb-8">Partner Companies</h2>
              
              {/* REWRITTEN LOGO SECTION */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {partnerLogos.map((partner, i) => (
                  <a 
                    key={i} 
                    href={partner.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="h-24 bg-neutralLight rounded-xl border border-gray-200 flex items-center justify-center p-4 hover:border-cyan hover:shadow-md transition-all group relative overflow-hidden block"
                  >
                    <Image 
                      src={partner.img} 
                      alt={partner.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  </a>
                ))}
              </div>
              {/* END OF REWRITTEN LOGO SECTION */}

            </div>
          </div>

          <div className="bg-deepBlue p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-aiPurple rounded-full filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-3xl font-extrabold mb-8 relative z-10 text-white">Success Stories</h2>
            <div className="space-y-6 relative z-10">
              <div className="border-l-4 border-cyan pl-6">
                <h3 className="text-xl font-bold mb-2">Luseen Mobile AI Integration</h3>
                <p className="text-gray-300 text-sm mb-2">Implemented a scalable recommendation engine increasing user retention by 40%.</p>
                <Link href="/impact" className="text-cyan text-sm font-bold hover:underline">Read Case Study →</Link>
              </div>
              <div className="border-l-4 border-cyan pl-6">
                <h3 className="text-xl font-bold mb-2">Enterprise RAG Deployment</h3>
                <p className="text-gray-300 text-sm mb-2">Built an internal knowledge-base AI for a top-tier finance firm securely handling sensitive data.</p>
                <Link href="/impact" className="text-cyan text-sm font-bold hover:underline">Read Case Study →</Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}