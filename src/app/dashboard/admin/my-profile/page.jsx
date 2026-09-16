"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";

export function useUserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        throw new Error("Unauthorized: No token found. Please login again.");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile data");
      }

      const resData = await response.json();

      if (resData.success) {
        setProfile(resData.data);
      } else {
        throw new Error(resData.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { profile, loading, error, refetch: fetchUserProfile };
}