"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export function useAdminAnalytics() {
  const [stats, setStats] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0 });
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchAdminStats = useCallback(async () => {
    if (isFetched.current) return;

    try {
      setLoading(true);
      
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

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const result = await res.json();
      if (result.success && result.stats) {
        setStats(result.stats);
        isFetched.current = true;
      } else {
        toast.error(result.message || "Failed to load admin statistics");
      }
    } catch (error) {
      console.error("Fetch Analytics Error:", error);
      toast.error("Network error or authorization failed!");
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    if (BACKEND_URL) fetchAdminStats();

    return () => {
      isFetched.current = false;
    };
  }, [BACKEND_URL, fetchAdminStats]);

  return { stats, loading };
}