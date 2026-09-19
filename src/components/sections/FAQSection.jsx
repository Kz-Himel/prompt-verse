"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi2";

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

/**
 * Decorative 5-layer stack next to the FAQ list:
 * 1. Dot-grid pattern (back)
 * 2. Soft color glow blob
 * 3. Main photo card
 * 4. Floating "rating" chip
 * 5. Floating "users" chip
 */
function FAQVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[440px] lg:mx-0">
      {/* Layer 1: Dot-grid pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute -left-4 -top-4 h-40 w-40 rounded-2xl opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          color: "#0F766E",
        }}
      />

      {/* Layer 2: Soft glow blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute inset-6 rounded-[2rem] bg-[#0F766E]/20 dark:bg-[#14B8A6]/15 blur-2xl"
      />

      {/* Layer 3: Main photo card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-4 overflow-hidden rounded-[1.75rem] shadow-[8px_8px_24px_#c7d0d8,-8px_-8px_24px_#ffffff] dark:shadow-[8px_8px_24px_#080b0f,-6px_-6px_18px_rgba(255,255,255,0.02)] border border-white/50 dark:border-white/[0.06]"
      >
        <img
          src="https://picsum.photos/seed/promptverse-faq/600/720"
          alt="Creator working with AI prompts"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C]/50 via-transparent to-transparent" />
      </motion.div>

      {/* Layer 4: Floating rating chip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          x: { duration: 0.5, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-4 top-8 flex items-center gap-2 rounded-2xl bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-3 shadow-[5px_5px_14px_#c7d0d8,-5px_-5px_14px_#ffffff] dark:shadow-[5px_5px_14px_#080b0f,-4px_-4px_10px_rgba(255,255,255,0.02)] border border-white/60 dark:border-white/[0.06]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0F766E]/10 dark:bg-[#14B8A6]/15 text-[#0F766E] dark:text-[#14B8A6]">
          <HiOutlineSparkles size={16} />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#1E293B] dark:text-[#F8FAFC]">4.9 / 5</p>
          <p className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">Avg. rating</p>
        </div>
      </motion.div>

      {/* Layer 5: Floating users chip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.45 },
          x: { duration: 0.5, delay: 0.45 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-6 bottom-6 flex items-center gap-2 rounded-2xl bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-3 shadow-[5px_5px_14px_#c7d0d8,-5px_-5px_14px_#ffffff] dark:shadow-[5px_5px_14px_#080b0f,-4px_-4px_10px_rgba(255,255,255,0.02)] border border-white/60 dark:border-white/[0.06]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0F766E]/10 dark:bg-[#14B8A6]/15 text-[#0F766E] dark:text-[#14B8A6]">
          <HiOutlineUserGroup size={16} />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#1E293B] dark:text-[#F8FAFC]">12,500+</p>
          <p className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">Happy users</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center lg:hidden"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
            FAQ
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl leading-tight">
            Got Questions?
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8] font-medium">
            Everything you need to know before you dive in.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left: 5-layer visual */}
          <div className="hidden lg:block">
            <FAQVisual />
          </div>

          {/* Right: FAQ list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 hidden text-left lg:block"
            >
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
                FAQ
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl leading-tight">
                Got Questions?
              </h2>

              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8] font-medium">
                Everything you need to know before you dive in.
              </p>
            </motion.div>

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
                    className="overflow-hidden rounded-2xl bg-[#EBF1F5] dark:bg-[#141B24] shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#080b0f,-3px_-3px_9px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#1E293B] dark:text-[#F8FAFC]">
                        {item.q}
                      </span>
                      <HiChevronDown
                        size={20}
                        className={`shrink-0 text-[#0F766E] dark:text-[#14B8A6] transition-transform duration-300 ${
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
                          <p className="px-6 pb-5 text-xs sm:text-sm font-medium leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
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