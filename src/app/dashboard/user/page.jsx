"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiBookmark, FiMessageSquare, FiAward, FiArrowRight } from "react-icons/fi";

// তোমার দেওয়া কাস্টম কম্পোনেন্ট ইমপোর্ট (পাথ প্রজেক্ট অনুযায়ী চেক করে নিও)
import StatsCard from "../components/StatsCard";
import RecentActivityCard from "../components/RecentActivityCard";

export default function UserDashboardHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    savedCount: 0,
    reviewCount: 0,
    subscription: "Free",
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // রিকোয়ারমেন্ট এবং ডিজাইন টেস্টের জন্য রিয়েলিস্টিক মক ডাটা জেনারেশন
    const timer = setTimeout(() => {
      setUserStats({
        savedCount: 15,
        reviewCount: 4,
        subscription: "Free", // "Premium" হলে প্রিমিয়াম ব্যানারটি হাইড হয়ে যাবে
      });

      setActivities([
        { id: 1, message: "Bookmarked 'Midjourney Cinematic Prompt'", time: "2 hours ago" },
        { id: 2, message: "Added a 5-star review on 'ChatGPT SEO Assistant'", time: "1 day ago" },
        { id: 3, message: "Submitted a new prompt: 'Tailwind v4 Expert'", time: "3 days ago", val: "Pending" },
      ]);
      
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // তোমার StatCard কম্পোনেন্টের জন্য ডাটা অ্যারে প্রিপারেশন
  const statsData = [
    {
      label: "Saved Prompts",
      value: userStats.savedCount,
      icon: FiBookmark,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      label: "My Reviews",
      value: userStats.reviewCount,
      icon: FiMessageSquare,
      color: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
    },
    {
      label: "Account Plan",
      value: userStats.subscription,
      icon: FiAward,
      color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-8">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Welcome back, Explorer! 🚀</h1>
        <p className="text-default-500 text-sm mt-1">
          Here is an overview of your saved items, interaction metrics, and activity history.
        </p>
      </div>

      {/* গ্রিড লেআউটে তোমার কাস্টম StatCard সমূহ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* রিকোয়ারমেন্ট অনুযায়ী Premium Upgrade ব্যানার */}
      {userStats.subscription.toLowerCase() === "free" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold">Upgrade to Premium for Unlimited Assets! 💎</h3>
            <p className="text-sm text-purple-100 max-w-2xl">
              You are currently on a **Free Account**. Pay a one-time fee of **$5 via Stripe** to instantly unlock blur-hidden private prompts, copy elite contents, and publish unlimited assets!
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="flex items-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer flex-shrink-0 shadow-sm"
          >
            Upgrade to Premium <FiArrowRight />
          </button>
        </motion.div>
      )}

      {/* লেআউট ম্যানেজমেন্টের জন্য তোমার RecentActivityCard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="w-full max-w-3xl"
      >
        <RecentActivityCard activities={activities} />
      </motion.div>
    </div>
  );
}