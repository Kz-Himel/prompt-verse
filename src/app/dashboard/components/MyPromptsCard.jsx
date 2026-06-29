"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

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
      visibility: editVisibility
    };

    if (onUpdate) {
      onUpdate(updatedData);
    } else if (setPrompts) {
      setPrompts(prompts.map((p) => ((p._id === selectedPrompt._id || p.id === selectedPrompt.id) ? updatedData : p)));
    }
    setIsEditModalOpen(false);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
            <FiCheckCircle className="text-xs" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            <FiClock className="text-xs" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200">
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
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs"
      >
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 pl-6">Prompt Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">AI Tool</th>
                <th className="p-4">Sales/Copies</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {prompts.map((prompt, index) => {
                const rowKey = prompt._id || prompt.id || `prompt-${index}`;
                
                return (
                  <tr key={rowKey} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 max-w-[280px]">
                      <div className="font-medium text-gray-800 truncate">{prompt.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 flex gap-2">
                        <span>{prompt.visibility}</span>
                        <span>•</span>
                        <span>{prompt.difficulty}</span>
                      </div>
                      {prompt.status === "rejected" && prompt.feedback && (
                        <div className="text-xs text-red-500 mt-1 bg-red-50/50 p-1.5 rounded-lg border border-red-100">
                          <strong>Feedback:</strong> {prompt.feedback}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        {prompt.category}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{prompt.aiTool}</td>
                    <td className="p-4 font-semibold text-gray-800">{prompt.copyCount ?? 0}</td>
                    <td className="p-4">{renderStatusBadge(prompt.status)}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prompt)}
                          className="p-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          title="Edit Prompt"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(prompt._id || prompt.id)}
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Prompt"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit modal popup*/}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative z-10 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Update Prompt Details</h3>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Prompt Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">AI Tool</label>
                    <input
                      type="text"
                      required
                      value={editAiTool}
                      onChange={(e) => setEditAiTool(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Difficulty</label>
                    <select
                      value={editDifficulty}
                      onChange={(e) => setEditDifficulty(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-hidden focus:border-purple-500 transition-colors"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Pro">Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Visibility</label>
                    <select
                      value={editVisibility}
                      onChange={(e) => setEditVisibility(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-hidden focus:border-purple-500 transition-colors"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-sm font-medium text-white hover:bg-purple-700 shadow-xs transition-colors"
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