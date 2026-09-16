'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
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
    <section className="relative overflow-hidden bg-[#EBF1F5] py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] border border-white/50">
            🏆 Top Creators
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl leading-tight">
            Meet the Best Prompt Creators
          </h2>

          <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#64748B] font-medium">
            These creators are shaping the future of AI productivity. Follow them and never miss a great prompt.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="px-6 py-3 rounded-full bg-[#EBF1F5] shadow-[ inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] text-xs font-bold text-[#0F766E] animate-pulse">
              Loading top creators...
            </div>
          </div>
        ) : (
          /* Unique Neumorphic Cards Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator, i) => (
              <motion.div
                key={creator.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                }}
                className="group relative flex items-center gap-5 rounded-2xl bg-[#EBF1F5] p-6 shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] border border-white/40 transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Avatar Box with Inset Neumorphism */}
                <div className="relative shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EBF1F5] shadow-[inset_3px_3px_6px_#d1d9e0,inset_-3px_-3px_6px_#ffffff] border border-white/30 transition-transform duration-300 group-hover:scale-105">
                    <span 
                      className="text-lg font-black tracking-wider"
                      style={{ color: creator.color || '#0F766E' }}
                    >
                      {creator.initials}
                    </span>
                  </div>

                  {/* Rank / Badge Floating Indicator */}
                  <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-xl bg-[#EBF1F5] text-xs shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] border border-white/60">
                    {creator.badge || '⭐'}
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-[#1E293B] truncate group-hover:text-[#0F766E] transition-colors">
                    {creator.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#64748B] truncate mb-3">
                    {creator.role}
                  </p>

                  {/* Stats Pill Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-300/40">
                    <span className="text-xs font-bold text-[#64748B]">
                      <strong className="text-[#0F766E]">{creator.prompts}</strong> Prompts
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#EBF1F5] px-2.5 py-0.5 text-[11px] font-extrabold text-amber-600 shadow-[inset_1.5px_1.5px_3px_#d1d9e0,inset_-1.5px_-1.5px_3px_#ffffff]">
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