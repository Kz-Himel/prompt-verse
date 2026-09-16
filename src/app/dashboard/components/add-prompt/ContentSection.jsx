"use client";

import { RiRobot2Line } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import FormField, { inputCls } from "./FormField";

export default function ContentSection({ form, errors, set }) {
  return (
    <>
      <SectionHeader icon={<RiRobot2Line />} title="Prompt Content" />
      <div className="p-6">
        <FormField label="Prompt Content" required error={errors.content}>
          <textarea
            rows={8}
            placeholder={`Write your full prompt here...\n\nTip: Use [VARIABLE] placeholders to make it reusable.\nExample: You are a professional [ROLE] with expertise in [TOPIC]...`}
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            className={`${inputCls(errors.content)} resize-none font-mono text-sm bg-slate-50/50`}
          />
          <p className="text-slate-400 text-xs mt-1.5">
            {form.content.length} characters
          </p>
        </FormField>
      </div>
    </>
  );
}