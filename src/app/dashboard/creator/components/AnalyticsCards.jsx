"use client";

import { motion } from "framer-motion";
import { FiCpu, FiCopy, FiBookmark } from "react-icons/fi";

export default function AnalyticsCards({ data }) {
  const stats = data || { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 };

  const cards = [
    {
      title: "Total Prompts",
      value: stats.totalPrompts,
      icon: <FiCpu className="text-xl text-[var(--primary)]" />,
    },
    {
      title: "Total Copies",
      value: stats.totalCopies,
      icon: <FiCopy className="text-xl text-blue-500" />,
    },
    {
      title: "Total Bookmarks",
      value: stats.totalBookmarks,
      icon: <FiBookmark className="text-xl text-pink-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="neu-card p-5 rounded-[20px] border border-[var(--border)] flex items-center justify-between transition-all">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold text-[var(--text)] tracking-tight">
                {card.value.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center shrink-0">
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}