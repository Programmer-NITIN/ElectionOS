"use client";

import { useState, useEffect, useRef } from "react";
import { easeOutExpo } from "@/lib/animations";

// ===== Animated Counter Hook =====
export function useAnimatedValue(
  target: number,
  duration: number = 1500,
  decimals: number = 1
): string {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setValue(easedProgress * target);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value.toFixed(decimals);
}

// ===== Typewriter Hook =====
export function useTypewriter(
  text: string,
  speed: number = 20,
  startDelay: number = 300
): { displayText: string; isComplete: boolean } {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);

    const delayTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
}

// ===== Intersection Observer Hook =====
export function useInView(threshold: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// ===== AI Insight Fetcher =====
export function useAIInsight() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async (prompt: string, context: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context }),
      });
      const data = await res.json();
      setInsight(data.response);
    } catch {
      // Fallback to mock response
      setInsight(
        "Analysis indicates shifting voter sentiment driven by economic concerns. Urban-rural divergence is the most significant structural factor in this cycle."
      );
    } finally {
      setLoading(false);
    }
  };

  return { insight, loading, generateInsight };
}
