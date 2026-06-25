"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardHeader() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back! 👋
        </h1>
        <p className="text-default-500 mt-1">
          Loading...
        </p>
      </div>
    );
  }

  const name =
    session?.user?.name?.split(" ")[0] || "User";

  const role = session?.user?.role;

  const dashboardContent = {
    user: {
      title: `Welcome back, ${name}! 👋`,
      subtitle:
        "Discover and manage your favorite prompts.",
    },
    creator: {
      title: `Welcome back, ${name}! 🚀`,
      subtitle:
        "Manage your prompts, track sales, and grow your audience.",
    },
  };

  const {
    title,
    subtitle,
  } = dashboardContent[role] || {
    title: `Welcome back, ${name}! 👋`,
    subtitle: "Have a great day!",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="text-default-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}