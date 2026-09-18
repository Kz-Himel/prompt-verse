"use client";

import { useUserProfile } from "@/hooks/useUserProfile";

export default function MyProfilePage() {
  const { profile, loading, error, refetch } = useUserProfile();

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Profile</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}