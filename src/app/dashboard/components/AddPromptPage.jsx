"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiAlertCircle } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import { toast } from "react-toastify";

import { useSession, authClient } from "@/lib/auth-client";

// Modular Sub-components
import BasicInfoSection from "@/components/add-prompt/BasicInfoSection";
import ContentSection from "@/components/add-prompt/ContentSection";
import TagsSection from "@/components/add-prompt/TagsSection";
import ThumbnailSection from "@/components/add-prompt/ThumbnailSection";
import VisibilitySection from "@/components/add-prompt/VisibilitySection";
import PromptLimitReached from "@/components/add-prompt/PromptLimitReached";
import PromptSuccess from "@/components/add-prompt/PromptSuccess";

const FREE_USER_LIMIT = 3;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddPromptPage({
  currentCount: passedCount,
  role: passedRole,
}) {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const role = passedRole || session?.user?.role || "user";
  const isUser = role === "user";

  const [currentCount, setCurrentCount] = useState(
    passedCount !== undefined ? passedCount : 0
  );
  const [loadingCount, setLoadingCount] = useState(passedCount === undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const initialFormState = {
    title: "",
    description: "",
    content: "",
    category: "",
    aiTool: "",
    difficulty: "",
    visibility: "public",
    tags: [],
  };

  const [form, setForm] = useState(initialFormState);

  // Sync count with parent component
  useEffect(() => {
    if (passedCount !== undefined) {
      setCurrentCount(passedCount);
      setLoadingCount(false);
    }
  }, [passedCount]);

  // Fetch count if not passed from parent
  useEffect(() => {
    const getCount = async () => {
      if (passedCount !== undefined || !isUser || !userEmail) {
        setLoadingCount(false);
        return;
      }
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;
        const res = await fetch(`${BACKEND_URL}/prompts/count/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setCurrentCount(data.count || 0);
      } catch (err) {
        console.error("Count Error:", err);
      } finally {
        setLoadingCount(false);
      }
    };

    getCount();
  }, [userEmail, submitted, passedCount, isUser]);

  const isLimitReached = isUser && currentCount >= FREE_USER_LIMIT;

  // Form State Helpers
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addTag = (tag) => {
    const t = tag.trim().toLowerCase();
    if (!t || form.tags.includes(t) || form.tags.length >= 8) return;
    set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (t) =>
    set(
      "tags",
      form.tags.filter((x) => x !== t)
    );

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(initialFormState);
    setTagInput("");
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.content.trim()) e.content = "Prompt content is required";
    if (!form.category) e.category = "Select a category";
    if (!form.aiTool) e.aiTool = "Select an AI tool";
    if (!form.difficulty) e.difficulty = "Select difficulty level";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    setErrors({});
    setIsSubmitting(true);

    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        content: form.content.trim(),
        category: form.category,
        aiTool: form.aiTool,
        difficulty: form.difficulty,
        visibility: form.visibility,
        tags: form.tags,
      };

      const res = await fetch(`${BACKEND_URL}/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create prompt");
      }

      toast.success("Prompt submitted successfully!");
      setCurrentCount((prev) => prev + 1);
      setSubmitted(true);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading Screen
  if (status === "loading" || (userEmail && loadingCount)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // Auth Check
  if (!session) {
    return (
      <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
        <p className="text-slate-600">Please log in to add a prompt.</p>
      </div>
    );
  }

  // Status screens
  if (isLimitReached)
    return (
      <PromptLimitReached
        currentCount={currentCount}
        limit={FREE_USER_LIMIT}
      />
    );

  if (submitted) return <PromptSuccess onReset={resetForm} />;

  // Main Form View
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-600">Add Prompt</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-slate-800 text-2xl font-bold tracking-tight flex items-center gap-2">
                <RiSparklingFill className="text-violet-600" />
                Add New Prompt
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {isUser
                  ? `Free plan · ${currentCount} / ${FREE_USER_LIMIT} prompts used`
                  : "Creator plan · Unlimited prompts"}
              </p>
            </div>

            {isUser && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <FiAlertCircle className="text-xs" />
                {Math.max(0, FREE_USER_LIMIT - currentCount)} slots left
              </div>
            )}
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Section 1: Basic Info */}
          <BasicInfoSection form={form} errors={errors} set={set} />
          
          <div className="h-px bg-slate-100" />

          {/* Section 2: Content */}
          <ContentSection form={form} errors={errors} set={set} />
          
          <div className="h-px bg-slate-100" />

          {/* Section 3: Tags & Difficulty */}
          <TagsSection
            form={form}
            errors={errors}
            set={set}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addTag={addTag}
            removeTag={removeTag}
          />

          <div className="h-px bg-slate-100" />

          {/* Section 4: Thumbnail */}
          <ThumbnailSection
            thumbnailPreview={thumbnailPreview}
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
            handleThumbnail={handleThumbnail}
          />

          <div className="h-px bg-slate-100" />

          {/* Section 5: Visibility */}
          <VisibilitySection form={form} set={set} />

          {/* Action Buttons */}
          <div className="px-6 pb-6 pt-2 flex items-center gap-3">
            <button
              type="button"
              className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 text-sm shadow-sm"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Publishing..."
              ) : (
                <>
                  <FiPlus className="text-sm" /> Publish Prompt
                </>
              )}
            </button>
          </div>
        </motion.div>
        
        <div className="h-12" />
      </div>
    </div>
  );
}