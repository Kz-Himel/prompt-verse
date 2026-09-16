"use client";

import { FiGlobe, FiLock } from "react-icons/fi";
import { RiImageLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import FormField from "./FormField";

export default function VisibilitySection({ form, set }) {
  const options = [
    {
      value: "public",
      label: "Public",
      desc: "Visible to everyone",
      icon: <FiGlobe />,
    },
    {
      value: "private",
      label: "Private (Premium)",
      desc: "Only premium users",
      icon: <FiLock />,
    },
  ];

  return (
    <>
      <SectionHeader icon={<RiImageLine />} title="Visibility" />
      <div className="p-6 space-y-5">
        <FormField label="Visibility">
          <div className="grid grid-cols-2 gap-3">
            {options.map((v) => {
              const isActive = form.visibility === v.value;
              return (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => set("visibility", v.value)}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 ${
                    isActive
                      ? "bg-violet-50 border-violet-300 text-slate-800 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  <div
                    className={`text-lg mb-1 ${
                      isActive ? "text-violet-600" : "text-slate-400"
                    }`}
                  >
                    {v.icon}
                  </div>
                  <p className="text-sm font-semibold">{v.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{v.desc}</p>
                </button>
              );
            })}
          </div>
        </FormField>
      </div>
    </>
  );
}