"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { FiCpu, FiCopy, FiBookmark } from "react-icons/fi";

export default function AnalyticsCards({ data }) {
  const stats = data || { totalPrompts: 0, totalCopies: 0, totalBookmarks: 0 };

  const cards = [
    {
      title: "Total Prompts",
      value: stats.totalPrompts,
      icon: <FiCpu className="text-2xl text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      title: "Total Copies",
      value: stats.totalCopies,
      icon: <FiCopy className="text-2xl text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Bookmarks",
      value: stats.totalBookmarks,
      icon: <FiBookmark className="text-2xl text-pink-600" />,
      bg: "bg-pink-50",
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
          <Card shadow="sm" className="border border-gray-100 p-2 bg-white rounded-2xl">
            <div className="flex flex-row items-center justify-between p-4 w-full">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">
                  {card.value.toLocaleString()}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}