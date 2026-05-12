"use client";

import { motion } from "framer-motion";
import { Map, TrendingUp, Gavel, ArrowUp, ArrowDown, Search } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import GlassCard from "@/components/ui/GlassCard";
import PulseIndicator from "@/components/ui/PulseIndicator";
import { insights, issueVelocities, criticalZones } from "@/lib/mock-data";
import { constituencies } from "@/lib/mock-data/constituencies";
import GlowLineChart from "@/components/charts/GlowLineChart";
import ExplainWithAI from "@/components/charts/ExplainWithAI";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConstituencies = useMemo(() => {
    if (!searchQuery.trim()) return constituencies;
    return constituencies.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const mapMarkers = constituencies.map((c) => ({
    lat: c.lat,
    lng: c.lng,
    label: `${c.name} — ${c.projectedWinner} (Vol: ${c.volatilityScore})`,
    color: c.isFlipped
      ? "#ff6b6b"
      : c.volatilityScore >= 7
      ? "#ffb4ab"
      : c.volatilityScore >= 4
      ? "#00f5ff"
      : "#bbc3ff",
  }));

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* LEFT COLUMN: Territorial Shift Map */}
        <motion.section variants={staggerItem} className="lg:col-span-4 flex flex-col gap-4">
          <GlassCard variant="active" className="flex flex-col min-h-[500px] p-0 overflow-hidden">
            <div className="flex justify-between items-center px-5 pt-5 pb-3">
              <h3 className="font-geist text-headline-sm text-primary font-semibold">
                Territorial Shift
              </h3>
              <div className="flex items-center gap-2">
                <PulseIndicator color="cyan" size="sm" />
                <span className="font-mono text-[10px] text-primary-fixed tracking-wider">LIVE MAP</span>
              </div>
            </div>

            {/* Real Interactive Map */}
            <MapView
              lat={22.5}
              lng={79.5}
              zoom={5}
              className="flex-1 min-h-[320px]"
              markers={mapMarkers}
              hideCenter
            />

            {/* Map Legend */}
            <div className="px-5 py-3 flex flex-wrap gap-3 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b]" />
                <span className="font-mono text-[9px] text-on-surface-variant tracking-wider">FLIPPED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]" />
                <span className="font-mono text-[9px] text-on-surface-variant tracking-wider">VOLATILE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f5ff]" />
                <span className="font-mono text-[9px] text-on-surface-variant tracking-wider">MODERATE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#bbc3ff]" />
                <span className="font-mono text-[9px] text-on-surface-variant tracking-wider">STABLE</span>
              </div>
            </div>

            {/* Search */}
            <div className="px-5 pb-5">
              <div className="flex items-center bg-surface-container-highest p-3 rounded border border-white/10 focus-within:border-primary-fixed transition-colors">
                <Search size={16} className="text-on-surface-variant/50 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Locate Constituency..."
                  className="bg-transparent border-none text-on-surface font-mono text-data-mono focus:ring-0 focus:outline-none w-full p-0 placeholder:text-on-surface-variant/50"
                />
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="mt-2 space-y-1 max-h-[120px] overflow-y-auto">
                  {filteredConstituencies.map((c) => (
                    <Link
                      key={c.id}
                      href={`/constituency/${c.id}`}
                      className="flex justify-between items-center px-3 py-2 rounded bg-surface-container/50 hover:bg-primary-fixed/10 transition-colors"
                    >
                      <span className="font-mono text-data-mono text-on-surface text-sm">{c.name}</span>
                      <span
                        className="font-mono text-[10px] tracking-wider"
                        style={{ color: c.isFlipped ? "#ff6b6b" : "#00f5ff" }}
                      >
                        {c.isFlipped ? "FLIPPED" : c.projectedWinner.split("(")[0].trim()}
                      </span>
                    </Link>
                  ))}
                  {filteredConstituencies.length === 0 && (
                    <p className="text-on-surface-variant/40 font-mono text-[10px] text-center py-2">No results</p>
                  )}
                </div>
              )}
            </div>
          </GlassCard>

          {/* Critical Zones */}
          <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                Critical Zones
              </span>
              <span className="font-mono text-data-mono text-primary-fixed">
                0{criticalZones.length} Active
              </span>
            </div>
            {criticalZones.map((zone, i) => (
              <div
                key={zone.name}
                className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
              >
                <span className="font-mono text-data-mono text-on-surface">
                  {zone.name}
                </span>
                <span
                  className="font-mono text-data-mono"
                  style={{ color: zone.color }}
                >
                  {zone.status}
                </span>
              </div>
            ))}
          </GlassCard>
        </motion.section>

        {/* CENTER COLUMN: Live Narratives */}
        <motion.section variants={staggerItem} className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-geist text-headline-md text-on-surface font-bold">
              Live Narratives
            </h2>
            <PulseIndicator color="cyan" label="Processing" />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[700px] pr-2">
            {insights.slice(0, 5).map((insight, i) => (
              <GlassCard
                key={insight.id}
                variant={insight.type === "ai_synthesis" ? "ai" : "default"}
                delay={i * 0.1}
              >
                {insight.type === "ai_synthesis" && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary-container/20 blur-3xl rounded-full" />
                )}

                <div className="flex items-center gap-2 mb-3">
                  {insight.type === "ai_synthesis" ? (
                    <span className="text-on-tertiary-container text-sm">✦</span>
                  ) : insight.type === "volume_spike" ? (
                    <TrendingUp size={14} className="text-outline" />
                  ) : (
                    <Gavel size={14} className="text-outline" />
                  )}
                  <span
                    className={`font-mono text-label-caps tracking-wider uppercase ${
                      insight.type === "ai_synthesis"
                        ? "text-on-tertiary-container"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {insight.label}
                  </span>
                  <span className="ml-auto font-mono text-data-mono text-on-surface-variant/50">
                    {insight.timestamp}
                  </span>
                </div>

                <h4
                  className={`font-geist font-bold mb-2 ${
                    insight.type === "ai_synthesis"
                      ? "text-headline-sm"
                      : "text-body-lg"
                  }`}
                >
                  {insight.title}
                </h4>

                <p className="text-body-md text-on-surface-variant mb-4">
                  {insight.description}
                </p>

                {insight.metric && (
                  <>
                    <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="h-full bg-primary-fixed"
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.metric.percentage}%` }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between font-mono text-data-mono text-xs text-on-surface-variant">
                      <span>Baseline: {insight.metric.baseline}</span>
                      <span className="text-primary-fixed">
                        Current: {insight.metric.current}
                      </span>
                    </div>
                  </>
                )}

                {insight.tags.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {insight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface-container border border-white/10 rounded font-mono text-data-mono text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* RIGHT COLUMN: Issue Velocity + Actions */}
        <motion.section variants={staggerItem} className="lg:col-span-3 flex flex-col gap-4">
          <h3 className="font-mono text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
            Issue Velocity
          </h3>

          {issueVelocities.slice(0, 3).map((issue, i) => (
            <GlassCard key={issue.name} className="relative overflow-hidden" delay={i * 0.15}>
              <div
                className="absolute left-0 top-0 w-1 h-full"
                style={{ background: issue.color }}
              />
              <div className="flex justify-between items-center mb-2 pl-2">
                <span className="font-mono text-data-mono font-bold text-on-surface">
                  {issue.name}
                </span>
                <span
                  className="font-mono text-data-mono flex items-center gap-1"
                  style={{ color: issue.color }}
                >
                  {issue.trend === "up" ? (
                    <ArrowUp size={12} />
                  ) : (
                    <ArrowDown size={12} />
                  )}
                  {issue.percentage}%
                </span>
              </div>
              <div className="pl-2">
                <GlowLineChart
                  data={issue.sparklineData.map((v, j) => ({
                    name: `${j}`,
                    value: v,
                  }))}
                  color={issue.color}
                  height={60}
                  showAxis={false}
                />
              </div>
              <ExplainWithAI
                chartType="sparkline"
                dataDescription={`${issue.name} trend showing ${issue.trend === "up" ? "increase" : "decrease"} of ${issue.percentage}%`}
              />
            </GlassCard>
          ))}

          {/* System Actions */}
          <GlassCard className="mt-2">
            <h4 className="font-mono text-label-caps text-on-surface-variant mb-4 tracking-wider">
              System Actions
            </h4>
            <motion.button
              className="w-full bg-primary text-on-primary font-mono text-label-caps py-3 rounded hover:bg-primary-fixed transition-colors mb-2 tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate Briefing
            </motion.button>
            <motion.button
              className="w-full border border-primary-fixed/50 text-primary-fixed font-mono text-label-caps py-3 rounded hover:bg-primary-fixed/10 transition-colors tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Alert Comm Team
            </motion.button>
          </GlassCard>
        </motion.section>
      </motion.div>
    </div>
  );
}
