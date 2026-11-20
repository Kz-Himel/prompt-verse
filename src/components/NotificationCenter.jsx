"use client";

import { useState, useEffect, useRef } from "react";
import {
  HiOutlineBell,
  HiXMark,
  HiCheck,
  HiOutlineInformationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { FiExternalLink, FiClock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const TYPE_STYLES = {
  info: {
    icon: HiOutlineInformationCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  success: {
    icon: HiOutlineCheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  warning: {
    icon: HiOutlineExclamationTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  alert: {
    icon: HiOutlineExclamationTriangle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
};

export default function NotificationCenter() {
  const [notices, setNotices] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeNoticeModal, setActiveNoticeModal] = useState(null);
  const dropdownRef = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  // Load read notices from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pv_read_notices");
      if (stored) {
        setReadIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read localStorage for notices");
    }
  }, []);

  // Fetch notices dynamically
  const fetchNotices = async () => {
    try {
      let res = await fetch("/api/notices");
      if (!res.ok && BACKEND_URL) {
        res = await fetch(`${BACKEND_URL}/notices`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotices(data.data);
      }
    } catch (err) {
      console.warn("Failed to fetch notices dynamically:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
    // Poll every 60 seconds for fresh announcements
    const interval = setInterval(fetchNotices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotices = notices.filter((n) => !readIds.includes(n._id));
  const unreadCount = unreadNotices.length;

  const markAllAsRead = () => {
    const allIds = notices.map((n) => n._id);
    setReadIds(allIds);
    try {
      localStorage.setItem("pv_read_notices", JSON.stringify(allIds));
    } catch (e) {}
  };

  const markSingleAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      try {
        localStorage.setItem("pv_read_notices", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const openNoticeDetail = (notice) => {
    markSingleAsRead(notice._id);
    setActiveNoticeModal(notice);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View dynamic notices and announcements"
        className="neu-icon-button w-9 h-9 rounded-full relative cursor-pointer"
      >
        <HiOutlineBell size={18} />

        {/* Unread indicator */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-black text-white shadow-sm animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl neu-card p-0 shadow-[var(--shadow-elevated)] border border-[var(--border)] z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                  <HiOutlineMegaphone className="text-[var(--primary)] text-sm" /> Announcements
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[var(--primary)]/15 text-[var(--primary)]">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[11px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HiCheck size={13} /> Mark all read
                </button>
              )}
            </div>

            {/* Notices List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border)] p-1">
              {notices.length === 0 ? (
                <div className="py-10 px-4 text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-xl neu-card-inset flex items-center justify-center text-lg text-[var(--text-muted)]">
                    <HiOutlineBell />
                  </div>
                  <p className="text-xs font-extrabold text-[var(--text)]">
                    All caught up!
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    No active announcements at the moment.
                  </p>
                </div>
              ) : (
                notices.map((notice) => {
                  const isRead = readIds.includes(notice._id);
                  const typeConfig =
                    TYPE_STYLES[notice.type] || TYPE_STYLES.info;
                  const Icon = typeConfig.icon;
                  const dateStr = notice.createdAt
                    ? new Date(notice.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })
                    : "Recent";

                  return (
                    <div
                      key={notice._id}
                      onClick={() => openNoticeDetail(notice)}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                        isRead
                          ? "opacity-60 hover:opacity-100 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                          : "neu-card border-[var(--primary)]/30 font-semibold"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-xl shrink-0 ${typeConfig.bg} ${typeConfig.color}`}
                      >
                        <Icon size={16} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-[var(--text)] truncate">
                            {notice.title}
                          </h4>
                          <span className="text-[10px] text-[var(--text-muted)] shrink-0 flex items-center gap-1 font-medium">
                            <FiClock size={10} /> {dateStr}
                          </span>
                        </div>

                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">
                          {notice.message}
                        </p>

                        {/* Notice Meta / Link */}
                        <div className="mt-2 flex items-center justify-between gap-2">
                          {notice.priority === "urgent" && (
                            <span className="text-[9px] font-black uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                              Urgent
                            </span>
                          )}

                          {notice.link && (
                            <span className="text-[10px] font-bold text-[var(--primary)] inline-flex items-center gap-1">
                              View details <FiExternalLink size={10} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {activeNoticeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl neu-card p-6 relative overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveNoticeModal(null)}
                className="absolute top-4 right-4 neu-icon-button w-8 h-8 rounded-full cursor-pointer"
              >
                <HiXMark size={16} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2.5 rounded-2xl ${
                    (TYPE_STYLES[activeNoticeModal.type] || TYPE_STYLES.info).bg
                  } ${
                    (TYPE_STYLES[activeNoticeModal.type] || TYPE_STYLES.info).color
                  }`}
                >
                  <HiOutlineMegaphone size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--text)]">
                    {activeNoticeModal.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] font-semibold mt-0.5">
                    Published by {activeNoticeModal.author || "Admin"} •{" "}
                    {activeNoticeModal.createdAt
                      ? new Date(activeNoticeModal.createdAt).toLocaleString()
                      : "Recently"}
                  </p>
                </div>
              </div>

              <div className="neu-card-inset p-4 rounded-2xl my-4">
                <p className="text-xs sm:text-sm text-[var(--text)] whitespace-pre-line leading-relaxed font-medium">
                  {activeNoticeModal.message}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                {activeNoticeModal.link && (
                  <a
                    href={activeNoticeModal.link}
                    target="_blank"
                    rel="noreferrer"
                    className="neu-button-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Open Link</span>
                    <FiExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveNoticeModal(null)}
                  className="neu-button-secondary px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
