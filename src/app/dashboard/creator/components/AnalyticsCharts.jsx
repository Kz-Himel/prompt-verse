"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsCharts({ chartData = [] }) {
  const defaultMonths = [
    { name: "Jan", copies: 0, prompts: 0 },
    { name: "Feb", copies: 0, prompts: 0 },
    { name: "Mar", copies: 0, prompts: 0 },
    { name: "Apr", copies: 0, prompts: 0 },
    { name: "May", copies: 0, prompts: 0 },
    { name: "Jun", copies: 0, prompts: 0 },
    { name: "Jul", copies: 0, prompts: 0 },
    { name: "Aug", copies: 0, prompts: 0 },
    { name: "Sep", copies: 0, prompts: 0 },
    { name: "Oct", copies: 0, prompts: 0 },
    { name: "Nov", copies: 0, prompts: 0 },
    { name: "Dec", copies: 0, prompts: 0 },
  ];

  // ব্যাকএন্ড থেকে আসা ডেটা ১২ মাসের সাথে নিখুঁতভাবে মার্জ করা হচ্ছে
  const finalizedData = defaultMonths.map((month) => {
    const match = chartData.find(
      (item) => item.name?.toLowerCase() === month.name.toLowerCase()
    );
    return {
      name: month.name,
      copies: match ? match.copies : 0,
      prompts: match ? match.prompts : 0, // ডক রিকোয়ারমেন্ট: Prompt Growth
    };
  });

  const isDataEmpty = finalizedData.every(item => item.copies === 0 && item.prompts === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <Card shadow="sm" className="border border-gray-100 p-6 bg-white rounded-2xl">
        <div className="flex flex-col items-start pb-4">
          <h4 className="text-lg font-bold text-gray-800">Performance & Growth Overview</h4>
          <p className="text-sm text-gray-400">Track your prompt copies and creation growth</p>
        </div>
        
        <div className="pt-4 h-[350px] w-full">
          {isDataEmpty ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No analytics data available yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={finalizedData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Total Copies এর জন্য গ্রাডিয়েন্ট */}
                  <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  {/* Prompt Growth এর জন্য গ্রাডিয়েন্ট */}
                  <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                <Legend verticalAlign="top" height={36} iconType="circle" />
                
                {/* ১. টোটাল কপি এরিয়া লাইন */}
                <Area
                  type="monotone"
                  dataKey="copies"
                  name="Total Copies"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCopies)"
                />

                {/* ২. প্রম্পট গ্রোথ এরিয়া লাইন */}
                <Area
                  type="monotone"
                  dataKey="prompts"
                  name="Prompt Growth"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrompts)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </motion.div>
  );
}