"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিবেন

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL থেকে প্ল্যান এবং প্রাইস রিড করা হচ্ছে
  const plan = searchParams.get("plan");
  const price = searchParams.get("price");

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // সিকিউরিটি গার্ড: যদি কেউ বাটন ক্লিক না করে ডিরেক্ট ইউআরএল টাইপ করে আসে, তাকে প্রাইসিং পেজে ফেরত পাঠাবে
    if (!plan || !price) {
      router.push("/pricing");
      return;
    }

    const token = localStorage.getItem("token"); 

    // ব্যাকএন্ডে ডাইনামিক প্রাইস পাঠিয়ে পেমেন্ট ইনটেন্ট তৈরি করা হচ্ছে
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price: parseFloat(price), planName: plan }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.message || "Failed to initialize payment gateway.");
        }
      })
      .catch((err) => {
        console.error("Payment Gateway Error:", err);
        setError("Connection error. Please try again later.");
      });
  }, [plan, price, router]);

  if (!plan || !price) return null; // রিডাইরেক্ট হওয়ার সময় ফাঁকা স্ক্রিন দেখাবে

  return (
    <div className="max-w-md mx-auto my-16 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md font-sans">
      <div className="mb-6">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
          Secure Checkout
        </span>
        <h2 className="text-2xl font-black mt-3 text-zinc-900 dark:text-zinc-50">
          Confirm Your Upgrade
        </h2>
        <p className="text-zinc-500 text-sm mt-1">
          You are upgrading to <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase">{plan}</span> plan.
        </p>
      </div>

      {/* অর্ডার সামারি বক্স */}
      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/80 mb-6 flex justify-between items-center text-sm">
        <span className="text-zinc-500">Total Due Today:</span>
        <span className="text-xl font-black text-zinc-900 dark:text-zinc-50">${price}</span>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-medium border border-rose-100 dark:border-rose-900/50">
          {error}
        </div>
      )}

      {/* স্ট্রাইপ এলিমেন্টস গেটওয়ে লোড */}
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm price={price} clientSecret={clientSecret} token={typeof window !== 'undefined' ? localStorage.getItem("token") : null} />
        </Elements>
      ) : (
        !error && (
          <div className="text-center py-8 text-zinc-400 text-sm animate-pulse flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading secure payment provider...</span>
          </div>
        )
      )}
    </div>
  );
}