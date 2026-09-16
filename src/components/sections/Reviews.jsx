'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`text-xs ${s <= rating ? 'text-amber-500' : 'text-slate-300'}`}
      >
        ★
      </span>
    ))}
  </div>
);

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${backendUrl}/customer-reviews`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setReviews(resData.data);
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] border border-white/50">
            ❤️ Community Love
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl leading-tight">
            What Our Users Say
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#64748B] font-medium">
            Over 12,500 creators and buyers trust PromptVault to supercharge their workflow.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="px-6 py-3 rounded-full bg-[#EBF1F5] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] text-xs font-bold text-[#0F766E] animate-pulse">
              Loading community reviews...
            </div>
          </div>
        ) : (
          /* Reviews Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#EBF1F5] p-7 shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] border border-white/40 transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Quote Icon Box (Neumorphic Inset) */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EBF1F5] text-lg font-black text-[#0F766E] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] border border-white/30">
                    “
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="rounded-lg bg-[#EBF1F5] px-2.5 py-1 shadow-[inset_1.5px_1.5px_3px_#d1d9e0,inset_-1.5px_-1.5px_3px_#ffffff] border border-white/20">
                    <StarRating rating={r.rating} />
                  </div>
                </div>

                {/* Review Text */}
                <p className="my-2 text-xs sm:text-sm leading-relaxed text-[#64748B] font-medium">
                  "{r.text}"
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-3.5 border-t border-slate-300/40 pt-4 mt-5">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF1F5] text-xs font-black shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] border border-white/30"
                       style={{ color: r.color || '#0F766E' }}>
                    {r.initials}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#1E293B] truncate">
                      {r.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#64748B] truncate">
                      {r.role}
                    </p>
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