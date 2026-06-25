"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <FiX size={20} />
        </button>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Report Prompt</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for Report</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-sm p-2.5 border rounded-xl bg-slate-50 outline-none focus:border-violet-500"
            >
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Spam">Spam</option>
              <option value="Copyright Violation">Copyright Violation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <textarea 
              rows={3} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional details..." 
              className="w-full text-xs p-3 border rounded-xl outline-none focus:border-violet-500 bg-white resize-none"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-xl">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}