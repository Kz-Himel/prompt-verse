"use client";
import { useEffect, useState, useRef } from "react";
import { Card, Spinner } from "@heroui/react"; 
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiUsers, FiFileText, FiStar, FiCopy, FiArrowUpRight } from "react-icons/fi";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0 });
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false); // Double fetch rodh korar jonno
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    // strict mode-e jeno duplicate token request na pathay
    if (isFetched.current) return; 

    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        
        // Auth Client checking logic
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          console.warn("No admin token found in client auth!");
        }
        
        const res = await fetch(`${BACKEND_URL}/admin/analytics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
        });

        // Response check
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const result = await res.json();
        if (result.success && result.stats) {
          setStats(result.stats);
          isFetched.current = true; // successfully set hole state lock korbe
        } else {
          toast.error(result.message || "Failed to load admin statistics");
        }
      } catch (error) {
        console.error("Fetch Analytics Error:", error);
        toast.error("Network error or authorization failed!");
      } finally {
        setLoading(false); // ✅ Fix: setLoading method correctly used
      }
    };

    fetchAdminStats();

    // Cleanup for next navigation
    return () => {
      isFetched.current = false;
    };
  }, [BACKEND_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  const cardData = [
    { title: "Total Users", value: stats?.totalUsers || 0, icon: FiUsers, color: "from-blue-500/10 to-indigo-500/10 text-blue-600", desc: "Registered accounts" },
    { title: "Total Prompts", value: stats?.totalPrompts || 0, icon: FiFileText, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600", desc: "Live in marketplace" },
    { title: "Total Reviews", value: stats?.totalReviews || 0, icon: FiStar, color: "from-amber-500/10 to-orange-500/10 text-amber-600", desc: "User feedbacks" },
    { title: "Total Copies", value: stats?.totalCopies || 0, icon: FiCopy, color: "from-purple-500/10 to-pink-500/10 text-purple-600", desc: "Successful usages" }
  ];

  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Dashboard Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time overview of your platform's growth and user activities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <Card key={idx} className="group border border-gray-100 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md hover:border-gray-200/80 transition-all duration-300 rounded-2xl overflow-hidden">
              <div className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                    <IconComponent size={22} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">{card.title}</p>
                  <h3 className="text-3xl font-black text-gray-800 mt-1 tracking-tight group-hover:translate-x-0.5 transition-transform duration-200">
                    {card.value.toLocaleString()}
                  </h3>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                  <span>{card.desc}</span>
                  <span className="text-emerald-500 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}