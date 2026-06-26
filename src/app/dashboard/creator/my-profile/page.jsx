"use client";
import { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard"; // পাথ প্রজেক্ট অনুযায়ী এডজাস্ট করবে

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে Better Auth অথবা তোমার MongoDB থেকে লগইন থাকা ইউজারের ডেটা আসবে
    // আপাতত ক্রাইটেরিয়া টেস্টের জন্য নিখুঁত মক ডেটা
    const timer = setTimeout(() => {
      setProfile({
        name: "Afsari Rahman",
        email: "afsari@example.com",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: "User", // অথবা "Creator"
        totalPrompts: 2,
        subscription: "Free" // "Free" টেস্ট করার জন্য, "Premium" দিলে ব্যানার হাইড হয়ে যাবে
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 w-full flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View your profile details and subscription status.</p>
      </div>

      <ProfileCard userProfile={profile} />
    </div>
  );
}