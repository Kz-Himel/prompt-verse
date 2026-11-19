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
    <section id="reviews" className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 transition-colors duration-300">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            Community Love
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            What Our Users Say
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Over 12,500 creators and buyers trust PromptVerse to supercharge their workflow.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="px-6 py-3 rounded-full neu-card-inset text-xs font-bold text-[var(--primary)] animate-pulse">
              Loading community reviews...
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-sm text-[var(--text-muted)]">
            No reviews yet.
          </p>
        ) : (
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="marquee-container gap-6 py-4">
              {duplicatedReviews.map((review, i) => (
                <div
                  key={i}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-3xl neu-card p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl neu-card-inset text-xl font-black text-[var(--primary)]">
                      "
                    </div>

                    <p className="text-sm sm:text-base font-medium leading-relaxed text-[var(--text)] line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>

                  <div>
                    <div className="mt-6">
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="mt-4 flex items-center gap-3.5 pt-4 border-t border-[var(--border)]">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl neu-card-inset text-xs font-black"
                        style={{ color: review.color || "var(--primary)" }}
                      >
                        {review.initials || "PV"}
                      </div>
                      <div className="text-left overflow-hidden">
                        <h4 className="text-sm font-extrabold text-[var(--text)] truncate">
                          {review.name}
                        </h4>
                        <p className="text-xs font-semibold text-[var(--text-muted)] truncate">
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
