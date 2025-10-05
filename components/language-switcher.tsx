"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Language } from "@/lib/i18n/translations";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "es" : "en";
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Change language"
    >
      <div className="relative">
        {/* Main Button */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 border-2 border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{language === "en" ? "🇺🇸" : "🇵🇪"}</span>
            <span className="font-bold text-sm tracking-wide">
              {language.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            {language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
            <div className="absolute top-full right-4 -mt-1">
              <div className="border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
      </div>
    </button>
  );
};
