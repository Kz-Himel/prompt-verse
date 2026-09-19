"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

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

const AUTOPLAY_DELAY = 5000;

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

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

  const goTo = useCallback(
    (nextIndex, dir) => {
      if (!reviews.length) return;
      setDirection(dir);
      setIndex(((nextIndex % reviews.length) + reviews.length) % reviews.length);
    },
    [reviews.length]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (paused || reviews.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setDirection(1);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timerRef.current);
  }, [paused, reviews.length]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const active = reviews[index];

  return (
    <section className="relative overflow-hidden bg-[#EBF1F5] dark:bg-[#0F141C] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] dark:text-[#14B8A6] shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] dark:shadow-[2px_2px_5px_#080b0f,-2px_-2px_5px_rgba(255,255,255,0.03)] border border-white/50 dark:border-white/[0.06]">
            ❤️ Community Love
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl leading-tight">
            What Our Users Say
          </h2>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#64748B] dark:text-[#94A3B8] font-medium">
            Over 12,500 creators and buyers trust PromptVerse to supercharge their workflow.
          </p>
        </motion.div>

        {/* Loading State */}
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
          /* Carousel */
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#EBF1F5] dark:bg-[#141B24] px-6 py-10 sm:px-12 sm:py-14 shadow-[6px_6px_16px_#d1d9e0,-6px_-6px_16px_#ffffff] dark:shadow-[6px_6px_16px_#080b0f,-4px_-4px_12px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Quote Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBF1F5] dark:bg-[#0F141C] text-2xl font-black text-[#0F766E] dark:text-[#14B8A6] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)] border border-white/30 dark:border-white/[0.06]">
                    "
                  </div>

                  <p className="max-w-xl text-sm sm:text-lg font-medium leading-relaxed text-[#1E293B] dark:text-[#F8FAFC]">
                    "{active.text}"
                  </p>

                  <div className="mt-6">
                    <StarRating rating={active.rating} />
                  </div>

                  <div className="mt-6 flex items-center gap-3.5">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF1F5] dark:bg-[#0F141C] text-xs font-black shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)] border border-white/30 dark:border-white/[0.06]"
                      style={{ color: active.color || "#0F766E" }}
                    >
                      {active.initials}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-[#1E293B] dark:text-[#F8FAFC]">
                        {active.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                        {active.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Next Buttons */}
            {reviews.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous review"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF1F5] dark:bg-[#141B24] text-[#64748B] dark:text-[#94A3B8] shadow-[3px_3px_8px_#d1d9e0,-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#080b0f,-3px_-3px_8px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors active:scale-90"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next review"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF1F5] dark:bg-[#141B24] text-[#64748B] dark:text-[#94A3B8] shadow-[3px_3px_8px_#d1d9e0,-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#080b0f,-3px_-3px_8px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.06] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors active:scale-90"
                >
                  <HiChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dots */}
            {reviews.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-[#0F766E] dark:bg-[#14B8A6]"
                        : "w-2 bg-[#64748B]/30 dark:bg-[#94A3B8]/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}