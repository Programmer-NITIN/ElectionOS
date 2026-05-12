"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import PulseIndicator from "@/components/ui/PulseIndicator";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { sampleSpeeches, defaultSpeechPrompt } from "@/lib/mock-data";
import { Sparkles, Download, Shield, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SpeechPage() {
  const [selectedSpeech, setSelectedSpeech] = useState(0);
  const [customText, setCustomText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const speech = sampleSpeeches[selectedSpeech];

  const handleAnalyze = async () => {
    if (!customText.trim()) return;
    setAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <PulseIndicator color="cyan" label="LIVE ANALYSIS" />
              <span className="font-mono text-data-mono text-on-surface-variant">
                Session ID: #{speech.sessionId}
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-white/10 rounded-lg font-mono text-label-caps text-on-surface-variant tracking-wider hover:border-primary-fixed/30 transition-colors">
              <Download size={14} />
              Export Report
            </button>
          </div>

          {/* Speech Selector */}
          <div className="flex gap-3 mb-4">
            {sampleSpeeches.map((s, i) => (
              <button
                key={s.id}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider transition-all",
                  selectedSpeech === i
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container border border-white/10 text-on-surface-variant hover:border-primary-fixed/30"
                )}
                onClick={() => setSelectedSpeech(i)}
              >
                {s.speaker}
              </button>
            ))}
          </div>

          <h1 className="font-geist text-3xl md:text-4xl font-extrabold text-on-surface/80 leading-tight">
            {speech.title}
          </h1>
          <p className="font-mono text-data-mono text-on-surface-variant mt-2">
            Speaker: {speech.speaker} | Location: {speech.location}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Transcript Feed */}
          <motion.div variants={staggerItem} className="lg:col-span-5">
            <GlassCard className="max-h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-geist text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="text-sm">☰</span> Transcript Feed
                </h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-primary-fixed/10 border border-primary-fixed/20 rounded font-mono text-[10px] text-primary-fixed">
                    ✓ Promises
                  </span>
                  <span className="px-2 py-1 bg-ai-purple/10 border border-ai-purple/20 rounded font-mono text-[10px] text-ai-purple">
                    ✓ Narratives
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {speech.segments.map((segment, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "relative",
                      segment.isPromise && "pl-3 border-l-2 border-primary-fixed bg-primary-fixed/5 rounded-r-lg py-2 pr-2",
                      segment.isNarrative && segment.sentiment === "negative" && "pl-3 border-l-2 border-ai-purple bg-ai-purple/5 rounded-r-lg py-2 pr-2"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <span className="font-mono text-[10px] text-on-surface-variant/50 block mb-1">
                      {segment.timestamp}
                    </span>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {segment.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Custom Speech Input */}
            <GlassCard className="mt-4">
              <h4 className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-3">
                ANALYZE CUSTOM SPEECH
              </h4>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={defaultSpeechPrompt}
                className="w-full h-24 bg-surface-container border border-white/10 rounded-lg p-3 text-sm text-on-surface focus:border-primary-fixed/50 focus:ring-0 resize-none placeholder:text-on-surface-variant/40"
              />
              <motion.button
                className="mt-2 w-full bg-primary-container text-on-primary-container font-mono text-label-caps py-2.5 rounded-lg tracking-wider flex items-center justify-center gap-2"
                onClick={handleAnalyze}
                disabled={analyzing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {analyzing ? (
                  <>
                    <span className="w-3 h-3 border-2 border-on-primary-container/30 border-t-on-primary-container rounded-full animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    ANALYZE WITH AI
                  </>
                )}
              </motion.button>
            </GlassCard>
          </motion.div>

          {/* Right Side - Metrics */}
          <motion.div variants={staggerItem} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Persuasion Index */}
            <GlassCard className="flex flex-col items-center justify-center text-center">
              <h4 className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-2">
                Real-time Persuasion Index
              </h4>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter
                  value={speech.persuasionIndex}
                  decimals={0}
                  className="text-6xl font-extrabold"
                  color="cyan"
                />
                <span className="font-mono text-data-mono text-on-surface-variant">
                  /100
                </span>
              </div>
              <span className="font-mono text-data-mono text-primary-fixed mt-2 flex items-center gap-1">
                ↗ +{speech.persuasionDelta} pts this segment
              </span>
            </GlassCard>

            {/* Sentiment Bars */}
            <GlassCard>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                      Optimism
                    </span>
                    <span className="font-mono text-data-mono text-primary-fixed">
                      {speech.optimism}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-fixed rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${speech.optimism}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                      Aggression
                    </span>
                    <span className="font-mono text-data-mono text-error">
                      {speech.aggression}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <motion.div
                      className="h-full bg-error rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${speech.aggression}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Policy Shifts */}
            <GlassCard className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-ai-purple" />
                  <h3 className="font-geist text-lg font-bold text-on-surface">
                    Policy Shifts Detected
                  </h3>
                </div>
                <span className="px-3 py-1 bg-surface-container border border-white/10 rounded font-mono text-[10px] text-on-surface-variant tracking-wider">
                  Auto-Extraction
                </span>
              </div>

              <div className="space-y-4">
                {speech.policyShifts.map((shift, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-lg bg-surface-container/50 border border-white/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="px-2 py-1 rounded font-mono text-[10px] tracking-wider"
                        style={{
                          color: shift.categoryColor,
                          background: `${shift.categoryColor}15`,
                          border: `1px solid ${shift.categoryColor}30`,
                        }}
                      >
                        {shift.category}
                      </span>
                      <span className="font-mono text-data-mono text-on-surface-variant">
                        Conf: {shift.confidence}%
                      </span>
                    </div>
                    <h4 className="font-geist text-base font-semibold text-on-surface mb-1">
                      {shift.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {shift.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Target Audience */}
            <GlassCard className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-primary-fixed" />
                <h3 className="font-geist text-lg font-bold text-on-surface">
                  Target Audience Appeals
                </h3>
              </div>
              <div className="space-y-3">
                {speech.targetAudiences.map((audience, i) => (
                  <div key={audience.group} className="flex items-center gap-3">
                    <span className="font-mono text-data-mono text-on-surface w-32">
                      {audience.group}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: audience.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${audience.percentage}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                    <span
                      className="font-mono text-data-mono w-12 text-right"
                      style={{ color: audience.color }}
                    >
                      {audience.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
