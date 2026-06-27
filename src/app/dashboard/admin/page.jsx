"use client";
import { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react"; 
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0 });
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;
        
        const res = await fetch(`${BACKEND_URL}/admin/analytics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
          },
        });

        const result = await res.json();
        if (result.success) {
          setStats(result.stats);
        } else {
          toast.error("Failed to load admin statistics");
        }
      } catch (error) {
        console.error(error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Total Users */}
        <Card className="border-none bg-content1 shadow-sm">
          <div className="p-6">
            <p className="text-sm text-foreground-500 font-medium">Total Users</p>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
        </Card>

        {/* 2. Total Prompts */}
        <Card className="border-none bg-content1 shadow-sm">
          <div className="p-6">
            <p className="text-sm text-foreground-500 font-medium">Total Prompts</p>
            <p className="text-3xl font-bold mt-2">{stats.totalPrompts}</p>
          </div>
        </Card>

        {/* 3. Total Reviews */}
        <Card className="border-none bg-content1 shadow-sm">
          <div className="p-6">
            <p className="text-sm text-foreground-500 font-medium">Total Reviews</p>
            <p className="text-3xl font-bold mt-2">{stats.totalReviews}</p>
          </div>
        </Card>

        {/* 4. Total Copies */}
        <Card className="border-none bg-content1 shadow-sm">
          <div className="p-6">
            <p className="text-sm text-foreground-500 font-medium">Total Copies</p>
            <p className="text-3xl font-bold mt-2">{stats.totalCopies}</p>
          </div>
        </Card>
        
      </div>
    </div>
  );
}