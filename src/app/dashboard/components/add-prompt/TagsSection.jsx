"use client";

import { FiX } from "react-icons/fi";
import { RiPriceTag3Line } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import FormField, { inputCls } from "./FormField";
import { DIFFICULTY_LEVELS, SUGGESTED_TAGS } from "../../lib-dashboard/utils";

export default function TagsSection({
  form,
  errors,
  set,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
}) {
  return (
    <>
      <SectionHeader icon={<RiPriceTag3Line />} title="Tags & Difficulty" />
      <div className="p-6 space-y-5">
        <FormField label="Tags" hint="Up to 8 tags">
          <div className={`${inputCls()} min-h-[48px] flex flex-wrap gap-2 p-2 cursor-text`}>
            {form.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                #{t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="hover:text-violet-900 transition-colors"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={form.tags.length === 0 ? "Type a tag and press Enter..." : ""}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              className="flex-1 min-w-[140px] bg-transparent outline-none text-slate-700 text-sm placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {SUGGESTED_TAGS?.filter((t) => !form.tags.includes(t))
              .slice(0, 6)
              .map((t) => (
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
        </FormField>

        <FormField label="Difficulty Level" required error={errors.difficulty}>
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
        </FormField>
      </div>
    </>
  );
}