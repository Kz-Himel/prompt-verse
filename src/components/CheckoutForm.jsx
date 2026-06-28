"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutForm({ price, clientSecret, token }) {
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

    // ১. পেমেন্ট কনফার্মেশন (কোনো এক্সট্রা বিলিং ডাটা/অটোফিল পাস করা হয়নি)
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

  try {
    const res = await fetch("http://localhost:5000/payments/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transactionId: paymentIntent.id,
        amount: Number(price),
      }),
    });

    const data = await res.json();
    
    if (data.success) {
      setMsg("Account upgraded successfully!");

      // 🎯 ইউজারের রোল অনুযায়ী সঠিক ড্যাশবোর্ডে পাঠানো হচ্ছে
      // (আপনার ব্যাকএন্ড রেসপন্সে যদি আপডেটেড ইউজার বা রোল পাঠায়, যেমন: data.role বা data.user.role)
      const userRole = data.role || data.user?.role || "user"; 

      setTimeout(() => {
        if (userRole === "admin") {
          router.push("/dashboard/admin"); // আপনার অ্যাডমিন ড্যাশবোর্ড রাউট
        } else if (userRole === "creator") {
          router.push("/dashboard/creator"); // আপনার ক্রিয়েটর ড্যাশবোর্ড রাউট
        } else {
          router.push("/dashboard/user"); // নরমাল ইউজার ড্যাশবোর্ড রাউট
        }
      }, 1500);

    } else {
      setMsg("Payment done, but database update failed.");
    }
  } catch (err) {
    setMsg("Database connection timeout.");
  } finally {
    setLoading(false);
  }
}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-md bg-gray-50">
        <CardElement 
          options={{ 
            style: { base: { fontSize: "16px" } },
            // অটোফিল ও বাড়তি ব্রাউজার পপআপ অফ করার জন্য
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