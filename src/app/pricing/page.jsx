"use client";

import { HiCheck, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const handleUpgrade = (e) => {
    e.preventDefault();
    console.log("Button Clicked! Redirecting with dynamic parameters..."); 
    
    // ⚡ Next.js Router ব্যবহার করে কুয়েরি প্যারামিটারসহ নিখুঁত রিডাইরেকশন
    router.push("/checkout?plan=pro&price=5");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 font-sans">
      
      {/* হেডার সেকশন */}
      <div className="text-center mb-12 flex flex-col items-center space-y-3">
        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase px-3 py-1 rounded-full tracking-wider">
          Pricing Plans
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Ready to Upgrade Your AI Game?
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-md mx-auto">
          Choose the plan that fits your needs. Start exploring thousands of pro prompts today.
        </p>
      </div>

      {/* প্রাইসিং CARD গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
        
        {/* ১. ফ্রি প্ল্যান */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Starter</h3>
              <p className="text-zinc-400 text-xs">Perfect for beginners exploring prompts</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-black text-zinc-900 dark:text-zinc-50">$0</span>
                <span className="text-zinc-400 text-sm ml-1">/forever</span>
              </div>
            </div>
            
            <hr className="my-6 border-zinc-200 dark:border-zinc-800" />
            
            <div className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <HiCheck className="text-emerald-500 text-lg shrink-0" />
                <span>Access to Free Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="text-emerald-500 text-lg shrink-0" />
                <span>Submit up to 3 prompts</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600">
                <HiX className="text-rose-500 text-lg shrink-0" />
                <span className="line-through">No Private/Locked Prompts</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              className="w-full font-semibold py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed text-sm" 
              disabled
            >
              Current Plan
            </button>
          </div>
        </div>

        {/* ২. প্রিমিয়াম প্ল্যান */}
        <div className="p-6 rounded-2xl border-2 border-blue-600 bg-white dark:bg-zinc-900 relative flex flex-col justify-between shadow-md">
          <span className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            POPULAR
          </span>

          <div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">PromptVerse Pro</h3>
              <p className="text-zinc-400 text-xs">For power users and creative pros</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-black text-zinc-900 dark:text-zinc-50">$5.00</span>
                <span className="text-zinc-400 text-sm ml-1">/one-time</span>
              </div>
            </div>
            
            <hr className="my-6 border-zinc-200 dark:border-zinc-800" />
            
            <div className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <HiCheck className="text-emerald-500 text-lg shrink-0" />
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Unlimited Prompt Submissions</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="text-emerald-500 text-lg shrink-0" />
                <span>Access to All Locked & Private Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="text-emerald-500 text-lg shrink-0" />
                <span>Premium Access Lifetime</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleUpgrade}
              className="w-full font-bold py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all text-center"
            >
              Upgrade Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}