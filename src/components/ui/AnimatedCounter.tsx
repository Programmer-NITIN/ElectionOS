"use client";

import { useAnimatedValue } from "@/hooks";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  color?: "cyan" | "red" | "default" | "purple";
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 1,
  duration = 1500,
  className,
  color = "default",
}: AnimatedCounterProps) {
  const animatedValue = useAnimatedValue(value, duration, decimals);

  const colorClasses = {
    cyan: "text-primary-fixed neon-text",
    red: "text-error",
    default: "text-on-surface",
    purple: "text-on-tertiary-container neon-text-purple",
  };

  return (
    <span className={cn("font-geist tabular-nums", colorClasses[color], className)}>
      {prefix}
      {animatedValue}
      {suffix}
    </span>
  );
}
