"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Radio, MapPin, Calculator, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/dashboard", label: "Live Pulse", icon: Radio },
  { href: "/seat-flip", label: "Swing States", icon: MapPin },
  { href: "/mood", label: "Mood", icon: Calculator },
  { href: "/feed", label: "Timeline", icon: Clock },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container/60 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] rounded-t-xl">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300",
                isActive
                  ? "text-primary-fixed font-bold scale-110"
                  : "text-on-surface-variant/40 hover:text-primary"
              )}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} className="mb-1" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
