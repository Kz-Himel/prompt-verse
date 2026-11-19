"use client";

import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

export default function ReportModal({ isOpen, onClose, onSubmit }) {
  const [reason, setReason] = useState("Inappropriate Content");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reason, description });
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="neu-card p-6 sm:p-7 w-full max-w-md relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="neu-icon-button w-8 h-8 absolute top-4 right-4"
        >
          <FiX size={16} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <FiAlertTriangle size={16} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Report Prompt
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Help us keep the marketplace safe and clean.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 neu-input cursor-pointer"
            >
              <option value="Inappropriate Content" className="bg-[var(--card)] text-[var(--text)]">
                Inappropriate Content
              </option>
              <option value="Spam" className="bg-[var(--card)] text-[var(--text)]">
                Spam
              </option>
              <option value="Copyright Violation" className="bg-[var(--card)] text-[var(--text)]">
                Copyright Violation
              </option>
              <option value="Broken Prompt" className="bg-[var(--card)] text-[var(--text)]">
                Broken Prompt
              </option>
              <option value="Other" className="bg-[var(--card)] text-[var(--text)]">
                Other
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Additional Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide any context or details..."
              className="w-full text-xs sm:text-sm p-3 neu-input resize-none"
            />
          </div>

          <div className="flex gap-2.5 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="neu-button-secondary px-4 py-2.5 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neu-button-danger px-5 py-2.5 text-xs"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
