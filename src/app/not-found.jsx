"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiHome } from "react-icons/hi2";
import { RiSparklingFill } from "react-icons/ri";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)] font-sans p-6 transition-colors duration-300">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Card */}
      <div className="neu-card relative z-10 max-w-lg w-full p-8 sm:p-12 text-center space-y-6">
        
        {/* Soft Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-badge text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
          <RiSparklingFill className="text-sm" />
          <span>Page Lost In Latent Space</span>
        </div>

        {/* Big 404 Header */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-[var(--primary)] select-none">
          404
        </h1>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
            Prompt Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
            The page you are looking for might have been shifted, removed, or never existed in this prompt cluster.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="neu-button-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm gap-2"
          >
            <HiArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <Link
            href="/"
            className="neu-button-primary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm gap-2"
          >
            <HiHome className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
