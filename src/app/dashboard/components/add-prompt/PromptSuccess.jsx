"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function PromptSuccess({ onReset }) {
  return (
    <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <FiCheckCircle className="text-emerald-600 text-2xl" />
        </motion.div>
        <h2 className="text-slate-800 text-xl font-semibold mb-2">
          Prompt Submitted!
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Your prompt is now{" "}
          <span className="text-amber-600 font-medium">pending review</span>.
          It will appear in the marketplace once approved by an admin.
        </p>
        <button
          onClick={onReset}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 shadow-sm"
        >
          Add Another Prompt
        </button>
      </motion.div>
    </div>
  );
}