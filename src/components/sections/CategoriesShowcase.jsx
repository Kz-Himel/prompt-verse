"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "💬",
    count: "4,200+",
    desc: "Copywriting, coding & assistant prompts",
    accent: "#0F766E",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    icon: "🎨",
    count: "3,100+",
    desc: "Cinematic art & photoreal styles",
    accent: "#7C3AED",
  },
  {
    id: "claude",
    name: "Claude",
    icon: "🧠",
    count: "1,850+",
    desc: "Reasoning, research & long-form writing",
    accent: "#D97706",
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: "✨",
    count: "1,240+",
    desc: "Multimodal & Google Workspace flows",
    accent: "#2563EB",
  },
  {
    id: "dalle",
    name: "DALL·E",
    icon: "🖼️",
    count: "980+",
    desc: "Illustration & product mockup prompts",
    accent: "#DB2777",
  },
  {
    id: "automation",
    name: "Automation",
    icon: "⚙️",
    count: "760+",
    desc: "n8n, Zapier & AI agent workflows",
    accent: "#0891B2",
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
            Browse by Category
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-tight">
            Find Prompts for Your{" "}
            <span className="text-[#0F766E] dark:text-[#14B8A6]">Favorite AI Tool</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8] font-medium">
            Every prompt is tagged and organized by platform, so you jump straight to
            what works for the tool you already use.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link
                href={`/prompts?category=${cat.id}`}
                className="group relative flex items-center gap-5 rounded-2xl bg-[#EBF1F5] dark:bg-[#141B24] p-6 shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#080b0f,-3px_-3px_9px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06] transition-all duration-300 hover:scale-[1.02]"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)]"
                  style={{ backgroundColor: `${cat.accent}1A` }}
                >
                  {cat.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-[#1E293B] dark:text-[#F8FAFC] group-hover:text-[#0F766E] dark:group-hover:text-[#14B8A6] transition-colors">
                      {cat.name}
                    </h3>
                    <span
                      className="shrink-0 text-[11px] font-extrabold"
                      style={{ color: cat.accent }}
                    >
                      {cat.count}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8] truncate">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}