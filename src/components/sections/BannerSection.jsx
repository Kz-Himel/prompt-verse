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
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 bg-[var(--bg)] transition-colors duration-300">
      
      {/* Container - Neumorphic Soft Card Layout */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* AI Badge */}
          <motion.div
            variants={itemVariants}
            className="group mb-6 inline-flex items-center gap-2 rounded-full neu-badge p-1.5 pl-2 pr-4 text-xs font-semibold"
          >
            <span className="flex h-6 items-center justify-center rounded-full bg-[var(--primary)] px-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              AI-Powered
            </span>
            <span className="flex items-center gap-1.5 font-semibold tracking-tight text-[var(--text-muted)]">
              #1 Marketplace for AI Prompts
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--primary)]" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="max-w-[1050px] text-4xl font-extrabold leading-[1.15] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Automate & Elevate with
            <span className="mt-2 block text-[var(--primary)] font-black">
              Premium AI Prompts
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-[680px] text-base font-medium leading-relaxed text-[var(--text-muted)] sm:text-lg"
          >
            Unlock ultimate workflow productivity. Explore thousands of optimized prompt kits for
            ChatGPT, Midjourney, and Claude. Turn prompts into digital assets.
          </motion.p>

          {/* Search Bar Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 w-full max-w-2xl px-2"
          >
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex items-center p-2 rounded-2xl neu-card focus-within:shadow-[var(--shadow-pressed)] transition-all duration-300"
            >
              <div className="flex pl-3 items-center pointer-events-none text-[var(--text-muted)]">
                <Magnifier className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for 'Midjourney logo', 'Copywriting prompt'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-3 pr-4 py-3 text-xs md:text-sm text-[var(--text)] outline-none placeholder-[var(--text-muted)] font-medium border-none"
              />
              <button
                type="submit"
                className="hidden sm:flex items-center gap-1.5 neu-button-primary px-6 py-3 text-xs md:text-sm font-semibold rounded-xl"
              >
                Search
              </button>
            </form>

            {/* Trending Tags */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-1">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Trending:
              </span>
              {TRENDING_TAGS.map((tag) => (
                <Link
                  key={tag.id}
                  href={tag.href}
                  className="neu-badge text-xs font-semibold px-3.5 py-1.5 text-[var(--text-muted)] hover:text-[var(--primary)]"
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
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl neu-button-primary px-8 py-3.5 font-semibold text-white sm:w-auto text-sm"
            >
              Explore All Prompts
              <Sparkles className="h-4 w-4 text-white/90 transition-transform group-hover:rotate-12" />
            </Link>

            <Link
              href="/auth/register"
              className="flex w-full items-center justify-center rounded-xl neu-button-secondary px-8 py-3.5 font-semibold text-[var(--text)] sm:w-auto text-sm"
            >
              Become a Creator
            </Link>
          </motion.div>

          {/* Metrics - Soft Card View */}
          <motion.div
            variants={itemVariants}
            className="relative mt-14 w-full max-w-3xl rounded-2xl neu-card p-6"
          >
            <div className="relative flex justify-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Trusted ecosystem metrics
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-[var(--text)] sm:text-4xl">
                  15K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  AI Prompts
                </p>
              </div>

              <div className="border-x border-[var(--border)] px-2 text-center">
                <h3 className="text-2xl font-extrabold text-[var(--text)] sm:text-4xl">
                  6K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  Creators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-[var(--text)] sm:text-4xl">
                  120K+
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
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
          <div className="w-[260px] rounded-2xl neu-card p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
                Verified Expert
              </p>
            </div>

            <p className="mt-3 text-xs font-bold leading-snug text-[var(--text)]">
              ✨ Write Viral Twitter Hooks in 5 Seconds
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-2.5">
              <span className="text-xs font-bold text-[var(--text-muted)]">⭐ 4.9</span>
              <span className="text-sm font-extrabold text-[var(--primary)]">
                $19
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
