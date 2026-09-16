"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMessageSquare, FiStar, FiEye, FiCalendar, FiLock } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MyReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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

  // Fetch user reviews
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

  // Render Rating Stars with Neumorphic subtle styling
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? "text-amber-400 fill-amber-400" 
            : "text-[var(--text-muted)] opacity-30"
        }`}
      />
    ));
  };

  // Neumorphic Loading State using LoadingSpinner
  if (isPending || loading) {
    return (
      <LoadingSpinner 
        text="Loading Your Reviews..." 
        subtext="Fetching feedback and ratings" 
      />
    );
  }

  // Neumorphic Unauthorized Warning State
  if (!currentUser) {
    return (
      <div className="p-6 md:p-10 w-full flex justify-center items-center min-h-[350px]">
        <div className="neu-card p-8 rounded-2xl max-w-md w-full text-center space-y-4 border border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-amber-500">
            <FiLock className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text)]">Access Restricted</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
              Please login first to view your reviews.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight flex items-center gap-2.5">
          <FiMessageSquare className="text-[var(--primary)] text-xl" /> My Reviews
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Track, monitor, and view all the feedback and ratings you have shared across the marketplace.
        </p>
      </div>

      {reviews.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="neu-card p-10 rounded-2xl text-center border border-[var(--border)] space-y-3 text-[var(--text-muted)]"
        >
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-[var(--primary)]">
            <FiMessageSquare className="text-2xl opacity-60" />
          </div>
          <p className="text-sm font-semibold">
            You haven't written any reviews yet. Share your experience on marketplace prompts!
          </p>
        </motion.div>
      ) : (
        /* Review Tracking List */
        <div className="space-y-4 max-w-4xl">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="neu-card p-5 md:p-6 rounded-[20px] border border-[var(--border)] flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all"
              >
                <div className="space-y-3 flex-1">
                  <h3 className="text-base font-bold text-[var(--text)]">
                    {review.promptTitle}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 neu-input px-2.5 py-1 rounded-full">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-[var(--text-muted)] opacity-40">•</span>
                    <span className="text-[var(--text-muted)] flex items-center gap-1 font-medium">
                      <FiCalendar className="text-[var(--primary)]" /> {review.createdAt}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text)] leading-relaxed neu-input p-4 rounded-xl text-[var(--text)]/90">
                    {review.comment}
                  </p>
                </div>

                <div className="flex sm:flex-col justify-end pt-2 sm:pt-0">
                  <button
                    onClick={() => router.push(`/prompts/${review.promptId}`)}
                    className="neu-button-primary flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all active:scale-95"
                    title="View Prompt Page"
                  >
                    <FiEye className="text-sm" /> View Prompt
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