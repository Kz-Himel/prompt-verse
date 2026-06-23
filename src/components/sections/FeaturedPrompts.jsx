'use client';

import React from 'react';
import { motion } from 'motion/react';
// যদি সমস্যা হয়:
// import { motion } from 'framer-motion';

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
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            ✨ Featured Prompts
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Handpicked high-converting prompt scripts vetted by our team.
          </p>
        </div>

        <a
          href="#"
          className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
        >
          View all
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPrompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="flex h-full flex-col justify-between border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              {/* Card Content (NO CardBody in v3) */}
              <div className="flex h-full flex-col justify-between p-6">
                
                {/* Top */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Chip size="sm" variant="flat" color="secondary">
                      {prompt.category}
                    </Chip>
                    <span className="text-xs font-semibold text-slate-400">
                      {prompt.tool}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-lg font-bold text-slate-800 dark:text-zinc-100">
                    {prompt.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Copy size={14} /> {prompt.copies} copies
                    </span>

                    <span className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" /> {prompt.rating}
                    </span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800">
                  <div>
                    <span className="text-xl font-bold text-slate-900 dark:text-zinc-50">
                      {prompt.price}
                    </span>

                    {prompt.oldPrice !== prompt.price && (
                      <span className="ml-2 text-xs text-slate-400 line-through">
                        {prompt.oldPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="bg-slate-900 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    View Details
                  </Button>
                </div>

              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}