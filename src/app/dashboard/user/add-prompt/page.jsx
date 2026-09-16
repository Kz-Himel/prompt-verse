"use client";

import { useEffect, useState } from "react";
import AddPromptPage from "../../components/AddPromptPage";
import { authClient } from "@/lib/auth-client";

const UserAddPromptPage = () => {
  const [promptCount, setPromptCount] = useState(0);
  const [userSubscription, setUserSubscription] = useState("Free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPromptCount = async () => {
      try {
        setLoading(true);
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard-stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const resData = await response.json();

          if (resData.success && resData.stats) {
            setPromptCount(resData.stats.promptCount || 0);

            if (resData.stats.subscription) {
              setUserSubscription(resData.stats.subscription);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch user prompt count:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPromptCount();
  }, []);

  // Neumorphic Soft UI Loader
  if (loading) {
    return (
      <div className="p-6 w-full flex items-center justify-center min-h-[400px]">
        <div className="neu-card p-6 rounded-2xl flex flex-col items-center gap-3 border border-[var(--border)]">
          <div className="w-10 h-10 border-3 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
            Loading Details...
          </span>
        </div>
      </div>
    );
  }

  const isPremium =
    userSubscription.toLowerCase() === "premium" ||
    userSubscription.toLowerCase() === "creator" ||
    userSubscription.toLowerCase() === "unlimited";

  return (
    <AddPromptPage
      role={isPremium ? "creator" : "user"}
      currentCount={promptCount}
      isPremium={isPremium}
    />
  );
};

export default UserAddPromptPage;