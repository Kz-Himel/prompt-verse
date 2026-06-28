"use client";

import { HiCheck, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 🎯 আপনার প্রজেক্টের authClient পাথ অনুযায়ী মিলিয়ে নিবেন
import { FiAward, FiCheckCircle } from "react-icons/fi";

export default function PricingPage() {
  const router = useRouter();
  
  // 🎯 Better Auth এর ক্লায়েন্ট সেশন হুক ব্যবহার করে কারেন্ট ইউজারের ডেটা রিড করা
  const { data: session, isPending } = authClient.useSession();
  
  // ইউজার প্রিমিয়াম কিনা চেক করার কড়া লজিক (ডাটাবেজ স্ট্যাটাস অনুযায়ী)
  const isPremiumUser = session?.user?.status === "Premium" || session?.user?.role === "admin";

  const handleUpgrade = (e) => {
    e.preventDefault();
    if (isPremiumUser) return; // অলরেডি প্রিমিয়াম হলে পেমেন্ট পেজে যাওয়ার দরকার নেই
    
    // ⚡ Next.js Router ব্যবহার করে কুয়েরি প্যারামিটারসহ রিডাইরেকশন
    router.push("/checkout?plan=pro&price=5");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 font-sans">
      
      {/* ── হেডার সেকশন ── */}
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

      {/* ── প্রাইসিং CARD গ্রিড ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
        
        {/* =================== ১. ফ্রি প্ল্যান =================== */}
        <div className={`p-6 rounded-2xl border bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-sm transition-all ${
          isPremiumUser 
            ? "border-zinc-200 dark:border-zinc-800 opacity-60" // প্রিমিয়াম ইউজার হলে ফ্রি প্ল্যানটি একটু আবছা দেখাবে
            : "border-zinc-300 dark:border-zinc-700 ring-2 ring-zinc-100 dark:ring-zinc-800"
        }`}>
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
              className={`w-full font-semibold py-2.5 px-4 rounded-xl text-sm transition-all text-center ${
                !isPremiumUser && !isPending
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold" // ফ্রি ইউজারের জন্য একটিভ দেখাবে
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
              }`}
              disabled={isPremiumUser || isPending}
            >
              {!isPremiumUser && !isPending ? "Your Active Plan" : "Starter Mode"}
            </button>
          </div>
        </div>

        {/* =================== ২. প্রিমিয়াম প্ল্যান =================== */}
        <div className={`p-6 rounded-2xl relative flex flex-col justify-between shadow-lg transition-all border-2 ${
          isPremiumUser 
            ? "border-amber-500 bg-amber-50/5 shadow-amber-100/10 scale-[1.02]" // 🎯 প্রিমিয়াম ইউজারের জন্য গোল্ডেন লাইটিং ও হাইলাইট
            : "border-blue-600 bg-white dark:bg-zinc-900"
        }`}>
          
          {/* ব্যাজ পরিবর্তন: প্রিমিয়াম হলে 'ACTIVE PRO' দেখাবে, নাহলে 'POPULAR' */}
          <span className={`absolute -top-3 right-6 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1 ${
            isPremiumUser ? "bg-gradient-to-r from-amber-500 to-orange-600" : "bg-blue-600"
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
              <h3 className={`text-xl font-bold ${isPremiumUser ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"}`}>
                PromptVerse Pro
              </h3>
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
            {isPending ? (
              <button disabled className="w-full font-bold py-2.5 px-4 rounded-xl bg-zinc-200 text-zinc-400 text-sm cursor-wait text-center">
                Checking Account Status...
              </button>
            ) : isPremiumUser ? (
              // 🎯 প্রিমিয়াম ইউজারের জন্য সুন্দর সাকসেস বাটন
              <div className="w-full font-bold py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm flex items-center justify-center gap-2 shadow-md">
                <FiCheckCircle className="text-lg" /> You Are Already Pro!
              </div>
            ) : (
              // নরমাল ফ্রি ইউজারের জন্য আপগ্রেড বাটন
              <button
                onClick={handleUpgrade}
                className="w-full font-bold py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all text-center shadow-md active:scale-95"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}