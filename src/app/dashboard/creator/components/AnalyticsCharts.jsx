"use client";

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

  const finalizedData = defaultMonths.map((month) => {
    const match = chartData.find(
      (item) => item.name?.toLowerCase() === month.name.toLowerCase()
    );
    return {
      name: month.name,
      copies: match ? match.copies : 0,
      prompts: match ? match.prompts : 0,
    };
  });

  const isDataEmpty = finalizedData.every(
    (item) => item.copies === 0 && item.prompts === 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="neu-card p-6 rounded-[24px] border border-[var(--border)]">
        <div className="flex flex-col items-start pb-4">
          <h4 className="text-lg font-bold text-[var(--text)] tracking-tight">
            Performance & Growth Overview
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Track your prompt copies and creation growth
          </p>
        </div>

        <div className="pt-4 h-[350px] w-full">
          {isDataEmpty ? (
            <div className="flex items-center justify-center h-full neu-input rounded-2xl text-[var(--text-muted)] text-sm font-medium">
              No analytics data available yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={finalizedData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Total Copies Gradient */}
                  <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  {/* Prompt Growth Gradient */}
                  <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-surface, #ffffff)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />

                {/* Total copy area */}
                <Area
                  type="monotone"
                  dataKey="copies"
                  name="Total Copies"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCopies)"
                />

                {/* Prompt growth area */}
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
      </div>
    </motion.div>
  );
}