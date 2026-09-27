"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiArrowUpRight, FiZap } from "react-icons/fi";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${backendUrl}/top-creators`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setCreators(resData.data);
        }
      })
      .catch((err) => console.error("Error fetching top creators:", err))
      .finally(() => setLoading(false));
  }, []);

  const top = creators[0];
  const rest = creators.slice(1);
  const marqueeItems = rest.length ? [...rest, ...rest] : [];

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 lg:py-32">
      {/* Background ambient glow shapes for unique atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Editorial Heading Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 dark:border-white/5 pb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-[var(--primary)] animate-ping" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                Elite Pioneers
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
              Architects of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-amber-500">AI Prompting</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            The visionary minds crafting state-of-the-art context streams. Explore, follow, and elevate your workflow.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
              <FiZap className="text-[var(--primary)] text-xl animate-pulse" />
            </div>
          </div>
        ) : !top ? (
          <div className="text-center py-12 text-sm text-[var(--text-muted)] font-medium">
            No elite creators discovered yet.
          </div>
        ) : (
          <>
            {/* #1 Creator — Unique Floating Bento Hero Spot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group mb-20 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.05] text-[12rem] font-black pointer-events-none select-none">
                01
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                {/* Avatar with Floating Crown/Award */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-[var(--primary)]/10 to-amber-500/10 border border-black/10 dark:border-white/10 shadow-2xl"
                  >
                    <span
                      className="text-4xl font-black tracking-wider"
                      style={{ color: top.color || "var(--primary)" }}
                    >
                      {top.initials}
                    </span>
                  </motion.div>
                  <div className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-500/30 rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <FiAward className="text-lg" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
                    Creator of the Month
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight">
                    {top.name}
                  </h3>
                  <p className="text-base font-semibold text-[var(--text-muted)] mt-1">
                    {top.role}
                  </p>

                  {/* Metrics bar */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                    <div>
                      <span className="block text-2xl font-black text-[var(--text)]">
                        {top.prompts}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Published Prompts
                      </span>
                    </div>
                    <div className="h-8 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />
                    <div>
                      <span className="block text-2xl font-black text-amber-500 flex items-center gap-1">
                        ★ {top.rating}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Global Rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Unique Asymmetric Marquee Stream for the Rest */}
            {marqueeItems.length > 0 && (
              <div className="relative py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="flex gap-6 w-max animate-creators-marquee hover:[animation-play-state:paused]">
                  {marqueeItems.map((c, i) => (
                    <div
                      key={`${c.name}-${i}`}
                      className="group/item flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 hover:border-[var(--primary)]/40 transition-colors shrink-0 cursor-pointer"
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-sm font-black transition-transform group-hover/item:scale-110"
                        style={{ color: c.color || "var(--primary)" }}
                      >
                        {c.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[var(--text)] group-hover/item:text-[var(--primary)] transition-colors">
                            {c.name}
                          </p>
                          <FiArrowUpRight className="text-xs opacity-0 group-hover/item:opacity-100 transition-opacity text-[var(--primary)]" />
                        </div>
                        <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">
                          {c.prompts} prompts · <span className="text-amber-500 font-bold">★ {c.rating}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes creators-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-creators-marquee {
          animation: creators-marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}