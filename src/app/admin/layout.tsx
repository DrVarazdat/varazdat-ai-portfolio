import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  // Reusable classes for perfect consistency across all links
  const sectionTitle = "text-[11px] font-black text-cyan/70 uppercase tracking-widest px-4 mb-2 mt-8";
  const linkStyle = "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* PREMIUM, ORGANIZED ADMIN SIDEBAR */}
      <aside className="w-72 bg-deepBlue text-white flex flex-col h-screen overflow-y-auto hide-scrollbar border-r border-gray-800 shrink-0">
        
        <div className="p-6 border-b border-white/10 sticky top-0 bg-deepBlue z-10 flex flex-col gap-1">
          <h2 className="text-2xl font-black text-cyan tracking-wide">CMS Panel</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Dr. Varazdat Avetisyan</p>
        </div>

        <nav className="flex-1 p-4">
          
          {/* ================= MAIN MENU ================= */}
          <Link href="/admin" className={linkStyle}>
            <span className="text-lg">📊</span> Dashboard Home
          </Link>
          
          <p className={sectionTitle}>Website Architecture</p>
          <div className="space-y-1">
            <Link href="/admin/pages" className={linkStyle}>
              <span className="text-lg">📑</span> Navbar & Pages
            </Link>
            <Link href="/admin/homepage" className={linkStyle}>
              <span className="text-lg">🏠</span> Homepage Manager
            </Link>
          </div>

          {/* ================= LEARNING HUB ================= */}
          <p className={sectionTitle}>Learning Hub</p>
          <div className="space-y-1">
            <Link href="/admin/learn" className={linkStyle}>
              <span className="text-lg">🏗️</span> Learn Page Layout
            </Link>
            <Link href="/admin/learn/courses" className={linkStyle}>
              <span className="text-lg">🎓</span> Manage Courses
            </Link>
          </div>

          {/* ================= CONTENT ================= */}
          <p className={sectionTitle}>Ecosystem Content</p>
          <div className="space-y-1">
            <Link href="/admin/events" className={linkStyle}>
              <span className="text-lg">📅</span> Manage Events
            </Link>
            {/* We can add Projects, Blogs, Testimonials here later when we build them! */}
          </div>

          {/* ================= SETTINGS ================= */}
          <p className={sectionTitle}>Global Settings</p>
          <div className="space-y-1">
            <Link href="/admin/texts" className={linkStyle}>
              <span className="text-lg">📝</span> Texts & Images
            </Link>
            <Link href="/admin/settings" className={linkStyle}>
              <span className="text-lg">🎨</span> Theme Colors
            </Link>
          </div>

        </nav>

        {/* EXIT BUTTON */}
        <div className="p-4 border-t border-white/10 sticky bottom-0 bg-deepBlue">
          <Link href="/" target="_blank" className="block text-center px-4 py-3 text-sm font-bold text-white bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            Preview Website ↗
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>

      {/* Hide scrollbar for cleaner look */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}