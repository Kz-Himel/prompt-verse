"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
//   Zap 
} from "@gravity-ui/icons";

export default function HeroSection() {
  // Framer Motion Variants for smooth orchestrated entrance
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
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-32 lg:pt-44 lg:pb-40 isolation-isolate">
      
      {/* ─── PREMIUM LINEAR/STRIPE BACKGROUNDS ─── */}
      {/* Outer Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Subtle Dot Matrix Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808008_1px,transparent_1px)] [size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,#000_60%,transparent_100%)]" />

      {/* Layered High-End Ambient Glows */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-indigo-500/20 blur-[140px] rounded-full pointer-events-none mix-blend-screen dark:mix-blend-normal" />
      <div className="absolute left-1/3 top-12 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      {/* ─── MAIN HERO CONTAINER ─── */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div 
          className="text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/60 p-1 pr-3 pl-1.5 text-xs font-medium text-zinc-900 shadow-sm backdrop-blur-md transition-all hover:border-violet-300 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-violet-800"
          >
            <span className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              New
            </span>
            <span className="flex items-center gap-1.5 font-medium tracking-tight">
              🚀 #1 Marketplace for AI Prompts
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-violet-500 transition-colors" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="max-w-[1050px] text-5xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-6xl md:text-7xl lg:text-[84px]"
          >
            Discover, Share & Sell
            <span className="block mt-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pb-2 font-black">
              Premium AI Prompts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 max-w-[680px] text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl font-normal text-pretty"
          >
            Explore thousands of meticulously optimized prompt kits for ChatGPT, 
            Gemini, Claude, and Midjourney. Turn your engineering workflows into digital assets.
          </motion.p>

          {/* Action Buttons (Framer Layout Style) */}
          <motion.div 
            variants={itemVariants}
            className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/prompts"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-zinc-900 px-7 py-4 font-semibold text-white shadow-xl shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Explore Prompts
              <Sparkles className="h-4 w-4 text-violet-400 dark:text-violet-600 group-hover:rotate-12 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="flex items-center justify-center w-full sm:w-auto rounded-xl border border-zinc-200 bg-white/80 px-7 py-4 font-semibold text-zinc-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
            >
              Become Creator
            </Link>
          </motion.div>

          {/* Stats Section with Divider */}
          <motion.div 
            variants={itemVariants}
            className="relative mt-24 w-full max-w-4xl"
          >
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-50 px-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:bg-zinc-950 dark:text-zinc-500">
                Trusted ecosystem metrics
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-y-8 gap-x-4 md:gap-x-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  15K+
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  AI Prompts
                </p>
              </div>
              <div className="text-center border-x border-zinc-200/80 dark:border-zinc-800/80 px-4">
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  6K+
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Creators
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                  120K+
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Downloads
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── FLOATING CARDS (GRAVITY UI INTEGRATION) ─── */}
        {/* Left Floating Prompt Card */}
        <motion.div
          className="absolute left-6 top-48 hidden xl:block z-20"
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-[280px] rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 group hover:border-violet-500 dark:hover:border-violet-500 transition-colors duration-300">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xs font-semibold tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">
                Verified Expert
              </p>
            </div>
            <p className="mt-3.5 font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
              ✨ Write Viral Twitter Hooks in 5 Seconds
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">⭐ 4.9 <span className="text-xs font-normal text-zinc-400">(410)</span></span>
              <span className="font-extrabold text-violet-600 dark:text-violet-400 text-base">
                $19
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Floating Prompt Card */}
        <motion.div
          className="absolute right-6 top-72 hidden xl:block z-20"
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: [0, 14, 0] }}
          transition={{
            x: { duration: 1, delay: 0.6 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-[250px] rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/70 group hover:border-fuchsia-500 dark:hover:border-fuchsia-500 transition-colors duration-300">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                {/* <Zap className="h-4 w-4" /> */}
              </div>
              <p className="text-xs font-semibold tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">
                Midjourney v6
              </p>
            </div>
            <p className="mt-3.5 font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
              🎨 Cinematic Hyper-Realism Bundle
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">8.2K Downloads</span>
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                POPULAR
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}