"use client";

import ProfileCard from "../../components/ProfileCard";
import { useUserProfile } from "@/hooks/useUserProfile";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function AdminProfilePage() {
  const { profile, loading, error, refetch } = useUserProfile();

  if (loading) {
    return (
      <LoadingSpinner
        text="Loading Profile..."
        subtext="Fetching your account details"
      />
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 w-full flex justify-center items-center min-h-[350px]">
        <div className="neu-card p-8 rounded-2xl max-w-md w-full text-center space-y-4 border border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-red-500">
            <FiAlertCircle className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text)]">Failed to load profile</h3>
            <p className="text-xs text-red-500/90 mt-1 font-medium">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="neu-button-primary w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiRefreshCw className="text-sm" />
            <span>Retry Fetching</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">My Profile</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">View your profile details and account status.</p>
      </div>

      <ProfileCard userProfile={profile} />
    </div>
  );
}