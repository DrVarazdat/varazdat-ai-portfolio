import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Fetch real course data from the database!
  const { data: course } = await supabase.from('courses').select('*').eq('slug', resolvedParams.slug).single();

  if (!course) {
    return <div className="py-32 text-center text-2xl font-bold">Course Not Found</div>;
  }

  // Ensure JSON arrays exist safely
  const curriculum = course.curriculum || [];
  const prerequisites = course.prerequisites || [];
  const outcomes = course.outcomes || [];

  return (
    <div className="w-full bg-white dark:bg-[#020617] min-h-screen">
      
      {/* 1. OVERVIEW SECTION & HERO */}
      <section className="bg-deepBlue text-white py-20 border-b-4 border-aiPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/3">
            <Link href="/learn" className="text-cyan text-sm font-bold hover:underline mb-4 inline-block">&larr; Back to Learn Hub</Link>
            <div className="flex gap-3 mb-4 mt-2">
              <span className="bg-aiPurple px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{course.category} Level</span>
              <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{course.format}</span>
              {course.location && <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">📍 {course.location}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">{course.title}</h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {course.full_description || course.short_description || "Comprehensive overview of the course concepts and practical applications."}
            </p>
            <Link href="/connect" className="inline-block px-8 py-4 bg-cyan text-deepBlue font-extrabold rounded-lg hover:bg-white transition-colors shadow-lg uppercase tracking-wide">
              Enroll / Contact
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <div className="aspect-video bg-gray-900 rounded-xl border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden">
              {course.hero_image ? <img src={course.hero_image} className="object-cover w-full h-full" /> : <span className="text-gray-400 font-medium">No Image</span>}
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT FOR CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            
            {/* 2. LEARNING OUTCOMES */}
            {outcomes.length > 0 && (
              <div>
                <h2 className="text-3xl font-extrabold text-deepBlue dark:text-white mb-6">What You Will Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outcomes.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-neutralLight dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <span className="text-aiPurple font-bold">✓</span>
                      <span className="text-neutralDark dark:text-gray-300 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. CURRICULUM */}
            {curriculum.length > 0 && (
              <div>
                <h2 className="text-3xl font-extrabold text-deepBlue dark:text-white mb-6">Curriculum</h2>
                <div className="space-y-4">
                  {curriculum.map((mod: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-deepBlue dark:text-white mb-4">Module {idx + 1}: {mod.title}</h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-4 list-disc marker:text-cyan font-medium">
                        {(mod.lessons || []).map((lesson: string, lIdx: number) => (
                          <li key={lIdx}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 space-y-12">
            
            {/* 4. PREREQUISITES */}
            {prerequisites.length > 0 && (
              <div className="bg-neutralLight dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-deepBlue dark:text-white mb-4">Prerequisites</h3>
                <ul className="space-y-3 text-neutralDark dark:text-gray-300 text-sm">
                  {prerequisites.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-2"><span className="text-aiPurple font-bold">•</span> {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. INSTRUCTOR */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-aiPurple to-cyan rounded-full mx-auto p-1 mb-4">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                  <img src="/images/profile.jpg" className="object-cover w-full h-full" alt="Instructor" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-deepBlue dark:text-white">Dr. Varazdat Avetisyan</h3>
              <p className="text-xs font-bold text-aiPurple uppercase tracking-wide mb-4">Lead Instructor</p>
              <Link href="/about" className="text-cyan text-sm font-bold hover:underline mt-4 inline-block">Read Full Bio</Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}