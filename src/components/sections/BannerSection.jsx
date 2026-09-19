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
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-[#EBF1F5]">
      
      {/* Container - Image Exact Neumorphic Soft Card Layout */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* AI Badge - Img Theme */}
          <motion.div
            variants={itemVariants}
            className="group mb-6 inline-flex items-center gap-2 rounded-full bg-[#EBF1F5] p-1.5 pl-2 pr-4 text-xs font-semibold text-[#1E293B] shadow-[4px_4px_10px_#c7d0d8,-4px_-4px_10px_#ffffff] border border-white/60"
          >
            <span className="flex h-6 items-center justify-center rounded-full bg-[#0F766E] px-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0px_2px_8px_rgba(15,118,110,0.35)]">
              AI-Powered
            </span>
            <span className="flex items-center gap-1.5 font-semibold tracking-tight text-[#64748B]">
              #1 Marketplace for AI Prompts
              <ArrowUpRight className="h-3.5 w-3.5 text-[#0F766E]" />
            </span>
          </motion.div>

          {/* Heading - Img Font & Colors */}
          <motion.h1
            variants={itemVariants}
            className="max-w-[1050px] text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1E293B] sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Automate & Elevate with
            <span className="mt-2 block text-[#0F766E] font-black">
              Premium AI Prompts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-[680px] text-base font-medium leading-relaxed text-[#64748B] sm:text-lg"
          >
            Unlock ultimate workflow productivity. Explore thousands of optimized prompt kits for
            ChatGPT, Midjourney, and Claude. Turn prompts into digital assets.
          </motion.p>

          {/* Search Bar Section - Img Inset Shadow Input */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 w-full max-w-2xl px-2"
          >
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex items-center p-2 rounded-2xl bg-[#EBF1F5] shadow-[8px_8px_20px_#c7d0d8,-8px_-8px_20px_#ffffff] border border-white/60 focus-within:shadow-[inset_3px_3px_6px_#c7d0d8,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
            >
              <div className="flex pl-3 items-center pointer-events-none text-[#64748B]">
                <Magnifier className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for 'Midjourney logo', 'Copywriting prompt'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-3 pr-4 py-3 text-xs md:text-sm text-[#1E293B] outline-none placeholder-[#64748B] font-medium"
              />
              <button
                type="submit"
                className="hidden sm:flex items-center gap-1.5 bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-xl text-xs md:text-sm transition-all shadow-[0px_4px_14px_rgba(15,118,110,0.35)] active:scale-95"
              >
                Search
              </button>
            </form>

            {/* Trending Tags - Image Pill Style */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-1">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Trending:
              </span>
              {TRENDING_TAGS.map((tag) => (
                <Link
                  key={tag.id}
                  href={tag.href}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#EBF1F5] text-[#64748B] shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] border border-white/60 hover:text-[#0F766E] transition-all active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Link
              href="/prompts"
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] px-8 py-3.5 font-semibold text-white shadow-[0px_6px_18px_rgba(15,118,110,0.35)] transition-all duration-300 sm:w-auto active:scale-95"
            >
              Explore All Prompts
              <Sparkles className="h-4 w-4 text-white/90 transition-transform group-hover:rotate-12" />
            </Link>

            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-xl bg-[#EBF1F5] px-8 py-3.5 font-semibold text-[#1E293B] shadow-[5px_5px_12px_#c7d0d8,-5px_-5px_12px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#0F766E] sm:w-auto active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]"
            >
              Become a Creator
            </Link>
          </motion.div>

          {/* Metrics - Soft Card View */}
          <motion.div
            variants={itemVariants}
            className="relative mt-14 w-full max-w-3xl rounded-2xl bg-[#EBF1F5] p-6 shadow-[8px_8px_20px_#c7d0d8,-8px_-8px_20px_#ffffff] border border-white/60"
          >
            <div className="relative flex justify-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
                Trusted ecosystem metrics
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-[#1E293B] sm:text-4xl">
                  15K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  AI Prompts
                </p>
              </div>

              <div className="border-x border-black/5 px-2 text-center">
                <h3 className="text-2xl font-extrabold text-[#1E293B] sm:text-4xl">
                  6K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Creators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-[#1E293B] sm:text-4xl">
                  120K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Downloads
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Side Card */}
        <motion.div
          className="absolute left-6 top-28 hidden xl:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{
            x: { duration: 1, delay: 0.4 },
            y: { duration: 5, repeat: Infinity },
          }}
        >
          <div className="w-[260px] rounded-2xl bg-[#EBF1F5] p-4 shadow-[8px_8px_18px_#c7d0d8,-8px_-8px_18px_#ffffff] border border-white/60">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                Verified Expert
              </p>
            </div>

            <p className="mt-3 text-xs font-bold leading-snug text-[#1E293B]">
              ✨ Write Viral Twitter Hooks in 5 Seconds
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-2.5">
              <span className="text-xs font-bold text-[#64748B]">⭐ 4.9</span>
              <span className="text-sm font-extrabold text-[#0F766E]">
                $19
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}