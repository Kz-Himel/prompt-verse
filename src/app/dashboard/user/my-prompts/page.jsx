"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";
import MyPromptsCard from "../../components/MyPromptsCard"; // পাথ প্রজেক্ট অনুযায়ী মিলাবেন

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ─── ডাইনামিক হেডার জেনারেটর (টোকেনসহ) ───
  const getHeaders = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to fetch auth token", err);
    }
    return headers;
  };

  // ─── কারেন্ট ইউজারের প্রম্পট ফেচ করা ───
  useEffect(() => {
    const fetchMyPrompts = async () => {
      try {
        setLoading(true);
        const headers = await getHeaders();

        const res = await fetch(`${BACKEND_URL}/my-prompts`, {
          method: "GET",
          headers: headers,
        });

        const result = await res.json();

        if (result.success) {
          setPrompts(result.data || []);
        } else {
          toast.error(result.message || "Failed to load your prompts");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Network error occurred!");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email && !isPending) {
      fetchMyPrompts();
    } else if (!isPending && !currentUser) {
      setLoading(false);
    }
  }, [currentUser?.email, isPending]);

  // ─── প্রম্পট ডিলিট হ্যান্ডলার ───
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    try {
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/prompts/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      const result = await res.json();

      if (result.success) {
        setPrompts(prompts.filter((p) => p._id !== id));
        toast.success("Prompt deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete prompt");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  // ─── প্রম্পট আপডেট হ্যান্ডলার ───
  const handleUpdate = (updatedPrompt) => {
    setPrompts(
      prompts.map((p) => (p._id === updatedPrompt._id ? updatedPrompt : p))
    );
  };

  if (isPending || loading) {
    return <div className="p-10 text-center text-sm font-semibold text-slate-500">Loading your prompts...</div>;
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Please login first to view your prompts.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Prompts</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all your submitted prompts easily.</p>
      </div>

      {prompts.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center text-gray-500 shadow-sm">
          You haven't created any prompts yet.
        </div>
      ) : (
        /* শেয়ারড কম্পোনেন্ট কল */
        <MyPromptsCard 
          prompts={prompts} 
          setPrompts={setPrompts} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}