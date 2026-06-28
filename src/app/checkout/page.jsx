"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm"; // পাথ মিলিয়ে নিন
import { authClient } from "@/lib/auth-client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutContent() {
  const searchParams = useSearchParams();
  // অ্যাসাইনমেন্টের নিয়ম অনুযায়ী ফিক্সড $5 পেমেন্ট (ইউআরএল এ যা-ই থাকুক না কেন)
  const plan = searchParams.get("plan") || "Premium Subscription";
  const price = "5"; 

  const [clientSecret, setClientSecret] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        // ১. শুধুমাত্র অ্যাপে লগইন থাকা ইউজারের JWT টোকেন রিড করা হচ্ছে
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;
        if (!token) return alert("Please login first!");
        setAuthToken(token);

        // ২. এক্সপ্রেস ব্যাকএন্ডে হিট করে clientSecret জেনারেট করা
        const res = await fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({ price: parseFloat(price), planName: plan }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        console.error("Backend error:", err);
      }
    };

    getPaymentData();
  }, [plan]);

  return (
    <div className="max-w-md mx-auto my-16 p-6 border rounded-xl shadow-md bg-white">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Premium Upgrade</h2>
        <p className="text-gray-500 font-medium">Plan: {plan} — Total: ${price}</p>
      </div>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm price={price} clientSecret={clientSecret} token={authToken} />
        </Elements>
      ) : (
        <p className="text-center text-gray-400">Loading secure payment...</p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}