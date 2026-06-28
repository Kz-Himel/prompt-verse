"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiBookmark,
  FiMessageSquare,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

// আপনার প্রজেক্টের কাস্টম কম্পোনেন্ট
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

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

  // ─── ড্যাশবোর্ড ডাটা ফেচিং ───
  useEffect(() => {
   const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const headers = await getHeaders();

    console.log("Fetching from:", `${BACKEND_URL}/user/dashboard-stats`); // ডিবাগিং লগ

    const res = await fetch(`${BACKEND_URL}/user/dashboard-stats`, {
      method: "GET",
      headers: headers,
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Backend directly failed. Status:", res.status);
      toast.error("Backend server is not returning JSON!");
      setLoading(false);
      return;
    }

    const result = await res.json();
    console.log("Backend response result:", result); // এখানে দেখতে পারবে ব্যাকএন্ড কী পাঠাচ্ছে

    if (result.success) {
      setUserStats(
        result.stats || { savedCount: 0, reviewCount: 0, subscription: "Free" }
      );
      setActivities(result.activities || []);
    } else {
      // ব্যাকএন্ড থেকে আসা আসল এরর মেসেজটি টোস্টে দেখাবে
      toast.error(result.message || "Failed to load dashboard statistics");
    }
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    toast.error("Network error occurred!");
  } finally {
    setLoading(false);
  }
};
    if (currentUser?.email && !isPending) {
      fetchDashboardData();
    } else if (!isPending && !currentUser) {
      setLoading(false);
    }
  }, [currentUser?.email, isPending]);

  if (isPending || loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Please login first to view your dashboard.
      </div>
    );
  }

  // StatCard কম্পোনেন্টের জন্য ডাইনামিক ডাটা অ্যারে প্রিপারেশন
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
      color:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-8">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
          Welcome back, {currentUser.name || "Explorer"}! 🚀
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here is an overview of your saved items, interaction metrics, and
          activity history.
        </p>
      </div>

      {/* গ্রিড লেআউটে কাস্টম StatCard সমূহ */}
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

      {/* Premium Upgrade ব্যানার (ইউজার Free হলে দেখাবে) */}
      {userStats.subscription.toLowerCase() === "free" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold">
              Upgrade to Premium for Unlimited Assets! 💎
            </h3>
            <p className="text-sm text-purple-100 max-w-2xl">
              You are currently on a <strong>Free Account</strong>. Pay a
              one-time fee of <strong>$5 via Stripe</strong> to instantly unlock
              blur-hidden private prompts, copy elite contents, and publish
              unlimited assets!
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

      {/* RecentActivityCard */}
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
