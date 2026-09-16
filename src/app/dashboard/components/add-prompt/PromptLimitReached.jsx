"use client";

import { motion } from "framer-motion";
import { FiLock, FiZap } from "react-icons/fi";

export default function PromptLimitReached({ currentCount, limit }) {
  return (
    <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <FiLock className="text-violet-600 text-2xl" />
        </div>
        <h2 className="text-slate-800 text-xl font-semibold mb-2">
          Prompt Limit Reached
        </h2>
        <p className="text-slate-500 text-sm mb-1">
          Free users can only add{" "}
          <span className="text-violet-600 font-medium">
            {limit} prompts
          </span>
          .
        </p>
        <p className="text-slate-500 text-sm mb-6">
          You've used {currentCount} / {limit} of your free slots.
        </p>
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-4 mb-6">
          <p className="text-violet-700 text-sm font-medium mb-1">
            Upgrade to Creator
          </p>
          <p className="text-slate-500 text-xs">
            Get unlimited prompt uploads, analytics, and earnings.
          </p>
        </div>
        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
          <FiZap className="text-sm" /> Upgrade to Creator
        </button>
      </motion.div>
    </div>
  );
}