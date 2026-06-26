// import DashboardHeader from "../components/DashboardHeader";
// import StatsGrid from "../components/StatsGrid";
// import MyPromptsCard from "../components/MyPromptsCard";
// import SalesHistoryCard from "../components/SalesHistoryCard";
// import AnalyticsCard from "../components/AnalyticsCard";

// import {
//   stats,
//   prompts,
//   sales,
//   analytics,
// } from "../data/creatorDashboardData";

// export default function CreatorDashboardPage() {
//   return (
//     <div className="space-y-6">
//       <DashboardHeader />

//       <StatsGrid stats={stats} />

//       <div className="grid lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <MyPromptsCard prompts={prompts} />
//           <SalesHistoryCard sales={sales} />
//         </div>

//         <AnalyticsCard analytics={analytics} />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import AnalyticsCards from "./components/AnalyticsCards";
import AnalyticsCharts from "./components/AnalyticsCharts";
import { authClient } from "@/lib/auth-client"; // আপনার better-auth ক্লায়েন্ট পাথ অনুযায়ী পরিবর্তন করে নিবেন

export default function CreatorDashboardHome() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        throw new Error("Please login first!");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/creator/analytics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message || "Failed to fetch creator analytics"
        );
      }

      setAnalyticsData(resData);
    } catch (err) {
      console.error("Analytics Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAnalytics();
}, []);

  // ─── LOADING SKELETON (রিকোয়ারমেন্ট অনুযায়ী) ───
  if (loading) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>
        
        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Chart Skeleton */}
        <div className="h-80 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  // ─── ERROR ROUTE / STATE ───
  if (error) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto text-center py-20">
        <h2 className="text-xl font-bold text-red-500">Oops! Something went wrong</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ডাটাবেজে ডাটা না থাকলে জিরো স্টেট বা ডিফল্ট স্টেট ডিফাইন করা হচ্ছে চ্যাশের হাত থেকে বাঁচতে
  const stats = analyticsData?.stats || { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 };
  const chartData = analyticsData?.chartData || [];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Creator! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">
          Here is what is happening with your prompts today.
        </p>
      </div>

      {/* Cards Component - পাস করা হচ্ছে ডায়নামিক ডাটা */}
      <AnalyticsCards data={stats} />

      {/* Chart Component - পাস করা হচ্ছে ডায়নামিক ডাটা */}
      <div className="mt-8">
        <AnalyticsCharts chartData={chartData} />
      </div>
    </div>
  );
}