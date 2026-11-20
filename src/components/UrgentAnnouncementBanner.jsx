"use client";

import { useState, useEffect } from "react";
import { HiOutlineMegaphone, HiXMark } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function UrgentAnnouncementBanner() {
  const [urgentNotice, setUrgentNotice] = useState(null);
  const [dismissed, setDismissed] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function checkUrgentNotices() {
      try {
        let res = await fetch("/api/notices");
        if (!res.ok && BACKEND_URL) {
          res = await fetch(`${BACKEND_URL}/notices`);
        }
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          // Find the most recent urgent notice
          const urgent = data.data.find(
            (n) => n.priority === "urgent" || n.type === "alert"
          );

          if (urgent) {
            const dismissedId = sessionStorage.getItem("pv_dismissed_urgent_notice");
            if (dismissedId !== urgent._id) {
              setUrgentNotice(urgent);
              setDismissed(false);
            }
          }
        }
      } catch (e) {
        // Silently skip if fetch fails
      }
    }

    checkUrgentNotices();
  }, []);

  const handleDismiss = () => {
    if (urgentNotice?._id) {
      sessionStorage.setItem("pv_dismissed_urgent_notice", urgentNotice._id);
    }
    setDismissed(true);
  };

  if (dismissed || !urgentNotice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-40 bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white px-4 py-2 text-xs font-semibold shadow-md overflow-hidden"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 truncate">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
              <HiOutlineMegaphone className="h-3 w-3" />
            </span>
            <span className="font-black uppercase tracking-wider text-[10px] bg-white/25 px-2 py-0.5 rounded-full shrink-0">
              Notice
            </span>
            <span className="font-extrabold truncate">{urgentNotice.title}:</span>
            <span className="truncate opacity-90 hidden sm:inline">
              {urgentNotice.message}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {urgentNotice.link && (
              <Link
                href={urgentNotice.link}
                className="underline hover:text-white/80 font-bold inline-flex items-center gap-1 text-[11px]"
              >
                <span>Learn more</span>
                <FiArrowRight className="text-[10px]" />
              </Link>
            )}

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-1 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
            >
              <HiXMark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
