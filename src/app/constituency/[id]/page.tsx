"use client";

import { motion } from "framer-motion";
import { use } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import PulseIndicator from "@/components/ui/PulseIndicator";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowLineChart from "@/components/charts/GlowLineChart";
import ExplainWithAI from "@/components/charts/ExplainWithAI";
import { getConstituencyById, constituencies } from "@/lib/mock-data/constituencies";
import { ArrowLeft, MapPin, Users, TrendingUp, Shield, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

export default function ConstituencyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const constituency = getConstituencyById(id);

  if (!constituency) {
    return (
      <div className="p-6 text-center">
        <h1 className="font-geist text-2xl text-on-surface mb-4">
          Constituency Not Found
        </h1>
        <Link
          href="/dashboard"
          className="text-primary-fixed hover:underline font-mono"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const demographicsData = Object.entries(constituency.demographics).map(
    ([key, value]) => ({
      group: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .replace(/(\d+)/g, " $1"),
      value,
      fullMark: 100,
    })
  );

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary-fixed transition-colors mb-4 font-mono text-label-caps tracking-wider"
          >
            <ArrowLeft size={14} />
            BACK TO COMMAND CENTER
          </Link>

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <PulseIndicator color="cyan" label="LIVE" />
                <span className="font-mono text-data-mono text-on-surface-variant">
                  Last polled: {constituency.lastPolled}
                </span>
              </div>
              <h1 className="font-geist text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
                {constituency.name}
              </h1>
              <p className="font-mono text-data-mono text-on-surface-variant mt-1">
                <MapPin size={12} className="inline mr-1" />
                {constituency.state} // {constituency.region}
              </p>
            </div>

            <div className="flex gap-6 md:text-right">
              <div>
                <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                  VOLATILITY
                </p>
                <span
                  className={`font-geist text-2xl font-bold ${
                    constituency.volatilityScore >= 7
                      ? "text-error"
                      : constituency.volatilityScore >= 5
                      ? "text-primary-fixed"
                      : "text-secondary"
                  }`}
                >
                  {constituency.volatilityScore}
                </span>
                <span className="text-xs text-on-surface-variant ml-2">
                  {constituency.volatilityStatus}
                </span>
              </div>
              <div>
                <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                  CONFIDENCE
                </p>
                <AnimatedCounter
                  value={constituency.confidence}
                  suffix="%"
                  className="text-2xl font-bold"
                  color={constituency.confidence > 80 ? "cyan" : "default"}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Candidate Cards */}
          <motion.div variants={staggerItem} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Incumbent */}
            <GlassCard className="border-white/10">
              <p className="font-mono text-label-caps text-on-surface-variant tracking-wider mb-2">
                INCUMBENT
              </p>
              <h3 className="font-geist text-xl font-bold text-on-surface mb-1">
                {constituency.incumbent.name}
              </h3>
              <p className="font-mono text-data-mono text-on-surface-variant/60 mb-4">
                {constituency.incumbent.party}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                    VOTE SHARE
                  </p>
                  <span className="font-geist text-3xl font-extrabold text-on-surface">
                    {constituency.incumbent.voteShare}%
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                    MARGIN
                  </p>
                  <span className="font-geist text-2xl font-bold text-on-surface-variant">
                    +{constituency.incumbent.margin}%
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Challenger */}
            <GlassCard
              variant={constituency.isFlipped ? "active" : "default"}
              className={constituency.isFlipped ? "bg-primary-container/5" : ""}
            >
              <div className="flex items-center gap-2 mb-2">
                {constituency.isFlipped && <PulseIndicator color="cyan" size="sm" />}
                <span className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                  {constituency.isFlipped ? "PROJECTED WINNER" : "CHALLENGER"}
                </span>
              </div>
              <h3 className="font-geist text-xl font-bold text-on-surface mb-1">
                {constituency.challenger.name}
              </h3>
              <p className="font-mono text-data-mono text-on-surface-variant/60 mb-4">
                {constituency.challenger.party}
              </p>
              <div>
                <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                  PROJECTED VOTE SHARE
                </p>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-geist text-3xl font-extrabold ${
                      constituency.isFlipped ? "text-primary-fixed neon-text" : "text-on-surface"
                    }`}
                  >
                    {constituency.challenger.projectedVoteShare}%
                  </span>
                  <span
                    className={`flex items-center gap-1 font-mono text-xs ${
                      constituency.swingPercentage > 0
                        ? "text-primary-fixed"
                        : "text-error"
                    }`}
                  >
                    {constituency.swingPercentage > 0 ? (
                      <ArrowUp size={10} />
                    ) : (
                      <ArrowDown size={10} />
                    )}
                    {Math.abs(constituency.swingPercentage)}%
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Key Issues */}
          <motion.div variants={staggerItem} className="lg:col-span-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-secondary" />
                <h3 className="font-geist text-lg font-bold text-on-surface">
                  Key Issues
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {constituency.keyIssues.map((issue) => (
                  <span
                    key={issue}
                    className="px-3 py-1.5 bg-surface-container border border-white/10 rounded-lg font-mono text-data-mono text-on-surface"
                  >
                    {issue}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-primary-fixed" />
                <h4 className="font-geist text-base font-semibold text-on-surface">
                  Projected: {constituency.projectedWinner}
                </h4>
              </div>
              <div className="text-sm text-on-surface-variant leading-relaxed">
                Total registered voters: {constituency.totalVotes.toLocaleString()}
              </div>
            </GlassCard>
          </motion.div>

          {/* Map View */}
          <motion.div variants={staggerItem} className="lg:col-span-12">
            <GlassCard className="p-0 overflow-hidden">
              <div className="p-5 pb-0">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-primary-fixed" />
                  <h3 className="font-geist text-lg font-bold text-on-surface">
                    Geographic View
                  </h3>
                  <span className="font-mono text-[10px] text-on-surface-variant tracking-wider ml-auto">
                    OpenStreetMap
                  </span>
                </div>
              </div>
              <MapView
                lat={constituency.lat}
                lng={constituency.lng}
                zoom={11}
                className="h-[350px]"
                markers={constituencies
                  .filter((c) => c.id !== constituency.id && c.state === constituency.state)
                  .map((c) => ({
                    lat: c.lat,
                    lng: c.lng,
                    label: c.name,
                    color: c.isFlipped ? "#00f5ff" : "#849495",
                  }))}
              />
            </GlassCard>
          </motion.div>

          {/* Turnout History Chart */}
          <motion.div variants={staggerItem} className="lg:col-span-8">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary-fixed" />
                  <h3 className="font-geist text-lg font-bold text-on-surface">
                    Turnout History
                  </h3>
                </div>
                <span className="font-mono text-data-mono text-on-surface-variant">
                  6 Cycles
                </span>
              </div>
              <GlowLineChart
                data={constituency.turnoutHistory.map((v, i) => ({
                  name: constituency.turnoutYears[i],
                  value: v,
                }))}
                color="#00f5ff"
                height={250}
                showGrid
              />
              <ExplainWithAI
                chartType="turnout line chart"
                dataDescription={`Turnout trend for ${constituency.name}: ${constituency.turnoutHistory.join("%, ")}% across ${constituency.turnoutYears.join(", ")}`}
              />
            </GlassCard>
          </motion.div>

          {/* Demographics Radar */}
          <motion.div variants={staggerItem} className="lg:col-span-4">
            <GlassCard>
              <h3 className="font-geist text-lg font-bold text-on-surface mb-4">
                Demographics
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={demographicsData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="group"
                    tick={{ fontSize: 9, fill: "#b9caca", fontFamily: "JetBrains Mono" }}
                  />
                  <Radar
                    name="Demographics"
                    dataKey="value"
                    stroke="#bbc3ff"
                    fill="rgba(187,195,255,0.2)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#bbc3ff" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
