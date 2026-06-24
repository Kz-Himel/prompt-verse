"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
} from "@gravity-ui/icons";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-32 lg:pt-44 lg:pb-40 isolation-isolate">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,#000_60%,transparent_100%)]" />

      {/* Glow Effects */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-indigo-500/20 blur-[140px] pointer-events-none" />

      <div className="absolute left-1/3 top-12 hidden h-[300px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px] dark:block pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/60 p-1 pl-1.5 pr-3 text-xs font-medium text-zinc-900 shadow-sm backdrop-blur-md transition-all hover:border-violet-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-violet-800"
          >
            <span className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              New
            </span>

            <span className="flex items-center gap-1.5 font-medium tracking-tight">
              🚀 #1 Marketplace for AI Prompts
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-violet-500" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="max-w-[1050px] text-5xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-6xl md:text-7xl lg:text-[84px]"
          >
            Discover, Share & Sell
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 bg-clip-text pb-2 font-black text-transparent">
              Premium AI Prompts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-[680px] text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl"
          >
            Explore thousands of meticulously optimized prompt kits for
            ChatGPT, Gemini, Claude, and Midjourney. Turn your engineering
            workflows into digital assets.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-11 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Link
              href="/prompts"
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-7 py-4 font-semibold text-white shadow-xl shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 sm:w-auto"
            >
              Explore Prompts
              <Sparkles className="h-4 w-4 text-violet-400 transition-transform group-hover:rotate-12 dark:text-violet-600" />
            </Link>

            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white/80 px-7 py-4 font-semibold text-zinc-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white sm:w-auto"
            >
              Become Creator
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="relative mt-24 w-full max-w-4xl"
          >
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-zinc-50 px-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:bg-zinc-950 dark:text-zinc-500">
                Trusted ecosystem metrics
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  15K+
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  AI Prompts
                </p>
              </div>

              <div className="border-x border-zinc-200/80 px-4 text-center dark:border-zinc-800/80">
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  6K+
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Creators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  120K+
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Downloads
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Left Card */}
        <motion.div
          className="absolute left-6 top-48 hidden xl:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 5, repeat: Infinity },
          }}
        >
          <div className="w-[280px] rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Verified Expert
              </p>
            </div>

            <p className="mt-3.5 font-bold leading-snug text-zinc-950 dark:text-white">
              ✨ Write Viral Twitter Hooks in 5 Seconds
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
              <span className="text-sm font-bold text-zinc-500">
                ⭐ 4.9
              </span>

              <span className="text-base font-extrabold text-violet-600 dark:text-violet-400">
                $19
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}