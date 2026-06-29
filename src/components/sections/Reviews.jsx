'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`text-sm ${s <= rating ? 'text-amber-500' : 'text-slate-200'}`}
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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL

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
    <section className="relative overflow-hidden px-6 py-28 bg-white">
      {/* Premium Subtle Grid & Soft Radial Glow */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:32px_32px]"
        style={{
          maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(239,68,68,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-rose-500/12 bg-rose-500/6 px-4 py-1.5 text-xs font-bold tracking-wider text-rose-500 uppercase">
            ❤️ Community Love
          </span>
          <h2 className="font-['Syne'] text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-5">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-500">
            Over 12,500 creators and buyers trust PromptVault to supercharge their workflow.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-center text-base font-semibold text-slate-400 animate-pulse tracking-wide">
              Loading community reviews...
            </div>
          </div>
        ) : (
          /* Reviews Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-200/60"
              >
                {/* Decorative Premium Quote Mark */}
                <div className="pointer-events-none absolute top-4 right-6 select-none font-serif text-7xl font-black text-slate-100 leading-none">
                  “
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="mb-5">
                    <StarRating rating={r.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-[15px] leading-relaxed text-slate-600 font-medium">
                    "{r.text}"
                  </p>
                </div>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-3.5 border-t border-slate-50/80 pt-5 mt-6">
                  {/* Premium Gradient Avatar */}
                  <div
                    className="font-['Syne'] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold"
                    style={{
                      background: `linear-gradient(135deg, ${r.color}18, ${r.color}05)`,
                      borderColor: `${r.color}25`,
                      color: r.color,
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      {r.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400">
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