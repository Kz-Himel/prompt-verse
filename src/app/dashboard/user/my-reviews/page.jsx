"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMessageSquare, FiStar, FiEye, FiCalendar } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MyReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

  // ─── ডাইনামিক হেডার জেনারেটর (টোকেনসহ) ───
  const getHeaders = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to fetch auth token", err);
    }
    return headers;
  };

  // ─── ইউজারের রিভিউসমূহ ফেচ করা ───
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        setLoading(true);
        const headers = await getHeaders();

        const res = await fetch(`${BACKEND_URL}/my-reviews`, {
          method: "GET",
          headers: headers,
        });

        const result = await res.json();

        if (result.success) {
          setReviews(result.data || []);
        } else {
          toast.error(result.message || "Failed to load your reviews");
        }
      } catch (error) {
        console.error("Fetch Reviews Error:", error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email && !isPending) {
      fetchMyReviews();
    } else if (!isPending && !currentUser) {
      setLoading(false);
    }
  }, [currentUser?.email, isPending]);

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

  if (isPending || loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Please login first to view your reviews.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <FiMessageSquare className="text-purple-600" /> My Reviews
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track, monitor, and view all the feedback and ratings you have shared across the marketplace.
        </p>
      </div>

      {reviews.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-gray-500"
        >
          You haven't written any reviews yet. Share your experience on marketplace prompts!
        </motion.div>
      ) : (
        /* রিভিউ ট্র্যাকিং লিস্ট */
        <div className="space-y-4 max-w-4xl">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group hover:border-purple-200 dark:hover:border-purple-900/40 transition-all"
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
                    <span className="text-gray-300 dark:text-zinc-700">•</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <FiCalendar /> {review.createdAt}
                    </span>
                  </div>

                  {/* ইউজারের কমেন্ট */}
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed bg-gray-50/50 dark:bg-zinc-800/40 p-3 rounded-xl border border-gray-100 dark:border-zinc-800">
                    {review.comment}
                  </p>
                </div>

                {/* অ্যাকশন বাটন (View Prompt) */}
                <div className="flex sm:flex-col justify-end pt-2 sm:pt-0">
                  <button
                    onClick={() => router.push(`/prompts/${review.promptId}`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-purple-600 dark:hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
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