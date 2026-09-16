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
  FiLock,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import StatsCard from "../components/StatsCard";
import RecentActivityCard from "../components/RecentActivityCard";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  // Dashboard data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const headers = await getHeaders();

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

        if (result.success) {
          setUserStats(
            result.stats || { savedCount: 0, reviewCount: 0, subscription: "Free" }
          );
          setActivities(result.activities || []);
        } else {
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
      <LoadingSpinner 
        text="Loading Dashboard..." 
        subtext="Fetching statistics and recent activity" 
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
              Please login first to view your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      label: "Saved Prompts",
      value: userStats.savedCount,
      icon: FiBookmark,
      color: "text-blue-500",
    },
    {
      label: "My Reviews",
      value: userStats.reviewCount,
      icon: FiMessageSquare,
      color: "text-pink-500",
    },
    {
      label: "Account Plan",
      value: userStats.subscription,
      icon: FiAward,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-8">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
          Welcome back, {currentUser.name || "Explorer"}! 🚀
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Here is an overview of your saved items, interaction metrics, and activity history.
        </p>
      </div>

      {/* Statistics Cards */}
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

      {/* Upgrade Callout Banner */}
      {userStats.subscription.toLowerCase() === "free" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="neu-card p-6 md:p-8 rounded-[24px] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-[var(--text)]">
              Upgrade to Premium for Unlimited Assets! 💎
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
              You are currently on a <strong className="text-[var(--text)]">Free Account</strong>. Pay a one-time fee of <strong className="text-[var(--primary)]">$5 via Stripe</strong> to instantly unlock blur-hidden private prompts, copy elite contents, and publish unlimited assets!
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="neu-button-primary flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm cursor-pointer flex-shrink-0 active:scale-95 transition-all"
          >
            <span>Upgrade to Premium</span>
            <FiArrowRight className="text-base" />
          </button>
        </motion.div>
      )}

      {/* Recent Activity Section */}
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