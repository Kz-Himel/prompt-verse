"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiZap, FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

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

  const handleNext = () => {
    if (creators.length === 0) return;
    setActive((prev) => (prev + 1) % creators.length);
  };

  const handlePrev = () => {
    if (creators.length === 0) return;
    setActive((prev) => (prev - 1 + creators.length) % creators.length);
  };

  const current = creators[active];

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 px-6">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col items-center">
        
        {/* Section Heading — WhyChooseUs এর স্টাইলের মতো হুবহু */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-card border border-black/5 dark:border-white/5">
            Elite Pioneers
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Architects of <span className="text-[var(--primary)]">AI Prompting</span>
          </h2>
          <p className="max-w-md text-sm sm:text-base font-medium leading-relaxed text-[var(--text-muted)] mt-3">
            The visionary minds crafting state-of-the-art context streams. Explore, follow, and elevate your workflow.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
              <FiZap className="text-[var(--primary)] text-xl animate-pulse" />
            </div>
          </div>
        ) : !current ? (
          <div className="text-center py-12 text-sm text-[var(--text-muted)] font-medium">
            No elite creators discovered yet.
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            
            {/* Carousel Main Stage — আলাদা এবং প্রিমিয়াম স্পেস লেআউট */}
            <div className="w-full relative flex items-center justify-center min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`creator-${active}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full max-w-3xl p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12"
                >
                  {/* Background Watermark Number */}
                  <div className="absolute right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.05] text-[10rem] font-black pointer-events-none select-none">
                    0{active + 1}
                  </div>

                  {/* Avatar / Initials Box */}
                  <div className="relative shrink-0">
                    <div className="flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-[var(--primary)]/10 to-amber-500/10 border border-black/10 dark:border-white/10 shadow-xl">
                      <span
                        className="text-4xl sm:text-5xl font-black tracking-wider"
                        style={{ color: current.color || "var(--primary)" }}
                      >
                        {current.initials}
                      </span>
                    </div>
                    {active === 0 && (
                      <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-500/30 rotate-12">
                        <FiAward className="text-lg" />
                      </div>
                    )}
                  </div>

                  {/* Creator Info & Stats */}
                  <div className="flex-1 text-center md:text-left z-10">
                    {active === 0 && (
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
                        Creator of the Month
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                      {current.name}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-[var(--text-muted)] mt-1">
                      {current.role || "Elite Prompt Engineer"}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                      <div>
                        <span className="block text-xl sm:text-2xl font-black text-[var(--text)]">
                          {current.prompts}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Published Prompts
                        </span>
                      </div>
                      <div className="h-6 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />
                      <div>
                        <span className="block text-xl sm:text-2xl font-black text-amber-500 flex items-center gap-1 justify-center md:justify-start">
                          <FiStar className="text-sm fill-amber-500" /> {current.rating}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Global Rating
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation (Arrows & Dots) — WhyChooseUs এর স্টাইলের হুবহু */}
            <div className="mt-10 flex items-center justify-between w-full max-w-xs">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="p-3 rounded-full neu-card hover:text-[var(--primary)] text-[var(--text)] border border-black/5 dark:border-white/5 transition-colors cursor-pointer"
                aria-label="Previous Creator"
              >
                <FiChevronLeft size={20} />
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {creators.map((c, i) => (
                  <button
                    key={c.name || i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === active
                        ? "w-8 bg-[var(--primary)]"
                        : "w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60"
                    }`}
                    aria-label={`Go to creator ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="p-3 rounded-full neu-card hover:text-[var(--primary)] text-[var(--text)] border border-black/5 dark:border-white/5 transition-colors cursor-pointer"
                aria-label="Next Creator"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}