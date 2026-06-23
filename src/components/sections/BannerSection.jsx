'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
// যদি error দেয়:
// import { motion } from 'framer-motion';

import { Button, Card, Input, Chip } from '@heroui/react';
import { Magnifier, Star } from '@gravity-ui/icons';

export default function BannerSection() {
  const [search, setSearch] = useState('');

  const trendingTags = [
    'ChatGPT',
    'Midjourney',
    'Copywriting',
    'SEO',
    'Python',
    'Claude',
  ];

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 space-y-6 text-center lg:text-left"
      >
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
          🚀 THE #1 AI PROMPT MARKETPLACE
        </span>

        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Buy & Sell{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            Premium AI Prompts
          </span>{' '}
          Instantly
        </h1>

        <p className="max-w-2xl text-lg text-slate-500 dark:text-zinc-400 mx-auto lg:mx-0">
          Save time and optimize your workflow. Discover, buy, and sell
          engineered prompts for ChatGPT, Midjourney, Claude, and more.
        </p>

        {/* Search */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row max-w-xl mx-auto lg:mx-0">
          <Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search prompts, categories, tools..."
            radius="full"
            size="lg"
            startContent={
              <Magnifier
                width={18}
                height={18}
                className="text-slate-400"
              />
            }
            className="w-full"
          />

          <Button
            size="lg"
            radius="full"
            className="bg-indigo-600 px-8 font-medium text-white"
          >
            Search
          </Button>
        </div>

        {/* Trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 lg:justify-start">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Trending:
          </span>

          {trendingTags.map((tag) => (
            <Chip
              key={tag}
              size="sm"
              variant="flat"
              className="cursor-pointer transition-all hover:scale-105"
            >
              #{tag}
            </Chip>
          ))}
        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex min-h-[400px] items-center justify-center lg:col-span-5"
      >
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <Card className="z-10 w-80 rotate-[-2deg] border border-slate-200 bg-white/80 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 dark:border-zinc-800 dark:bg-zinc-900/80">
          <Card.Content className="space-y-4 p-6">
            <div className="flex items-start justify-between">
              <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
                Active Creator
              </span>

              <span className="text-lg font-bold text-indigo-600">
                $5.89
              </span>
            </div>

            <h4 className="text-base font-bold leading-snug">
              Python code configuration for targeted web scraping frameworks
            </h4>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2 dark:border-zinc-800">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star width={14} height={14} />
                <span>4.9</span>
                <span className="font-normal text-slate-400">(78)</span>
              </div>

              <Chip
                size="sm"
                className="bg-indigo-600 font-semibold text-white"
              >
                V4 Optimized
              </Chip>
            </div>
          </Card.Content>
        </Card>
      </motion.div>
    </section>
  );
}