"use client";
import { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard"; 
// আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী authClient ইমপোর্ট করুন
import { authClient } from "@/lib/auth-client"; 
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CreatorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        // 🔑 Better Auth ক্লায়েন্ট থেকে ডাইনামিক টোকেন নেওয়া
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        if (!token) {
          throw new Error("Unauthorized: No token found. Please login again.");
        }

        // 🌐 ব্যাকএন্ড API এন্ডপয়েন্টে হিট করা
        const response = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
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
    };

    fetchUserProfile();
  }, []);

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  // এরর স্টেট
  if (error) {
    return (
      <div className="p-6 md:p-10 w-full text-center text-red-500 space-y-3">
        <p className="font-semibold">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Retry Fetching
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View your profile details and subscription status.</p>
      </div>

      {/* ডাইনামিক প্রোফাইল ডাটা পাস করা হচ্ছে */}
      <ProfileCard userProfile={profile} />
    </div>
  );
}