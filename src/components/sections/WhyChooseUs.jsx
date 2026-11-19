"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiDollarSign,
  FiCpu,
  FiBarChart2,
  FiStar,
  FiCheck,
  FiCopy,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import Link from "next/link";

export default function WhyChooseUs() {
  const [copied, setCopied] = useState(false);

  const handleCopyDemo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="why-choose-us" className="relative bg-[var(--bg)] py-20 lg:py-28 overflow-hidden transition-colors duration-300">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--primary)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            <RiSparklingFill className="text-xs" />
            Why Choose PromptVerse
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
            Everything you need to{" "}
            <span className="text-[var(--primary)]">master the AI era</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Built from the ground up for prompt creators, engineers, and power users. Quality verified, structured for instant execution.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Multi-Tool Architecture (Span 2 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 neu-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center text-xl">
                  <FiCpu />
                </div>
                <span className="neu-badge text-[10px] uppercase font-bold tracking-wider px-3 py-1 text-[var(--primary)]">
                  Universal Support
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight mb-2">
                Multi-Model Context Streams
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed max-w-xl">
                Every prompt is engineered specifically for the model's token attention and reasoning patterns — not generic copy-paste text.
              </p>
            </div>

            {/* Model Badges Grid */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "ChatGPT-4o", desc: "Complex Reasoning", speed: "0.2s" },
                { name: "Claude 3.5", desc: "Long-form Artifacts", speed: "0.3s" },
                { name: "Midjourney v6", desc: "Photoreal Aesthetics", speed: "v6 Engine" },
                { name: "Gemini 1.5", desc: "1M Multimodal Tokens", speed: "Instant" },
              ].map((model) => (
                <div
                  key={model.name}
                  className="neu-card-inset p-3.5 rounded-xl flex flex-col justify-between transition-transform duration-200 group-hover:translate-y-[-2px]"
                >
                  <p className="font-extrabold text-xs text-[var(--text)]">{model.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-medium">{model.desc}</p>
                  <span className="mt-2 text-[9px] font-bold text-[var(--primary)]">{model.speed}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: 1-Click Instant Execution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="neu-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center text-xl">
                  <FiZap />
                </div>
                <span className="neu-badge text-[10px] uppercase font-bold tracking-wider px-3 py-1 text-emerald-600 dark:text-emerald-400">
                  Zero Latency
                </span>
              </div>

              <h3 className="text-xl font-black text-[var(--text)] tracking-tight mb-2">
                1-Click Prompt Copy
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                Clean formatting with dynamic variable tags (`[topic]`, `[tone]`) ready to inject into your IDE or chat.
              </p>
            </div>

            {/* Interactive Copy Demo Box */}
            <div className="mt-6 neu-card-inset p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Sample Snippet</span>
                <button
                  type="button"
                  onClick={handleCopyDemo}
                  className="neu-button-secondary px-2.5 py-1 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-[11px] text-[var(--text)] leading-relaxed truncate">
                Act as senior architect. Refactor {"[Component]"} for {"<100ms"} TTFB...
              </p>
            </div>
          </motion.div>

          {/* Card 3: Creator Monetization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="neu-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-xl">
                  <FiDollarSign />
                </div>
                <span className="neu-badge text-[10px] uppercase font-bold tracking-wider px-3 py-1 text-amber-600 dark:text-amber-400">
                  Stripe Powered
                </span>
              </div>

              <h3 className="text-xl font-black text-[var(--text)] tracking-tight mb-2">
                Monetize Your Prompt Craft
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                Earn monthly recurring revenue from subscribers and one-time purchases. Instant payouts directly to your bank.
              </p>
            </div>

            <div className="mt-6 neu-card-inset p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Creator Revenue</p>
                <p className="text-lg font-black text-[var(--text)] mt-0.5">$1,850.00</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                <FiTrendingUp /> +34%
              </div>
            </div>
          </motion.div>

          {/* Card 4: Enterprise-Grade Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="neu-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center text-xl">
                  <FiShield />
                </div>
                <span className="neu-badge text-[10px] uppercase font-bold tracking-wider px-3 py-1 text-blue-500">
                  JWKS & JWT
                </span>
              </div>

              <h3 className="text-xl font-black text-[var(--text)] tracking-tight mb-2">
                Protected & Verified Assets
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                Private prompts are cryptographically masked at the database level. Only authorized members access full payloads.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full Role-Based Encryption Active</span>
            </div>
          </motion.div>

          {/* Card 5: Real-time Creator Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="neu-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center text-xl">
                  <FiBarChart2 />
                </div>
                <span className="neu-badge text-[10px] uppercase font-bold tracking-wider px-3 py-1 text-[var(--primary)]">
                  Live Telemetry
                </span>
              </div>

              <h3 className="text-xl font-black text-[var(--text)] tracking-tight mb-2">
                Deep Growth Insights
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                Watch copy metrics, bookmark retention, and search impressions in real-time charts to optimize your prompts.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between neu-card-inset p-3.5 rounded-xl">
              <div className="text-center flex-1 border-r border-[var(--border)]">
                <p className="text-base font-extrabold text-[var(--text)]">15.8k</p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Total Copies</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-base font-extrabold text-amber-500 flex items-center justify-center gap-1">
                  <FiStar className="text-xs fill-amber-500" /> 4.9
                </p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Quality Score</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 neu-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black text-[var(--text)] tracking-tight">
              Ready to experience high-conversion prompting?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-1">
              Browse thousands of verified prompts or monetize your existing workflow scripts.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/prompts"
              className="neu-button-primary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold gap-2"
            >
              Explore Prompts <FiArrowUpRight />
            </Link>
            <Link
              href="/auth/register"
              className="neu-button-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold"
            >
              Start Creating
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
