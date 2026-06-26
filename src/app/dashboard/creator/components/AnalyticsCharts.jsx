"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client"; // আপনার better-auth ক্লায়েন্ট পাথ অনুযায়ী পরিবর্তন করে নিবেন
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsCharts() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultMonths = [
    { name: "Jan", copies: 0 }, { name: "Feb", copies: 0 }, { name: "Mar", copies: 0 },
    { name: "Apr", copies: 0 }, { name: "May", copies: 0 }, { name: "Jun", copies: 0 },
    { name: "Jul", copies: 0 }, { name: "Aug", copies: 0 }, { name: "Sep", copies: 0 },
    { name: "Oct", copies: 0 }, { name: "Nov", copies: 0 }, { name: "Dec", copies: 0 },
  ];

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const tokenObj = await authClient.jwt.getToken();
        const token = tokenObj?.token;

        if (!token) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/creator/analytics`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.chartData) {
            // ব্যাকএন্ডের ডেটা ১২ মাসের সাথে ম্যাপ করা হচ্ছে
            const finalizedData = defaultMonths.map((month) => {
              const match = resData.chartData.find(
                (item) => item.name?.toLowerCase() === month.name.toLowerCase()
              );
              return { name: month.name, copies: match ? match.copies : 0 };
            });
            setChartData(finalizedData);
          }
        }
      } catch (err) {
        console.error("Charts Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  // ─── LOADING SKELETON FOR CHART ───
  if (loading) {
    return (
      <div className="mt-8 animate-pulse">
        <div className="h-[450px] bg-gray-100 rounded-2xl border border-gray-100"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <Card shadow="sm" className="border border-gray-100 p-6 bg-white rounded-2xl">
        <div className="flex flex-col items-start pb-4">
          <h4 className="text-lg font-bold text-gray-800">Prompt Growth Overview</h4>
          <p className="text-sm text-gray-400">View your prompt performance over time</p>
        </div>
        
        <div className="pt-4 h-[350px] w-full">
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No analytics data available yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="copies"
                  stroke="#9333ea"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCopies)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </motion.div>
  );
}