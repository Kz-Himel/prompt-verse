"use client";

import { useEffect, useState } from "react";
import AddPromptPage from "../../components/AddPromptPage";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserAddPromptPage = () => {
  const [promptCount, setPromptCount] = useState(0);
  const [userRole, setUserRole] = useState("free");
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
          if (resData.success) {
            setPromptCount(resData.stats?.promptCount || 0);
            
            if (resData.role) {
              setUserRole(resData.role);
            } else if (resData.stats?.role) {
              setUserRole(resData.stats.role);
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

  const isPremium = userRole === "premium" || userRole === "creator";
  if (!isPremium && promptCount >= 3) {
    return (
      <div className="p-8 max-w-md mx-auto my-10 bg-white rounded-2xl shadow-lg border border-purple-100 text-center space-y-6">
        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          🚀
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Limit Reached!</h2>
          <p className="text-gray-600">
            As a free user you have already add 3 prompts 
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-700 font-medium">
          🌟 Upgrade to premium for add unlimited prompts
        </div>
        <Link 
          href="/pricing"
          className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition duration-200 shadow-md shadow-purple-200"
        >
          Become a Creator / Upgrade Now
        </Link>
      </div>
    );
  }

  return (
    <AddPromptPage
      role="user"
      currentCount={promptCount}
    />
  );
};

export default UserAddPromptPage;