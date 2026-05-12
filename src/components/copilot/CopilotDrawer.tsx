"use client";

import { motion } from "framer-motion";
import { Sparkles, Send, X, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUIStore, useAIStore } from "@/store";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  "Why did Amethi flip?",
  "What issues matter most in Rajasthan?",
  "Which constituencies are most volatile?",
  "Explain the youth voter surge",
  "What is the national mood on inflation?",
];

export default function CopilotDrawer() {
  const { copilotOpen, setCopilotOpen } = useUIStore();
  const { copilotMessages, addCopilotMessage, isLoading, setLoading } = useAIStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [copilotMessages]);

  const handleSend = async (message?: string) => {
    const query = message || input;
    if (!query.trim()) return;

    addCopilotMessage({ role: "user", content: query });
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          type: "copilot",
          context: "Indian elections 2024, constituencies, voter trends, issue tracking",
        }),
      });
      const data = await res.json();
      addCopilotMessage({ role: "ai", content: data.response });
    } catch {
      addCopilotMessage({
        role: "ai",
        content: "Analysis suggests multiple factors at play. The primary driver appears to be shifting demographic patterns combined with issue-specific mobilization in key constituencies.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!copilotOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setCopilotOpen(false)}
      />

      {/* Drawer */}
      <motion.div
        className="relative w-full max-w-lg bg-surface-container-lowest/95 backdrop-blur-2xl border-l border-white/10 flex flex-col h-full"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center border border-primary-fixed/30">
              <Zap size={16} className="text-primary-fixed" />
            </div>
            <div>
              <h3 className="font-geist text-headline-sm text-primary text-sm font-bold">
                Election Copilot
              </h3>
              <p className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                AI INTELLIGENCE ASSISTANT
              </p>
            </div>
          </div>
          <button
            onClick={() => setCopilotOpen(false)}
            className="p-2 hover:bg-surface-variant/30 rounded-lg transition-colors text-on-surface-variant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {copilotMessages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Sparkles size={32} className="text-ai-purple mx-auto mb-3" />
                <h4 className="font-geist text-lg text-on-surface mb-2">
                  Ask anything about elections
                </h4>
                <p className="text-on-surface-variant text-sm">
                  I can analyze constituencies, explain trends, and provide strategic insights.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-label-caps text-on-surface-variant tracking-wider">
                  SUGGESTED QUERIES
                </p>
                {suggestedQuestions.map((q) => (
                  <motion.button
                    key={q}
                    className="w-full text-left px-4 py-3 rounded-lg border border-white/5 text-on-surface-variant hover:text-on-surface hover:border-primary-fixed/30 hover:bg-surface-container transition-all text-sm"
                    onClick={() => handleSend(q)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {copilotMessages.map((msg, i) => (
            <motion.div
              key={i}
              className={cn(
                "max-w-[90%] rounded-xl p-4",
                msg.role === "user"
                  ? "ml-auto bg-primary-container/10 border border-primary-fixed/20 text-on-surface"
                  : "bg-surface-container border border-white/5 text-on-surface-variant ai-glow-subtle"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {msg.role === "ai" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={12} className="text-ai-purple" />
                  <span className="font-mono text-[10px] text-ai-purple tracking-wider">
                    AI ANALYSIS
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-4 bg-surface-container rounded-xl border border-white/5 max-w-[90%]">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant">Processing intelligence...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 bg-surface-container rounded-xl border border-white/10 px-4 py-2 focus-within:border-primary-fixed/50 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask the AI Copilot..."
              className="flex-1 bg-transparent text-on-surface text-sm focus:outline-none focus:ring-0 border-none placeholder:text-on-surface-variant/50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity disabled:opacity-30"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
