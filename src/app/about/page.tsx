import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  // ================= DATA ARRAYS FROM BOTH VERSIONS =================
  
  // From Version 2 (Brand DNA & Values)
  const coreValues = [
    { title: "Innovation", desc: "Pushing boundaries in both academic research and corporate technology." },
    { title: "Accessibility", desc: "Making complex AI concepts understandable for everyone, not just engineers." },
    { title: "Practical Impact", desc: "Bridging the gap between theoretical models and real-world ROI." },
    { title: "Responsible AI", desc: "Advocating for ethical, safe, and human-centric AI development." },
  ];

  // From Version 1 (Hard Facts & CV Data)
  const expertise = [
    "Artificial Intelligence", "Generative AI", "Machine Learning", 
    "Deep Learning", "Data Science", "NLP", "Computer Vision", 
    "Prompt Engineering", "AI Agents", "Software Engineering"
  ];

  const researchInterests = [
    "Generative AI in Education", "AI Adoption", "Human-AI Collaboration", 
    "AI for Healthcare", "AI for Business", "AI in E-commerce"
  ];

  const universities = [
    { name: "UFAR (French University in Armenia)", role: "University Professor" },
    { name: "Polytechnic University (NPUA)", role: "University Professor" },
    { name: "GSU (Gavar State University)", role: "University Professor" },
  ];

  const industryExperience = [
    { title: "CTO & Co-Founder", company: "Luseen Mobile", desc: "Leading technical strategy, software engineering, and AI integration for mobile applications." },
    { title: "AI Consultant", company: "Various Tech Companies", desc: "Advising enterprises on digital transformation, AI adoption, and generative AI workflows." },
    { title: "Data Scientist", company: "Industry Projects", desc: "Designing machine learning models and analyzing complex datasets to drive business decisions." },
  ];

  const awards = [
    { title: "Excellence in AI Education", year: "2023", issuer: "Armenian Tech Foundation" },
    { title: "Top Researcher in Human-AI Collaboration", year: "2022", issuer: "Global AI Summit" },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* ================= PART 1: HERO & VISION ================= */}
      <section className="bg-deepBlue py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="w-full md:w-1/3">
            <div className="aspect-[4/5] bg-gradient-to-tr from-aiPurple to-cyan rounded-3xl p-1 shadow-2xl">
              <div className="w-full h-full bg-neutralLight rounded-3xl overflow-hidden relative">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Dr. Varazdat Avetisyan" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <span className="text-cyan font-bold tracking-widest uppercase text-sm mb-4 block">The Person Behind The Tech</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">My Mission is to Accelerate AI Adoption.</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              "To help individuals, organizations, and institutions understand, adopt, and apply Artificial Intelligence by translating knowledge between research, education, and real-world implementation."
            </p>
            <div className="flex gap-4">
              <Link href="/connect" className="px-8 py-3 bg-aiPurple text-white font-bold rounded-lg hover:bg-cyan hover:text-deepBlue transition-colors uppercase tracking-wide shadow-lg">
                Connect With Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PART 2: THE JOURNEY (Story) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-8">My Journey (And the bumps along the way)</h2>
          <div className="prose prose-lg max-w-none text-neutralDark space-y-6">
            <p>
              My path into Artificial Intelligence wasn't just a straight line of successes. It started with a deep curiosity about how machines could learn, leading me to pursue a PhD in Computer Engineering.
            </p>
            <p>
              Early on, I realized a massive gap existed. <strong>Academia was building incredible theories, but businesses had no idea how to actually use them.</strong> Startups were struggling to deploy models, and students were learning concepts they couldn't apply.
            </p>
            <div className="bg-neutralLight p-8 rounded-2xl border-l-4 border-aiPurple my-8 shadow-sm">
              <h3 className="text-xl font-bold text-deepBlue mb-2">Learning Through Failure</h3>
              <p className="text-sm leading-relaxed">
                Before successfully co-founding Luseen Mobile as CTO, I spent months building machine learning architectures that were mathematically perfect but completely useless for actual users. It taught me the most valuable lesson of my career: <strong>Technology only matters if it solves a human problem.</strong>
              </p>
            </div>
            <p>
              Today, I don't just write code or publish papers. I act as a translator. I help universities modernize their curriculum, I help executives understand Generative AI without the jargon, and I build systems that actually work in production.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ADDED: MULTI-CV DOWNLOAD STRIP ================= */}
      <section className="bg-aiPurple text-white py-12 border-y-4 border-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold mb-2">Looking for formal credentials?</h2>
            <p className="text-white/80 font-medium">Download the CV version most relevant to your specific needs.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/cv-academic.pdf" target="_blank" className="px-6 py-3 bg-white text-aiPurple font-bold rounded-lg hover:bg-neutralLight transition-colors shadow-md flex items-center justify-center gap-2">
              <span>🎓</span> Academic CV
            </a>
            <a href="/cv-corporate.pdf" target="_blank" className="px-6 py-3 bg-deepBlue text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
              <span>💼</span> Corporate Resume
            </a>
          </div>
        </div>
      </section>

      {/* ================= PART 3: EXPERTISE CARDS (CV Data) ================= */}
      <section className="bg-neutralLight py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-10 text-center">Core Areas of Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {expertise.map((skill, index) => (
              <div key={index} className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-aiPurple transition-all cursor-default flex items-center justify-center h-24">
                <span className="font-bold text-deepBlue text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PART 4: EDUCATION & INDUSTRY EXP (CV Data) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT COLUMN: EDUCATION */}
          <div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-8 flex items-center gap-3">
              <span className="text-3xl">🎓</span> Education & Training
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-aiPurple pl-4">
                <h3 className="text-xl font-bold text-deepBlue">PhD in Computer Engineering</h3>
                <p className="text-neutralDark mt-1">Terminal academic degree focusing on advanced computational systems and engineering.</p>
              </div>
              <div className="border-l-4 border-gray-200 pl-4">
                <h3 className="text-xl font-bold text-deepBlue">Relevant Certifications</h3>
                <p className="text-neutralDark mt-1">Certified across multiple AI, Machine Learning, and Data Science platforms.</p>
              </div>
              <div className="border-l-4 border-gray-200 pl-4">
                <h3 className="text-xl font-bold text-deepBlue">Professional Training</h3>
                <p className="text-neutralDark mt-1">Continuous educational development in pedagogical methods and emerging technologies.</p>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-deepBlue mt-16 mb-8 flex items-center gap-3">
              <span className="text-3xl">🔬</span> Research Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {researchInterests.map((interest, index) => (
                <span key={index} className="px-4 py-2 bg-neutralLight text-deepBlue font-bold rounded-lg border border-gray-200 text-sm hover:border-cyan transition-colors">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: EXPERIENCE */}
          <div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-8 flex items-center gap-3">
              <span className="text-3xl">💼</span> Industry Experience
            </h2>
            <div className="space-y-6 mb-12">
              {industryExperience.map((exp, index) => (
                <div key={index} className="bg-neutralLight p-6 rounded-2xl border border-gray-100 hover:border-cyan transition-colors">
                  <h3 className="text-lg font-bold text-deepBlue">{exp.title}</h3>
                  <p className="text-aiPurple font-bold text-sm mb-2">{exp.company}</p>
                  <p className="text-neutralDark text-sm leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-extrabold text-deepBlue mb-8 flex items-center gap-3">
              <span className="text-3xl">🏛️</span> Academic Affiliations
            </h2>
            <div className="space-y-4">
              {universities.map((uni, index) => (
                <div key={index} className="flex items-center gap-4 bg-neutralLight p-4 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-aiPurple shadow-sm border border-gray-200">
                    {uni.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-deepBlue">{uni.name}</h4>
                    <p className="text-sm text-neutralDark">{uni.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= PART 5: PHILOSOPHY & MOTIVATION (Story) ================= */}
      <section className="py-24 bg-neutralLight border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-6">Teaching Philosophy</h2>
            <p className="text-neutralDark text-lg leading-relaxed mb-6">
              I believe in building confidence through clarity, not complexity. My goal is to never overwhelm students or clients with jargon. Instead, I break down advanced Deep Learning and AI Agent concepts into intuitive, interactive blocks.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative">
              <span className="text-4xl text-cyan absolute top-2 left-4 opacity-30">"</span>
              <p className="italic text-gray-600 mb-4 relative z-10 pt-2">Dr. Avetisyan is the only professor who made Neural Networks click for me. He bridges the gap between complex math and actual code brilliantly.</p>
              <p className="font-bold text-deepBlue text-sm relative z-10">— Aram S., Former Student</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-deepBlue mb-6">Research Motivation</h2>
            <p className="text-neutralDark text-lg leading-relaxed mb-6">
              My current research focuses heavily on <strong>Human-AI Collaboration</strong> and <strong>Generative AI in Education</strong>. I am driven by the belief that AI should not replace human creativity, but act as an exoskeleton for the mind. 
            </p>
            <p className="text-neutralDark text-lg leading-relaxed">
              By researching how students and professionals interact with Large Language Models, I aim to design systems that enhance our learning curves rather than bypass them.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PART 6: CORE VALUES & AWARDS ================= */}
      <section className="py-24 bg-deepBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Core Values</h2>
            <p className="text-gray-300">The principles that guide my academic, corporate, and personal work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all text-center">
                <h3 className="text-xl font-bold text-cyan mb-4">{value.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Awards integrated into the dark section */}
          <div className="border-t border-white/20 pt-16">
            <h2 className="text-3xl font-extrabold mb-10 text-center">Awards & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {awards.map((award, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{award.title}</h3>
                    <p className="text-sm text-gray-400">{award.issuer}</p>
                  </div>
                  <span className="text-cyan font-black text-xl">{award.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= PART 7: CALL TO ACTION ================= */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-3xl font-extrabold text-deepBlue mb-6">Ready to work together?</h2>
        <p className="text-neutralDark mb-10 max-w-2xl mx-auto text-lg">
          Whether you need a customized corporate training session, an academic collaborator, or a keynote speaker, I'd love to connect.
        </p>
        <Link href="/connect" className="inline-block px-10 py-4 bg-deepBlue text-white font-extrabold rounded-xl hover:bg-aiPurple transition-colors shadow-lg uppercase tracking-wide">
          Get in Touch
        </Link>
      </section>

    </div>
  );
}