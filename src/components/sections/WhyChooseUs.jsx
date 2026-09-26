"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  FiZap,
  FiShield,
  FiDollarSign,
  FiCpu,
  FiBarChart2,
  FiStar,
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

// Scroll distance dedicated to each feature before the next one takes over
const VH_PER_FEATURE = 85;

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      FEATURES.length - 1,
      Math.max(0, Math.floor(v * FEATURES.length))
    );
    setActive(idx);
  });

  const current = FEATURES[active];
  const isReversed = active % 2 === 1;
  const CurrentIcon = current.Icon;

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--bg)]"
      style={{ height: `${FEATURES.length * VH_PER_FEATURE}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Static heading — stays put through the whole scroll */}
        <div className="pt-16 sm:pt-20 pb-4 flex flex-col items-center text-center px-6 shrink-0">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-card border border-black/5 dark:border-white/5">
            Why PromptVerse?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Everything you need to{" "}
            <span className="text-[var(--primary)]">master AI prompting</span>
          </h2>
        </div>

        {/* Alternating content / visual stage */}
        <div className="flex-1 flex items-center px-6">
          <div className="mx-auto max-w-6xl w-full">
            <div
              className={`flex flex-col ${
                isReversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-10 md:gap-16`}
            >
              {/* Content half */}
              <div className="flex-1 w-full relative min-h-[180px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${active}`}
                    initial={{ opacity: 0, y: 90 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -90 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center md:text-left"
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
              <div className="flex-1 w-full relative min-h-[260px] sm:min-h-[320px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`visual-${active}`}
                    initial={{ opacity: 0, y: 90, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -90, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
        </div>

        {/* Progress dots */}
        <div className="pb-10 flex items-center justify-center gap-2 shrink-0">
          {FEATURES.map((f, i) => (
            <span
              key={f.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[var(--primary)]"
                  : "w-1.5 bg-[var(--text-muted)]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}