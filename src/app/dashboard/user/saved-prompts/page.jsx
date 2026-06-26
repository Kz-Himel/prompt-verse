"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiBookmark, FiEye, FiTrash2, FiCpu, FiUser } from "react-icons/fi";

export default function SavedPromptsPage() {
  const router = useRouter();
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ডাটাবেজ থেকে ডেটা আসার আগে রিকোয়ারমেন্ট টেস্টের জন্য মক ডাটা
    const timer = setTimeout(() => {
      setSavedPrompts([
        {
          _id: "sp_1",
          title: "Midjourney Cinematic Prompt for Cyberpunk City",
          category: "Design",
          aiTool: "Midjourney",
          copyCount: 142,
          creatorName: "Rahat Chowdhury"
        },
        {
          _id: "sp_2",
          title: "Advanced SEO Blog Writer & Outline Generator",
          category: "Content",
          aiTool: "ChatGPT",
          copyCount: 320,
          creatorName: "Anika Tasnim"
        },
        {
          _id: "sp_3",
          title: "React & Tailwind v4 Custom Hook Boilerplate",
          category: "Coding",
          aiTool: "Claude",
          copyCount: 89,
          creatorName: "Siam Ahmed"
        }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // বুকমার্ক রিমুভ হ্যান্ডলার (রিকোয়ারমেন্ট অনুযায়ী)
  const handleRemoveBookmark = (id) => {
    if (confirm("Are you sure you want to remove this prompt from your bookmarks?")) {
      setSavedPrompts(savedPrompts.filter((prompt) => prompt._id !== id));
      // এখানে তোমার ব্যাকএন্ড এপিআই ডিলিট কল হবে (e.g., axios.delete(`/api/bookmarks/${id}`))
      // টোস্ট মেসেজ দেখাতে চাইলে এখানে `toast.success('Bookmark removed')` দিতে পারো
    }
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
          <FiBookmark className="text-purple-600" /> Saved Prompts
        </h1>
        <p className="text-default-500 text-sm mt-1">
          Quickly access or remove your favorite bookmarked AI prompts from the marketplace.
        </p>
      </div>

      {savedPrompts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-6 text-default-500"
        >
          No saved prompts found. Explore the marketplace to bookmark your favorite items!
        </motion.div>
      ) : (
        /* রিকোয়ারমেন্ট অনুযায়ী রেসপন্সিভ গ্রিড লেআউট */
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
                className="bg-white dark:bg-zinc-900 border border-default-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* ক্যাটালগ ও এআই টুল ব্যাজ */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {prompt.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-default-500">
                      <FiCpu className="text-sm" /> {prompt.aiTool}
                    </span>
                  </div>

                  {/* প্রম্পট টাইটেল */}
                  <h3 className="text-base font-bold text-gray-800 dark:text-zinc-100 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>

                  {/* ক্রিয়েটরের নাম ও মেট্রিকেস */}
                  <div className="mt-4 pt-4 border-t border-default-100 flex items-center justify-between text-xs text-default-500">
                    <span className="flex items-center gap-1">
                      <FiUser /> By {prompt.creatorName}
                    </span>
                    <span>
                      Copied: <strong className="text-gray-700 dark:text-zinc-300">{prompt.copyCount} times</strong>
                    </span>
                  </div>
                </div>

                {/* ডক্স অনুযায়ী অ্যাকশন বাটনসমূহ (Remove Bookmark & View Details) */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-default-100">
                  <button
                    onClick={() => handleRemoveBookmark(prompt._id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <FiTrash2 /> Remove
                  </button>

                  <button
                    onClick={() => router.push(`/prompts/${prompt._id}`)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-purple-600 text-white hover:bg-purple-700 shadow-xs transition-colors cursor-pointer"
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