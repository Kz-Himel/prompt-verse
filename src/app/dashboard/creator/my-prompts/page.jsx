"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";
import MyPromptsCard from "../../components/MyPromptsCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const handleUpdate = (updatedPrompt) => {
    setPrompts(
      prompts.map((p) => (p._id === updatedPrompt._id ? updatedPrompt : p))
    );
  };

  if (isPending || loading) {
    return (
      <LoadingSpinner 
        text="Loading Prompts..." 
        subtext="Fetching your saved prompts" 
      />
    );
  }

  if (!currentUser) {
    return (
      <div className="p-6 md:p-10 w-full flex justify-center items-center min-h-[350px]">
        <div className="neu-card p-8 rounded-2xl max-w-md w-full text-center space-y-3 border border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-rose-500 font-bold text-xl">
            !
          </div>
          <h3 className="text-base font-bold text-[var(--text)]">Access Restricted</h3>
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Please login first to view and manage your prompts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
          My Prompts
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Manage all your submitted prompts easily.
        </p>
      </div>

      {prompts.length === 0 ? (
        <div className="neu-card rounded-2xl p-12 text-center border border-[var(--border)] space-y-2">
          <p className="text-[var(--text)] font-semibold text-base">No Prompts Found</p>
          <p className="text-[var(--text-muted)] text-xs font-medium">
            You haven't created any prompts yet. Start by adding one!
          </p>
        </div>
      ) : (
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