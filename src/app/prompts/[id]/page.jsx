"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiLayers, FiCpu, FiBookmark, FiCopy, FiAlertTriangle, FiLock, FiAward, FiTag 
} from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";

import ReportModal from "../../../components/ReportModal";
import ReviewSection from "../../../components/ReviewSection";

export default function PromptDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); 

  // কারেন্ট ইউজার স্টেট (প্রয়োজন অনুযায়ী রিয়েল Auth স্টেট দিয়ে রিপ্লেস করে নিবেন)
  const [currentUser, setCurrentUser] = useState({ name: "Ahsan Habib", email: "dev@gmail.com" }); 

  const [prompt, setPrompt] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // হেডার জেনারেটর (Async ফেচিং-এ ব্যবহারের জন্য)
  const getHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  // ─── ডাটা ফেচিং ও সিঙ্ক ───
  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:5000/prompts/${id}${currentUser?.email ? `?email=${currentUser.email}` : ""}`;
        
        const res = await fetch(url, {
          method: "GET",
          headers: getHeaders()
        });
        const result = await res.json();
        
        if (result.success) {
          setPrompt(result.data);
          setIsPremiumUser(result.isPremiumUser);
          setIsBookmarked(result.isBookmarked);
        } else {
          toast.error(result.message || "Failed to load data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPromptDetails();
  }, [id, currentUser?.email]);

  if (loading) return <div className="text-center py-20 text-sm font-semibold text-slate-500">Loading Prompt Details...</div>;
  if (!prompt) return <div className="text-center py-20 text-red-500 font-medium">Prompt not found!</div>;

  const hasAccess = prompt.visibility === "public" || isPremiumUser;

  // ─── ১. বুকমার্ক টগল ───
  const handleBookmarkToggle = async () => {
    if (!currentUser?.email) return toast.error("Please login first to bookmark!");
    try {
      const res = await fetch(`http://localhost:5000/prompts/${prompt._id}/bookmark`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email: currentUser.email })
      });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.bookmarked);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Bookmark request failed");
    }
  };

  // ─── ২. কপি প্রম্পট এবং কাউন্ট ট্র্যাকিং ───
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      
      const res = await fetch(`http://localhost:5000/prompts/${prompt._id}/copy`, {
        method: "PATCH",
        headers: getHeaders()
      });
      const data = await res.json();
      
      if (data.success) {
        setPrompt(prev => ({ ...prev, copyCount: (prev.copyCount || 0) + 1 }));
        toast.success("Prompt copied to clipboard!");
      }
    } catch (err) {
      toast.error("Failed to process copy action");
    }
  };

  // ─── ৩. রিভিউ সাবমিট হ্যান্ডলার ───
  const handleReviewSubmit = async (reviewData) => {
    if (!currentUser?.email) return toast.error("Please login to leave a review.");
    try {
      const res = await fetch(`http://localhost:5000/prompts/${prompt._id}/reviews`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...reviewData,
          name: currentUser.name,
          email: currentUser.email
        })
      });
      const data = await res.json();
      if (data.success) {
        setPrompt(prev => ({
          ...prev,
          reviews: [...(prev.reviews || []), data.review]
        }));
        toast.success("Review posted successfully!");
      }
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  // ─── ৪. রিপোর্ট সাবমিট হ্যান্ডলার ───
  const handleReportSubmit = async (reportData) => {
    if (!currentUser?.email) return toast.error("Please login to report this prompt.");
    try {
      const res = await fetch(`http://localhost:5000/prompts/${prompt._id}/report`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...reportData,
          userEmail: currentUser.email
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.warning("Prompt reported successfully.");
      }
    } catch (err) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* ಟপ অ্যাকশন বার */}
        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <button onClick={() => router.push("/prompts")} className="text-sm font-medium text-violet-600 hover:underline">
            ← All Prompts
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 border rounded-xl transition-all ${
                isBookmarked ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FiBookmark className={isBookmarked ? "fill-current" : ""} /> {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
            <button onClick={() => setIsReportModalOpen(true)} className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-white text-rose-600 border border-slate-200 rounded-xl hover:bg-rose-50 transition-all">
              <FiAlertTriangle /> Report
            </button>
          </div>
        </div>

        {/* মেইন লেআউট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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

              <p className="text-slate-600 text-sm leading-relaxed border-b border-slate-100 pb-4">{prompt.description}</p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-1 text-slate-500">Usage Instructions:</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{prompt.instructions || "No custom usage instructions provided."}</p>
              </div>

              {/* প্রম্পট টেক্সট বক্স এলাকা */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-700 text-sm font-semibold">Prompt Template</h3>
                  {hasAccess && (
                    <button onClick={handleCopyPrompt} className="text-xs font-medium text-violet-600 flex items-center gap-1 hover:underline">
                      <FiCopy /> Copy Prompt
                    </button>
                  )}
                </div>

                <div className="relative rounded-xl border overflow-hidden">
                  <div className={`p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                    hasAccess ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-400 blur-xs select-none pointer-events-none"
                  }`}>
                    {hasAccess ? prompt.content : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                  </div>

                  {!hasAccess && (
                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                      <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mb-3 text-lg shadow-md">
                        <FiLock />
                      </div>
                      <h4 className="text-white font-bold text-base">Premium Prompt</h4>
                      <p className="text-slate-200 text-xs max-w-xs mt-1 mb-4">Subscribe to our Creator Premium Plan to unlock full access to this prompt.</p>
                      <button onClick={() => router.push("/payment")} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md hover:opacity-90">
                        Subscribe to Premium
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* রিভিউ সেকশন কম্পোনেন্ট */}
            <ReviewSection reviews={prompt.reviews} hasAccess={hasAccess} onReviewSubmit={handleReviewSubmit} />
          </div>

          {/* রাইট সাইডবার (মেটাডাটা) */}
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
                  <p className="font-bold text-sm text-slate-700 mt-0.5">{prompt.copyCount || 0}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Difficulty</p>
                  <p className="font-semibold uppercase text-violet-600 flex items-center gap-1 mt-0.5">
                    <FiAward /> {prompt.difficulty || "Beginner"}
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
              <p className="font-semibold text-slate-500 flex items-center gap-1"><FiTag /> Related Tags</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {prompt.tags?.map((tag, i) => (
                  <span key={i} className="bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md font-medium">#{tag}</span>
                ))}
                {(!prompt.tags || prompt.tags.length === 0) && <span className="text-slate-400 italic">No tags associated</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* রিপোর্ট মডাল */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} onSubmit={handleReportSubmit} />
    </div>
  );
}