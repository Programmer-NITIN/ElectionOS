"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import PulseIndicator from "@/components/ui/PulseIndicator";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowLineChart from "@/components/charts/GlowLineChart";
import ExplainWithAI from "@/components/charts/ExplainWithAI";
import { seatFlips } from "@/lib/mock-data";
import { Sparkles, CheckCircle, ArrowUp } from "lucide-react";

export default function SeatFlipPage() {
  const [selectedFlip, setSelectedFlip] = useState(0);
  const flip = seatFlips[selectedFlip];

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      {/* Flip Selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {seatFlips.map((f, i) => (
          <motion.button
            key={f.id}
            className={`px-4 py-2 rounded-lg font-mono text-label-caps tracking-wider whitespace-nowrap transition-all ${
              selectedFlip === i
                ? "bg-primary-container text-on-primary-container"
                : "bg-surface-container border border-white/10 text-on-surface-variant hover:border-primary-fixed/30"
            }`}
            onClick={() => setSelectedFlip(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {f.constituency}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={flip.id}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-primary-container/20 border border-primary-fixed/30 rounded-full flex items-center gap-2">
              <PulseIndicator color="cyan" size="sm" />
              <span className="font-mono text-label-caps text-primary-fixed tracking-wider">
                SEAT FLIPPED
              </span>
            </div>
            <span className="font-mono text-data-mono text-on-surface-variant">
              {flip.region}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <h1 className="font-geist text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
              {flip.headline}
            </h1>
            <div className="hidden md:flex gap-8 text-right">
              <div>
                <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-1">
                  MARGIN SHIFT
                </p>
                <span className="font-geist text-2xl font-bold text-primary-fixed">
                  +<AnimatedCounter value={flip.marginShift} suffix="%" className="text-2xl" color="cyan" />
                </span>
              </div>
              <div>
                <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-1">
                  TOTAL VOTES
                </p>
                <span className="font-mono text-data-mono text-on-surface text-xl">
                  {flip.totalVotes.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Before/After Cards */}
          <motion.div variants={staggerItem} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Winner */}
            <GlassCard className="border-white/10">
              <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-2">
                2020 Cycle Winner
              </p>
              <h3 className="font-geist text-headline-sm font-semibold text-on-surface mb-1">
                {flip.previousWinner.name}
              </h3>
              <p className="font-mono text-data-mono text-on-surface-variant/60 mb-6">
                {flip.previousWinner.party}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-1">
                    Vote Share
                  </p>
                  <span className="font-geist text-3xl font-extrabold text-on-surface">
                    {flip.previousWinner.voteShare}%
                  </span>
                </div>
                <div>
                  <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-1">
                    Turnout Model
                  </p>
                  <span className="font-mono text-data-mono text-on-surface">
                    {flip.previousWinner.turnoutModel}
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Projected Winner */}
            <GlassCard variant="active" className="bg-primary-container/5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <PulseIndicator color="cyan" size="sm" />
                    <span className="font-mono text-label-caps text-primary-fixed tracking-wider">
                      2024 PROJECTED WINNER
                    </span>
                  </div>
                  <h3 className="font-geist text-headline-sm font-semibold text-on-surface mb-1">
                    {flip.projectedWinner.name}
                  </h3>
                  <p className="font-mono text-data-mono text-on-surface-variant/60">
                    {flip.projectedWinner.party}
                  </p>
                </div>
                <CheckCircle size={24} className="text-primary-fixed" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="font-mono text-label-caps text-primary-fixed tracking-wider mb-1">
                    Vote Share
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-geist text-3xl font-extrabold text-primary-fixed neon-text">
                      {flip.projectedWinner.voteShare}%
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-primary-fixed">
                      <ArrowUp size={10} />
                      {(flip.projectedWinner.voteShare - flip.previousWinner.voteShare).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-1">
                    Key Driver
                  </p>
                  <span className="font-mono text-data-mono text-on-surface">
                    {flip.projectedWinner.keyDriver}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Win Probability + Demographics */}
          <motion.div variants={staggerItem} className="lg:col-span-4 flex flex-col gap-6">
            <GlassCard>
              <h4 className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-4">
                Win Probability Momentum
              </h4>
              <GlowLineChart
                data={flip.winProbabilityData.map((d) => ({
                  name: d.time,
                  value: d.probability,
                }))}
                color="#00f5ff"
                height={150}
              />
              <ExplainWithAI
                chartType="momentum line"
                dataDescription={`Win probability for challenger in ${flip.constituency} showing progression from ${flip.winProbabilityData[0].probability}% to ${flip.winProbabilityData[flip.winProbabilityData.length - 1].probability}%`}
              />
            </GlassCard>

            <GlassCard>
              <h4 className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-4">
                Key Demographic Shifts
              </h4>
              <div className="space-y-3">
                {flip.demographicShifts.map((d) => (
                  <div key={d.group} className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">{d.group}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-data-mono"
                        style={{ color: d.color }}
                      >
                        {d.change > 0 ? "+" : ""}
                        {d.change}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: d.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.abs(d.change) * 8}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={staggerItem} className="lg:col-span-8">
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">🧊</span>
                <h3 className="font-geist text-headline-sm font-semibold text-on-surface">
                  Why Did This Seat Flip?
                </h3>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />

                {flip.timeline.map((event, i) => (
                  <motion.div
                    key={i}
                    className="relative mb-8 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                  >
                    <div
                      className={`absolute -left-5 top-1 w-3 h-3 rounded-full border-2 ${
                        event.isAIInsight
                          ? "bg-ai-purple border-ai-purple shadow-[0_0_8px_rgba(124,77,255,0.6)]"
                          : "bg-surface-container-highest border-white/20"
                      }`}
                    />

                    <div
                      className={`p-4 rounded-xl ${
                        event.isAIInsight
                          ? "ai-glow-subtle bg-surface-container/50"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-data-mono text-primary-fixed">
                          {event.time}
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">
                          // {event.phase}
                        </span>
                        {event.isAIInsight && (
                          <span className="flex items-center gap-1 ml-2">
                            <Sparkles size={10} className="text-ai-purple" />
                            <span className="font-mono text-[10px] text-ai-purple tracking-wider">
                              AI CORE INSIGHT
                            </span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-geist text-lg font-bold text-on-surface mb-2">
                        {event.title}
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {event.description}
                      </p>

                      {event.momentumBar && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
                            <motion.div
                              className="h-full bg-on-surface-variant/40"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${event.momentumBar.incumbent}%`,
                              }}
                              transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                            />
                            <motion.div
                              className="h-full bg-primary-fixed"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${event.momentumBar.challenger}%`,
                              }}
                              transition={{ duration: 1, delay: 0.7 + i * 0.2 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
