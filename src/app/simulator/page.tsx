"use client";

import { motion } from "framer-motion";
import { FlaskConical, Play, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import { useCivicStore } from "@/store";

interface SimulationResult {
  nda_seats: number;
  india_seats: number;
  others_seats: number;
  nda_change: number;
  india_change: number;
  key_swings: string[];
  narrative: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
}

interface SliderConfig {
  id: string;
  label: string;
  citizenLabel: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
}

const SLIDERS: SliderConfig[] = [
  { id: "urban_turnout", label: "Urban Turnout Swing", citizenLabel: "City voter change", min: -20, max: 20, defaultValue: 0, unit: "%" },
  { id: "rural_turnout", label: "Rural Turnout Swing", citizenLabel: "Village voter change", min: -20, max: 20, defaultValue: 0, unit: "%" },
  { id: "obc_consolidation", label: "OBC Vote → NDA Shift", citizenLabel: "OBC support for NDA", min: -30, max: 30, defaultValue: 0, unit: "%" },
  { id: "muslim_consolidation", label: "Muslim Vote → INDIA Shift", citizenLabel: "Muslim support for INDIA", min: -30, max: 30, defaultValue: 0, unit: "%" },
  { id: "youth_participation", label: "Youth Voter Participation", citizenLabel: "Young people voting more/less", min: -20, max: 20, defaultValue: 0, unit: "%" },
  { id: "anti_incumbency", label: "Anti-Incumbency Factor", citizenLabel: "Anger at current leaders", min: 0, max: 50, defaultValue: 15, unit: "%" },
];

const CONFIDENCE_COLORS = {
  LOW: "#f87171",
  MEDIUM: "#fbbf24",
  HIGH: "#4ade80",
};

export default function SimulatorPage() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(SLIDERS.map((s) => [s.id, s.defaultValue]))
  );
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { citizenMode, selectedLanguage } = useCivicStore();

  const updateValue = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);

    const prompt = `You are an expert psephologist (electoral scientist) for India.
Given the actual 2024 Lok Sabha result (NDA: 293, INDIA: 234, Others: 16),
predict how the following hypothetical changes would alter the seat count.

Scenario adjustments from actual 2024 baseline:
- Urban turnout change: ${values.urban_turnout}%
- Rural turnout change: ${values.rural_turnout}%
- OBC vote shift toward NDA: ${values.obc_consolidation}%
- Muslim vote shift toward INDIA alliance: ${values.muslim_consolidation}%
- Youth voter participation change: ${values.youth_participation}%
- Anti-incumbency intensity: ${values.anti_incumbency}%

Return a JSON object:
{
  "nda_seats": number,
  "india_seats": number,
  "others_seats": number,
  "nda_change": number (positive or negative),
  "india_change": number (positive or negative),
  "key_swings": ["constituency/state most affected", "second most affected", "third most affected"],
  "narrative": "3-4 sentence plain-English explanation of why these changes caused this outcome",
  "confidence": "LOW" | "MEDIUM" | "HIGH"
}
Return ONLY valid JSON. No markdown, no preamble, no code fences.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          type: "scenario",
          citizenMode,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();

      try {
        let cleaned = data.response.trim();
        cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed: SimulationResult = JSON.parse(cleaned);
        setResult(parsed);
      } catch {
        setResult({
          nda_seats: 293,
          india_seats: 234,
          others_seats: 16,
          nda_change: 0,
          india_change: 0,
          key_swings: ["Unable to simulate — try again"],
          narrative: typeof data.response === "string" ? data.response.slice(0, 300) : "Simulation inconclusive.",
          confidence: "LOW",
        });
      }
    } catch {
      setResult({
        nda_seats: 293,
        india_seats: 234,
        others_seats: 16,
        nda_change: 0,
        india_change: 0,
        key_swings: ["Analysis unavailable"],
        narrative: "Intelligence temporarily unavailable. Please try again.",
        confidence: "LOW",
      });
    } finally {
      setLoading(false);
    }
  };

  const maxSeats = 543;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
        {/* Header */}
        <motion.div variants={staggerItem}>
          <h1 className="font-geist text-2xl md:text-3xl font-bold text-on-surface mb-1 flex items-center gap-3">
            <FlaskConical size={28} className="text-primary-fixed" />
            Scenario Intelligence Lab
          </h1>
          <p className="text-on-surface-variant font-mono text-sm">
            {citizenMode
              ? "Move the sliders to see 'what if' — how would results change?"
              : "Adjust variables and see how the 2024 result could have changed."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sliders Panel */}
          <motion.div variants={staggerItem}>
            <GlassCard variant="active" className="p-6 space-y-5">
              <h3 className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                SCENARIO PARAMETERS
              </h3>

              {SLIDERS.map((slider) => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-on-surface font-mono">
                      {citizenMode ? slider.citizenLabel : slider.label}
                    </label>
                    <span
                      className="font-mono text-sm font-bold min-w-[50px] text-right"
                      style={{
                        color:
                          values[slider.id] > 0
                            ? "#4ade80"
                            : values[slider.id] < 0
                            ? "#f87171"
                            : "#94a3b8",
                      }}
                    >
                      {values[slider.id] > 0 ? "+" : ""}
                      {values[slider.id]}{slider.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    value={values[slider.id]}
                    onChange={(e) => updateValue(slider.id, parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-container-highest accent-primary-fixed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-fixed [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,245,255,0.5)] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-on-surface-variant/40">
                    <span>{slider.min}{slider.unit}</span>
                    <span>{slider.max}{slider.unit}</span>
                  </div>
                </div>
              ))}

              <motion.button
                onClick={handleSimulate}
                disabled={loading}
                className="w-full flex items-center gap-2 justify-center bg-primary-container text-on-primary-container font-mono text-label-caps py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 tracking-wider mt-4"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,245,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                {loading ? "Running Simulation..." : "Run Simulation"}
              </motion.button>
            </GlassCard>
          </motion.div>

          {/* Results Panel */}
          <motion.div variants={staggerItem} className="space-y-4">
            {/* Loading Skeleton */}
            {loading && (
              <GlassCard className="p-6 space-y-4">
                <div className="h-6 w-48 bg-surface-container-highest rounded animate-pulse" />
                <div className="space-y-3">
                  <div className="h-8 bg-surface-container-highest rounded animate-pulse" />
                  <div className="h-8 bg-surface-container-highest rounded animate-pulse" />
                  <div className="h-8 bg-surface-container-highest rounded animate-pulse" />
                </div>
                <div className="h-20 bg-surface-container-highest rounded animate-pulse" />
              </GlassCard>
            )}

            {result && !loading && (
              <>
                {/* Seat Count Comparison */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <GlassCard className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                        SIMULATION RESULT
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border"
                        style={{
                          color: CONFIDENCE_COLORS[result.confidence],
                          borderColor: CONFIDENCE_COLORS[result.confidence] + "50",
                          background: CONFIDENCE_COLORS[result.confidence] + "10",
                        }}
                      >
                        {result.confidence} CONFIDENCE
                      </span>
                    </div>

                    {/* NDA Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm text-on-surface font-bold">NDA</span>
                        <span className="font-mono text-sm flex items-center gap-1.5">
                          <span className="text-on-surface-variant">293 →</span>
                          <span className="text-on-surface font-bold">{result.nda_seats}</span>
                          {result.nda_change !== 0 && (
                            <span
                              className="flex items-center text-xs"
                              style={{ color: result.nda_change > 0 ? "#4ade80" : "#f87171" }}
                            >
                              {result.nda_change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {result.nda_change > 0 ? "+" : ""}{result.nda_change}
                            </span>
                          )}
                          {result.nda_change === 0 && <Minus size={12} className="text-gray-500" />}
                        </span>
                      </div>
                      <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                        {/* Actual result (ghost bar) */}
                        <div className="absolute h-full bg-orange-500/20 rounded-full" style={{ width: `${(293 / maxSeats) * 100}%` }} />
                        {/* Simulated result */}
                        <motion.div
                          className="h-full bg-orange-500 rounded-full relative z-10"
                          initial={{ width: 0 }}
                          animate={{ width: `${(result.nda_seats / maxSeats) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* INDIA Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm text-on-surface font-bold">INDIA</span>
                        <span className="font-mono text-sm flex items-center gap-1.5">
                          <span className="text-on-surface-variant">234 →</span>
                          <span className="text-on-surface font-bold">{result.india_seats}</span>
                          {result.india_change !== 0 && (
                            <span
                              className="flex items-center text-xs"
                              style={{ color: result.india_change > 0 ? "#4ade80" : "#f87171" }}
                            >
                              {result.india_change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {result.india_change > 0 ? "+" : ""}{result.india_change}
                            </span>
                          )}
                          {result.india_change === 0 && <Minus size={12} className="text-gray-500" />}
                        </span>
                      </div>
                      <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                        <div className="absolute h-full bg-blue-500/20 rounded-full" style={{ width: `${(234 / maxSeats) * 100}%` }} />
                        <motion.div
                          className="h-full bg-blue-500 rounded-full relative z-10"
                          initial={{ width: 0 }}
                          animate={{ width: `${(result.india_seats / maxSeats) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Others Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm text-on-surface font-bold">Others</span>
                        <span className="font-mono text-sm">
                          <span className="text-on-surface-variant">16 →</span>{" "}
                          <span className="text-on-surface font-bold">{result.others_seats}</span>
                        </span>
                      </div>
                      <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                        <div className="absolute h-full bg-gray-500/20 rounded-full" style={{ width: `${(16 / maxSeats) * 100}%` }} />
                        <motion.div
                          className="h-full bg-gray-500 rounded-full relative z-10"
                          initial={{ width: 0 }}
                          animate={{ width: `${(result.others_seats / maxSeats) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        />
                      </div>
                    </div>

                    {/* Majority line */}
                    <div className="relative h-px bg-white/5 mt-4">
                      <div className="absolute top-0 bg-yellow-500/50 h-px" style={{ left: 0, width: `${(272 / maxSeats) * 100}%` }} />
                      <div
                        className="absolute -top-3 text-[9px] font-mono text-yellow-500/70"
                        style={{ left: `${(272 / maxSeats) * 100}%`, transform: "translateX(-50%)" }}
                      >
                        272 (Majority)
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Narrative */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <GlassCard className="p-5">
                    <h4 className="font-mono text-[10px] text-on-surface-variant tracking-wider mb-3">AI NARRATIVE</h4>
                    <p className="text-sm text-on-surface leading-relaxed">{result.narrative}</p>
                  </GlassCard>
                </motion.div>

                {/* Key Swings */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <GlassCard className="p-5">
                    <h4 className="font-mono text-[10px] text-on-surface-variant tracking-wider mb-3">KEY SWING ZONES</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.key_swings.map((swing, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed text-xs font-mono"
                        >
                          {swing}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </>
            )}

            {/* Empty state */}
            {!result && !loading && (
              <GlassCard className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                <FlaskConical size={40} className="text-on-surface-variant/20 mb-4" />
                <h4 className="font-mono text-sm text-on-surface-variant mb-2">No simulation run yet</h4>
                <p className="text-on-surface-variant/50 text-xs font-mono">
                  Adjust the sliders and click &quot;Run Simulation&quot; to see what-if results.
                </p>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
