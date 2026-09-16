"use client";

import { RiFileTextLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import FormField, { inputCls, selectCls } from "./FormField";
import { CATEGORIES, AI_TOOLS } from "../lib-dashboard/utils";

export default function BasicInfoSection({ form, errors, set }) {
  return (
    <>
      <SectionHeader icon={<RiFileTextLine />} title="Basic Information" />
      <div className="p-6 space-y-5">
        <FormField label="Prompt Title" required error={errors.title}>
          <input
            type="text"
            placeholder="e.g. Expert Python Code Reviewer"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={inputCls(errors.title)}
          />
        </FormField>

        <FormField label="Short Description" required error={errors.description}>
          <textarea
            rows={3}
            placeholder="Briefly describe what this prompt does and who it's for..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${inputCls(errors.description)} resize-none`}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Category" required error={errors.category}>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={selectCls(errors.category)}
            >
              <option value="">Select category</option>
              {CATEGORIES?.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FormField>

          <FormField label="AI Tool" required error={errors.aiTool}>
            <select
              value={form.aiTool}
              onChange={(e) => set("aiTool", e.target.value)}
              className={selectCls(errors.aiTool)}
            >
              <option value="">Select AI tool</option>
              {AI_TOOLS?.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>
    </>
  );
}