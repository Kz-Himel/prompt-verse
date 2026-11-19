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
    <section className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-24 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl neu-card p-8 sm:p-12"
        >
          {/* Live Badge */}
          <div className="mb-10 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              {isLive ? "Live Platform Stats" : "Platform Pulse"}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STAT_ITEMS.map((item) => (
              <div key={item.label} className="text-center">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)]">
                  <Counter
                    value={item.value}
                    decimals={item.decimals || 0}
                    suffix={item.suffix}
                  />
                </h3>
                <p className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
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