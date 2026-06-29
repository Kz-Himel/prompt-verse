"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUploadCloud,
  FiX,
  FiPlus,
  FiLock,
  FiGlobe,
  FiAlertCircle,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import {
  RiSparklingFill,
  RiRobot2Line,
  RiPriceTag3Line,
  RiFileTextLine,
  RiImageLine,
} from "react-icons/ri";

// আপনার নির্দেশনামতো utils ফাইল থেকে কনস্ট্যান্টগুলো ইমপোর্ট করা হলো
import {
  AI_TOOLS,
  CATEGORIES,
  DIFFICULTY_LEVELS,
  SUGGESTED_TAGS,
} from "../lib-dashboard/utils";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const FREE_USER_LIMIT = 3;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

// ── FIXED: Added optional props so it doesn't break Creator/Admin pages ──
export default function AddPromptPage({ currentCount: passedCount, role: passedRole }) {
  const { data: session, status } = useSession();
  
  // সেশন থেকে রোল এবং ইমেইল ডিকনструкট করা (ডিফল্ট 'user' যদি রোল না থাকে)
  const userEmail = session?.user?.email;
  
  // ── FIXED: Fallback logic for Role ──
  const role = passedRole || session?.user?.role || "user"; 
  const isUser = role === "user";

  // ── state management ──
  // ── FIXED: Set initial count based on whether passedCount is provided ──
  const [currentCount, setCurrentCount] = useState(passedCount !== undefined ? passedCount : 0);
  const [loadingCount, setLoadingCount] = useState(passedCount !== undefined ? false : true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    aiTool: "",
    difficulty: "",
    visibility: "public",
    tags: [],
  });

  // ── FIXED: Sync state when parent passes count dynamically ──
  useEffect(() => {
    if (passedCount !== undefined) {
      setCurrentCount(passedCount);
      setLoadingCount(false);
    }
  }, [passedCount]);

  // ── Fetch Count internally (Only runs if parent DID NOT pass a count AND it's a free user) ──
  useEffect(() => {
    const getCount = async () => {
      // If count is already provided by parent or user is not a regular 'user', skip the API fetch
      if (passedCount !== undefined || !isUser || !userEmail) {
        setLoadingCount(false);
        return;
      }

      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        const res = await fetch(
          `${BACKEND_URL}/prompts/count/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCurrentCount(data.count || 0);
        }
      } catch (err) {
        console.error("Count Error:", err);
      } finally {
        setLoadingCount(false);
      }
    };

    getCount();
  }, [userEmail, submitted, passedCount, isUser]);

  const isLimitReached = isUser && currentCount >= FREE_USER_LIMIT;

  // ── helpers ──
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addTag = (tag) => {
    const t = tag.trim().toLowerCase();
    if (!t || form.tags.includes(t) || form.tags.length >= 8) return;
    set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (t) => set("tags", form.tags.filter((x) => x !== t));

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
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

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Better Auth JWT
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

      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        aiTool: "",
        difficulty: "",
        visibility: "public",
        tags: [],
      });

      setTagInput("");
      setThumbnail(null);
      setThumbnailPreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── loading screen ──
  if (status === "loading" || (userEmail && loadingCount)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // ── Authentication Check ──
  if (!session) {
    return (
      <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
        <p className="text-slate-600">Please log in to add a prompt.</p>
      </div>
    );
  }

  // ── limit reached screen ──
  if (isLimitReached) {
    return (
      <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiLock className="text-violet-600 text-2xl" />
          </div>
          <h2 className="text-slate-800 text-xl font-semibold mb-2">Prompt Limit Reached</h2>
          <p className="text-slate-500 text-sm mb-1">
            Free users can only add <span className="text-violet-600 font-medium">{FREE_USER_LIMIT} prompts</span>.
          </p>
          <p className="text-slate-500 text-sm mb-6">
            You've used {currentCount} / {FREE_USER_LIMIT} of your free slots.
          </p>
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-4 mb-6">
            <p className="text-violet-700 text-sm font-medium mb-1">Upgrade to Creator</p>
            <p className="text-slate-500 text-xs">Get unlimited prompt uploads, analytics, and earnings.</p>
          </div>
          <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
            <FiZap className="text-sm" /> Upgrade to Creator
          </button>
        </motion.div>
      </div>
    );
  }

  // ── success screen ──
  if (submitted) {
    return (
      <div className="flex items-center justify-center p-6 h-full bg-white min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <FiCheckCircle className="text-emerald-600 text-2xl" />
          </motion.div>
          <h2 className="text-slate-800 text-xl font-semibold mb-2">Prompt Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Your prompt is now <span className="text-amber-600 font-medium">pending review</span>. It will appear in the marketplace once approved by an admin.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ title: "", description: "", content: "", category: "", aiTool: "", difficulty: "", visibility: "public", tags: [] });
              setThumbnail(null);
              setThumbnailPreview(null);
            }}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 shadow-sm"
          >
            Add Another Prompt
          </button>
        </motion.div>
      </div>
    );
  }

  // ── main form ──
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* section: basic info */}
          <SectionHeader icon={<RiFileTextLine />} title="Basic Information" />
          <div className="p-6 space-y-5">
            <Field label="Prompt Title" required error={errors.title}>
              <input
                type="text"
                placeholder="e.g. Expert Python Code Reviewer"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls(errors.title)}
              />
            </Field>

            <Field label="Short Description" required error={errors.description}>
              <textarea
                rows={3}
                placeholder="Briefly describe what this prompt does and who it's for..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputCls(errors.description)} resize-none`}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" required error={errors.category}>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={selectCls(errors.category)}
                >
                  <option value="">Select category</option>
                  {CATEGORIES?.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="AI Tool" required error={errors.aiTool}>
                <select
                  value={form.aiTool}
                  onChange={(e) => set("aiTool", e.target.value)}
                  className={selectCls(errors.aiTool)}
                >
                  <option value="">Select AI tool</option>
                  {AI_TOOLS?.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          </div>

          <Divider />

          {/* section: prompt content */}
          <SectionHeader icon={<RiRobot2Line />} title="Prompt Content" />
          <div className="p-6">
            <Field label="Prompt Content" required error={errors.content}>
              <textarea
                rows={8}
                placeholder={`Write your full prompt here...\n\nTip: Use [VARIABLE] placeholders to make it reusable.\nExample: You are a professional [ROLE] with expertise in [TOPIC]...`}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                className={`${inputCls(errors.content)} resize-none font-mono text-sm bg-slate-50/50`}
              />
              <p className="text-slate-400 text-xs mt-1.5">{form.content.length} characters</p>
            </Field>
          </div>

          <Divider />

          {/* section: tags & difficulty */}
          <SectionHeader icon={<RiPriceTag3Line />} title="Tags & Difficulty" />
          <div className="p-6 space-y-5">
            <Field label="Tags" hint="Up to 8 tags">
              <div className={`${inputCls()} min-h-[48px] flex flex-wrap gap-2 p-2 cursor-text`}>
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    #{t}
                    <button type="button" onClick={() => removeTag(t)} className="hover:text-violet-900 transition-colors">
                      <FiX className="text-xs" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder={form.tags.length === 0 ? "Type a tag and press Enter..." : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); } }}
                  className="flex-1 min-w-[140px] bg-transparent outline-none text-slate-700 text-sm placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SUGGESTED_TAGS?.filter(t => !form.tags.includes(t)).slice(0, 6).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => addTag(t)}
                    className="text-xs text-slate-500 hover:text-violet-600 border border-slate-200 hover:border-violet-300 px-2 py-0.5 rounded-full transition-all bg-slate-50 hover:bg-violet-50"
                  >
                    +{t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Difficulty Level" required error={errors.difficulty}>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTY_LEVELS?.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => set("difficulty", d.value)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                      form.difficulty === d.value
                        ? `${d.bg} ${d.color} border-current shadow-sm`
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Divider />

          {/* section: thumbnail & visibility */}
          <SectionHeader icon={<RiImageLine />} title="Thumbnail & Visibility" />
          <div className="p-6 space-y-5">
            <Field label="Thumbnail Image" hint="PNG, JPG or WebP · Max 2MB">
              <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-all h-40 ${
                thumbnailPreview ? "border-violet-300 bg-violet-50/30" : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/30"
              }`}>
                <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
                {thumbnailPreview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src={thumbnailPreview} alt="preview" className="max-h-32 max-w-full rounded-lg object-contain" />
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setThumbnail(null); setThumbnailPreview(null); }}
                      className="absolute top-2 right-2 bg-slate-800/80 hover:bg-red-500 text-white rounded-full p-1.5 transition-colors shadow-sm"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center">
                      <FiUploadCloud className="text-slate-400 text-xl" />
                    </div>
                    <div className="text-center">
                      <p className="text-slate-600 text-sm"><span className="text-violet-600 font-medium">Click to upload</span> or drag & drop</p>
                      <p className="text-slate-400 text-xs mt-0.5">Recommended: 1200 × 630 px</p>
                    </div>
                  </>
                )}
              </label>
            </Field>

            <Field label="Visibility">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "public", label: "Public", desc: "Visible to everyone", icon: <FiGlobe /> },
                  { value: "private", label: "Private (Premium)", desc: "Only premium users", icon: <FiLock /> },
                ].map((v) => (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => set("visibility", v.value)}
                    className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                      form.visibility === v.value
                        ? "bg-violet-50 border-violet-300 text-slate-800 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    <div className={`text-lg mb-1 ${form.visibility === v.value ? "text-violet-600" : "text-slate-400"}`}>{v.icon}</div>
                    <p className="text-sm font-semibold">{v.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{v.desc}</p>
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
            <FiAlertCircle className="text-amber-600 text-sm mt-0.5 shrink-0" />
            <p className="text-slate-600 text-xs leading-relaxed">
              All submitted prompts are marked as <span className="text-amber-700 font-medium">pending</span> and will be reviewed by an admin before appearing in the marketplace.
            </p>
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <button type="button" className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 text-sm shadow-sm">
              Save as Draft
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : <><FiPlus className="text-sm" /> Publish Prompt</>}
            </button>
          </div>
        </motion.div>
        <div className="h-12" />
      </div>
    </div>
  );
}

// ─── Sub-components ───
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
      <span className="text-violet-600 text-base">{icon}</span>
      <h3 className="text-slate-700 text-sm font-semibold tracking-wide">{title}</h3>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-slate-100" />;
}

function Field({ label, required, hint, error, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-slate-700 text-sm font-medium">
          {label}
          {required && <span className="text-violet-600 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-slate-400 text-xs">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
          >
            <FiAlertCircle className="text-xs shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(error) {
  return `w-full bg-white border ${
    error ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
  } text-slate-800 placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 shadow-sm`;
}

function selectCls(error) {
  return `w-full bg-white border ${
    error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-violet-500"
  } text-slate-800 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 cursor-pointer shadow-sm`;
}