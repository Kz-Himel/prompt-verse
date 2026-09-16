"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardHeader() {
  const { data: session, isPending } = useSession();

  const name = session?.user?.name?.split(" ")[0] || "User";
  const role = session?.user?.role || "user";

  const dashboardContent = {
    user: {
      title: `Welcome back, ${name}! 👋`,
      subtitle: "Discover and manage your favorite prompts.",
    },
    creator: {
      title: `Welcome back, ${name}! 🚀`,
      subtitle: "Manage your prompts, track sales, and grow your audience.",
    },
    admin: {
      title: `Welcome back, ${name}! ⚡`,
      subtitle: "Overview of platform performance, users, and marketplace activity.",
    },
  };

  const { title, subtitle } = dashboardContent[role] || dashboardContent.user;

  // Loading State (Skeleton Loader)
  if (isPending) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-80 bg-slate-100 dark:bg-zinc-800/60 rounded-md" />
      </div>
    );
  }

  return (
    <div>
      <h1
        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]"
        suppressHydrationWarning
      >
        {title}
      </h1>
      <p
        className="text-xs sm:text-sm text-[var(--text-muted)] mt-1"
        suppressHydrationWarning
      >
        {subtitle}
      </p>
    </div>
  );
}