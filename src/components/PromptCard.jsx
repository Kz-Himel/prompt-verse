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
      toast.error("🔒 This is a Premium Prompt! Please get a premium package to view the full details.");
      router.push("/pricing");
    } else {
      router.push(`/prompts/${prompt._id}`);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
      <div className="p-5">
        
        {/* Title and Badge */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-slate-800 font-bold text-lg line-clamp-1">{prompt.title}</h3>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            isLocked ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'
          }`}>
            {isLocked ? "Premium" : "Public"}
          </span>
        </div>

        {/* Tool catagory */}
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-4">
          {prompt.aiTool || "AI Tool"}
        </p>

        {/* ── PromptCard ── */}
        <div className="relative p-4 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden min-h-[110px] flex items-center">
          {isLocked ? (
            <>
              {/* textarea*/}
              <p className="text-slate-400 text-xs blur-[6px] select-none pointer-events-none line-clamp-3">
                Act as a senior full-stack developer and write a complete authentication system using Next.js middleware and Jose JWT library with secure cookie management...
              </p>

              {/* Locok icon*/}
              <div className="absolute inset-0 bg-white/30 flex flex-col items-center justify-center backdrop-blur-[3px]">
                <RiLockPasswordLine className="text-amber-500 text-2xl animate-pulse" />
                <span className="text-[11px] font-bold text-slate-600 mt-1">Premium Pack Required</span>
              </div>
            </>
          ) : (
            /* show prompt for public promt */
            <p className="text-slate-600 text-sm line-clamp-3 font-mono">
              {prompt.promptContent || "No content available."}
            </p>
          )}
        </div>
      </div>

      {/* ── card footer button ── */}
      <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100">
        <button
          onClick={handleAction}
          className={`w-full text-center py-2.5 text-xs font-bold rounded-xl transition-all ${
            isLocked 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm" 
              : "bg-slate-800 hover:bg-slate-900 text-white"
          }`}
        >
          {isLocked ? "🔒 Get Premium Pack" : "View Details"}
        </button>
      </div>
    </div>
  );
}