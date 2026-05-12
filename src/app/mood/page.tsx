"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import PulseIndicator from "@/components/ui/PulseIndicator";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import IssueRadar from "@/components/charts/IssueRadar";
import ExplainWithAI from "@/components/charts/ExplainWithAI";
import { issueRadarData, surgingEntities } from "@/lib/mock-data";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useTypewriter } from "@/hooks";

const syntheticAnalysis = `"National sentiment is trending toward economic pragmatism in rural sectors. Analyzing 4.2M social inputs and 800 recent field interviews indicates a sharp divergence from urban cultural focus. Healthcare anxiety is peaking in the Rust Belt."`;

function SyntheticAnalysisCard() {
  const { displayText, isComplete } = useTypewriter(syntheticAnalysis, 18, 500);

  return (
    <GlassCard variant="ai" className="bg-surface-container/50">
      <div className="absolute top-0 right-0 w-40 h-40 bg-ai-purple/10 blur-3xl rounded-full" />
      <div className="flex items-center gap-3 mb-4 relative">
        <div className="w-10 h-10 rounded-full bg-ai-purple/20 border border-ai-purple/30 flex items-center justify-center">
          <Sparkles size={18} className="text-ai-purple" />
        </div>
        <div>
          <h3 className="font-geist text-lg font-bold text-on-surface">
            Synthetic Analysis
          </h3>
        </div>
        <span className="ml-auto px-3 py-1 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 font-mono text-[10px] text-primary-fixed tracking-wider">
          Confidence: 94%
        </span>
      </div>
      <p className="text-on-surface-variant leading-relaxed relative">
        {displayText}
        {!isComplete && (
          <span className="inline-block w-0.5 h-4 bg-ai-purple animate-pulse ml-0.5" />
        )}
      </p>
    </GlassCard>
  );
}

export default function MoodPage() {
  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <PulseIndicator color="cyan" label="LIVE TELEMETRY" />
          </div>
          <div className="flex justify-between items-end">
            <h1 className="font-geist text-4xl md:text-5xl font-extrabold text-on-surface">
              Mood of the Nation
            </h1>
            <div className="hidden md:block px-4 py-2 bg-surface-container border border-white/10 rounded-lg">
              <span className="font-mono text-data-mono text-on-surface-variant tracking-wider">
                T-MINUS 45 DAYS
              </span>
            </div>
          </div>
        </motion.div>

        {/* Synthetic Analysis */}
        <motion.div variants={staggerItem} className="mb-8">
          <SyntheticAnalysisCard />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Issue Radar */}
          <motion.div variants={staggerItem} className="lg:col-span-6">
            <GlassCard className="min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary-fixed">◎</span>
                  <h3 className="font-geist text-headline-sm font-semibold text-on-surface">
                    Issue Radar
                  </h3>
                </div>
                <span className="font-mono text-data-mono text-on-surface-variant">
                  Velocity Mode
                </span>
              </div>
              <IssueRadar data={issueRadarData} height={320} />
              <ExplainWithAI
                chartType="radar"
                dataDescription={`Issue intensity radar showing: ${issueRadarData.map((d) => `${d.issue}(${d.intensity})`).join(", ")}`}
              />
            </GlassCard>
          </motion.div>

          {/* Right Side - Heatmap + Entities */}
          <motion.div variants={staggerItem} className="lg:col-span-6 flex flex-col gap-6">
            {/* Sentiment Heatmap Placeholder */}
            <GlassCard className="min-h-[200px] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-secondary">📊</span>
                <h3 className="font-geist text-headline-sm font-semibold text-on-surface">
                  Sentiment Heatmap
                </h3>
              </div>

              {/* Stylized heatmap grid */}
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 60 }).map((_, i) => {
                  const intensity = Math.random();
                  const color =
                    intensity > 0.7
                      ? "bg-error/60"
                      : intensity > 0.4
                      ? "bg-ai-purple/40"
                      : "bg-primary-fixed/30";
                  return (
                    <motion.div
                      key={i}
                      className={`h-6 rounded-sm ${color}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-error/60" />
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    Tension
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary-fixed/30" />
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    Optimism
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Surging Entities */}
            <GlassCard>
              <h4 className="font-mono text-label-caps text-on-surface-variant tracking-widest mb-4">
                SURGING ENTITIES (1HR)
              </h4>
              <div className="space-y-3">
                {surgingEntities.map((entity, i) => (
                  <motion.div
                    key={entity.tag}
                    className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="font-mono text-data-mono text-on-surface font-semibold">
                      {entity.tag}
                    </span>
                    <span
                      className={`font-mono text-data-mono flex items-center gap-1 ${
                        entity.trending === "up"
                          ? "text-primary-fixed"
                          : "text-error"
                      }`}
                    >
                      {entity.trending === "up" ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {entity.change > 0 ? "+" : ""}
                      {entity.change}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Issue Cards Row */}
          <motion.div variants={staggerItem} className="lg:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {issueRadarData.map((issue, i) => (
              <GlassCard key={issue.issue} className="text-center p-4" delay={i * 0.1}>
                <p className="font-mono text-[10px] text-on-surface-variant tracking-wider uppercase mb-2">
                  {issue.issue}
                </p>
                <AnimatedCounter
                  value={issue.intensity}
                  suffix=""
                  decimals={0}
                  className="text-3xl font-extrabold"
                  color={issue.intensity > 75 ? "red" : issue.intensity > 60 ? "cyan" : "default"}
                />
                <div className="mt-2 h-1 rounded-full bg-surface-container-highest overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      issue.intensity > 75
                        ? "bg-error"
                        : issue.intensity > 60
                        ? "bg-primary-fixed"
                        : "bg-secondary"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${issue.intensity}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
