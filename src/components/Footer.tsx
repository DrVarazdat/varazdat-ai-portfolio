"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLang } from "./Providers";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Theme and Language Hooks
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // Prevents hydration mismatch

  return (
    <footer className="bg-deepBlue text-white py-12 border-t-4 border-aiPurple dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Dr. Varazdat Avetisyan</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Bridging Research, Education, and Industry Through Intelligent Technologies.
            </p>
          </div>

          {/* Quick Links (Translated!) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/learn" className="hover:text-cyan transition-colors">{t('learn')}</Link></li>
              <li><Link href="/transform" className="hover:text-cyan transition-colors">{t('transform')}</Link></li>
              <li><Link href="/collaborate" className="hover:text-cyan transition-colors">{t('collaborate')}</Link></li>
              <li><Link href="/impact" className="hover:text-cyan transition-colors">{t('impact')}</Link></li>
            </ul>
          </div>

          {/* Settings Toggles (Theme & Language) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Settings</h4>
            <div className="flex flex-col gap-4">
              
              {/* Language Dropdown */}
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as "EN" | "AM" | "RU")}
                className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan cursor-pointer"
              >
                <option value="EN" className="text-black">🇬🇧 English</option>
                <option value="AM" className="text-black">🇦🇲 Հայերեն</option>
                <option value="RU" className="text-black">🇷🇺 Русский</option>
              </select>

              {/* Dark/Light Mode Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-3 bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
                >
                  {theme === "dark" ? (
                    <><span>☀️</span> Light Mode</>
                  ) : (
                    <><span>🌙</span> Dark Mode</>
                  )}
                </button>
              )}
              
            </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; {currentYear} Dr. Varazdat Avetisyan. {t('rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/connect" className="hover:text-white transition-colors">{t('connect')}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t('privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}