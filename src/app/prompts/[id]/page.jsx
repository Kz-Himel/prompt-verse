"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiLayers, FiCpu, FiUser, FiCalendar, FiTag, FiAward, 
  FiEye, FiBookmark, FiCopy, FiAlertTriangle, FiLock, FiStar 
} from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";

export default function PromptDetailsPage() {
  const router = useRouter();

  // ডিজাইন টেস্ট করার জন্য কিছু ফেক/ডামি ডাটা (পরে ডাটাবেজ থেকে আসবে)
  const prompt = {
    title: "Expert Tailwind CSS & Next.js UI Architect",
    description: "This prompt transforms any basic wireframe or description into a highly optimized, fully responsive Tailwind CSS component with modern React patterns.",
    instructions: "Paste your raw UI requirements, specify the theme (dark/light), and let the model generate semantic JSX code.",
    content: "You are an expert Frontend Architect. Your job is to convert the following description into high-quality Next.js and Tailwind CSS code:\n\n[DESCRIPTION]\n\nEnsure proper spacing, semantic HTML, and responsive design grid systems.",
    category: "Development",
    aiTool: "ChatGPT (GPT-4o)",
    difficulty: "Advanced",
    authorEmail: "dev.creator@promptverse.com",
    copyCount: 142,
    visibility: "private", // টেস্ট করার জন্য 'private' দেওয়া, পাবলিক দেখতে চাইলে 'public' করে নিন
    tags: ["nextjs", "tailwind", "uidesign", "frontend"],
    reviews: [
      { name: "Sabbir Ahmed", email: "sabbir@gmail.com", rating: 5, comment: "Absolutely incredible prompt! Saved me hours of styling boilerplate code.", date: "June 24, 2026" },
      { name: "Anik Rahman", email: "anik@yahoo.com", rating: 4, comment: "Works great for landing pages. Highly recommended.", date: "June 22, 2026" }
    ]
  };

  // ভিজিবিলিটি স্টাইল টেস্ট করার জন্য স্টেট (ফাংশনালিটি ছাড়া)
  const isPremiumUser = false; // true করে দিলে লক খুলে যাবে
  const hasAccess = prompt.visibility === "public" || isPremiumUser;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* ── ১. টপ অ্যাকশন বার ── */}
        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <button className="text-sm font-medium text-violet-600 hover:underline">
            ← Marketplace
          </button>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <FiBookmark /> Bookmark
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-white text-rose-600 border border-slate-200 rounded-xl hover:bg-rose-50 transition-all">
              <FiAlertTriangle /> Report
            </button>
          </div>
        </div>

        {/* ── মেইন গ্রিড লেআউট ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ── বামের মেইন কন্টেন্ট এরিয়া ── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* প্রম্পট ডেসক্রিপশন এবং মেইন কন্টেন্ট কার্ড */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  <FiLayers /> {prompt.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  <FiCpu /> {prompt.aiTool}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                <RiSparklingFill className="text-violet-600 shrink-0" /> {prompt.title}
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed border-b border-slate-100 pb-4">
                {prompt.description}
              </p>
              
              {/* ইউজ ইন্সট্রাকশন */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-1 text-slate-500">Usage Instructions:</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{prompt.instructions}</p>
              </div>

              {/* প্রম্পট টেক্সট বক্স (লক/ব্লার ডিজাইন) */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-700 text-sm font-semibold">Prompt Template</h3>
                  {hasAccess && (
                    <button className="text-xs font-medium text-violet-600 flex items-center gap-1 hover:underline">
                      <FiCopy /> Copy Prompt
                    </button>
                  )}
                </div>

                <div className="relative rounded-xl border overflow-hidden">
                  <div className={`p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                    hasAccess ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-400 blur-sm select-none pointer-events-none"
                  }`}>
                    {prompt.content}
                  </div>

                  {/* প্রিমিয়াম লক স্ক্রিন ওভারলে */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                      <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mb-3 text-lg shadow-md">
                        <FiLock />
                      </div>
                      <h4 className="text-white font-bold text-base">Premium Prompt</h4>
                      <p className="text-slate-200 text-xs max-w-xs mt-1 mb-4">Subscribe to our Creator Premium Plan to unlock full access to this prompt.</p>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md hover:opacity-90 transition-all">
                        Subscribe to Premium
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* রিভিউ সেকশন ডিজাইন */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-slate-800">Reviews & Ratings</h3>
              
              {/* রিভিউ দেওয়ার ফর্ম */}
              {hasAccess ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600">Leave a Review</p>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-slate-500">Rating:</span>
                    <div className="flex text-amber-500 gap-0.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <FiStar key={num} className="cursor-pointer text-sm" />
                      ))}
                    </div>
                  </div>
                  <textarea rows={3} placeholder="Share your experience using this prompt..." className="w-full text-xs p-3 border rounded-xl outline-none focus:border-violet-500 bg-white resize-none shadow-xs" />
                  <button className="bg-violet-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-violet-500 transition-all">Submit Review</button>
                </div>
              ) : (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 p-3 rounded-xl">Unlock the premium content to participate in the review system.</p>
              )}

              {/* রিভিউ লিস্ট ডিসপ্লে */}
              <div className="space-y-4">
                {prompt.reviews.map((rev, index) => (
                  <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start text-xs mb-1">
                      <div>
                        <span className="font-bold text-slate-700">{rev.name}</span>
                        <span className="text-slate-400 ml-2 text-[10px]">{rev.email}</span>
                      </div>
                      <span className="text-slate-400 text-[10px]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-500 mb-1 text-[11px]">
                      {[...Array(rev.rating)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                    </div>
                    <p className="text-slate-600 text-xs bg-slate-50/50 p-3 rounded-xl">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ডানের মেটাডাটা সাইডবার ── */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-sm border-b pb-2 text-slate-700 uppercase tracking-wider">Metadata</h3>
              
              <div>
                <p className="text-slate-400 font-medium">Creator Info</p>
                <p className="font-semibold text-slate-700 truncate mt-0.5">{prompt.authorEmail}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3">
                <div>
                  <p className="text-slate-400 font-medium">Copies Provided</p>
                  <p className="font-bold text-sm text-slate-700 mt-0.5">{prompt.copyCount}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Difficulty</p>
                  <p className="font-semibold uppercase text-violet-600 flex items-center gap-1 mt-0.5">
                    <FiAward /> {prompt.difficulty}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Visibility Status</p>
                <span className={`inline-block px-2 py-0.5 font-medium rounded mt-1.5 capitalize ${
                  prompt.visibility === "public" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {prompt.visibility}
                </span>
              </div>
            </div>

            {/* ট্যাগস ক্লাউড */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 text-xs">
              <p className="font-semibold text-slate-500 flex items-center gap-1">
                <FiTag /> Related Tags
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {prompt.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}