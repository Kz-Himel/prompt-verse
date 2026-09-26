"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

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
    <section className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-card border border-black/5 dark:border-white/5">
            Top Creators
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Meet the best prompt creators
          </h2>

          <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            These creators are shaping the future of AI productivity. Follow them and never miss a great prompt.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="px-6 py-3 rounded-full neu-card text-xs font-bold text-[var(--primary)] animate-pulse">
              Loading top creators...
            </div>
          </div>
        ) : !top ? (
          <p className="text-center text-sm text-[var(--text-muted)]">No creators to show yet.</p>
        ) : (
          <>
            {/* Spotlight — #1 creator, no card box, just typography + a floating avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10 mb-16 max-w-3xl mx-auto text-center sm:text-left"
            >
              <div className="relative shrink-0">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="flex h-28 w-28 items-center justify-center rounded-[2rem] neu-card border border-black/5 dark:border-white/5"
                >
                  <span
                    className="text-3xl font-black tracking-wider"
                    style={{ color: top.color || "var(--primary)" }}
                  >
                    {top.initials}
                  </span>
                </motion.div>
                <div className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white text-sm shadow-md">
                  <FiAward />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
                  Creator of the month
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-1">
                  {top.name}
                </h3>
                <p className="text-sm font-semibold text-[var(--text-muted)] mt-0.5">
                  {top.role}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-6 mt-4 text-sm font-bold text-[var(--text)]">
                  <span>
                    <span className="text-[var(--primary)]">{top.prompts}</span> prompts
                  </span>
                  <span className="text-amber-500">★ {top.rating}</span>
                </div>
              </div>
            </motion.div>

            {/* Infinite marquee — rest of the leaderboard, no cards, continuous motion */}
            {marqueeItems.length > 0 && (
              <div className="group relative overflow-hidden py-6 border-y border-black/5 dark:border-white/5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex gap-12 w-max animate-creators-marquee group-hover:[animation-play-state:paused]">
                  {marqueeItems.map((c, i) => (
                    <div key={`${c.name}-${i}`} className="flex items-center gap-3 shrink-0">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full neu-card border border-black/5 dark:border-white/5 text-sm font-black"
                        style={{ color: c.color || "var(--primary)" }}
                      >
                        {c.initials}
                      </div>
                      <div className="whitespace-nowrap">
                        <p className="text-sm font-bold text-[var(--text)]">{c.name}</p>
                        <p className="text-xs font-medium text-[var(--text-muted)]">
                          {c.prompts} prompts · <span className="text-amber-500">★ {c.rating}</span>
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
          animation: creators-marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}