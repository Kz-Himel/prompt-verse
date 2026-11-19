"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCopy,
  FiCheck,
  FiCheckCircle,
  FiArrowUpRight,
  FiLayers,
  FiTrendingUp,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import Link from "next/link";

// High-end curated creator roster with realistic masterpiece prompts and stats
const FALLBACK_CREATORS = [
  {
    name: "Alex Rivera",
    handle: "@alex_architect",
    role: "Staff Prompt Engineer",
    specialty: "Full-Stack Architecture & DevOps",
    category: "Code & Dev",
    prompts: 48,
    copies: "18.2K",
    rating: 4.9,
    badge: "👑 Rank #1",
    tagline: "Designs fault-tolerant system prompts and automated CI/CD microservice workflows.",
    samplePrompt: {
      title: "Microservice Topology Architect",
      model: "GPT-4o",
      tag: "Best Seller",
      snippet: "Act as a Principal Cloud Architect. Generate an event-driven architecture using Kafka, Next.js 15, and Redis. Output strict OpenAPI 3.1 specs with zero redundant calls...",
    },
    color: "#0F766E",
    initials: "AR",
    topTool: "GPT-4o",
    earnings: "$4.8K+",
  },
  {
    name: "Elena Vance",
    handle: "@elena_vance",
    role: "Generative Art Director",
    specialty: "Cinematic Lighting & Photorealism",
    category: "Generative Art",
    prompts: 62,
    copies: "24.5K",
    rating: 5.0,
    badge: "🥇 Rank #2",
    tagline: "Award-winning prompts for photorealistic portraiture, architecture, and lighting setups.",
    samplePrompt: {
      title: "Volumetric Cinematic Studio Render",
      model: "Midjourney v6",
      tag: "Trending",
      snippet: "/imagine prompt: 35mm candid portrait of a cybernetic artisan, cinematic rim lighting, kodak portra 400 grain, volumetric dusk fog, Hasselblad H6D-100c --ar 16:9 --style raw --v 6.0",
    },
    color: "#7C3AED",
    initials: "EV",
    topTool: "Midjourney v6",
    earnings: "$6.2K+",
  },
  {
    name: "Marcus Chen",
    handle: "@marcus_agent",
    role: "AI Workflow Specialist",
    specialty: "Agentic Loops & Reasoning Chains",
    category: "Reasoning & Agents",
    prompts: 35,
    copies: "12.8K",
    rating: 4.9,
    badge: "🥈 Rank #3",
    tagline: "Builds self-correcting agent chains for autonomous code analysis and bug hunting.",
    samplePrompt: {
      title: "Autonomous PR Reviewer & SecOps",
      model: "Claude 3.5 Sonnet",
      tag: "Top Rated",
      snippet: "Inspect the provided git patch against OWASP Top 10 vulnerabilities. Formulate regression tests and evaluate boundary conditions before authorizing deployment...",
    },
    color: "#D97706",
    initials: "MC",
    topTool: "Claude 3.5",
    earnings: "$3.9K+",
  },
  {
    name: "Sophia Thorne",
    handle: "@sophia_copy",
    role: "SaaS Copy Strategist",
    specialty: "High-Conversion Sales Funnels",
    category: "Marketing & Growth",
    prompts: 29,
    copies: "9.4K",
    rating: 4.8,
    badge: "🥉 Rank #4",
    tagline: "High-converting B2B positioning frameworks that have driven over $1.2M in pipeline.",
    samplePrompt: {
      title: "Cold Email Sequence & Objection Breaker",
      model: "ChatGPT",
      tag: "High ROI",
      snippet: "Draft a 3-touch outbound sequence for VP of Engineering prospects using the PAS formula. Eliminate boilerplate introductions and anchor directly to latency pain points...",
    },
    color: "#2563EB",
    initials: "ST",
    topTool: "ChatGPT",
    earnings: "$3.1K+",
  },
  {
    name: "Devon Ray",
    handle: "@devon_data",
    role: "Data Prompt Scientist",
    specialty: "SQL Synthesis & Business Intelligence",
    category: "Data & Analytics",
    prompts: 41,
    copies: "15.1K",
    rating: 4.9,
    badge: "⭐ Rank #5",
    tagline: "Translates complex natural language questions into hyper-optimized BigQuery and Postgres queries.",
    samplePrompt: {
      title: "Natural Language to BigQuery Pro",
      model: "Gemini 1.5 Pro",
      tag: "Data Kit",
      snippet: "Given the relational schema provided, write a partition-aware query computing 30-day cohort retention with window functions and zero expensive cartesian joins...",
    },
    color: "#059669",
    initials: "DR",
    topTool: "Gemini Pro",
    earnings: "$4.1K+",
  },
];

const CATEGORIES = [
  "All Specialists",
  "Code & Dev",
  "Generative Art",
  "Reasoning & Agents",
  "Marketing & Growth",
  "Data & Analytics",
];

export default function TopCreators() {
  const [creators, setCreators] = useState(FALLBACK_CREATORS);
  const [active, setActive] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Specialists");
  const [copiedSample, setCopiedSample] = useState(false);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) return;

    fetch(`${backendUrl}/top-creators`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          const formatted = resData.data.map((c, idx) => {
            const fallback = FALLBACK_CREATORS[idx % FALLBACK_CREATORS.length];
            return {
              name: c.name || fallback.name,
              handle: c.handle || fallback.handle,
              role: c.role || fallback.role,
              specialty: c.specialty || fallback.specialty,
              category: c.category || fallback.category,
              prompts: c.prompts || c.totalPrompts || fallback.prompts,
              copies: c.totalCopies ? `${(c.totalCopies / 1000).toFixed(1)}K` : fallback.copies,
              rating: c.rating || fallback.rating,
              badge: idx === 0 ? "👑 Rank #1" : idx === 1 ? "🥇 Rank #2" : idx === 2 ? "🥈 Rank #3" : `⭐ Rank #${idx + 1}`,
              tagline: c.tagline || fallback.tagline,
              samplePrompt: fallback.samplePrompt,
              color: c.color || fallback.color,
              initials: c.initials || (c.name ? c.name.slice(0, 2).toUpperCase() : fallback.initials),
              topTool: c.topTool || fallback.topTool,
              earnings: fallback.earnings,
            };
          });
          setCreators(formatted);
        }
      })
      .catch(() => {
        // Fallback creators maintain pristine presentation
      });
  }, []);

  // Filtered creators based on category pill
  const filteredCreators = selectedCategory === "All Specialists"
    ? creators
    : creators.filter((c) => c.category === selectedCategory);

  // Safe active creator lookup
  const current = filteredCreators[active] || filteredCreators[0] || creators[0];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % filteredCreators.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + filteredCreators.length) % filteredCreators.length);
  };

  const handleCopyPrompt = () => {
    if (current?.samplePrompt?.snippet) {
      navigator.clipboard?.writeText(current.samplePrompt.snippet);
      setCopiedSample(true);
      setTimeout(() => setCopiedSample(false), 2000);
    }
  };

  return (
    <section id="top-creators" className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 transition-colors duration-300">
      
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[var(--primary)]/4 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Container - Pixel-Perfect Alignment with Navbar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            <RiSparklingFill className="text-xs" />
            Elite Prompt Architects
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Meet the World's <span className="text-[var(--primary)]">Top AI Creators</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[var(--text-muted)] mt-3">
            The top 1% prompt engineers crafting battle-tested prompt kits for GPT-4o, Claude 3.5, and Midjourney.
          </p>

          {/* Specialty Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActive(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--primary)] text-white shadow-[var(--glow-primary)]"
                      : "neu-card text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spotlight & Leaderboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Spotlight Hero Showcase (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.name}-${active}`}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="neu-card p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background Watermark Rank */}
                <div className="absolute -right-3 -bottom-8 opacity-[0.03] dark:opacity-[0.04] text-[13rem] font-black pointer-events-none select-none leading-none">
                  #{active + 1}
                </div>

                <div>
                  {/* Top Bar: Rank Badge + Verified Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="neu-badge text-xs px-3.5 py-1 text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1.5">
                        {current.badge}
                      </span>
                      <span className="neu-badge text-xs px-3 py-1 text-[var(--primary)] font-bold">
                        {current.category}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <FiCheckCircle className="text-xs" /> Verified Master
                    </div>
                  </div>

                  {/* Creator Monogram, Name & Tagline */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    {/* Monogram Box */}
                    <div className="relative shrink-0">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl neu-card flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg"
                        style={{ color: current.color || "var(--primary)" }}
                      >
                        {current.initials}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold shadow-md">
                        <FiAward />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2.5">
                        <h3 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                          {current.name}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          {current.handle}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[var(--primary)] mt-0.5">
                        {current.role}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] font-medium mt-2 leading-relaxed">
                        {current.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Creator Performance Metrics Matrix */}
                  <div className="grid grid-cols-3 gap-3 text-center my-6">
                    <div className="neu-card-inset p-3 rounded-2xl">
                      <span className="block text-lg sm:text-xl font-black text-[var(--text)]">
                        {current.prompts}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Prompts
                      </span>
                    </div>

                    <div className="neu-card-inset p-3 rounded-2xl">
                      <span className="block text-lg sm:text-xl font-black text-[var(--primary)]">
                        {current.copies}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Downloads
                      </span>
                    </div>

                    <div className="neu-card-inset p-3 rounded-2xl">
                      <span className="text-lg sm:text-xl font-black text-amber-500 flex items-center justify-center gap-1">
                        <FiStar className="text-xs fill-amber-500" /> {current.rating}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Rating
                      </span>
                    </div>
                  </div>

                  {/* Interactive Signature Masterpiece Prompt Snippet */}
                  {current.samplePrompt && (
                    <div className="neu-card-inset p-4 rounded-2xl relative">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1">
                            <FiZap /> Signature Masterpiece
                          </span>
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                            {current.samplePrompt.model}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyPrompt}
                          className="neu-card px-2.5 py-1 rounded-lg text-[10px] font-bold text-[var(--text)] hover:text-[var(--primary)] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedSample ? (
                            <>
                              <FiCheck className="text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FiCopy />
                              <span>Copy Demo</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs font-bold text-[var(--text)] mb-1">
                        {current.samplePrompt.title}
                      </p>
                      <p className="text-[11px] font-mono leading-relaxed text-[var(--text-muted)] line-clamp-2">
                        {current.samplePrompt.snippet}
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA Action Row */}
                <div className="mt-6 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/prompts?search=${encodeURIComponent(current.name)}`}
                    className="neu-button-primary w-full py-3 text-xs sm:text-sm font-bold gap-2 text-center"
                  >
                    <span>Explore {current.name.split(" ")[0]}'s Full Arsenal</span>
                    <FiArrowUpRight />
                  </Link>

                  <Link
                    href="/prompts"
                    className="neu-button-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold shrink-0 text-center"
                  >
                    All Prompts
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Leaderboard Deck (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Header info */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                <FiTrendingUp className="text-[var(--primary)]" /> Leaderboard Rankings
              </span>
              <span className="text-[11px] font-bold text-[var(--primary)]">
                {filteredCreators.length} Verified Creators
              </span>
            </div>

            {/* List of Creators */}
            <div className="space-y-3">
              {filteredCreators.map((c, idx) => {
                const isSelected = idx === active;

                return (
                  <button
                    type="button"
                    key={`${c.name}-${idx}`}
                    onClick={() => setActive(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "neu-card border-[var(--primary)] shadow-[var(--shadow-hover)] scale-[1.01]"
                        : "neu-card hover:border-[var(--primary)]/30 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Monogram / Avatar */}
                      <div
                        className="w-11 h-11 rounded-xl neu-card-inset flex items-center justify-center font-black text-xs shrink-0"
                        style={{ color: c.color }}
                      >
                        {c.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs sm:text-sm text-[var(--text)] truncate">
                            {c.name}
                          </p>
                          <span className="text-[10px] font-bold text-amber-500 shrink-0">
                            ★ {c.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] truncate font-medium mt-0.5">
                          {c.role} • <span className="font-bold text-[var(--primary)]">{c.topTool}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                          isSelected
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "neu-card text-[var(--text-muted)]"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="neu-card p-3 rounded-2xl flex items-center justify-between mt-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Creator"
                className="neu-icon-button w-9 h-9 rounded-xl"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1.5">
                {filteredCreators.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to creator ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === active
                        ? "w-7 bg-[var(--primary)]"
                        : "w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Creator"
                className="neu-icon-button w-9 h-9 rounded-xl"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Creator Monetization Callout Banner */}
        <div className="mt-16 rounded-3xl neu-card p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="neu-badge text-xs font-bold text-[var(--primary)] px-3 py-1">
                  Creator Economy
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  85% Net Revenue Share
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                Are you an advanced AI Prompt Engineer?
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[var(--text-muted)] max-w-2xl leading-relaxed">
                Publish your prompts to a global network of 12,500+ active buyers. Earn automated passive royalties with Stripe Connect direct deposits and zero maintenance overhead.
              </p>

              {/* Perks Row */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--text)]">
                <div className="flex items-center gap-1.5">
                  <FiCheck className="text-[var(--primary)] text-sm" /> Instant Stripe Payouts
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheck className="text-[var(--primary)] text-sm" /> Automated Watermarking
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheck className="text-[var(--primary)] text-sm" /> Global Analytics Dashboard
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/auth/register"
                className="neu-button-primary px-6 py-3.5 text-xs sm:text-sm font-bold text-center gap-2"
              >
                <span>Apply as Verified Creator</span>
                <FiArrowUpRight />
              </Link>
              <Link
                href="/dashboard/user/add-prompt"
                className="neu-button-secondary px-6 py-3 text-xs sm:text-sm font-bold text-center"
              >
                Submit a Prompt
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
