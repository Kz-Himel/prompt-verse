import { RiSparklingFill } from "react-icons/ri";
import PromptCard from "../../components/PromptCard";
import SearchInput from "../../components/SearchInput"; 
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // ক্যাশিং ফিক্স করার জন্য ডায়নামিক ফোর্স করা হলো

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ব্যাকএন্ড থেকে ডেটা আনার ফাংশন (সার্চ এবং ইউজার ইমেইলসহ)
async function getPrompts(searchQuery = "", userEmail = "") {
  try {
    let url = `${BACKEND_URL}/prompts?`;
    
    if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
    if (userEmail) url += `email=${encodeURIComponent(userEmail)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store" 
    });

    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

    const resData = await res.json();
    return resData.success ? resData.data : [];
  } catch (error) {
    console.error("Error in getPrompts:", error);
    return []; 
  }
}

export default async function AllPromptsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  
  // 💡 আপনার Auth প্রোভাইডার (যেমন NextAuth/Better Auth) থেকে কারেন্ট ইউজারের ইমেইল নিন
  // উদাহরণ স্বরূপ নিচে ডামি বা প্রোভাইডার ইমেইল ডিক্লেয়ার করা হলো:
  const currentUserEmail = resolvedSearchParams?.userEmail || ""; 

  const prompts = await getPrompts(search, currentUserEmail);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ── হেডার সেকশন ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-slate-800 text-3xl font-bold tracking-tight flex items-center gap-2">
              <RiSparklingFill className="text-violet-600" />
              Prompt Marketplace
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Explore high-quality, battle-tested AI prompts created by the community.
            </p>
          </div>
          
          <Suspense fallback={<div className="w-full md:w-80 h-10 bg-slate-100 rounded-xl animate-pulse" />}>
            <SearchInput />
          </Suspense>
        </div>

        {/* ── মেইন কন্টেন্ট এরিয়া ── */}
        {prompts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-slate-500 text-base">
              {search ? `No prompts found for "${search}"` : "No prompts available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, idx) => (
              <PromptCard 
                key={prompt._id || idx} 
                prompt={prompt} 
                index={idx} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}