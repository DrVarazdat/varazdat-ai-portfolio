"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./Providers";
import { supabase } from "@/lib/supabase"; 

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [navLinks, setNavLinks] = useState<any[]>([]);

  useEffect(() => {
    async function loadLinks() {
      const { data } = await supabase.from('navbar_links').select('*').order('sort_order', { ascending: true });
      if (data && data.length > 0) setNavLinks(data);
      else setNavLinks([
        { id: '1', title: 'Learn', href: '/learn' },
        { id: '2', title: 'Transform', href: '/transform' },
        { id: '3', title: 'Collaborate', href: '/collaborate' },
        { id: '4', title: 'Impact', href: '/impact' }
      ]);
    }
    loadLinks();
  }, []);

  const getTranslatedName = (title: string) => {
    const translationKey = title.toLowerCase();
    const translated = t(translationKey);
    return translated === translationKey ? title : translated;
  };

  return (
    // FIX: Forced the Navbar to always be the premium deepBlue color with white text!
    <nav className="sticky top-0 z-50 w-full bg-deepBlue border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="text-xl md:text-2xl font-extrabold text-white hover:text-cyan transition-colors">
              Dr. Varazdat Avetisyan
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  pathname.startsWith(link.href) 
                    ? "text-cyan border-b-2 border-cyan pb-1" 
                    : "text-gray-300 hover:text-cyan"
                }`}
              >
                {getTranslatedName(link.title)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/connect" className="bg-cyan text-deepBlue px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md">
              {t('connect')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}