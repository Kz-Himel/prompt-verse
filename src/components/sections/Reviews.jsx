"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`text-sm ${
          s <= rating ? "text-amber-500" : "text-slate-300 dark:text-slate-700"
        }`}
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
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-28 transition-colors duration-300">
      <style>{`
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: scrollMarquee 35s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Updated to max-w-7xl to match Featured Prompts */}
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
            Community Love
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-tight">
            What Our Users Say
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8] font-medium">
            Over 12,500 creators and buyers trust PromptVerse to supercharge their workflow.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="px-6 py-3 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)] text-xs font-bold text-[#0F766E] dark:text-[#14B8A6] animate-pulse">
              Loading community reviews...
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
            No reviews yet.
          </p>
        ) : (
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="marquee-container gap-6 py-4">
              {duplicatedReviews.map((review, i) => (
                <div
                  key={i}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-3xl bg-[#EBF1F5] dark:bg-[#141B24] p-8 shadow-[6px_6px_16px_#d1d9e0,-6px_-6px_16px_#ffffff] dark:shadow-[6px_6px_16px_#080b0f,-4px_-4px_12px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF1F5] dark:bg-[#0F141C] text-xl font-black text-[#0F766E] dark:text-[#14B8A6] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)] border border-white/30 dark:border-white/[0.06]">
                      "
                    </div>

                    <p className="text-sm sm:text-base font-medium leading-relaxed text-[#1E293B] dark:text-[#F8FAFC] line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>

                  <div>
                    <div className="mt-6">
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="mt-4 flex items-center gap-3.5 pt-4 border-t border-slate-300/40 dark:border-slate-800">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF1F5] dark:bg-[#0F141C] text-xs font-black shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)] border border-white/30 dark:border-white/[0.06]"
                        style={{ color: review.color || "#0F766E" }}
                      >
                        {review.initials}
                      </div>
                      <div className="text-left overflow-hidden">
                        <h4 className="text-sm font-extrabold text-[#1E293B] dark:text-[#F8FAFC] truncate">
                          {review.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] truncate">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}