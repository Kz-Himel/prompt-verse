"use client";

import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";

export default function AppLoader({
  text = "Loading PromptVerse...",
  subtext = "Please wait a moment",
  fullScreen = false,
  size = "md",
}) {
  const sizeMap = {
    sm: { box: "w-20 h-20", icon: "text-xl", ring: "w-24 h-24" },
    md: { box: "w-24 h-24", icon: "text-3xl", ring: "w-28 h-28" },
    lg: { box: "w-32 h-32", icon: "text-4xl", ring: "w-36 h-36" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const LoaderContent = (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {/* Neumorphic Logo & Outer Orbit Container */}
      <div className="relative flex items-center justify-center">
        {/* 1. Outer Rotating Gradient Spinner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className={`${currentSize.ring} absolute rounded-full border-2 border-transparent border-t-[var(--primary)] border-r-[var(--primary)]/40`}
          style={{
            boxShadow: "var(--glow-primary)",
          }}
        />

        {/* 2. Secondary Glowing Pulse Ring */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`${currentSize.ring} absolute rounded-full border border-[var(--primary)]/20`}
        />

        {/* 3. Center Neumorphic Logo Card */}
        <div
          className={`${currentSize.box} neu-card rounded-2xl flex items-center justify-center relative z-10 border border-[var(--border)]`}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[var(--primary)]"
          >
            {/* Logo */}
            <svg
              className={`${currentSize.icon} drop-shadow-sm`}
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6l6 6-6 6" />
              <line x1="16" y1="17" x2="16" y2="17" strokeWidth="3" />
              <path
                d="M19 6.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6z"
                fill="currentColor"
                fillOpacity="0.6"
                stroke="none"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Text Section */}
      <div className="text-center space-y-1">
        <h4 className="text-sm font-bold tracking-wide text-[var(--text)]">
          {text}
        </h4>
        {subtext && (
          <p className="text-xs font-medium text-[var(--text-muted)] animate-pulse">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/80 backdrop-blur-md">
        {LoaderContent}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[300px] flex items-center justify-center">
      {LoaderContent}
    </div>
  );
}
