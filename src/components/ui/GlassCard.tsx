"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "active" | "ai" | "subtle";
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  const variants = {
    default: "glass-panel",
    active: "glass-panel active-pulse",
    ai: "glass-panel ai-glow",
    subtle: "glass-panel border-white/5",
  };

  return (
    <motion.div
      className={cn(
        variants[variant],
        "rounded-xl p-5 relative overflow-hidden",
        hover && "transition-glow hover-glow",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
