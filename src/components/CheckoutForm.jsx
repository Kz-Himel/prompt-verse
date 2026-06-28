"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ price, clientSecret, token }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // স্ট্রাইপ এখনো পুরোপুরি লোড হয়নি
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    // ১. স্ট্রাইপ দিয়ে পেমেন্ট কনফার্ম করা
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setSuccessMessage("Payment successful! Upgrading your account...");

      // ২. পেমেন্ট সফল হলে ব্যাকএন্ডে ডাটাবেজ আপডেট করার জন্য এপিআই কল
      try {
        const response = await fetch("http://localhost:5000/payment-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            amount: price,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // সফল হলে ইউজারকে ড্যাশবোর্ড বা হোম পেজে পাঠিয়ে দিন
          setTimeout(() => {
            router.push("/dashboard"); // বা আপনার ইচ্ছামতো যেকোনো রাউট
          }, 2000);
        } else {
          setErrorMessage("Payment deducted but database update failed. Please contact support.");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("Backend update error:", err);
        setErrorMessage("Network error while updating your account.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* কার্ড ইনপুট কন্টেইনার */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
          Card Details
        </label>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  color: typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "#f4f4f5" : "#18181b",
                  "::placeholder": {
                    color: "#a1a1aa",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>

      {/* এরর বা সাকসেস মেসেজ ডিসপ্লে */}
      {errorMessage && (
        <div className="text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg border border-rose-100 dark:border-rose-900/40">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
          {successMessage}
        </div>
      )}

      {/* সাবমিট বাটন */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2
          ${isProcessing 
            ? "bg-blue-400 dark:bg-blue-700 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-blue-600/10"
          }`}
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <span>Pay ${price} Securely</span>
        )}
      </button>
    </form>
  );
}