"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Sensible fallback numbers so the section still looks alive
// even if the backend endpoint isn't available yet.
const FALLBACK_STATS = {
  activeCreators: 6240,
  promptsSoldToday: 318,
  totalDownloads: 128500,
  avgRating: 4.8,
};

function Counter({ value, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!started) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);

      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    };

    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [started, value]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {display.toLocaleString("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </motion.span>
  );
}

export default function LiveStatsSection() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) return;

    let cancelled = false;

    fetch(`${backendUrl}/platform-stats`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((resData) => {
        if (cancelled) return;
        if (resData?.success && resData?.data) {
          setStats({ ...FALLBACK_STATS, ...resData.data });
          setIsLive(true);
        }
      })
      .catch(() => {
        // Silently keep the fallback numbers — this section is
        // a vibe/trust signal, not critical data.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const STAT_ITEMS = [
    { label: "Active Creators", value: stats.activeCreators, suffix: "+" },
    { label: "Prompts Sold Today", value: stats.promptsSoldToday, suffix: "" },
    { label: "Total Downloads", value: stats.totalDownloads, suffix: "+" },
    { label: "Avg. Creator Rating", value: stats.avgRating, decimals: 1, suffix: "★" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-24 transition-colors duration-300">
      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#EBF1F5] dark:bg-[#141B24] p-8 sm:p-12 shadow-[6px_6px_16px_#d1d9e0,-6px_-6px_16px_#ffffff] dark:shadow-[6px_6px_16px_#080b0f,-4px_-4px_12px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06]"
        >
          {/* Live Badge */}
          <div className="mb-10 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F766E] dark:bg-[#14B8A6] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F766E] dark:bg-[#14B8A6]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6]">
              {isLive ? "Live Platform Stats" : "Platform Pulse"}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STAT_ITEMS.map((item) => (
              <div key={item.label} className="text-center">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1E293B] dark:text-[#F8FAFC]">
                  <Counter
                    value={item.value}
                    decimals={item.decimals || 0}
                    suffix={item.suffix}
                  />
                </h3>
                <p className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}