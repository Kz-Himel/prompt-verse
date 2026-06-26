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
} from "recharts";

export default function AnalyticsCharts({ chartData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <Card shadow="sm" className="border border-gray-100 p-6 bg-white rounded-2xl">
        {/* CardHeader এর বদলে ডিরেক্ট div ব্যবহার করে হেডার ফিক্স */}
        <div className="flex flex-col items-start pb-4">
          <h4 className="text-lg font-bold text-gray-800">Earnings & Growth Overview</h4>
          <p className="text-sm text-gray-400">View your prompt performance over time</p>
        </div>
        
        {/* CardBody এর বদলে কন্টেইনার div ব্যবহার করে চার্ট ফিক্স */}
        <div className="pt-4 h-[350px] w-full">
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
        </div>
      </Card>
    </motion.div>
  );
}