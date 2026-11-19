"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";
import { RiSparklingFill } from "react-icons/ri";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Premium Subscription";
  const price = "5"; 

  const [clientSecret, setClientSecret] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;
        if (!token) return toast.info("Please login first to proceed with checkout!");
        setAuthToken(token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`, {
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-lg mx-auto">
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full neu-badge text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-1">
              <RiSparklingFill className="text-xs" />
              <span>Checkout</span>
            </div>
            <h2 className="text-2xl font-black text-[var(--text)] tracking-tight">
              Upgrade to Premium
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
              Plan: <span className="font-bold text-[var(--text)]">{plan}</span> — Total:{" "}
              <span className="font-bold text-[var(--primary)]">${price}</span>
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-4">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm price={price} clientSecret={clientSecret} token={authToken} />
              </Elements>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <LoadingSpinner />
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Connecting to secure payment gateway...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
