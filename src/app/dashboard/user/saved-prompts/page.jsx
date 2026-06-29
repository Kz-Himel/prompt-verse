"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiBookmark, FiEye, FiTrash2, FiCpu, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SavedPromptsPage() {
  const router = useRouter();
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

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
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Please login first to view your saved prompts.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <FiBookmark className="text-purple-600" /> Saved Prompts
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Quickly access or remove your favorite bookmarked AI prompts from the marketplace.
        </p>
      </div>

      {savedPrompts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-gray-500"
        >
          No saved prompts found. Explore the marketplace to bookmark your favorite items!
        </motion.div>
      ) : (
        /* রেসপন্সিভ গ্রিড লেআউট */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {savedPrompts.map((prompt) => (
              <motion.div
                key={prompt._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {prompt.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <FiCpu className="text-sm" /> {prompt.aiTool}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-800 dark:text-zinc-100 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 max-w-[150px] truncate" title={prompt.authorEmail}>
                      <FiUser /> {prompt.authorEmail ? prompt.authorEmail.split("@")[0] : "Creator"}
                    </span>
                    <span>
                      Copied: <strong className="text-gray-700 dark:text-zinc-300">{prompt.copyCount || 0} times</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleRemoveBookmark(prompt._id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <FiTrash2 /> Remove
                  </button>

                  <button
                    onClick={() => router.push(`/prompts/${prompt._id}`)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-purple-600 text-white hover:bg-purple-700 shadow-sm transition-colors cursor-pointer"
                    title="View Full Details"
                  >
                    <FiEye /> View Details
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