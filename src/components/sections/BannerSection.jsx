"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Magnifier,
} from "@gravity-ui/icons";

const TRENDING_TAGS = [
  { id: "1", name: "Midjourney v6", href: "/prompts?tag=midjourney" },
  { id: "2", name: "ChatGPT Marketing", href: "/prompts?tag=marketing" },
  { id: "3", name: "Claude 3.5 Sonnet", href: "/prompts?tag=claude" },
  { id: "4", name: "SEO Automation", href: "/prompts?tag=seo" },
  { id: "5", name: "SaaS Copywriting", href: "/prompts?tag=saas" },
];

export default function BannerSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/prompts?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section className="relative overflow-hidden pt-36 pb-28 lg:pt-44 lg:pb-36 isolation-isolate bg-white">
      {/* Light Premium Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Soft Vibrant Glow Backgrounds */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-r from-violet-500/8 via-fuchsia-500/5 to-indigo-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute right-10 bottom-10 h-[300px] w-[300px] rounded-full bg-indigo-500/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="group mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/50 p-1 pl-1.5 pr-3 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-md transition-all hover:border-violet-300"
          >
            <span className="flex h-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              New
            </span>
            <span className="flex items-center gap-1.5 font-semibold tracking-tight">
              🚀 #1 Marketplace for AI Prompts
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-violet-600" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="max-w-[1050px] text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[76px]"
          >
            Automate & Elevate with
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text pb-2 font-black text-transparent">
              Premium AI Prompts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[680px] text-base font-medium leading-relaxed text-slate-500 sm:text-lg"
          >
            Unlock ultimate workflow productivity. Explore thousands of optimized prompt kits for
            ChatGPT, Midjourney, and Claude. Turn prompts into digital assets.
          </motion.p>

          {/* Search Bar Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 w-full max-w-2xl px-2"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center p-2 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 focus-within:border-violet-500/50 focus-within:shadow-violet-500/5 transition-all duration-300">
              <div className="flex pl-3 items-center pointer-events-none text-slate-400">
                <Magnifier className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for 'Midjourney logo', 'Copywriting prompt'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-3 pr-4 py-3 text-sm text-slate-900 outline-none placeholder-slate-400 font-medium"
              />
              <button
                type="submit"
                className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md"
              >
                Search
              </button>
            </form>

            {/* Trending Prompt Tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Trending:
              </span>
              {TRENDING_TAGS.map((tag) => (
                <Link
                  key={tag.id}
                  href={tag.href}
                  className="text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200/60 bg-slate-50/40 text-slate-600 hover:text-violet-600 hover:border-violet-300 shadow-xs transition-all"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Call-To-Action (CTA) Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Link
              href="/prompts"
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 sm:w-auto"
            >
              Explore All Prompts
              <Sparkles className="h-4 w-4 text-white/90 transition-transform group-hover:rotate-12" />
            </Link>

            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 sm:w-auto"
            >
              Become a Creator
            </Link>
          </motion.div>

          {/* Stats Metrics */}
          <motion.div
            variants={itemVariants}
            className="relative mt-20 w-full max-w-4xl"
          >
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200/60" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                Trusted ecosystem metrics
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-12">
              <div className="text-center">
                <h3 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
                  15K+
                </h3>
                <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">
                  AI Prompts
                </p>
              </div>

              <div className="border-x border-slate-200/80 px-4 text-center">
                <h3 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
                  6K+
                </h3>
                <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">
                  Creators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
                  120K+
                </h3>
                <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">
                  Downloads
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Side Card Decoration */}
        <motion.div
          className="absolute left-6 top-48 hidden xl:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 5, repeat: Infinity },
          }}
        >
          <div className="w-[280px] rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Verified Expert
              </p>
            </div>

            <p className="mt-3.5 font-bold leading-snug text-slate-900">
              ✨ Write Viral Twitter Hooks in 5 Seconds
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-sm font-bold text-slate-500">⭐ 4.9</span>
              <span className="text-base font-black text-violet-600">
                $19
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}