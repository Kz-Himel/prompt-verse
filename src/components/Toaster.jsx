"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toaster() {
  return (
    <ToastContainer
      toastClassName={() =>
        "bg-[#EBF1F5] text-[#1E293B] dark:bg-[#151C24] dark:text-[#F1F5F9] shadow-[6px_6px_12px_#c7d0d8,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0d1217,-6px_-6px_12px_#1d2631] rounded-xl p-4 border border-white/50 dark:border-white/5 my-2"
      }
    />
  );
}