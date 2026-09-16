"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiAlertCircle, FiX, FiInbox } from "react-icons/fi";

export default function MyPromptsCard({ prompts = [], setPrompts, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAiTool, setEditAiTool] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("");
  const [editVisibility, setEditVisibility] = useState("");

  const openEditModal = (prompt) => {
    setSelectedPrompt(prompt);
    setEditTitle(prompt.title || "");
    setEditCategory(prompt.category || "");
    setEditAiTool(prompt.aiTool || "");
    setEditDifficulty(prompt.difficulty || "Beginner");
    setEditVisibility(prompt.visibility || "Public");
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...selectedPrompt,
      title: editTitle,
      category: editCategory,
      aiTool: editAiTool,
      difficulty: editDifficulty,
      visibility: editVisibility,
    };

    if (onUpdate) {
      onUpdate(updatedData);
    } else if (setPrompts) {
      setPrompts(
        prompts.map((p) =>
          p._id === selectedPrompt._id || p.id === selectedPrompt.id ? updatedData : p
        )
      );
    }
    setIsEditModalOpen(false);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
            <FiCheckCircle className="text-xs" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800/40">
            <FiClock className="text-xs" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800/40">
            <FiAlertCircle className="text-xs" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card rounded-2xl overflow-hidden shadow-xs"
      >
        <div className="overflow-x-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 text-[var(--text-muted)] text-xs uppercase tracking-wider font-semibold bg-black/5 dark:bg-white/5">
                <th className="p-4 pl-6">Prompt Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">AI Tool</th>
                <th className="p-4">Sales/Copies</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-sm text-[var(--text)]">
              {prompts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiInbox className="text-3xl opacity-50" />
                      <p className="text-sm font-medium">No prompts found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                prompts.map((prompt, index) => {
                  const rowKey = prompt._id || prompt.id || `prompt-${index}`;

                  return (
                    <tr
                      key={rowKey}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 pl-6 max-w-[280px]">
                        <div className="font-semibold text-[var(--text)] truncate">
                          {prompt.title}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-2">
                          <span>{prompt.visibility}</span>
                          <span>•</span>
                          <span>{prompt.difficulty}</span>
                        </div>
                        {prompt.status === "rejected" && prompt.feedback && (
                          <div className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg border border-rose-200 dark:border-rose-800/30">
                            <strong>Feedback:</strong> {prompt.feedback}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="bg-black/5 dark:bg-white/10 text-[var(--text)] px-2.5 py-1 rounded-md text-xs font-medium">
                          {prompt.category}
                        </span>
                      </td>
                      <td className="p-4 text-[var(--text-muted)] font-medium">
                        {prompt.aiTool}
                      </td>
                      <td className="p-4 font-bold text-[var(--text)]">
                        {prompt.copyCount ?? 0}
                      </td>
                      <td className="p-4">{renderStatusBadge(prompt.status)}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(prompt)}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
                            title="Edit Prompt"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              onDelete && onDelete(prompt._id || prompt.id)
                            }
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Prompt"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal Popup */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="neu-card p-6 w-full max-w-lg shadow-2xl relative z-10 border border-black/5 dark:border-white/10 rounded-2xl bg-[var(--bg)]"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[var(--text)]">
                  Update Prompt Details
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Prompt Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      AI Tool
                    </label>
                    <input
                      type="text"
                      required
                      value={editAiTool}
                      onChange={(e) => setEditAiTool(e.target.value)}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      Difficulty
                    </label>
                    <select
                      value={editDifficulty}
                      onChange={(e) => setEditDifficulty(e.target.value)}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    >
                      <option value="Beginner" className="bg-[var(--bg)] text-[var(--text)]">Beginner</option>
                      <option value="Intermediate" className="bg-[var(--bg)] text-[var(--text)]">Intermediate</option>
                      <option value="Pro" className="bg-[var(--bg)] text-[var(--text)]">Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      Visibility
                    </label>
                    <select
                      value={editVisibility}
                      onChange={(e) => setEditVisibility(e.target.value)}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                    >
                      <option value="Public" className="bg-[var(--bg)] text-[var(--text)]">Public</option>
                      <option value="Private" className="bg-[var(--bg)] text-[var(--text)]">Private</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white hover:opacity-90 shadow-sm transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}