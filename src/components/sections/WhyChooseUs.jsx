"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiDollarSign,
  FiCpu,
  FiBarChart2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const FEATURES = [
  {
    Icon: FiZap,
    title: "Instant Access",
    desc: "Browse and use thousands of ready-made prompts across every AI tool — no waiting, no setup.",
  },
  {
    Icon: FiShield,
    title: "Secure & Trusted",
    desc: "JWT-based auth, role-based access, and encrypted data keeps your account and prompts safe.",
  },
  {
    Icon: FiDollarSign,
    title: "Earn as Creator",
    desc: "Monetize your expertise by publishing premium prompts. Get paid for every subscription.",
  },
  {
    Icon: FiCpu,
    title: "Multi-Tool Support",
    desc: "Prompts optimized for ChatGPT, Claude, Gemini, Midjourney, DALL·E, and more platforms.",
  },
  {
    Icon: FiBarChart2,
    title: "Creator Analytics",
    desc: "Track copies, bookmarks, and engagement on your prompts with real-time charts.",
  },
  {
    Icon: FiStar,
    title: "Community Reviews",
    desc: "Ratings and reviews from real users help you discover what actually works in the wild.",
  },
];

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % FEATURES.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
  };

  const current = FEATURES[active];
  const isReversed = active % 2 === 1;
  const CurrentIcon = current.Icon;

  return (
    <section className="relative bg-[var(--bg)] py-20 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full flex flex-col items-center">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-card border border-black/5 dark:border-white/5">
            Why PromptVerse?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Everything you need to{" "}
            <span className="text-[var(--primary)]">master AI prompting</span>
          </h2>
        </div>

        {/* Carousel Content Stage */}
        <div className="w-full relative flex items-center justify-center min-h-[380px]">
          <div
            className={`w-full flex flex-col ${
              isReversed ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-10 md:gap-16`}
          >
            {/* Content half */}
            <div className="flex-1 w-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${active}`}
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center md:text-left w-full"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl neu-card text-2xl text-[var(--primary)] border border-black/5 dark:border-white/5">
                    <CurrentIcon />
                  </div>
                  <h3 className="mb-3 text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-[var(--text-muted)] max-w-md mx-auto md:mx-0">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual half */}
            <div className="flex-1 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${active}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72"
                >
                  {/* Ambient rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--primary)]/20"
                  />
                  {/* Floating glow */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute inset-6 rounded-full bg-[var(--primary)]/10 blur-2xl"
                  />
                  {/* Core icon plate */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl neu-card border border-black/5 dark:border-white/5 flex items-center justify-center text-5xl sm:text-6xl text-[var(--primary)]"
                  >
                    <CurrentIcon />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Carousel Navigation (Arrows & Dots) */}
        <div className="mt-12 flex items-center justify-between w-full max-w-xs">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full neu-card hover:text-[var(--primary)] text-[var(--text)] border border-black/5 dark:border-white/5 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "w-8 bg-[var(--primary)]"
                    : "w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full neu-card hover:text-[var(--primary)] text-[var(--text)] border border-black/5 dark:border-white/5 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}