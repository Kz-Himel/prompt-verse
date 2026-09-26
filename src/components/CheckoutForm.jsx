"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiLock, FiCreditCard, FiCheckCircle, FiAlertCircle, FiShield } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/contexts/ThemeContext";

export default function CheckoutForm({ price, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info"); // "info" | "error" | "success"

  const isDark = theme === "dark";

  // Stripe iframes can't read our CSS vars, so we mirror the two theme
  // palettes here to keep card fields visually in sync with the app.
  const elementStyle = {
    style: {
      base: {
        fontSize: "15px",
        fontFamily: "inherit",
        color: isDark ? "#F8FAFC" : "#1E293B",
        "::placeholder": {
          color: isDark ? "#94A3B8" : "#94A3B8",
        },
        iconColor: isDark ? "#94A3B8" : "#64748B",
      },
      invalid: {
        color: "#F43F5E",
        iconColor: "#F43F5E",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMsg("");
    setMsgType("info");

    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        setMsg("Authentication token not found. Please log in again.");
        setMsgType("error");
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (error) {
        setMsg(error.message);
        setMsgType("error");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setMsg("Payment successful — updating your account...");
        setMsgType("success");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/success`, {
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
          setMsgType("success");
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
          setMsg("Payment done, but account update failed. Contact support.");
          setMsgType("error");
        }
      }
    } catch (err) {
      console.error(err);
      setMsg("An error occurred during authentication or payment.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neu-card rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl neu-card flex items-center justify-center text-[var(--primary)] shrink-0">
          <FiLock className="text-lg" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--text)]">Secure Payment</h2>
          <p className="text-xs text-[var(--text-muted)]">Your card details are encrypted end-to-end</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Card Number
          </label>
          <div className="neu-input px-4 py-3.5 flex items-center gap-3">
            <FiCreditCard className="text-[var(--text-muted)] shrink-0" />
            <div className="flex-1">
              <CardNumberElement options={elementStyle} />
            </div>
          </div>
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Expiry Date
            </label>
            <div className="neu-input px-4 py-3.5">
              <CardExpiryElement options={elementStyle} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              CVC
            </label>
            <div className="neu-input px-4 py-3.5">
              <CardCvcElement options={elementStyle} />
            </div>
          </div>
        </div>

        {/* Status Message */}
        {msg && (
          <div
            className={`flex items-start gap-2 text-xs font-medium px-4 py-3 rounded-xl border ${
              msgType === "error"
                ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                : msgType === "success"
                ? "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20"
                : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)] border-black/5 dark:border-white/5"
            }`}
          >
            {msgType === "error" ? (
              <FiAlertCircle className="text-sm mt-0.5 shrink-0" />
            ) : (
              <FiCheckCircle className="text-sm mt-0.5 shrink-0" />
            )}
            <span>{msg}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full neu-button-primary py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <FiLock className="text-sm" /> Pay ${price} Securely
            </>
          )}
        </button>

        {/* Trust Footer */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[var(--text-muted)] text-[11px] font-medium">
          <FiShield className="text-xs" />
          <span>Payments secured & processed by Stripe</span>
        </div>
      </form>
    </div>
  );
}