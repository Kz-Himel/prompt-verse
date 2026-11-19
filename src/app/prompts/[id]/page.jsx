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
        <div className="flex justify-between items-center neu-card p-4">
          <button 
            onClick={() => router.push("/prompts")} 
            className="neu-button-secondary px-3.5 py-2 text-xs flex items-center gap-2"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> All Prompts
          </button>
          
          <div className="flex items-center gap-3">
            {/* Bookmark Soft Button */}
            <button 
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                isBookmarked 
                  ? "neu-button-primary" 
                  : "neu-button-secondary"
              }`}
            >
              <FiBookmark className={isBookmarked ? "fill-current" : ""} /> 
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            {/* Report Soft Button */}
            <button 
              onClick={() => setIsReportModalOpen(true)} 
              className="neu-button-secondary text-rose-500 hover:text-rose-600 px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <FiAlertTriangle /> Report
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Primary Details Card */}
            <div className="neu-card p-6 sm:p-8 space-y-5">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2.5">
                <span className="neu-badge text-xs px-3 py-1.5 flex items-center gap-1.5">
                  <FiLayers /> {prompt.category}
                </span>
                <span className="neu-badge text-xs px-3 py-1.5 text-blue-500 dark:text-blue-400 flex items-center gap-1.5">
                  <FiCpu /> {prompt.aiTool}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 text-[var(--text)]">
                <RiSparklingFill className="text-[var(--primary)] shrink-0" /> {prompt.title}
              </h1>

              {/* Description */}
              <p className="text-[var(--text-muted)] text-sm leading-relaxed border-b border-[var(--border)] pb-5 font-medium">
                {prompt.description}
              </p>
              
              {/* Usage Instructions (Inset Soft UI Box) */}
              <div className="neu-card-inset p-4 sm:p-5">
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[var(--primary)]">
                  Usage Instructions:
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
                  {prompt.instructions || "No custom usage instructions provided."}
                </p>
              </div>

              {/* Prompt Text Box */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-[var(--text)] text-sm font-bold uppercase tracking-wider">Prompt Template</h3>
                  {hasAccess && (
                    <button 
                      onClick={handleCopyPrompt} 
                      className="neu-button-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
                    >
                      <FiCopy /> Copy Prompt
                    </button>
                  )}
                </div>

                <div className="relative rounded-2xl overflow-hidden neu-card-inset">
                  {/* Code Container - Inset Soft UI Viewport */}
                  <div className={`p-5 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                    hasAccess 
                      ? "text-[var(--text)]" 
                      : "text-[var(--text-muted)] blur-xs select-none pointer-events-none opacity-40"
                  }`}>
                    {hasAccess ? (prompt.content || prompt.promptContent) : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                  </div>

                  {/* Locked Overlay for Non-Premium Users */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-[var(--card)]/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 neu-card text-amber-500 rounded-2xl flex items-center justify-center mb-3 text-lg">
                        <FiLock />
                      </div>
                      <h4 className="text-[var(--text)] font-extrabold text-base">Premium Prompt</h4>
                      <p className="text-[var(--text-muted)] text-xs max-w-xs mt-1 mb-4 font-medium">
                        Subscribe to our Creator Premium Plan to unlock full access to this prompt.
                      </p>
                      <button 
                        onClick={() => router.push("/pricing")} 
                        className="neu-button-primary text-xs px-6 py-2.5 rounded-xl font-bold"
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
            <div className="neu-card p-5 sm:p-6 space-y-4 text-xs">
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
                <span className={`inline-block px-3 py-1 font-semibold rounded-lg mt-2 capitalize text-[10px] neu-card ${
                  prompt.visibility === "public" 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-amber-600 dark:text-amber-400"
                }`}>
                  {prompt.visibility}
                </span>
              </div>
            </div>

            {/* Related Tags Card */}
            <div className="neu-card p-5 sm:p-6 space-y-3 text-xs">
              <p className="font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <FiTag className="text-[var(--primary)]" /> Related Tags
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {prompt.tags?.map((tag, i) => (
                  <span 
                    key={i} 
                    className="neu-badge text-[11px] px-3 py-1 font-medium"
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