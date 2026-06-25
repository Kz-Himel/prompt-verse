"use client";

import { useState } from "react";
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

// ─── Dummy / constant data ────────────────────────────────────────────────────
const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "DALL·E",
  "Stable Diffusion",
  "Llama",
  "Mistral",
  "Perplexity",
  "Copilot",
];

const CATEGORIES = [
  "Writing",
  "Coding",
  "Design",
  "Marketing",
  "Business",
  "Education",
  "Productivity",
  "Research",
  "Creative",
  "Other",
];

const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
  { value: "intermediate", label: "Intermediate", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30" },
  { value: "pro", label: "Pro", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/30" },
];

const SUGGESTED_TAGS = [
  "productivity", "creative", "automation", "storytelling",
  "seo", "coding", "analysis", "summarize", "translate", "debug",
];

// ─── Free user limit ───────────────────────────────────────────────────────────
const FREE_USER_LIMIT = 3;

// ─── Shared AddPromptPage Component ───────────────────────────────────────────
// Props:
//   role          → "user" | "creator"
//   currentCount  → how many prompts this user already added (dummy: 1)
export default function AddPromptPage({ role = "creator", currentCount = 1 }) {
  const isUser = role === "user";
  const isLimitReached = isUser && currentCount >= FREE_USER_LIMIT;

  // ── form state ──
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
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  };

  // ── limit reached screen ──
  if (isLimitReached) {
    return (
      <div className="flex items-center justify-center p-6 h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#1a1d27] border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-violet-500/15 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiLock className="text-violet-400 text-2xl" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Prompt Limit Reached</h2>
          <p className="text-white/50 text-sm mb-1">
            Free users can only add <span className="text-violet-400 font-medium">{FREE_USER_LIMIT} prompts</span>.
          </p>
          <p className="text-white/50 text-sm mb-6">
            You've used {currentCount} / {FREE_USER_LIMIT} of your free slots.
          </p>
          <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl p-4 mb-6">
            <p className="text-violet-300 text-sm font-medium mb-1">Upgrade to Creator</p>
            <p className="text-white/40 text-xs">Get unlimited prompt uploads, analytics, and earnings.</p>
          </div>
          <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            <FiZap className="text-sm" /> Upgrade to Creator
          </button>
        </motion.div>
      </div>
    );
  }

  // ── success screen ──
  if (submitted) {
    return (
      <div className="flex items-center justify-center p-6 h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#1a1d27] border border-white/10 rounded-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <FiCheckCircle className="text-emerald-400 text-2xl" />
          </motion.div>
          <h2 className="text-white text-xl font-semibold mb-2">Prompt Submitted!</h2>
          <p className="text-white/50 text-sm mb-6">
            Your prompt is now <span className="text-amber-400 font-medium">pending review</span>. It will appear in the marketplace once approved by an admin.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ title:"",description:"",content:"",category:"",aiTool:"",difficulty:"",visibility:"public",tags:[] }); setThumbnail(null); setThumbnailPreview(null); }}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all duration-200"
          >
            Add Another Prompt
          </button>
        </motion.div>
      </div>
    );
  }

  // ── main form ──
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-white/30 text-xs mb-3">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white/60">Add Prompt</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight flex items-center gap-2">
                <RiSparklingFill className="text-violet-400" />
                Add New Prompt
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {isUser
                  ? `Free plan · ${currentCount} / ${FREE_USER_LIMIT} prompts used`
                  : "Creator plan · Unlimited prompts"}
              </p>
            </div>

            {/* user limit badge */}
            {isUser && (
              <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full">
                <FiAlertCircle className="text-xs" />
                {FREE_USER_LIMIT - currentCount} slots left
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-[#1a1d27] border border-white/8 rounded-2xl overflow-hidden"
        >

          {/* section: basic info */}
          <SectionHeader icon={<RiFileTextLine />} title="Basic Information" />
          <div className="p-6 space-y-5">

            {/* Title */}
            <Field label="Prompt Title" required error={errors.title}>
              <input
                type="text"
                placeholder="e.g. Expert Python Code Reviewer"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls(errors.title)}
              />
            </Field>

            {/* Description */}
            <Field label="Short Description" required error={errors.description}>
              <textarea
                rows={3}
                placeholder="Briefly describe what this prompt does and who it's for..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputCls(errors.description)} resize-none`}
              />
            </Field>

            {/* Category + AI Tool */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" required error={errors.category}>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={selectCls(errors.category)}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="AI Tool" required error={errors.aiTool}>
                <select
                  value={form.aiTool}
                  onChange={(e) => set("aiTool", e.target.value)}
                  className={selectCls(errors.aiTool)}
                >
                  <option value="">Select AI tool</option>
                  {AI_TOOLS.map((t) => <option key={t}>{t}</option>)}
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
                className={`${inputCls(errors.content)} resize-none font-mono text-sm`}
              />
              <p className="text-white/30 text-xs mt-1.5">{form.content.length} characters</p>
            </Field>
          </div>

          <Divider />

          {/* section: tags & difficulty */}
          <SectionHeader icon={<RiPriceTag3Line />} title="Tags & Difficulty" />
          <div className="p-6 space-y-5">

            {/* Tags */}
            <Field label="Tags" hint="Up to 8 tags">
              <div className={`${inputCls()} min-h-[48px] flex flex-wrap gap-2 p-3 cursor-text`}>
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    #{t}
                    <button onClick={() => removeTag(t)} className="hover:text-white transition-colors">
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
                  className="flex-1 min-w-[140px] bg-transparent outline-none text-white text-sm placeholder:text-white/25"
                />
              </div>
              {/* suggested */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SUGGESTED_TAGS.filter(t => !form.tags.includes(t)).slice(0, 6).map(t => (
                  <button
                    key={t}
                    onClick={() => addTag(t)}
                    className="text-xs text-white/40 hover:text-violet-300 border border-white/10 hover:border-violet-500/40 px-2 py-0.5 rounded-full transition-all"
                  >
                    +{t}
                  </button>
                ))}
              </div>
            </Field>

            {/* Difficulty */}
            <Field label="Difficulty Level" required error={errors.difficulty}>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTY_LEVELS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => set("difficulty", d.value)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                      form.difficulty === d.value
                        ? `${d.bg} ${d.color} border-current`
                        : "bg-white/3 border-white/10 text-white/40 hover:bg-white/6 hover:text-white/70"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {errors.difficulty && <p className="text-red-400 text-xs mt-1.5">{errors.difficulty}</p>}
            </Field>
          </div>

          <Divider />

          {/* section: thumbnail & visibility */}
          <SectionHeader icon={<RiImageLine />} title="Thumbnail & Visibility" />
          <div className="p-6 space-y-5">

            {/* Thumbnail upload */}
            <Field label="Thumbnail Image" hint="PNG, JPG or WebP · Max 2MB">
              <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-all h-40 ${
                thumbnailPreview ? "border-violet-500/40 bg-violet-500/5" : "border-white/10 bg-white/2 hover:border-violet-500/30 hover:bg-violet-500/5"
              }`}>
                <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
                {thumbnailPreview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src={thumbnailPreview} alt="preview" className="max-h-32 max-w-full rounded-lg object-contain" />
                    <button
                      onClick={(e) => { e.preventDefault(); setThumbnail(null); setThumbnailPreview(null); }}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                      <FiUploadCloud className="text-white/40 text-xl" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-sm"><span className="text-violet-400 font-medium">Click to upload</span> or drag & drop</p>
                      <p className="text-white/25 text-xs mt-0.5">Recommended: 1200 × 630 px</p>
                    </div>
                  </>
                )}
              </label>
            </Field>

            {/* Visibility */}
            <Field label="Visibility">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "public", label: "Public", desc: "Visible to everyone", icon: <FiGlobe /> },
                  { value: "private", label: "Private (Premium)", desc: "Only premium users", icon: <FiLock /> },
                ].map((v) => (
                  <button
                    key={v.value}
                    onClick={() => set("visibility", v.value)}
                    className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                      form.visibility === v.value
                        ? "bg-violet-500/10 border-violet-500/40 text-white"
                        : "bg-white/2 border-white/8 text-white/40 hover:bg-white/5 hover:text-white/60"
                    }`}
                  >
                    <div className={`text-lg mb-1 ${form.visibility === v.value ? "text-violet-400" : ""}`}>{v.icon}</div>
                    <p className="text-sm font-medium">{v.label}</p>
                    <p className="text-xs opacity-60 mt-0.5">{v.desc}</p>
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* ── pending notice ── */}
          <div className="mx-6 mb-6 bg-amber-400/5 border border-amber-400/20 rounded-xl p-3.5 flex items-start gap-3">
            <FiAlertCircle className="text-amber-400 text-sm mt-0.5 shrink-0" />
            <p className="text-white/50 text-xs leading-relaxed">
              All submitted prompts are marked as <span className="text-amber-400 font-medium">pending</span> and will be reviewed by an admin before appearing in the marketplace.
            </p>
          </div>

          {/* ── Action buttons ── */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <button className="flex-1 bg-white/5 hover:bg-white/8 border border-white/10 text-white/70 hover:text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm">
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
            >
              <FiPlus className="text-sm" />
              Publish Prompt
            </button>
          </div>
        </motion.div>

        {/* bottom spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/6 bg-white/[0.02]">
      <span className="text-violet-400 text-base">{icon}</span>
      <h3 className="text-white/80 text-sm font-semibold tracking-wide">{title}</h3>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/6" />;
}

function Field({ label, required, hint, error, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-white/70 text-sm font-medium">
          {label}
          {required && <span className="text-violet-400 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-white/30 text-xs">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
          >
            <FiAlertCircle className="text-xs shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tailwind class helpers ────────────────────────────────────────────────────
function inputCls(error) {
  return `w-full bg-[#12141e] border ${
    error ? "border-red-500/50 focus:border-red-400" : "border-white/8 focus:border-violet-500/60"
  } text-white placeholder:text-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-150`;
}

function selectCls(error) {
  return `w-full bg-[#12141e] border ${
    error ? "border-red-500/50 focus:border-red-400" : "border-white/8 focus:border-violet-500/60"
  } text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-150 appearance-none cursor-pointer`;
}