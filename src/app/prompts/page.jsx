import { RiSparklingFill } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import PromptCard from "../../components/PromptCard";
import SearchInput from "../../components/SearchInput"; 
import { Suspense } from "react";
import { headers } from "next/headers"; 
import { auth } from "@/lib/auth"; 
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Search Input */}
        <div className="neu-card p-5 sm:p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
                <span className="p-2 rounded-xl neu-card text-[var(--primary)] inline-flex items-center justify-center">
                  <RiSparklingFill className="w-5 h-5 text-[var(--primary)]" />
                </span>
                <span>
                  Prompt <span className="text-[var(--primary)]">Marketplace</span>
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] pt-0.5">
                Discover, copy, and share high-quality AI prompts built for creators.
              </p>
            </div>

            {/* Search Input & Tags Component */}
            <div className="w-full md:max-w-md">
              <Suspense fallback={<LoadingSpinner />}>
                <SearchInput />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Content & Results Grid */}
        {prompts.length === 0 ? (
          <div className="neu-card text-center py-20 px-4 flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full neu-card flex items-center justify-center text-[var(--text-muted)] text-xl mb-1">
              🔍
            </div>
            <h3 className="text-base font-semibold text-[var(--text)]">No Prompts Found</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
              We couldn't find any prompts matching your query parameters. Try tweaking your filters or search text.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, idx) => (
              <PromptCard 
                key={prompt._id || idx} 
                prompt={prompt} 
                index={idx}
                isPremiumUser={isPremiumUser}
                currentUserEmail={currentUserEmail}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}