'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant Access',
    desc: 'Browse and use thousands of ready-made prompts across every AI tool — no waiting, no setup.',
  },
  {
    icon: '🔐',
    title: 'Secure & Trusted',
    desc: 'JWT-based auth, role-based access, and encrypted data keeps your account and prompts safe.',
  },
  {
    icon: '💰',
    title: 'Earn as Creator',
    desc: 'Monetize your expertise by publishing premium prompts. Get paid for every subscription.',
  },
  {
    icon: '🤖',
    title: 'Multi-Tool Support',
    desc: 'Prompts optimized for ChatGPT, Claude, Gemini, Midjourney, DALL·E, and more platforms.',
  },
  {
    icon: '📊',
    title: 'Creator Analytics',
    desc: 'Track copies, bookmarks, and engagement on your prompts with real-time charts.',
  },
  {
    icon: '⭐',
    title: 'Community Reviews',
    desc: 'Ratings and reviews from real users help you discover what actually works in the wild.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] border border-white/50">
            Why PromptVerse?
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl leading-tight">
            Everything You Need to <br className="hidden sm:inline" />
            <span className="text-[#0F766E]">Master AI Prompting</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#64748B] font-medium">
            A platform built from the ground up for AI enthusiasts, developers, and creative professionals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.4,
              }}
              className="group relative rounded-2xl bg-[#EBF1F5] p-7 shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] border border-white/40 transition-all duration-300 hover:scale-[1.01]"
            >
              {/* Neumorphic Inset Icon Box */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF1F5] text-xl shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] border border-white/30 group-hover:text-[#0F766E] transition-colors">
                {f.icon}
              </div>

              <h3 className="mb-2 text-base font-extrabold text-[#1E293B]">
                {f.title}
              </h3>

              <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#64748B]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}