import { FiLayers, FiCpu, FiUser } from "react-icons/fi";
import { RiSparklingFill } from "react-icons/ri";
import PromptCard from "../../components/PromptCard";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ব্যাকএন্ড থেকে সরাসরি async/await দিয়ে ডাটা গেট করার ফাংশন
async function getPrompts() {
  try {
    const res = await fetch(`${BACKEND_URL}/prompts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // আপনি চাইলে এখানে অথেন্টিকেশন টোকেন বা অন্য হেডারও পাস করতে পারেন
      },
      // next: { revalidate: 10 } // প্রতি ১০ সেকেন্ড পর পর নতুন ডেটা চেক করবে (Optional)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const resData = await res.json();
    return resData.success ? resData.data : [];
  } catch (error) {
    console.error("Error in getPrompts:", error);
    return []; // এরর হলে খালি অ্যারে রিটার্ন করবে যাতে ক্র্যাশ না করে
  }
}

export default async function AllPromptsPage() {
  // সরাসরি সার্ভার সাইডেই ডেটা চলে আসবে
  const prompts = await getPrompts();

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
          
          {/* দ্রষ্টব্য: সার্ভার কম্পোনেন্টে ডিরেক্ট ক্লায়েন্ট স্টেট (useState) চলে না। 
              তাই সার্চ ফিল্টারিং দরকার হলে এই ইনপুট বক্সটিকে আলাদা 'Client Component' করতে হবে। 
              আপাতত সাধারণ ডিজাইনটা নিচে থাকলো */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl px-4 py-2.5 text-sm outline-none shadow-sm"
              disabled // ক্লায়েন্ট লজিক ছাড়া এটি কাজ করবে না, চাইলে রিমুভ করতে পারেন
            />
          </div>
        </div>

        {/* ── মেইন কন্টেন্ট এরিয়া ── */}
        {prompts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-slate-500 text-base">No prompts available at the moment.</p>
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