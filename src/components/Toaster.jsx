"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // Soft UI Custom Container & Toast Classes
      toastClassName={() =>
        "relative flex p-4 mb-3 min-h-12 rounded-2xl justify-between overflow-hidden cursor-pointer " +
        "bg-[var(--card,#EBF1F5)] text-[var(--text,#1E293B)] " +
        "shadow-[6px_6px_14px_rgba(0,0,0,0.08),-6px_-6px_14px_rgba(255,255,255,0.8)] " +
        "dark:shadow-[6px_6px_14px_#080b0f,-4px_-4px_12px_rgba(255,255,255,0.02)] " +
        "border border-white/40 dark:border-white/5 transition-all duration-200"
      }
      bodyClassName={() => "flex items-center text-xs sm:text-sm font-medium p-0 m-0"}
      style={{ width: "360px", maxWidth: "90vw" }}
    />
  );
}