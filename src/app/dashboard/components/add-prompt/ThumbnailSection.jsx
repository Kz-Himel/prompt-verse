"use client";

import { FiUploadCloud, FiX, FiGlobe, FiLock, FiAlertCircle } from "react-icons/fi";
import { RiImageLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import FormField from "./FormField";

export default function ThumbnailSection({
  form,
  set,
  thumbnailPreview,
  setThumbnail,
  setThumbnailPreview,
  handleThumbnail,
}) {
  return (
    <>
      <SectionHeader icon={<RiImageLine />} title="Thumbnail & Visibility" />
      <div className="p-6 space-y-5">
        <FormField label="Thumbnail Image" hint="PNG, JPG or WebP · Max 2MB">
          <label
            className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-all h-40 ${
              thumbnailPreview
                ? "border-violet-300 bg-violet-50/30"
                : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/30"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="hidden"
            />
            {thumbnailPreview ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={thumbnailPreview}
                  alt="preview"
                  className="max-h-32 max-w-full rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setThumbnail(null);
                    setThumbnailPreview(null);
                  }}
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
                  <p className="text-slate-600 text-sm">
                    <span className="text-violet-600 font-medium">Click to upload</span> or drag & drop
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">Recommended: 1200 × 630 px</p>
                </div>
              </>
            )}
          </label>
        </FormField>

        <FormField label="Visibility">
          <div className="grid grid-cols-2 gap-3">
            {[
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
                <div className={`text-lg mb-1 ${form.visibility === v.value ? "text-violet-600" : "text-slate-400"}`}>
                  {v.icon}
                </div>
                <p className="text-sm font-semibold">{v.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{v.desc}</p>
              </button>
            ))}
          </div>
        </FormField>
      </div>

      <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
        <FiAlertCircle className="text-amber-600 text-sm mt-0.5 shrink-0" />
        <p className="text-slate-600 text-xs leading-relaxed">
          All submitted prompts are marked as{" "}
          <span className="text-amber-700 font-medium">pending</span> and will be reviewed by an admin before appearing in the marketplace.
        </p>
      </div>
    </>
  );
}