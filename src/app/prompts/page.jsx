import { RiSparklingFill } from "react-icons/ri";
import PromptCard from "../../components/PromptCard";
import SearchInput from "../../components/SearchInput"; 
import { Suspense } from "react";
import { headers } from "next/headers"; 
import { auth } from "@/lib/auth"; 
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getPromptsData(queryParams = {}, userEmail = "") {
  try {
    const params = new URLSearchParams(queryParams);
    if (userEmail) params.append("email", userEmail);

    const res = await fetch(`${BACKEND_URL}/prompts?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store" 
    });

    if (!res.ok) throw new Error("Failed to fetch");
    const resData = await res.json();
    
    // 🎯 ব্যাকএন্ডের পাঠানো রেসপন্স থেকে ডেটা ও প্রিমিয়াম ফ্ল্যাগ রিসিভ করা হলো
    return {
      prompts: resData.success ? resData.data : [],
      isPremiumUser: resData.isPremiumUser || false
    };
  } catch (error) {
    console.error(error);
    return { prompts: [], isPremiumUser: false };
  }
}

export default async function AllPromptsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  
  const queryParams = {
    search: resolvedSearchParams?.search || "",
    category: resolvedSearchParams?.category || "",
    aiTool: resolvedSearchParams?.aiTool || "",
    difficulty: resolvedSearchParams?.difficulty || "",
    sortBy: resolvedSearchParams?.sortBy || "",
    page: resolvedSearchParams?.page || "1",
    limit: resolvedSearchParams?.limit || "6"
  };

  let currentUserEmail = "";
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user?.email) currentUserEmail = session.user.email;
  } catch (err) {
    console.error(err);
  }

  const { prompts, isPremiumUser } = await getPromptsData(queryParams, currentUserEmail);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-slate-800 text-3xl font-bold tracking-tight flex items-center gap-2">
              <RiSparklingFill className="text-violet-600" />
              Prompt Marketplace
            </h1>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <SearchInput />
          </Suspense>
        </div>

        {prompts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">No prompts available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, idx) => (
              <PromptCard 
                key={prompt._id || idx} 
                prompt={prompt} 
                index={idx}
                isPremiumUser={isPremiumUser}
                currentUserEmail={currentUserEmail} // 🎯 ওনারশিপ চেকিং এর জন্য কারেন্ট ইমেইল পাঠানো হলো
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}