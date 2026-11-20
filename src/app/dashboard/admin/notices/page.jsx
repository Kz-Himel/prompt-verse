"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FiSend,
  FiTrash2,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiRefreshCw,
  FiMegaphone,
  FiExternalLink,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const NOTICE_TYPES = [
  { id: "info", label: "Announcement", icon: FiInfo, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { id: "success", label: "Feature / Update", icon: FiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { id: "warning", label: "Maintenance", icon: FiAlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { id: "alert", label: "Urgent Alert", icon: FiAlertCircle, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30" },
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [priority, setPriority] = useState("normal");
  const [target, setTarget] = useState("all");
  const [link, setLink] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  const getHeaders = async () => {
    const headers = { "Content-Type": "application/json" };
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to fetch auth token", err);
    }
    return headers;
  };

  const fetchNotices = async () => {
    try {
      setLoading(true);
      // Try Next.js API first or Express API
      let res = await fetch("/api/notices");
      if (!res.ok && BACKEND_URL) {
        res = await fetch(`${BACKEND_URL}/notices`);
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotices(data.data);
      } else {
        setNotices([]);
      }
    } catch (error) {
      console.error("Fetch notices error:", error);
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required!");
      return;
    }

    try {
      setSubmitting(true);
      const headers = await getHeaders();
      const payload = {
        title: title.trim(),
        message: message.trim(),
        type,
        priority,
        target,
        link: link.trim(),
      };

      // Send to Next.js API route or Express API
      let res = await fetch("/api/notices", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok && BACKEND_URL) {
        res = await fetch(`${BACKEND_URL}/admin/notices`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Notice broadcasted successfully to all users!");
        setTitle("");
        setMessage("");
        setLink("");
        setType("info");
        setPriority("normal");
        setTarget("all");
        fetchNotices();
      } else {
        toast.error(data.message || "Failed to broadcast notice.");
      }
    } catch (error) {
      console.error("Error creating notice:", error);
      toast.error("Network error occurred!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!confirm("Are you sure you want to retract/delete this notice?")) return;

    try {
      setDeletingId(id);
      const headers = await getHeaders();

      let res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok && BACKEND_URL) {
        res = await fetch(`${BACKEND_URL}/admin/notices/${id}`, {
          method: "DELETE",
          headers,
        });
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Notice removed successfully.");
        setNotices((prev) => prev.filter((n) => n._id !== id));
      } else {
        toast.error(data.message || "Failed to delete notice.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--primary)] neu-badge">
            <FiMegaphone className="text-xs" /> Broadcast System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
            Broadcast <span className="text-[var(--primary)]">Notices & Announcements</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1">
            Publish real-time announcements, maintenance notices, and updates visible to all users.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchNotices}
          disabled={loading}
          className="neu-button-secondary px-4 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Content: Form + Active Broadcasts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Notice Form (5 cols on lg) */}
        <div className="lg:col-span-5 neu-card p-6 sm:p-8 rounded-3xl">
          <h2 className="text-lg font-black text-[var(--text)] mb-4 flex items-center gap-2">
            <FiSend className="text-[var(--primary)]" /> Create New Broadcast
          </h2>

          <form onSubmit={handleCreateNotice} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Notice Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled Maintenance, New Claude 3.5 Prompts..."
                required
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm neu-input font-medium"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Message Body *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement details here..."
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm neu-input font-medium resize-none"
              />
            </div>

            {/* Notice Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Notice Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {NOTICE_TYPES.map((t) => {
                  const Icon = t.icon;
                  const isSelected = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? `${t.bg} ${t.color} border ${t.border} shadow-sm font-black`
                          : "neu-card text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      <Icon className="text-sm shrink-0" />
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Priority & Target Audience */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm neu-input font-bold bg-[var(--card)]"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  Target Audience
                </label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm neu-input font-bold bg-[var(--card)]"
                >
                  <option value="all">All Users</option>
                  <option value="creator">Creators Only</option>
                  <option value="user">Regular Users</option>
                </select>
              </div>
            </div>

            {/* Optional Action Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Optional Link / URL
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="e.g. /prompts or /pricing"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm neu-input font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="neu-button-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <FiSend />
              <span>{submitting ? "Broadcasting..." : "Broadcast Notice Now"}</span>
            </button>
          </form>
        </div>

        {/* Active Broadcasts List (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-black text-[var(--text)]">
              Active Broadcasts ({notices.length})
            </h2>
            <span className="text-xs font-bold text-[var(--text-muted)]">
              Real-Time Feed
            </span>
          </div>

          {loading ? (
            <div className="neu-card p-12 text-center rounded-3xl">
              <FiRefreshCw className="animate-spin text-2xl mx-auto text-[var(--primary)] mb-2" />
              <p className="text-xs font-bold text-[var(--text-muted)]">Loading notices...</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="neu-card p-12 text-center rounded-3xl space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl neu-card-inset flex items-center justify-center text-2xl text-[var(--primary)]">
                <FiMegaphone />
              </div>
              <h3 className="text-base font-extrabold text-[var(--text)]">
                No active announcements
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-medium max-w-sm mx-auto">
                Create your first broadcast using the form on the left. It will be pushed dynamically to everyone on the platform.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {notices.map((notice) => {
                  const typeObj =
                    NOTICE_TYPES.find((t) => t.id === notice.type) || NOTICE_TYPES[0];
                  const Icon = typeObj.icon;
                  const dateStr = notice.createdAt
                    ? new Date(notice.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recently";

                  return (
                    <motion.div
                      key={notice._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="neu-card p-5 rounded-2xl space-y-3 relative overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${typeObj.bg} ${typeObj.color}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[var(--text)]">
                              {notice.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-semibold mt-0.5">
                              <span>By {notice.author || "Admin"}</span>
                              <span>•</span>
                              <span>{dateStr}</span>
                            </div>
                          </div>
                        </div>

                        {/* Badges & Delete Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          {notice.priority === "urgent" && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-500 animate-pulse">
                              Urgent
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider neu-card text-[var(--text-muted)]">
                            Target: {notice.target || "all"}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleDeleteNotice(notice._id)}
                            disabled={deletingId === notice._id}
                            className="neu-icon-button w-8 h-8 rounded-xl text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                            aria-label="Delete Notice"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed whitespace-pre-line pl-10">
                        {notice.message}
                      </p>

                      {/* Optional Link */}
                      {notice.link && (
                        <div className="pl-10">
                          <a
                            href={notice.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--primary)] hover:underline"
                          >
                            <span>Open Link: {notice.link}</span>
                            <FiExternalLink size={11} />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
