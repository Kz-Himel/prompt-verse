"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiCpu,
  FiUser,
  FiCopy,
  FiArrowRight,
} from "react-icons/fi";

export default function PromptCard({ prompt, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top */}
      <div className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            <FiLayers size={12} />
            {prompt.category}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <FiCpu size={12} />
            {prompt.aiTool}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-[56px]">
          {prompt.title}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[11px] text-slate-500 mb-1">
              Total Copies
            </p>

            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <FiCopy />
              {prompt.copyCount}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[11px] text-slate-500 mb-1">
              Creator
            </p>

            <div className="flex items-center gap-2 font-semibold text-slate-800 truncate">
              <FiUser />
              <span className="truncate">
                {prompt.creatorName ||
                  prompt.authorEmail?.split("@")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-5 mt-5 border-t border-slate-100">
        <Link
          href={`/prompts/${prompt._id}`}
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-600"
        >
          View Details
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}