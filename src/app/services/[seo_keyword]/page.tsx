import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ seo_keyword?: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // FIX: Provide a fallback string so it never crashes during the Vercel build!
  const keyword = resolvedParams?.seo_keyword || "expert-services";

  const formattedKeyword = keyword
    .split('-')
    .map(word => {
      if(word.toLowerCase() === 'ai') return 'AI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return {
    title: `${formattedKeyword} | Dr. Varazdat Avetisyan`,
    description: `Expert ${formattedKeyword} services. Partner with Dr. Varazdat Avetisyan to transform your business or academic path today.`,
  };
}

export default async function SEOLandingPage({ params }: { params: Promise<{ seo_keyword?: string }> }) {
  const resolvedParams = await params;
  
  // FIX: Provide a fallback string here as well!
  const keyword = resolvedParams?.seo_keyword || "expert-services";

  const formattedKeyword = keyword
    .split('-')
    .map(word => {
      if(word.toLowerCase() === 'ai') return 'AI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return (
    <div className="w-full bg-white dark:bg-[#020617] min-h-screen transition-colors duration-300">
      <section className="bg-deepBlue text-white py-24 dark:bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-cyan font-bold tracking-widest uppercase text-sm mb-4 block">
            Expert Services in Yerevan & Worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Leading <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-aiPurple to-cyan">{formattedKeyword}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Partner with a renowned AI Educator, Data Scientist, and CTO to elevate your organization's capabilities and strategy.
          </p>
          <Link href="/connect" className="px-10 py-4 bg-aiPurple text-white font-extrabold rounded-lg hover:bg-cyan hover:text-deepBlue transition-colors text-lg shadow-lg uppercase tracking-wide">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      <section className="py-20 bg-neutralLight dark:bg-[#0f172a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-deepBlue dark:text-white mb-6">Why Choose Dr. Avetisyan for {formattedKeyword}?</h2>
          <p className="text-neutralDark dark:text-gray-300 text-lg mb-6 leading-relaxed">
            When searching for reliable <strong>{formattedKeyword.toLowerCase()}</strong>, you need someone who bridges the gap between deep academic research and high-speed corporate execution.
          </p>
          <p className="text-neutralDark dark:text-gray-300 text-lg leading-relaxed">
            With over 10 years of experience, multiple university affiliations, and a track record of building enterprise AI software, Dr. Varazdat Avetisyan provides unmatched expertise tailored precisely to your unique objectives.
          </p>
        </div>
      </section>
    </div>
  );
}