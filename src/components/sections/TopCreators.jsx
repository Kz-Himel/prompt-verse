'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    fetch(`${backendUrl}/top-creators`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setCreators(resData.data);
        }
      })
      .catch((err) => console.error('Error fetching top creators:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-[110px]">
      {/* Background Grid using Tailwind v4 arbitrary values and masking */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          maskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 100%)'
        }}
      />

      {/* Gradient Blobs */}
      <div className="pointer-events-none absolute -top-[180px] -right-[180px] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-[180px] -left-[180px] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-amber-500/12 bg-amber-500/8 px-4 py-1.5 text-xs font-bold tracking-wider text-amber-500 uppercase">
            🏆 Top Creators
          </span>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Meet the Best Prompt Creators
          </h2>

          <p className="mx-auto max-w-[580px] text-lg leading-relaxed text-slate-500">
            These creators are shaping the future of AI productivity. Follow them and never miss a great prompt.
          </p>
        </motion.div>

        {/* Loading State / Skeleton */}
        {loading ? (
          <div className="text-center text-lg font-medium text-slate-500 animate-pulse">
            Loading top creators...
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator, i) => (
              <motion.div
                key={creator.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="relative flex items-center gap-[18px] overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
              >
                {/* Accent Glow using dynamic creator color */}
                <div
                  className="absolute -top-[30px] -right-[30px] h-[110px] w-[110px] rounded-full"
                  style={{ backgroundColor: `${creator.color}12` }}
                />

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="flex h-16 w-16 items-center justify-content-center rounded-full border-2 font-bold text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${creator.color}30, ${creator.color}10)`,
                      borderColor: `${creator.color}30`,
                      color: creator.color
                    }}
                  >
                    {creator.initials}
                  </div>

                  <div className="absolute -right-1 -bottom-1 text-lg leading-none">
                    {creator.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-900">
                    {creator.name}
                  </h3>

                  <p className="mb-3.5 text-sm text-slate-500">
                    {creator.role}
                  </p>

                  <div className="flex items-center gap-[18px]">
                    <span className="text-sm text-slate-500">
                      <span className="font-bold" style={{ color: creator.color }}>
                        {creator.prompts}
                      </span>{' '}
                      prompts
                    </span>

                    <span className="text-sm font-semibold text-amber-500">
                      ★ {creator.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}