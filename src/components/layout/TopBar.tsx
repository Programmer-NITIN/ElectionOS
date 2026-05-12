"use client";

import { Search, Bell, History, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useCivicStore, SUPPORTED_LANGUAGES } from "@/store";

export default function TopBar() {
  const { citizenMode, setCitizenMode, selectedLanguage, setSelectedLanguage } = useCivicStore();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);

  return (
    <header className="flex justify-between items-center w-full px-6 md:px-10 h-16 bg-surface/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      {/* Mobile Brand */}
      <div className="md:hidden">
        <h2 className="font-geist text-headline-sm font-extrabold tracking-tighter text-primary">
          ElectionOS
        </h2>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex items-center gap-4 flex-1">
        <div className="flex items-center bg-surface-container h-10 px-4 rounded-lg border border-white/10 w-80 focus-within:border-primary-fixed-dim transition-colors">
          <Search size={16} className="text-on-surface-variant mr-2" />
          <input
            type="text"
            placeholder="Search parameters..."
            className="bg-transparent border-none text-on-surface font-mono text-data-mono focus:ring-0 focus:outline-none w-full placeholder:text-on-surface-variant/50"
          />
        </div>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* ═══ Citizen Mode Toggle ═══ */}
        <button
          onClick={() => setCitizenMode(!citizenMode)}
          className="relative flex items-center h-8 rounded-full border border-white/10 bg-surface-container overflow-hidden select-none"
          title={citizenMode ? "Switch to Analyst Mode" : "Switch to Citizen Mode"}
        >
          <div
            className={`px-3 py-1 text-[10px] font-mono tracking-wider transition-all duration-300 z-10 ${
              !citizenMode ? "text-on-primary" : "text-on-surface-variant/50"
            }`}
          >
            Analyst
          </div>
          <div
            className={`px-3 py-1 text-[10px] font-mono tracking-wider transition-all duration-300 z-10 ${
              citizenMode ? "text-on-primary" : "text-on-surface-variant/50"
            }`}
          >
            Citizen
          </div>
          <motion.div
            className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-primary-fixed"
            animate={{ left: citizenMode ? "calc(50% + 1px)" : "2px" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </button>

        {/* ═══ Language Selector ═══ */}
        <div ref={langRef} className="relative hidden md:block">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 bg-surface-container hover:border-primary-fixed/30 transition-colors"
          >
            <Globe size={14} className="text-on-surface-variant" />
            <span className="text-[11px] font-mono text-on-surface">{currentLang?.nativeLabel}</span>
            <ChevronDown size={12} className="text-on-surface-variant" />
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                className="absolute right-0 top-10 w-44 bg-surface-container-lowest/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex justify-between items-center px-4 py-2.5 text-left hover:bg-surface-variant/30 transition-colors ${
                      selectedLanguage === lang.code
                        ? "text-primary-fixed bg-primary-fixed/5"
                        : "text-on-surface-variant"
                    }`}
                  >
                    <span className="text-sm">{lang.nativeLabel}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant/50">{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-3 text-on-surface-variant">
          <button className="hover:text-primary-fixed transition-colors duration-300 p-1 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full" />
          </button>
          <button className="hover:text-primary-fixed transition-colors duration-300 p-1">
            <History size={20} />
          </button>
        </div>

        <div className="h-6 w-px bg-white/10 hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-primary/30 px-3 py-1 rounded bg-primary/5 font-mono text-data-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            2024
          </div>
        </div>
      </div>
    </header>
  );
}
