"use client";
import Link from "next/link";
import { useLang } from "./Providers";

export function HomeButtons() {
  const { t } = useLang();
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
      <Link href="/learn" className="w-full sm:w-auto px-8 py-4 bg-aiPurple text-white rounded-full font-bold uppercase tracking-wide hover:bg-deepBlue transition-all shadow-xl text-center">
        {t('explore_courses')}
      </Link>
      <Link href="/transform" className="w-full sm:w-auto px-8 py-4 border-2 border-deepBlue bg-cyan  text-deepBlue rounded-full font-bold uppercase tracking-wide hover:bg-neutralLight transition-all text-center dark:border-white dark:text-white dark:hover:text-deepBlue">
        {t('request_consultation')}
      </Link>
    </div>
  );
}