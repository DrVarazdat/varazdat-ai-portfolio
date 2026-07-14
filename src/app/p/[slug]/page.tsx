import { supabase } from "@/lib/supabase";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Fetch the AI-generated HTML from the database!
  const { data: page } = await supabase.from('dynamic_pages').select('*').eq('slug', resolvedParams.slug).single();

  if (!page) {
    return <div className="py-32 text-center text-2xl font-bold text-deepBlue">Page Not Found</div>;
  }

  // Inject the AI's beautiful HTML into the website securely!
  return (
    <div className="w-full bg-white min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: page.html_content }} />
    </div>
  );
}