"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import DashboardHeader from "../components/DashboardHeader";
import AnalyticsCards from "./components/AnalyticsCards";
import AnalyticsCharts from "./components/AnalyticsCharts";
import MyPromptsCard from "../components/MyPromptsCard";
import SalesHistoryCard from "../components/SalesHistoryCard";
import LoadingSpinner from "@/components/LoadingSpinner";

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
          `${process.env.NEXT_PUBLIC_API_URL}/creator/analytics`,
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

  // ─── LOADING SKELETON ───
  if (loading) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto animate-pulse space-y-6">
        <LoadingSpinner />
      </div>
    );
  }

  // ─── ERROR STATE ───
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

  // Database safty check
  const stats = analyticsData?.stats || { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 };
  const chartData = analyticsData?.chartData || [];
  const prompts = analyticsData?.prompts || [];
  const sales = analyticsData?.sales || [];

  return (
    <div className="space-y-6 p-6 max-w-[1400px] mx-auto">
      <DashboardHeader />

      <AnalyticsCards data={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MyPromptsCard prompts={prompts} />
          <SalesHistoryCard sales={sales} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Analytics</h3>
          <AnalyticsCharts chartData={chartData} />
        </div>

      </div>
    </div>
  );
}