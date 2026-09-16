"use client";

import { HiCheck, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { FiAward, FiCheckCircle, FiZap } from "react-icons/fi";

export default function PricingPage() {
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();
  
  const isPremiumUser = session?.user?.status === "Premium";

  const handleUpgrade = (e) => {
    e.preventDefault();
    if (isPremiumUser) return; 
    
    router.push("/checkout?plan=pro&price=5");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 font-sans px-4 py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* ── Header Section ── */}
        <div className="text-center mb-14 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold neu-card text-[var(--primary)]">
            <FiZap className="text-sm fill-[var(--primary)] text-[var(--primary)]" />
            <span>Pricing Plans</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Ready to Upgrade Your <span className="text-[var(--primary)]">AI Game?</span>
          </h1>
          
          <p className="text-[var(--text-muted)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Choose the plan that fits your needs. Start exploring thousands of pro prompts today.
          </p>
        </div>

        {/* ── Pricing Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          
          {/* =================== Free Plan =================== */}
          <div className={`neu-card p-8 flex flex-col justify-between transition-all duration-300 ${
            isPremiumUser ? "opacity-60" : ""
          }`}>
            <div>
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-xl font-bold text-[var(--text)]">Starter</h3>
                <p className="text-[var(--text-muted)] text-xs">Perfect for beginners exploring prompts</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-black text-[var(--text)]">$0</span>
                  <span className="text-[var(--text-muted)] text-sm ml-1.5">/forever</span>
                </div>
              </div>
              
              <hr className="my-6 border-[var(--text-muted)]/20" />
              
              <div className="space-y-4 text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <HiCheck className="text-sm" />
                  </div>
                  <span className="text-[var(--text)] font-medium">Access to Free Prompts</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <HiCheck className="text-sm" />
                  </div>
                  <span className="text-[var(--text)] font-medium">Submit up to 3 prompts</span>
                </div>
                
                <div className="flex items-center gap-3 text-[var(--text-muted)]/50">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                    <HiX className="text-sm" />
                  </div>
                  <span className="line-through">No Private/Locked Prompts</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button 
                className={`w-full font-semibold py-3 px-4 rounded-xl text-sm transition-all text-center ${
                  !isPremiumUser && !isPending
                    ? "neu-card text-[var(--text)] font-bold hover:text-[var(--primary)]"
                    : "neu-input text-[var(--text-muted)] cursor-not-allowed opacity-70"
                }`}
                disabled={isPremiumUser || isPending}
              >
                {!isPremiumUser && !isPending ? "Your Active Plan" : "Starter Mode"}
              </button>
            </div>
          </div>

          {/* =================== Premium Plan =================== */}
          <div className={`neu-card p-8 relative flex flex-col justify-between transition-all duration-300 ${
            isPremiumUser 
              ? "ring-2 ring-amber-500/40" 
              : "ring-2 ring-[var(--primary)]/40"
          }`}>
            
            {/* Top Badge (Solid Primary Color, No Gradient) */}
            <span className={`absolute -top-3.5 right-6 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1.5 ${
              isPremiumUser 
                ? "bg-amber-500" 
                : "bg-[var(--primary)]"
            }`}>
              {isPremiumUser ? (
                <>
                  <FiAward className="animate-bounce" /> ACTIVE PRO MEMBER
                </>
              ) : (
                "POPULAR"
              )}
            </span>

            <div>
              <div className="flex flex-col items-start gap-1">
                <h3 className={`text-xl font-bold ${
                  isPremiumUser ? "text-amber-500" : "text-[var(--primary)]"
                }`}>
                  PromptVerse Pro
                </h3>
                <p className="text-[var(--text-muted)] text-xs">For power users and creative pros</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-black text-[var(--text)]">$5.00</span>
                  <span className="text-[var(--text-muted)] text-sm ml-1.5">/one-time</span>
                </div>
              </div>
              
              <hr className="my-6 border-[var(--text-muted)]/20" />
              
              <div className="space-y-4 text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <HiCheck className="text-sm" />
                  </div>
                  <span className="font-semibold text-[var(--text)]">Unlimited Prompt Submissions</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <HiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-[var(--text)]">Access to All Locked & Private Prompts</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <HiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-[var(--text)]">Premium Access Lifetime</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              {isPending ? (
                <button disabled className="w-full font-bold py-3 px-4 neu-input text-[var(--text-muted)] text-sm cursor-wait text-center">
                  Checking Account Status...
                </button>
              ) : isPremiumUser ? (
                <div className="w-full font-bold py-3 px-4 rounded-xl bg-amber-500 text-white text-sm flex items-center justify-center gap-2 shadow-lg">
                  <FiCheckCircle className="text-lg" /> You Are Already Pro!
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="w-full font-bold py-3 px-4 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  Upgrade Now
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}