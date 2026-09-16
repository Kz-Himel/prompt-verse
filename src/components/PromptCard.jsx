"use client";

import { useRouter } from "next/navigation";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function PromptCard({ prompt, index }) {
  const router = useRouter();

  const isLocked = prompt.promptContent === "LOCKED_PREMIUM";

  const handleAction = (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.error(
        "🔒 This is a Premium Prompt! Please get a premium package to view the full details."
      );
      router.push("/pricing");
    } else {
      router.push(`/prompts/${prompt._id}`);
    }
  };

  return (
    <div className="bg-[#EBF1F5] rounded-2xl p-5 shadow-[4px_4px_10px_#d1d9e0,-4px_-4px_10px_#ffffff] border border-white/40 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300">
      <div>
        {/* Title and Badge */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-[#1E293B] font-extrabold text-base line-clamp-1">
            {prompt.title}
          </h3>

          {/* Neumorphic Pill Badge */}
          <span
            className={`text-[11px] px-3 py-1 rounded-full font-bold shadow-[2px_2px_5px_#d1d9e0,-2px_-2px_5px_#ffffff] border border-white/40 shrink-0 ${
              isLocked
                ? "bg-[#EBF1F5] text-amber-600"
                : "bg-[#EBF1F5] text-[#0F766E]"
            }`}
          >
            {isLocked ? "Premium" : "Public"}
          </span>
        </div>

        {/* Tool category */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] mb-4">
          {prompt.aiTool || "AI Tool"}
        </p>

        {/* ── Prompt Content Box (Soft Inset Shadow) ── */}
        <div className="relative p-4 rounded-xl bg-[#EBF1F5] shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] border border-white/30 min-h-[110px] flex items-center overflow-hidden">
          {isLocked ? (
            <>
              {/* Blurred Text Placeholder */}
              <p className="text-[#64748B] text-xs blur-[5px] select-none pointer-events-none line-clamp-3">
                Act as a senior full-stack developer and write a complete
                authentication system using Next.js middleware and Jose JWT
                library with secure cookie management...
              </p>

              {/* Lock Overlay */}
              <div className="absolute inset-0 bg-[#EBF1F5]/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <RiLockPasswordLine className="text-amber-500 text-2xl animate-pulse" />
                <span className="text-[11px] font-bold text-[#1E293B] mt-1">
                  Premium Pack Required
                </span>
              </div>
            </>
          ) : (
            /* Show prompt content for public */
            <p className="text-[#64748B] text-xs leading-relaxed line-clamp-3 font-medium">
              {prompt.promptContent || "No content available."}
            </p>
          )}
        </div>
      </div>

      {/* ── Card Footer Button ── */}
      <div className="mt-5 pt-2">
        <button
          onClick={handleAction}
          className={`w-full text-center py-2.5 text-xs font-extrabold rounded-xl transition-all active:scale-95 ${
            isLocked
              ? "bg-[#EBF1F5] text-amber-600 shadow-[3px_3px_8px_#d1d9e0,-3px_-3px_8px_#ffffff] border border-white/50 hover:bg-amber-50"
              : "bg-[#0F766E] hover:bg-[#0D9488] text-white shadow-[0px_3px_8px_rgba(15,118,110,0.25)]"
          }`}
        >
          {isLocked ? "🔒 Get Premium Pack" : "View Details"}
        </button>
      </div>
    </div>
  );
}