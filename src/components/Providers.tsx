"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, useEffect } from "react";

// 1. Setup Language Context
type Language = "EN" | "AM" | "RU";
interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

const translations = {
  EN: {
    learn: "Learn", transform: "Transform", collaborate: "Collaborate", impact: "Impact", connect: "Connect",
    explore_courses: "Explore Courses", request_consultation: "Request a Consultation", contact_me: "Contact Me",
    learn_more: "Learn More →", view_timeline: "View Timeline →", see_impact: "See the Impact →",
    rights: "All rights reserved.", privacy: "Privacy Policy",
  },
  AM: {
    learn: "Սովորել", transform: "Վերափոխել", collaborate: "Համագործակցել", impact: "Ազդեցություն", connect: "Կապ",
    explore_courses: "Դիտել Դասընթացները", request_consultation: "Գրանցվել Խորհրդատվության", contact_me: "Կապվել Ինձ Հետ",
    learn_more: "Իմանալ Ավելին →", view_timeline: "Դիտել Ժամանակացույցը →", see_impact: "Տեսնել Ազդեցությունը →",
    rights: "Բոլոր իրավունքները պաշտպանված են:", privacy: "Գաղտնիության քաղաքականություն",
  },
  RU: {
    learn: "Учить", transform: "Трансформировать", collaborate: "Сотрудничать", impact: "Влияние", connect: "Связаться",
    explore_courses: "Изучить Курсы", request_consultation: "Запросить Консультацию", contact_me: "Связаться Со Мной",
    learn_more: "Узнать Больше →", view_timeline: "Посмотреть Хронологию →", see_impact: "Увидеть Влияние →",
    rights: "Все права защищены.", privacy: "Политика конфиденциальности",
  }
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("site_lang") as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("site_lang", newLang);
  };

  const t = (key: string) => translations[lang][key as keyof typeof translations["EN"]] || key;

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </LangContext.Provider>
  );
}

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within Providers");
  return context;
};