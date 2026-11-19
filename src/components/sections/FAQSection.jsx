"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiOutlineSparkles, HiOutlineUserGroup, HiCodeBracket } from "react-icons/hi2";

const FAQS = [
  {
    q: "How do I know a prompt actually works before buying?",
    a: "Every listing shows a live rating, review count, and a sample output preview. Free prompts can be tried instantly, and premium prompts are backed by our creator verification badge.",
  },
  {
    q: "What AI tools are the prompts compatible with?",
    a: "Prompts are tagged by platform — ChatGPT, Claude, Gemini, Midjourney, DALL·E and more — so you can filter by whichever tool you already use.",
  },
  {
    q: "Can I sell my own prompts on PromptVerse?",
    a: "Yes. Register as a creator, publish your prompt with a description and tags, and start earning from every purchase or subscription — no upfront cost.",
  },
  {
    q: "Is there a refund policy?",
    a: "If a purchased prompt doesn't match its listing, you can open a report from your dashboard within 7 days and our team will review it for a refund.",
  },
  {
    q: "Do I need an account to browse prompts?",
    a: "No — browsing and searching are open to everyone. You'll only need an account to purchase, bookmark, or publish prompts.",
  },
];

function FAQVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[440px] lg:mx-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute -left-2 -top-2 h-40 w-40 rounded-2xl opacity-30 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          color: "var(--primary)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute inset-6 rounded-[2rem] bg-[var(--primary)]/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-4 overflow-hidden rounded-[1.75rem] neu-card p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">
              PromptVerse OS
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--primary)]">Prompt::</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">optimize_workflow()</span>
            </div>
            <div className="neu-card-inset p-3 text-xs font-mono text-[var(--text-muted)] leading-relaxed">
              <p>› Models: Claude 3.5, GPT-4o</p>
              <p>› Speed: Instant Execution</p>
              <p>› Token Optimization: +42%</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[11px] font-bold text-[var(--text)]">Status: Verified</span>
          <span className="text-[11px] font-mono text-[var(--primary)]">Ready to use</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          x: { duration: 0.5, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-2 top-10 flex items-center gap-2 rounded-2xl neu-card px-4 py-2.5"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)]">
          <HiOutlineSparkles size={14} />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[var(--text)]">4.9 / 5</p>
          <p className="text-[9px] font-semibold text-[var(--text-muted)]">Avg. rating</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.45 },
          x: { duration: 0.5, delay: 0.45 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-2xl neu-card px-4 py-2.5"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)]">
          <HiOutlineUserGroup size={14} />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[var(--text)]">12,500+</p>
          <p className="text-[9px] font-semibold text-[var(--text-muted)]">Happy users</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            FAQ
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl leading-tight">
            Got Questions?
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Everything you need to know before you dive in.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <FAQVisual />
          </div>

          <div>
            <div className="space-y-4">
              {FAQS.map((item, i) => {
                const isOpen = openIndex === i;

                return (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="overflow-hidden rounded-2xl neu-card"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-[var(--text)]">
                        {item.q}
                      </span>
                      <HiChevronDown
                        size={20}
                        className={`shrink-0 text-[var(--primary)] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <p className="px-6 pb-5 text-xs sm:text-sm font-medium leading-relaxed text-[var(--text-muted)]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
