"use client";

import Sidebar from "./components/Sidebar";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#fff]">
      <Sidebar role={session?.user?.role} />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}