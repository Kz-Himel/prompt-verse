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

  if (loading) {
    return (
      <div className="p-6 w-full flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
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