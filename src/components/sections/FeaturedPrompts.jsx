'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Chip } from '@heroui/react';
import { Copy, Star, ArrowUpRight } from '@gravity-ui/icons';

export default function FeaturedPrompts() {
  const featuredPrompts = [
    {
      id: 1,
      title: 'Write a Sales Copy That Converts Like Crazy',
      tool: 'ChatGPT',
      category: 'Marketing',
      price: '$4.99',
      oldPrice: '$8.99',
      copies: '121',
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Midjourney Prompt for Product Photography',
      tool: 'Midjourney',
      category: 'Design',
      price: '$3.99',
      oldPrice: '$3.99',
      copies: '96',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Python Web Scraper for Any Website',
      tool: 'Claude',
      category: 'Coding',
      price: '$3.99',
      oldPrice: '$5.99',
      copies: '78',
      rating: 4.9,
    },
    {
      id: 4,
      title: 'Cold Email Template That Gets Replies',
      tool: 'ChatGPT',
      category: 'Business',
      price: '$3.49',
      oldPrice: '$3.49',
      copies: '56',
      rating: 4.8,
    },
    {
      id: 5,
      title: 'SEO Optimized Blog Post Architecture',
      tool: 'Gemini',
      category: 'Marketing',
      price: '$4.99',
      oldPrice: '$9.99',
      copies: '142',
      rating: 5.0,
    },
    {
      id: 6,
      title: 'Interactive UI Component Generator',
      tool: 'ChatGPT',
      category: 'Coding',
      price: '$5.99',
      oldPrice: '$5.99',
      copies: '89',
      rating: 4.7,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_100%)]" />

      {/* Gradient Blobs */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            ✨ Featured Collection
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Featured Prompts
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Handpicked high-converting prompt scripts vetted by our team.
            Discover premium prompts built to save time and maximize
            productivity.
          </p>

          <Button
            radius="full"
            variant="bordered"
            className="mt-8 border-slate-200 bg-white font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            View All
            <ArrowUpRight size={16} />
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <Card className="group h-full rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                <div className="flex h-full flex-col justify-between p-7">
                  {/* Top */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Chip
                        size="sm"
                        className="border border-violet-200 bg-violet-50 font-semibold text-violet-700"
                      >
                        {prompt.category}
                      </Chip>

                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {prompt.tool}
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900">
                      {prompt.title}
                    </h3>

                    <div className="flex items-center gap-5 text-sm">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Copy size={15} />
                        {prompt.copies} copies
                      </span>

                      <span className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star
                          size={15}
                          fill="currentColor"
                        />
                        {prompt.rating}
                      </span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <span className="text-2xl font-extrabold text-slate-900">
                        {prompt.price}
                      </span>

                      {prompt.oldPrice !== prompt.price && (
                        <span className="ml-2 text-sm text-slate-400 line-through">
                          {prompt.oldPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      radius="full"
                      className="bg-slate-900 px-5 font-semibold text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-violet-600"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}