"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function FormField({ label, required, hint, error, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-slate-700 text-sm font-medium">
          {label}
          {required && <span className="text-violet-600 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-slate-400 text-xs">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
          >
            <FiAlertCircle className="text-xs shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function inputCls(error) {
  return `w-full bg-white border ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
  } text-slate-800 placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 shadow-sm`;
}

export function selectCls(error) {
  return `w-full bg-white border ${
    error
      ? "border-red-400 focus:border-red-500"
      : "border-slate-200 focus:border-violet-500"
  } text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 cursor-pointer shadow-sm`;
}