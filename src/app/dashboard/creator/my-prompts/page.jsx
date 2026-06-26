"use client";
import { useState, useEffect } from "react";
import MyPromptsCard from "../../components/MyPromptsCard"; // পাথ প্রজেক্ট অনুযায়ী মিলাবে

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এপিআই ফেচিং কোড...
    const mockData = [
      { _id: "1", title: "Midjourney Product Photo", category: "Design", aiTool: "Midjourney", copyCount: 120, status: "approved", difficulty: "Intermediate", visibility: "Public" },
      { _id: "2", title: "Sales Copy Generator", category: "Marketing", aiTool: "ChatGPT", copyCount: 98, status: "pending", difficulty: "Beginner", visibility: "Private" }
    ];
    setPrompts(mockData);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    if (confirm("Delete this prompt?")) {
      setPrompts(prompts.filter((p) => p._id !== id));
    }
  };

  const handleUpdate = (updatedPrompt) => {
    setPrompts(prompts.map((p) => (p._id === updatedPrompt._id ? updatedPrompt : p)));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Prompts</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all your submitted prompts easily.</p>
      </div>

      {/* শেয়ারড কম্পোনেন্ট কল */}
      <MyPromptsCard 
        prompts={prompts} 
        setPrompts={setPrompts} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
}