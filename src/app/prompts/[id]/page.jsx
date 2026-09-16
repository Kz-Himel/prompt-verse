"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiLayers, FiCpu, FiBookmark, FiCopy, FiAlertTriangle, FiLock, FiAward, FiTag, FiArrowLeft 
} from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";

import ReportModal from "../../../components/ReportModal";
import ReviewSection from "../../../components/ReviewSection";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PromptDetailsPage() {
  const router = useRouter();
  const { id } = useParams(); 

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const [prompt, setPrompt] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const getHeaders = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to fetch auth token", err);
    }
    
    return headers;
  };

  // Data fetching and sync
  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        setLoading(true);

        const url =
          `${API_URL}/prompts/${id}` +
          (currentUser?.email
            ? `?email=${encodeURIComponent(currentUser.email)}`
            : "");

        const res = await fetch(url);
        const result = await res.json();

        if (result.success) {
          setPrompt(result.data);
          setIsPremiumUser(result.isPremiumUser);
          setIsBookmarked(result.isBookmarked);
        } else {
          toast.error(result.message || "Failed to load data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    if (id && !isPending) {
      fetchPromptDetails();
    }
  }, [id, currentUser?.email, isPending, API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-20 text-sm font-semibold text-[var(--text-muted)]">
      <LoadingSpinner />
    </div>
  );
  
  if (!prompt) return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-20 text-red-500 font-medium">
      Prompt not found!
    </div>
  );

  const hasAccess = prompt.content !== "LOCKED_PREMIUM";

  // Bookmark toggle
  const handleBookmarkToggle = async () => {
    if (!currentUser) {
      return toast.error("Please login first");
    }

    try {
      const headers = await getHeaders();
      const res = await fetch(
        `${API_URL}/prompts/${prompt._id}/bookmark`,
        {
          method: "POST",
          headers: headers,
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsBookmarked(data.bookmarked);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Bookmark request failed");
    }
  };

  // Copy prompt and count
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);

      const res = await fetch(
        `${API_URL}/prompts/${prompt._id}/copy`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        setPrompt((prev) => ({
          ...prev,
          copyCount: (prev.copyCount || 0) + 1,
        }));

        toast.success("Prompt copied!");
      }
    } catch {
      toast.error("Failed to process copy action");
    }
  };

  // Review submit handler
  const handleReviewSubmit = async (reviewData) => {
    if (!currentUser) {
      return toast.error("Please login first");
    }

    try {
      const headers = await getHeaders();
      const res = await fetch(
        `${API_URL}/prompts/${prompt._id}/reviews`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            rating: reviewData.rating,
            comment: reviewData.comment,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setPrompt((prev) => ({
          ...prev,
          reviews: [
            ...(prev.reviews || []),
            data.review,
          ],
        }));

        toast.success("Review posted successfully!");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to submit review");
    }
  };

  // Report submit handler
  const handleReportSubmit = async (reportData) => {
    if (!currentUser) {
      return toast.error("Please login first");
    }

    try {
      const headers = await getHeaders();
      const res = await fetch(
        `${API_URL}/prompts/${prompt._id}/report`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            reason: reportData.reason,
            description: reportData.description,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Prompt reported successfully");
        setIsReportModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] py-10 px-4 sm:px-6 lg:px-8 text-[var(--text)] transition-colors duration-200">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Action Bar (Soft UI Elevated Container) */}
        <div className="flex justify-between items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.7)] dark:shadow-[4px_4px_10px_#080b0f,-2px_-2px_8px_rgba(255,255,255,0.02)]">
          <button 
            onClick={() => router.push("/prompts")} 
            className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[3px_3px_7px_rgba(0,0,0,0.05),-3px_-3px_7px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_7px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] cursor-pointer transition-all duration-150"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> All Prompts
          </button>
          
          <div className="flex items-center gap-3">
            {/* Bookmark Soft Button */}
            <button 
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                isBookmarked 
                  ? "bg-[var(--primary)] text-white border-transparent shadow-[3px_3px_8px_rgba(15,118,110,0.35)]" 
                  : "bg-[var(--card)] text-[var(--text-muted)] border-[var(--border)] shadow-[3px_3px_7px_rgba(0,0,0,0.05),-3px_-3px_7px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_7px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] hover:text-[var(--text)]"
              }`}
            >
              <FiBookmark className={isBookmarked ? "fill-current" : ""} /> 
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            {/* Report Soft Button */}
            <button 
              onClick={() => setIsReportModalOpen(true)} 
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 bg-[var(--card)] text-rose-500 border border-[var(--border)] rounded-xl shadow-[3px_3px_7px_rgba(0,0,0,0.05),-3px_-3px_7px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_7px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] cursor-pointer transition-all duration-150"
            >
              <FiAlertTriangle /> Report
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Primary Details Card */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.7)] dark:shadow-[6px_6px_16px_#080b0f,-3px_-3px_10px_rgba(255,255,255,0.02)] space-y-5">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] text-[var(--primary)] text-xs font-semibold px-3 py-1.5 rounded-xl shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.7)] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-1px_-1px_3px_rgba(255,255,255,0.02)]">
                  <FiLayers /> {prompt.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] text-blue-500 dark:text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.7)] dark:shadow-[inset_2px_2px_4px_#080b0f,inset_-1px_-1px_3px_rgba(255,255,255,0.02)]">
                  <FiCpu /> {prompt.aiTool}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5 text-[var(--text)]">
                <RiSparklingFill className="text-[var(--primary)] shrink-0" /> {prompt.title}
              </h1>

              {/* Description */}
              <p className="text-[var(--text-muted)] text-sm leading-relaxed border-b border-[var(--border)] pb-5">
                {prompt.description}
              </p>
              
              {/* Usage Instructions (Inset Soft UI Box) */}
              <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-1 text-[var(--primary)]">
                  Usage Instructions:
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {prompt.instructions || "No custom usage instructions provided."}
                </p>
              </div>

              {/* Prompt Text Box */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-[var(--text)] text-sm font-semibold">Prompt Template</h3>
                  {hasAccess && (
                    <button 
                      onClick={handleCopyPrompt} 
                      className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[2px_2px_5px_#080b0f,-1px_-1px_4px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_3px_rgba(0,0,0,0.08),inset_-2px_-2px_3px_rgba(255,255,255,0.6)] cursor-pointer transition-all duration-150"
                    >
                      <FiCopy /> Copy Prompt
                    </button>
                  )}
                </div>

                <div className="relative rounded-2xl border border-[var(--border)] overflow-hidden">
                  {/* Code Container - Inset Soft UI Viewport */}
                  <div className={`p-5 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                    hasAccess 
                      ? "bg-[var(--card)] text-[var(--text)] shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_10px_#080b0f,inset_-2px_-2px_8px_rgba(255,255,255,0.02)]" 
                      : "bg-[var(--card)] text-[var(--text-muted)] blur-xs select-none pointer-events-none opacity-40"
                  }`}>
                    {hasAccess ? prompt.content : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                  </div>

                  {/* Locked Overlay for Non-Premium Users */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-[var(--card)]/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 bg-[var(--card)] border border-[var(--border)] text-amber-500 rounded-2xl flex items-center justify-center mb-3 text-lg shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_10px_#080b0f,-2px_-2px_8px_rgba(255,255,255,0.02)]">
                        <FiLock />
                      </div>
                      <h4 className="text-[var(--text)] font-bold text-base">Premium Prompt</h4>
                      <p className="text-[var(--text-muted)] text-xs max-w-xs mt-1 mb-4">
                        Subscribe to our Creator Premium Plan to unlock full access to this prompt.
                      </p>
                      <button 
                        onClick={() => router.push("/payment")} 
                        className="bg-[var(--primary)] text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-[3px_3px_8px_rgba(15,118,110,0.35)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-150"
                      >
                        Subscribe to Premium
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Review Section */}
            <ReviewSection reviews={prompt.reviews} hasAccess={hasAccess} onReviewSubmit={handleReviewSubmit} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Metadata Card */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.7)] dark:shadow-[6px_6px_16px_#080b0f,-3px_-3px_10px_rgba(255,255,255,0.02)] space-y-4 text-xs">
              <h3 className="font-bold text-xs border-b border-[var(--border)] pb-3 text-[var(--primary)] uppercase tracking-wider">
                Metadata
              </h3>
              
              <div>
                <p className="text-[var(--text-muted)] font-medium">Creator Info</p>
                <p className="font-semibold text-[var(--text)] truncate mt-1">{prompt.authorEmail}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-[var(--border)] py-3">
                <div>
                  <p className="text-[var(--text-muted)] font-medium">Copies Provided</p>
                  <p className="font-bold text-sm text-[var(--text)] mt-1">{prompt.copyCount || 0}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] font-medium">Difficulty</p>
                  <p className="font-semibold uppercase text-[var(--primary)] flex items-center gap-1 mt-1">
                    <FiAward /> {prompt.difficulty || "Beginner"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[var(--text-muted)] font-medium">Visibility Status</p>
                <span className={`inline-block px-3 py-1 font-semibold rounded-lg mt-2 capitalize text-[10px] border border-[var(--border)] ${
                  prompt.visibility === "public" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {prompt.visibility}
                </span>
              </div>
            </div>

            {/* Related Tags Card */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.7)] dark:shadow-[6px_6px_16px_#080b0f,-3px_-3px_10px_rgba(255,255,255,0.02)] space-y-3 text-xs">
              <p className="font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                <FiTag className="text-[var(--primary)]" /> Related Tags
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {prompt.tags?.map((tag, i) => (
                  <span 
                    key={i} 
                    className="bg-[var(--card)] border border-[var(--border)] text-[var(--text)] px-3 py-1.5 rounded-xl font-medium shadow-[2px_2px_5px_rgba(0,0,0,0.04),-2px_-2px_5px_rgba(255,255,255,0.6)] dark:shadow-[2px_2px_5px_#080b0f,-1px_-1px_4px_rgba(255,255,255,0.02)]"
                  >
                    #{tag}
                  </span>
                ))}
                {(!prompt.tags || prompt.tags.length === 0) && (
                  <span className="text-[var(--text-muted)] italic">No tags associated</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        onSubmit={handleReportSubmit} 
      />
    </div>
  );
}