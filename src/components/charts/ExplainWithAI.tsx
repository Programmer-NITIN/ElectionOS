"use client";

import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTypewriter } from "@/hooks";
import { useCivicStore } from "@/store";

interface ExplainWithAIProps {
  chartType: string;
  dataDescription: string;
}

export default function ExplainWithAI({ chartType, dataDescription }: ExplainWithAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { displayText, isComplete } = useTypewriter(explanation || "", 15, 200);
  const { citizenMode, selectedLanguage } = useCivicStore();

  const handleExplain = async () => {
    if (explanation) {
      setIsOpen(!isOpen);
      return;
    }

    setIsOpen(true);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Explain this ${chartType} chart. ${dataDescription}`,
          type: "graph",
          citizenMode,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      setExplanation(data.response);
    } catch {
      setExplanation(
        "This visualization reveals a significant trend shift driven by demographic changes and issue-specific voter mobilization patterns across key districts."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <motion.button
        className="flex items-center gap-2 text-xs font-mono text-ai-purple hover:text-tertiary-fixed-dim transition-colors tracking-wider"
        onClick={handleExplain}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles size={12} />
        {isOpen ? "HIDE AI EXPLANATION" : citizenMode ? "EXPLAIN SIMPLY" : "EXPLAIN WITH AI"}
      </motion.button>

      {isOpen && (
        <motion.div
          className="mt-3 p-3 rounded-lg bg-surface-container border border-ai-purple/20 text-on-surface-variant text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-ai-purple" />
              <span className="font-mono text-[10px] tracking-wider">
                {citizenMode ? "SIMPLIFYING FOR YOU..." : "AI ANALYZING CHART DATA..."}
              </span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={10} className="text-ai-purple" />
                <span className="font-mono text-[10px] text-ai-purple tracking-wider">
                  AI ANALYSIS
                </span>
              </div>
              <p className="leading-relaxed">
                {displayText}
                {!isComplete && <span className="inline-block w-0.5 h-4 bg-ai-purple animate-pulse ml-0.5" />}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
