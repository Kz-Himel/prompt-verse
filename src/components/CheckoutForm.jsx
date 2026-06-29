"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; // নিশ্চিত করুন পাথ ঠিক আছে

export default function CheckoutForm({ price, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMsg("");

    try {
      // ১. আপনার দেওয়া কোড ব্লক ব্যবহার করে টোকেন নেওয়া হলো
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        setMsg("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      // ২. স্ট্রাইপ পেমেন্ট কনফার্মেশন
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setMsg(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setMsg("Payment Success! Updating account...");

        // ৩. টোকেন সহ ব্যাকএন্ডে সাকসেস হিট করা
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/success`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // এখানে টোকেনটি ডাইনামিকালি বসে যাবে
          },
          body: JSON.stringify({
            transactionId: paymentIntent.id,
            amount: Number(price),
          }),
        });

        const data = await res.json();
        
        if (data.success) {
          setMsg("Account upgraded successfully!");
          toast.success("Upgrade Successful!");

          const userRole = data.role || data.user?.role || "user"; 

          setTimeout(() => {
            if (userRole === "admin") {
              router.push("/dashboard/admin");
            } else if (userRole === "creator") {
              router.push("/dashboard/creator");
            } else {
              router.push("/dashboard/user");
            }
          }, 1500);

        } else {
          setMsg("Payment done, but database update failed.");
        }
      }
    } catch (err) {
      console.error(err);
      setMsg("An error occurred during authentication or payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-md bg-gray-50">
        <CardElement 
          options={{ 
            style: { base: { fontSize: "16px" } },
            autofill: "off" 
          }} 
        />
      </div>
      
      {msg && <p className="text-sm text-blue-600 font-semibold text-center">{msg}</p>}
      
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-2.5 rounded-md font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "Processing..." : `Pay $${price} One-time`}
      </button>
    </form>
  );
}