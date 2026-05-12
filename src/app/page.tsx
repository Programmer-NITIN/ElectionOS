"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mic2,
  ArrowLeftRight,
  Brain,
  Rss,
  Zap,
  Shield,
  Search,
  Bell,
  History,
} from "lucide-react";
import { staggerContainer, staggerItem, floatAnimation } from "@/lib/animations";
import PulseIndicator from "@/components/ui/PulseIndicator";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 h-16 bg-surface/60 backdrop-blur-xl border-b border-white/5">
        <h1 className="font-geist text-xl font-bold text-primary tracking-tight">
          ElectionOS
        </h1>
        <div className="hidden md:flex items-center bg-surface-container h-9 px-4 rounded-lg border border-white/10 w-80">
          <Search size={14} className="text-on-surface-variant mr-2" />
          <span className="font-mono text-xs text-on-surface-variant/50">
            Search insights...
          </span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <Bell size={18} className="hidden md:block" />
          <History size={18} className="hidden md:block" />
          <div className="flex items-center gap-2 border border-primary/30 px-3 py-1 rounded font-mono text-xs text-primary">
            <PulseIndicator color="cyan" size="sm" />
            2024
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-radial-glow opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-radial-purple opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-white/10 mb-8">
                  <PulseIndicator color="cyan" size="sm" />
                  <span className="font-mono text-label-caps tracking-wider text-on-surface-variant">
                    SYSTEM ONLINE // CORE v4.02
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="font-geist text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                <span className="text-on-surface">Making Democracy</span>
                <br />
                <span className="gradient-text-cyan">Understandable.</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              >
                Real-time democratic oversight powered by advanced AI. Analyze
                shifting demographics, track coalition math, and decode political
                sentiment instantly.
              </motion.p>

              <motion.div variants={staggerItem} className="flex gap-4">
                <Link href="/dashboard">
                  <motion.button
                    className="px-8 py-3.5 bg-primary-container text-on-primary-container font-mono text-label-caps tracking-widest rounded-lg flex items-center gap-3"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(0, 245, 255, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ACCESS COMMAND CENTER
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
                <motion.button
                  className="px-6 py-3.5 border border-primary-fixed/30 text-primary-fixed font-mono text-label-caps tracking-widest rounded-lg hover:bg-primary-fixed/5 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap size={14} />
                  WATCH DEMO
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - Floating Cards */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Floating Insight Card 1 */}
              <motion.div
                className="absolute top-10 right-0 w-80 glass-panel rounded-xl p-5 border border-white/10"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0s" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <PulseIndicator color="cyan" size="sm" />
                  <span className="font-mono text-[10px] text-primary-fixed tracking-wider">
                    LIVE INSIGHT
                  </span>
                </div>
                <h4 className="font-geist text-base font-semibold text-on-surface mb-1">
                  Why Urban Gujarat is Shifting
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Sentiment shift +4.2% towards incumbent in key tech corridors.
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <motion.div
                    className="h-full bg-primary-fixed rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant/60 mt-1 block text-right">
                  68%
                </span>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                className="absolute top-48 left-0 w-64 ai-glow rounded-xl p-4"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "2s" }}
              >
                <span className="font-mono text-[10px] text-ai-purple tracking-wider block mb-2">
                  ✦ AI PREDICTION
                </span>
                <h4 className="font-geist text-sm font-semibold text-on-surface mb-1">
                  Coalition Fracture Risk
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-geist text-2xl font-extrabold text-error">
                    High
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    59% prob.
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 3 */}
              <motion.div
                className="absolute bottom-10 right-10 w-72 glass-panel rounded-xl p-4 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ArrowLeftRight size={14} className="text-primary-fixed" />
                  <span className="font-mono text-[10px] text-primary-fixed tracking-wider">
                    SEAT FLIP
                  </span>
                </div>
                <h4 className="font-geist text-sm font-semibold text-on-surface mb-1">
                  Vulnerability Index
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-geist text-4xl font-extrabold text-primary-fixed">
                    42
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Seats at Risk
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-geist text-4xl md:text-5xl font-extrabold gradient-text-cyan mb-4">
              Analytical Depth
            </h2>
            <p className="text-on-surface-variant text-lg max-w-lg">
              Palantir-level intelligence tools designed for democratic oversight.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Mic2,
                label: "SPEECH ANALYZER",
                title: "Real-time Rhetoric Decoding",
                desc: "AI-powered analysis of political speeches. Extract promises, detect policy shifts, and measure persuasion in real-time.",
                stat: "72%",
                statLabel: "Economic Focus",
                color: "primary-fixed",
              },
              {
                icon: ArrowLeftRight,
                label: "SEAT FLIP",
                title: "Vulnerability Index",
                desc: "Track which constituencies are at risk of flipping. AI-generated explanations for every shift.",
                stat: "42",
                statLabel: "Seats at Risk",
                color: "error",
              },
              {
                icon: Brain,
                label: "MOOD ENGINE",
                title: "National Pulse Tracking",
                desc: "Sentiment analysis across 28 states. Issue heatmaps, trend velocity, and regional divergence patterns.",
                stat: "94%",
                statLabel: "Confidence",
                color: "ai-purple",
              },
              {
                icon: Rss,
                label: "INSIGHT FEED",
                title: "Live Intelligence Stream",
                desc: "AI-generated insights updated in real-time. Every trend, spike, and anomaly explained instantly.",
                stat: "24/7",
                statLabel: "Live Monitoring",
                color: "primary-fixed",
              },
              {
                icon: Shield,
                label: "INTEGRITY",
                title: "Anomaly Detection",
                desc: "Statistical analysis of voter registration patterns. Automated flagging of deviations exceeding 3-sigma thresholds.",
                stat: "99.2%",
                statLabel: "Accuracy",
                color: "secondary",
              },
              {
                icon: Zap,
                label: "AI COPILOT",
                title: "Conversational Intelligence",
                desc: "Ask any question about elections. Get AI-powered analysis with supporting data points and visualizations.",
                stat: "∞",
                statLabel: "Queries",
                color: "ai-purple",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                variants={staggerItem}
                className="glass-panel rounded-xl p-6 hover-glow transition-glow group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-4">
                  <feature.icon size={14} className={`text-${feature.color}`} />
                  <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                    {feature.label}
                  </span>
                </div>
                <h3 className="font-geist text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className={`font-geist text-3xl font-extrabold text-${feature.color}`}>
                    {feature.stat}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    {feature.statLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-10 relative">
        <div className="absolute inset-0 bg-radial-glow opacity-20" />
        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-geist text-4xl md:text-5xl font-extrabold mb-6">
            <span className="gradient-text">The Future of Civic Intelligence</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-10">
            Stop watching charts. Start understanding elections.
          </p>
          <Link href="/dashboard">
            <motion.button
              className="px-10 py-4 bg-primary-container text-on-primary-container font-mono text-label-caps tracking-widest rounded-lg inline-flex items-center gap-3"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0, 245, 255, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              ENTER COMMAND CENTER
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <span className="font-geist text-sm font-bold text-on-surface-variant">
              ElectionOS
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant/40 ml-3">
              v4.02 // AI Core
            </span>
          </div>
          <span className="font-mono text-[10px] text-on-surface-variant/30">
            © 2024 Democracy Intelligence Project
          </span>
        </div>
      </footer>
    </div>
  );
}
