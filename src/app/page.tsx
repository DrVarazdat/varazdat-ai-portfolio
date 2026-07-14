import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase"; 

export default async function Home() {
  
  // Fetch active blocks, ordered by sort_order
  const { data: blocks } = await supabase
    .from('homepage_blocks')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (!blocks || blocks.length === 0) return (
    <div className="p-20 text-center font-bold text-red-500">
      Homepage database is empty. Please go to the Admin Dashboard and click "Inject Original Content".
    </div>
  );

  return (
    <div className="w-full bg-white flex flex-col items-center">
      
      {blocks.map((block) => {
        const content = block.content || {};

        // ================= SECTION 1: HERO =================
        if (block.section_id === 'hero') {
          return (
            <section key={block.id} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center gap-16 relative">
              <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-aiPurple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-40 w-96 h-96 bg-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              </div>

              <div className="w-full md:w-3/5 flex flex-col gap-6 text-center md:text-left z-10">
                <h2 className="text-aiPurple font-bold tracking-widest uppercase text-sm mb-2">
                  {content.subheadline}
                </h2>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-deepBlue">
                  {content.headline}
                </h1>
                
                <p className="text-lg md:text-xl text-neutralDark font-semibold flex flex-wrap justify-center md:justify-start gap-3 uppercase tracking-wide">
                  {(content.tags || []).map((tag: string, i: number) => (
                    <span key={i} className="flex items-center gap-3">
                      <span>{tag}</span>
                      {i !== content.tags.length - 1 && <span className="text-cyan">•</span>}
                    </span>
                  ))}
                </p>
                {/* REPLACE <HomeButtons /> WITH THIS: */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8 w-full">
                  {(content.buttons || []).map((btn: any, i: number) => {
                    
                    // Primary style (Purple background)
                    if (btn.style === "primary") {
                      return (
                        <Link key={i} href={btn.link} className="w-full sm:w-auto px-8 py-4 bg-aiPurple text-white rounded-full font-bold uppercase tracking-wide hover:bg-deepBlue transition-all shadow-xl text-center">
                          {btn.text}
                        </Link>
                      );
                    }
                    
                    // Secondary style (Cyan background / Outline)
                    return (
                      <Link key={i} href={btn.link} className="w-full sm:w-auto px-8 py-4 border-2 border-deepBlue bg-cyan text-deepBlue rounded-full font-bold uppercase tracking-wide hover:bg-neutralLight transition-all text-center dark:border-white dark:text-white dark:hover:text-deepBlue">
                        {btn.text}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="w-full md:w-2/5 flex justify-center z-10">
                <div className="w-72 h-72 md:w-[450px] md:h-[450px] bg-gradient-to-tr from-aiPurple to-cyan rounded-full p-1 shadow-2xl relative">
                  <div className="w-full h-full bg-white rounded-full border-8 border-white overflow-hidden relative">
                    <Image 
                      src={content.image || "/images/hero.png"}
                      alt="Dr. Varazdat Avetisyan" 
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // ================= SECTION 2: MEET DR. VARAZDAT =================
        if (block.section_id === 'bio') {
          return (
            <section key={block.id} className="w-full bg-neutralLight py-24">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-deepBlue mb-8">{content.title}</h2>
                <p className="text-xl text-neutralDark leading-relaxed mb-10 font-medium">
                  {content.bio}
                </p>
                <Link href={content.linkUrl || "/about"} className="inline-flex items-center text-aiPurple font-bold uppercase tracking-widest hover:text-deepBlue transition-colors group">
                  {content.linkText} <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </section>
          );
        }

        // ================= SECTION 3: WHAT SETS HIM APART =================
        if (block.section_id === 'differentiators') {
          return (
            <section key={block.id} className="w-full py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-extrabold text-deepBlue mb-4">{content.title}</h2>
                  <p className="text-lg text-neutralDark">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(content.cards || []).map((card: any, i: number) => {
                    
                    // IF IT'S THE TIMELINE / MAP CARD
                    if (card.type === "timeline") {
                      return (
                        <div key={i} className="bg-deepBlue text-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center pointer-events-none"></div>
                          <h3 className="text-2xl font-bold mb-6 border-b-2 border-cyan pb-4 inline-block z-10 text-white">{card.title}</h3>
                          <p className="text-gray-300 mb-6 z-10 text-sm leading-relaxed">{card.desc}</p>
                          
                          <div className="flex-grow z-10 border-l border-cyan ml-2 pl-4 space-y-4 mb-6">
                            {(card.events || []).map((evt: any, idx: number) => (
                              <div key={idx}>
                                <p className="text-xs font-bold text-cyan">{evt.year}</p>
                                <p className="text-sm font-semibold">{evt.name}</p>
                              </div>
                            ))}
                          </div>
                          <Link href={card.linkUrl} className="text-cyan font-bold hover:text-white transition-colors z-10">{card.linkText}</Link>
                        </div>
                      )
                    }

                    // NORMAL BULLET CARDS
                    return (
                      <div key={i} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col">
                        <h3 className="text-2xl font-bold text-deepBlue mb-6 border-b-2 border-aiPurple pb-4 inline-block">{card.title}</h3>
                        <ul className="space-y-3 mb-8 flex-grow text-neutralDark dark:text-gray-300">
                          {(card.bullets || []).map((bullet: string, j: number) => (
                            <li key={j} className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-cyan"></span> {bullet}</li>
                          ))}
                        </ul>
                        <Link href={card.linkUrl} className="text-aiPurple font-bold hover:underline">{card.linkText}</Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ================= SECTION 4: AREAS OF EXPERTISE =================
        if (block.section_id === 'expertise') {
          return (
            <section key={block.id} className="w-full py-24 bg-neutralLight">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-extrabold text-deepBlue mb-4">{content.title}</h2>
                  <p className="text-lg text-neutralDark">{content.subtitle}</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                  {(content.tags || []).map((skill: string, i: number) => (
                    <div key={i} className="px-6 py-4 bg-white text-deepBlue font-bold rounded-xl shadow-sm border border-gray-200 hover:border-aiPurple hover:shadow-md hover:-translate-y-1 transition-all text-center cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // ================= SECTION 5: TRUST & LOGOS =================
        if (block.section_id === 'trust') {
          return (
            <section key={block.id} className="w-full py-24 bg-deepBlue text-white border-t-8 border-aiPurple">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
                  {(content.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="text-4xl md:text-6xl font-black text-cyan mb-2">{stat.value}</span>
                      <span className="text-sm md:text-base font-bold text-gray-300 uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{content.partnersTitle}</p>
                  <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory hide-scrollbar justify-start md:justify-center items-center">
                    {(content.partners || []).map((partner: string, i: number) => (
                      <div key={i} className="snap-center shrink-0 opacity-50 hover:opacity-100 hover:text-cyan transition-all text-xl font-bold cursor-default">
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // ================= SECTION 6: CHOOSE YOUR JOURNEY =================
        if (block.section_id === 'journey') {
          return (
            <section key={block.id} className="w-full py-32 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-deepBlue mb-6">{content.title}</h2>
                  <p className="text-xl text-neutralDark max-w-2xl mx-auto">
                    {content.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(content.cards || []).map((card: any, i: number) => (
                    <div key={i} className="bg-neutralLight p-10 rounded-3xl flex flex-col h-full border border-gray-100 hover:border-cyan hover:shadow-2xl transition-all group">
                      <h3 className="text-3xl font-extrabold text-deepBlue mb-4 group-hover:text-aiPurple transition-colors">{card.title}</h3>
                      <p className="text-lg text-neutralDark mb-10 flex-grow leading-relaxed">{card.desc}</p>
                      <Link 
                        href={card.link || "#"} 
                        className="inline-flex items-center justify-between w-full p-6 bg-white text-deepBlue font-bold rounded-xl shadow-sm group-hover:bg-deepBlue group-hover:text-white transition-all text-lg"
                      >
                        {card.btnText}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // ================= SECTION 7: AI CUSTOM BLOCKS =================
        if (block.is_custom && content.ai_html) {
          
          // Clean up dirty AI outputs (remove literal "\n" strings)
          const cleanHtml = content.ai_html
            .replace(/\\n/g, '') 
            .replace(/\n/g, '')  
            .replace(/\\"/g, '"'); 

          return (
            <section key={block.id} className="w-full py-16 bg-white border-y border-gray-100 overflow-hidden">
              {/* 
                1. Removed 'max-w-7xl' so our container can stretch to the edges.
                2. Added 'px-4 lg:px-12' so it leaves just a tiny bit of breathing room on the sides.
                3. Added '[&>div]:!max-w-none' and '[&>section]:!max-w-none' to FORCE the AI's internal code to stretch out and ignore its own width limits.
              */}
              <div 
                className="w-full px-4 md:px-8 lg:px-12 mx-auto text-neutralDark [&>div]:!max-w-none [&>div]:!w-full [&>section]:!max-w-none [&>section]:!w-full [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:text-deepBlue [&>h1]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-deepBlue [&>h2]:mb-4 [&>p]:text-lg [&>p]:mb-6 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>button]:bg-deepBlue [&>button]:text-white [&>button]:px-6 [&>button]:py-3 [&>button]:rounded-xl [&>button]:font-bold [&>table]:w-full [&>table]:text-left [&>table]:mt-6 [&>table>thead>tr>th]:border-b-2 [&>table>thead>tr>th]:pb-3 [&>table>thead>tr>th]:text-deepBlue [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:py-3" 
                dangerouslySetInnerHTML={{ __html: cleanHtml }} 
              />
            </section>
          );
        }

        return null;
      })}

      {/* Hide Scrollbar for Logos */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}