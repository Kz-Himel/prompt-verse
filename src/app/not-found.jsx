"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiHome } from "react-icons/hi2";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Content Card */}
      <div className="relative z-10 max-w-2xl px-6 py-12 text-center backdrop-blur-md bg-zinc-900/30 border border-zinc-800/50 rounded-3xl shadow-2xl mx-4">
        
        {/* Premium Animated Glow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 text-xs font-semibold tracking-wider text-indigo-400 uppercase shadow-inner mb-6 animate-bounce">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Lost In Space
        </div>

        {/* Big 404 Header with Gradient */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-sm select-none">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Premium Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Go Back Button (Glassmorphism Effect) */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-sm font-semibold text-zinc-200 transition-all duration-200 active:scale-[0.98] group"
          >
            <HiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Go Back
          </button>

          {/* Go Home Button (Gradient Glow Effect) */}
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            <HiHome className="w-4 h-4" />
            Back to Home
          </Link>
          
        </div>

        {/* Footer/Support Hint */}
        <div className="mt-12 pt-8 border-t border-zinc-900 text-xs text-zinc-600">
          Need help? <Link href="/support" className="text-zinc-400 hover:text-indigo-400 underline underline-offset-4 transition-colors">Contact Support</Link>
        </div>

      </div>
    </div>
  );
}