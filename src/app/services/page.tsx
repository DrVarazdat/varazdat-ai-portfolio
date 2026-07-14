import Link from "next/link";
import { Metadata } from "next";

// This automatically generates <title> and <meta> tags for Google for each specific keyword!
export async function generateMetadata({ params }: { params: Promise<{ seo_keyword: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Format "ai-consultant-armenia" to "AI Consultant Armenia"
  const formattedKeyword = resolvedParams.seo_keyword
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

export default async function SEOLandingPage({ params }: { params: Promise<{ seo_keyword: string }> }) {
  const resolvedParams = await params;
  
  // Format the URL slug into a readable string
  const formattedKeyword = resolvedParams.seo_keyword
    .split('-')
    .map(word => {
      if(word.toLowerCase() === 'ai') return 'AI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return (
    <div className="w-full bg-white">
      
      {/* HIGH-CONVERSION SEO HERO */}
      <section className="bg-deepBlue text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-cyan font-bold tracking-widest uppercase text-sm mb-4 block">
            Expert Services in Yerevan & Worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Leading <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-aiPurple to-cyan">{formattedKeyword}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Partner with a renowned AI Educator, Data Scientist, and CTO to elevate your organization&apos;s capabilities and strategy.
          </p>
          <Link href="#contact" className="px-10 py-4 bg-aiPurple text-white font-extrabold rounded-lg hover:bg-cyan hover:text-deepBlue transition-colors text-lg shadow-lg">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* VALUE PROPOSITION TEXT (Good for SEO word count) */}
      <section className="py-20 bg-neutralLight">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-deepBlue mb-6">Why Choose Dr. Avetisyan for {formattedKeyword}?</h2>
          <p className="text-neutralDark text-lg mb-6">
            When searching for reliable <strong>{formattedKeyword.toLowerCase()}</strong>, you need someone who bridges the gap between deep academic research and high-speed corporate execution.
          </p>
          <p className="text-neutralDark text-lg">
            With over 10 years of experience, multiple university affiliations, and a track record of building enterprise AI software, Dr. Varazdat Avetisyan provides unmatched expertise tailored precisely to your unique objectives.
          </p>
        </div>
      </section>

      {/* QUICK LINKS TO PROVE AUTHORITY */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-deepBlue mb-3">View Portfolio</h3>
            <p className="text-sm text-gray-600 mb-4">See actual implemented systems and RAG architectures.</p>
            <Link href="/projects" className="text-aiPurple font-bold hover:underline">Explore Projects &rarr;</Link>
          </div>
          <div className="p-8 border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-deepBlue mb-3">Corporate Training</h3>
            <p className="text-sm text-gray-600 mb-4">Upskill your entire development team seamlessly.</p>
            <Link href="/courses" className="text-aiPurple font-bold hover:underline">View Courses &rarr;</Link>
          </div>
          <div className="p-8 border border-gray-100 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-deepBlue mb-3">Academic Background</h3>
            <p className="text-sm text-gray-600 mb-4">Read about Dr. Avetisyan&apos;s PhD and University roles.</p>
            <Link href="/about" className="text-aiPurple font-bold hover:underline">Read Bio &rarr;</Link>
          </div>
        </div>
      </section>

    </div>
  );
}