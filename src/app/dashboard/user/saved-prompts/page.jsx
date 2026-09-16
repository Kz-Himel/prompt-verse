"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiBookmark, FiEye, FiTrash2, FiCpu, FiUser, FiLock } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SavedPromptsPage() {
  const router = useRouter();
  const [savedPrompts, setSavedPrompts] = useState([]);
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

  // Fetch bookmark data
  useEffect(() => {
    const fetchSavedPrompts = async () => {
      try {
        setLoading(true);
        const headers = await getHeaders();

        const res = await fetch(`${BACKEND_URL}/my-bookmarks`, {
          method: "GET",
          headers: headers,
        });

        const result = await res.json();

        if (result.success) {
          setSavedPrompts(result.data || []);
        } else {
          toast.error(result.message || "Failed to load saved prompts");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email && !isPending) {
      fetchSavedPrompts();
    } else if (!isPending && !currentUser) {
      setLoading(false);
    }
  }, [currentUser?.email, isPending]);

  // Bookmark remove handler
  const handleRemoveBookmark = async (id) => {
    if (!confirm("Are you sure you want to remove this prompt from your bookmarks?")) return;

    try {
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/prompts/${id}/bookmark`, {
        method: "POST",
        headers: headers,
      });

      const result = await res.json();

      if (result.success && !result.bookmarked) {
        setSavedPrompts(savedPrompts.filter((prompt) => prompt._id !== id));
        toast.success("Bookmark removed successfully!");
      } else {
        toast.error(result.message || "Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Remove Bookmark Error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (isPending || loading) {
    return (
      <LoadingSpinner 
        text="Loading Saved Prompts..." 
        subtext="Fetching your bookmarked items" 
      />
    );
  }

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
              Please login first to view your saved prompts.
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
          <FiBookmark className="text-[var(--primary)] text-xl" /> Saved Prompts
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Quickly access or remove your favorite bookmarked AI prompts from the marketplace.
        </p>
      </div>

      {savedPrompts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="neu-card p-10 rounded-2xl text-center border border-[var(--border)] space-y-3 text-[var(--text-muted)]"
        >
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-[var(--primary)]">
            <FiBookmark className="text-2xl opacity-60" />
          </div>
          <p className="text-sm font-semibold">
            No saved prompts found. Explore the marketplace to bookmark your favorite items!
          </p>
        </motion.div>
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {savedPrompts.map((prompt) => (
              <motion.div
                key={prompt._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="neu-card p-5 rounded-[20px] border border-[var(--border)] flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="neu-input px-3 py-1 rounded-lg text-xs font-semibold text-[var(--primary)]">
                      {prompt.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                      <FiCpu className="text-sm text-[var(--primary)]" /> {prompt.aiTool}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5 max-w-[140px] truncate font-medium" title={prompt.authorEmail}>
                      <FiUser className="text-[var(--primary)]" /> {prompt.authorEmail ? prompt.authorEmail.split("@")[0] : "Creator"}
                    </span>
                    <span>
                      Copied: <strong className="text-[var(--text)] font-semibold">{prompt.copyCount || 0} times</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-[var(--border)]">
                  <button
                    onClick={() => handleRemoveBookmark(prompt._id)}
                    className="neu-card flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer active:scale-95 border border-[var(--border)]"
                    title="Remove Bookmark"
                  >
                    <FiTrash2 className="text-sm" /> Remove
                  </button>

                  <button
                    onClick={() => router.push(`/prompts/${prompt._id}`)}
                    className="neu-button-primary flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-95"
                    title="View Full Details"
                  >
                    <FiEye className="text-sm" /> View Details
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