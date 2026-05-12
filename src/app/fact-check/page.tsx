"use client";

import { motion } from "framer-motion";
import { Search, Shield, AlertTriangle, CheckCircle2, XCircle, HelpCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import { useCivicStore } from "@/store";
import { constituencies } from "@/lib/mock-data/constituencies";

interface FactCheckResult {
  verdict: "TRUE" | "FALSE" | "PARTIALLY TRUE" | "UNVERIFIABLE";
  confidence: number;
  evidence: string[];
  context: string;
  corrected_claim: string;
}

const VERDICT_CONFIG = {
  TRUE: { color: "#4ade80", bg: "bg-green-500/10", border: "border-green-500/30", icon: CheckCircle2, label: "TRUE" },
  FALSE: { color: "#f87171", bg: "bg-red-500/10", border: "border-red-500/30", icon: XCircle, label: "FALSE" },
  "PARTIALLY TRUE": { color: "#fbbf24", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: AlertTriangle, label: "PARTIALLY TRUE" },
  UNVERIFIABLE: { color: "#94a3b8", bg: "bg-gray-500/10", border: "border-gray-500/30", icon: HelpCircle, label: "UNVERIFIABLE" },
};

const EXAMPLE_CLAIMS = [
  "BJP won 400 seats in 2024",
  "Smriti Irani won from Amethi in 2024",
  "BJP lost the Ayodhya constituency despite building Ram Mandir",
  "NDA won more than 300 seats in 2024",
  "Voter turnout in 2024 was over 70%",
];

export default function FactCheckPage() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { citizenMode, selectedLanguage } = useCivicStore();

  const constituencyContext = constituencies
    .map((c) => `${c.name} (${c.state}): Winner=${c.projectedWinner}, Margin Shift=${c.marginShift}, Volatility=${c.volatilityScore}`)
    .join("\n");

  const handleVerify = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const factCheckPrompt = `You are an election fact-checker with access to verified 2024 Indian General Election results. A user has submitted this claim: "${claim}"

Real 2024 Lok Sabha facts you must use:
- Total seats: 543
- NDA won: 293 seats (BJP: 240, allies: 53)
- INDIA alliance won: 234 seats (INC: 99, allies: 135)
- Voter turnout: 66.14%
- BJP lost from 303 seats in 2019 to 240 in 2024
- Key upsets: Amethi (Smriti Irani lost to Kishori Lal Sharma by 1.67L votes), Faizabad/Ayodhya (BJP lost despite Ram Mandir — SP's Awadhesh Prasad won by 54,567 votes), South India firewall held for opposition
- Constituency data: ${constituencyContext}

Return a JSON object with this exact structure:
{
  "verdict": "TRUE" | "FALSE" | "PARTIALLY TRUE" | "UNVERIFIABLE",
  "confidence": number between 0-100,
  "evidence": ["point 1", "point 2", "point 3"],
  "context": "2-3 sentence background explanation",
  "corrected_claim": "If false or partial, what the correct version is. Empty string if true."
}
Return ONLY the JSON. No markdown, no preamble, no code fences.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: factCheckPrompt,
          type: "factcheck",
          citizenMode,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      
      try {
        // Clean the response — remove any markdown code fences
        let cleaned = data.response.trim();
        cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed: FactCheckResult = JSON.parse(cleaned);
        setResult(parsed);
      } catch {
        // If JSON parsing fails, create a structured result from the text
        setResult({
          verdict: "UNVERIFIABLE",
          confidence: 50,
          evidence: ["AI response could not be parsed. Raw response available."],
          context: typeof data.response === "string" ? data.response.slice(0, 200) : "Analysis unavailable.",
          corrected_claim: "",
        });
      }
    } catch {
      setError("Intelligence temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verdictConfig = result ? VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG.UNVERIFIABLE : null;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        {/* Header */}
        <motion.div variants={staggerItem}>
          <h1 className="font-geist text-2xl md:text-3xl font-bold text-on-surface mb-2">
            🔍 Misinformation Radar
          </h1>
          <p className="text-on-surface-variant font-mono text-sm">
            {citizenMode
              ? "Paste any election claim and we'll check if it's true or false."
              : "Verify electoral claims against validated 2024 ECI data using AI fact-checking."}
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div variants={staggerItem}>
          <GlassCard variant="active" className="p-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <textarea
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  placeholder="Paste any election claim to fact-check... e.g. 'BJP won 400 seats in 2024'"
                  rows={3}
                  className="w-full bg-surface-container-highest rounded-lg border border-white/10 p-4 text-on-surface font-mono text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors resize-none placeholder:text-on-surface-variant/50"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_CLAIMS.slice(0, 3).map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setClaim(ex)}
                      className="px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-on-surface-variant hover:border-primary-fixed/30 hover:text-primary-fixed transition-all"
                    >
                      {ex}
                    </button>
                  ))}
                </div>

                <motion.button
                  onClick={handleVerify}
                  disabled={!claim.trim() || loading}
                  className="flex items-center gap-2 bg-primary-container text-on-primary-container font-mono text-label-caps px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 tracking-wider min-w-[120px] justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Search size={16} />
                  )}
                  {loading ? "Verifying..." : "Verify"}
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Loading Skeleton */}
        {loading && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-surface-container-highest rounded animate-pulse" />
                  <div className="h-3 w-48 bg-surface-container-highest rounded animate-pulse" />
                </div>
              </div>
              <div className="h-2 bg-surface-container-highest rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-surface-container-highest rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-surface-container-highest rounded animate-pulse" />
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Result Card */}
        {result && verdictConfig && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <GlassCard className="p-6 space-y-6">
              {/* Verdict Header */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${verdictConfig.bg} border ${verdictConfig.border} flex items-center justify-center`}>
                  <verdictConfig.icon size={28} style={{ color: verdictConfig.color }} />
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${verdictConfig.bg} border ${verdictConfig.border}`}
                    style={{ color: verdictConfig.color }}
                  >
                    {verdictConfig.label}
                  </span>
                  <p className="text-on-surface-variant text-sm mt-1 font-mono">
                    Confidence: {result.confidence}%
                  </p>
                </div>

                {/* Confidence Ring */}
                <div className="ml-auto relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="3"
                    />
                    <motion.path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={verdictConfig.color}
                      strokeWidth="3"
                      strokeDasharray={`${result.confidence}, 100`}
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${result.confidence}, 100` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold"
                    style={{ color: verdictConfig.color }}
                  >
                    {result.confidence}
                  </span>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <h4 className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={14} />
                  EVIDENCE
                </h4>
                <ul className="space-y-2">
                  {result.evidence.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-on-surface-variant"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: verdictConfig.color }} />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Context */}
              <div className="p-4 rounded-lg bg-surface-container-highest/50 border border-white/5">
                <h4 className="font-mono text-[10px] text-on-surface-variant tracking-wider mb-2">CONTEXT</h4>
                <p className="text-sm text-on-surface leading-relaxed">{result.context}</p>
              </div>

              {/* Corrected Claim */}
              {result.corrected_claim && (
                <div className="p-4 rounded-lg bg-primary-fixed/5 border border-primary-fixed/20">
                  <h4 className="font-mono text-[10px] text-primary-fixed tracking-wider mb-2">CORRECTED CLAIM</h4>
                  <p className="text-sm text-primary-fixed leading-relaxed">{result.corrected_claim}</p>
                </div>
              )}

              {/* Source */}
              <p className="text-[10px] font-mono text-on-surface-variant/40 tracking-wider text-center">
                Based on 2024 Election Commission of India data · Powered by ElectionOS AI
              </p>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
