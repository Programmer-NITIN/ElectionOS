"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Brain,
  ArrowLeftRight,
  Mic2,
  Rss,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { href: "/mood", label: "MOOD OF NATION", icon: Brain },
  { href: "/seat-flip", label: "SEAT FLIP", icon: ArrowLeftRight },
  { href: "/speech", label: "SPEECH ANALYZER", icon: Mic2 },
  { href: "/feed", label: "INSIGHT FEED", icon: Rss },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { setCopilotOpen } = useUIStore();

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-white/10">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="block">
          <h1 className="font-geist text-headline-sm font-bold text-primary tracking-tight">
            ElectionOS
          </h1>
          <p className="font-mono text-label-caps text-on-surface-variant mt-1 tracking-wider uppercase">
            AI Core v4.02
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-label-caps tracking-wider transition-all duration-200 relative",
                    isActive
                      ? "bg-secondary-container/20 text-primary border-r-4 border-primary-fixed shadow-neon-cyan"
                      : "text-on-surface-variant/60 hover:bg-surface-variant/30 hover:text-on-surface"
                  )}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} className={isActive ? "text-primary-fixed" : ""} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-fixed rounded-r"
                      layoutId="sidebar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <motion.button
          className="w-full bg-primary-container text-on-primary-container font-mono text-label-caps py-2.5 rounded-lg mb-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 tracking-wider"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCopilotOpen(true)}
        >
          <Zap size={14} />
          Launch Copilot
        </motion.button>

        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant/60 hover:bg-surface-variant/30 hover:text-on-surface transition-all font-mono text-label-caps tracking-wider">
            <Settings size={16} />
            Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant/60 hover:bg-surface-variant/30 hover:text-on-surface transition-all font-mono text-label-caps tracking-wider">
            <HelpCircle size={16} />
            Support
          </button>
        </div>
      </div>
    </nav>
  );
}
