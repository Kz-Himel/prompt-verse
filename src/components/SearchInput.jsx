"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL-এ আগে থেকে কোনো সার্চ কুয়েরি থাকলে তা ইনিশিয়াল স্টেট হিসেবে বসবে
  const [text, setText] = useState(searchParams.get("search") || "");

  // ইউজার টাইপ করা বন্ধ করার ৫০০ মিলিগ্রাম (debounce) পর স্বয়ংক্রিয়ভাবে সার্চ হবে
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (text.trim()) {
        params.set("search", text);
      } else {
        params.delete("search");
      }
      
      // নতুন কুয়েরি প্যারামিটারসহ ইউআরএল আপডেট হবে
      router.push(`?${params.toString()}`);
    }, 500); // 500ms Debounce Time

    return () => clearTimeout(delayDebounceFn);
  }, [text, router, searchParams]);

  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder="Search prompts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none shadow-sm focus:border-violet-500 transition-colors"
      />
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
    </div>
  );
}