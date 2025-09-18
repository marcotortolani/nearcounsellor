'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import pt from '@/locales/pt.json'

type Language = 'en' | 'es' | 'pt'

type Translations = {
  [key: string]: string
}

const translations: { [key in Language]: Translations } = {
  en,
  es,
  pt,
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // This runs only on the client
    const storedLang = localStorage.getItem('language') as Language
    if (storedLang && ['en', 'es', 'pt'].includes(storedLang)) {
      setLanguage(storedLang)
    } else {
      const browserLang = navigator.language.split('-')[0] as Language
      if (['en', 'es', 'pt'].includes(browserLang)) {
        setLanguage(browserLang)
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// 'use client'

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import en from '@/locales/en.json';
// import es from '@/locales/es.json';
// import pt from '@/locales/pt.json';

// type Language = 'en' | 'es' | 'pt';

// type Translations = {
//     [key: string]: string;
// };

// const translations: { [key in Language]: Translations } = {
//     en,
//     es,
//     pt,
// };

// interface LanguageContextType {
//     language: Language;
//     setLanguage: (language: Language) => void;
//     t: (key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [language, setLanguage] = useState<Language>('en');

//     useEffect(() => {
//         const browserLang = navigator.language.split('-')[0] as Language;
//         if (['en', 'es', 'pt'].includes(browserLang)) {
//             setLanguage(browserLang);
//         }
//     }, []);

//     const t = (key: string): string => {
//         return translations[language][key] || key;
//     };

//     return (
//         <LanguageContext.Provider value={{ language, setLanguage, t }}>
//             {children}
//         </LanguageContext.Provider>
//     );
// };

// export const useLanguage = () => {
//     const context = useContext(LanguageContext);
//     if (context === undefined) {
//         throw new Error('useLanguage must be used within a LanguageProvider');
//     }
//     return context;
// };
