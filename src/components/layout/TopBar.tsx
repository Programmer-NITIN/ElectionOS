"use client";

import { Search, Bot, Bell, History } from "lucide-react";

export default function TopBar() {
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
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <button className="hover:text-primary-fixed transition-colors duration-300 p-1">
            <Bot size={20} />
          </button>
          <button className="hover:text-primary-fixed transition-colors duration-300 p-1 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full" />
          </button>
          <button className="hover:text-primary-fixed transition-colors duration-300 p-1">
            <History size={20} />
          </button>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-primary/30 px-3 py-1 rounded bg-primary/5 font-mono text-data-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            2024
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden flex items-center justify-center">
            <span className="text-xs font-mono text-on-surface-variant">CIO</span>
          </div>
        </div>
      </div>
    </header>
  );
}
