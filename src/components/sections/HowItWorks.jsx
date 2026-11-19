'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    title: 'Create Your Account',
    desc: 'Sign up in seconds with email or Google. Your account is free — no credit card needed to start exploring.',
    icon: '🚀',
  },
  {
    step: '02',
    title: 'Discover or Publish',
    desc: 'Browse thousands of verified prompts, or publish your own masterpiece and reach a global audience.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'Use & Earn Instantly',
    desc: 'Copy prompts to your AI tool with one click. Creators earn recurring revenue from premium subscriptions.',
    icon: '💸',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col items-center text-center"
        >
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            How It Works
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Up and Running in Minutes
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Three simple steps to start creating, discovering, and earning with AI prompts.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent pointer-events-none" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="px-4 text-center relative"
            >
              {/* Neumorphic Circle Icon Box */}
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full neu-card text-2xl">
                <span>{s.icon}</span>

                {/* Step Badge */}
                <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-extrabold text-white shadow-md">
                  {s.step.replace('0', '')}
                </div>
              </div>

              <h3 className="mb-3 text-lg font-extrabold text-[var(--text)]">
                {s.title}
              </h3>

              <p className="mx-auto max-w-xs text-xs sm:text-sm font-medium leading-relaxed text-[var(--text-muted)]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Neumorphic Call To Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 rounded-3xl neu-card p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text)] tracking-tight">
            Start Your AI Journey Today
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-medium text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            Join 12,500+ creators who are already discovering and publishing world-class AI prompts.
          </p>

          <div className="mt-8">
            <Link
              href="/auth/register"
              className="neu-button-primary px-8 py-3.5 text-xs sm:text-sm font-extrabold rounded-xl inline-flex items-center gap-2"
            >
              <span>Get Started for Free</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
