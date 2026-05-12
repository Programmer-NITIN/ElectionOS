"use client";

import { cn } from "@/lib/utils";

interface PulseIndicatorProps {
  color?: "cyan" | "red" | "purple" | "blue";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function PulseIndicator({
  color = "cyan",
  size = "sm",
  className,
  label,
}: PulseIndicatorProps) {
  const colorClasses = {
    cyan: "bg-primary-fixed shadow-[0_0_8px_rgba(99,247,255,0.8)]",
    red: "bg-error shadow-[0_0_8px_rgba(255,180,171,0.8)]",
    purple: "bg-on-tertiary-container shadow-[0_0_8px_rgba(107,55,237,0.8)]",
    blue: "bg-secondary shadow-[0_0_8px_rgba(187,195,255,0.8)]",
  };

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "rounded-full animate-pulse",
          colorClasses[color],
          sizeClasses[size]
        )}
      />
      {label && (
        <span className="font-mono text-label-caps tracking-wider uppercase text-primary-fixed">
          {label}
        </span>
      )}
    </span>
  );
}
