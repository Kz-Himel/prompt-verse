"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiMessageSquare, FiStar, FiEye, FiCalendar } from "react-icons/fi";

export default function MyReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ডাটাবেজ থেকে ডেটা আসার আগে রিকোয়ারমেন্ট টেস্টের জন্য পারফেক্ট মক ডেটা
    const timer = setTimeout(() => {
      setReviews([
        {
          _id: "rev_1",
          promptId: "sp_1",
          promptTitle: "Midjourney Cinematic Prompt for Cyberpunk City",
          rating: 5,
          comment: "Absolutely mind-blowing results! The lighting tags work like magic on Midjourney v6. Highly recommended for concept artists.",
          createdAt: "June 12, 2026"
        },
        {
          _id: "rev_2",
          promptId: "sp_2",
          promptTitle: "Advanced SEO Blog Writer & Outline Generator",
          rating: 4,
          comment: "Very solid structure. It saves me hours of keyword mapping, though sometimes it repeats the introduction style.",
          createdAt: "May 28, 2026"
        }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // রেটিং স্টার রেন্ডার করার হেল্পার ফাংশন
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? "text-amber-400 fill-amber-400" 
            : "text-gray-200 dark:text-zinc-700"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <FiMessageSquare className="text-purple-600" /> My Reviews
        </h1>
        <p className="text-default-500 text-sm mt-1">
          Track, monitor, and view all the feedback and ratings you have shared across the marketplace.
        </p>
      </div>

      {reviews.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-6 text-default-500"
        >
          You havent written any reviews yet. Share your experience on purchased prompts!
        </motion.div>
      ) : (
        /* রিভিউ ট্র্যাকিং গ্রিড/লিস্ট */
        <div className="space-y-4 max-w-4xl">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group hover:border-purple-200 dark:hover:border-purple-900/40 transition-all"
              >
                <div className="space-y-2.5 flex-1">
                  {/* প্রম্পট টাইটেল */}
                  <h3 className="text-base font-bold text-gray-800 dark:text-zinc-100">
                    {review.promptTitle}
                  </h3>
                  
                  {/* স্টার রেটিং ও ডেট */}
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-default-400 dark:text-zinc-600">•</span>
                    <span className="text-default-500 flex items-center gap-1">
                      <FiCalendar /> {review.createdAt}
                    </span>
                  </div>

                  {/* ইউজারের কমেন্ট */}
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed bg-gray-50/50 dark:bg-zinc-800/40 p-3 rounded-xl border border-default-100">
                    {review.comment}
                  </p>
                </div>

                {/* ডক্স অনুযায়ী অ্যাকশন বাটন (View Prompt) */}
                <div className="flex sm:flex-col justify-end pt-2 sm:pt-0">
                  <button
                    onClick={() => router.push(`/prompts/${review.promptId}`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-purple-600 dark:hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    title="View Prompt Page"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View Prompt
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}