import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Varazdat Avetisyan | AI Educator & Data Scientist",
  description: "Transforming Education and Business Through Artificial Intelligence.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  
  const primaryColor = settings?.primary_color || "#0F172A";
  const secondaryColor = settings?.secondary_color || "#6D28D9";
  const accentColor = settings?.accent_color || "#06B6D4";

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} transition-colors duration-300 dark:bg-[#020617] dark:text-gray-100`}
        style={{
          '--primary': primaryColor,
          '--secondary': secondaryColor,
          '--accent': accentColor,
        } as React.CSSProperties}
      >
        <Providers>
          <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}