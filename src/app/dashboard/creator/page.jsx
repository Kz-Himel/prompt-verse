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

  // ─── LOADING SKELETON / SPINNER ───
  if (loading) {
    return (
      <LoadingSpinner 
        text="Loading Creator Dashboard..." 
        subtext="Fetching your performance, sales, and analytics data" 
      />
    );
  }

  // ─── ERROR STATE ───
  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex justify-center items-center min-h-[400px]">
        <div className="neu-card p-8 rounded-2xl max-w-md w-full text-center space-y-4 border border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-rose-500 font-bold text-xl">
            !
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--text)]">Oops! Something went wrong</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="neu-button-primary px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all inline-block"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Database safety check
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

        <div className="neu-card p-6 rounded-[24px] border border-[var(--border)]">
          <h3 className="text-lg font-bold text-[var(--text)] tracking-tight mb-4">
            Performance Analytics
          </h3>
          <AnalyticsCharts chartData={chartData} />
        </div>
      </div>
    </div>
  );
}