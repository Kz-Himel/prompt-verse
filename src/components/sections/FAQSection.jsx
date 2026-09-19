"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-3xl px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
            FAQ
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-tight">
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
    </section>
  );
}