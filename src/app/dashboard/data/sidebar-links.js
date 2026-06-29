import {
  RiDashboardLine,
  RiAddCircleLine,
  RiBookmarkLine,
  RiMessage3Line,
  RiUserLine,
  RiFileList3Line,
  RiBarChartBoxLine,
  RiShieldLine,
  RiTeamLine,
  RiBankCardLine,
} from "react-icons/ri";

export const sidebarLinks = {
  // 👤 User Dashboard Routes
  user: [
    {
      label: "Home",
      href: "/dashboard/user",
      icon: RiAddCircleLine,
    },
    {
      label: "Add Prompt",
      href: "/dashboard/user/add-prompt",
      icon: RiAddCircleLine,
    },
    {
      label: "My Prompts",
      href: "/dashboard/user/my-prompts",
      icon: RiFileList3Line,
    },
    {
      label: "Saved Prompts",
      href: "/dashboard/user/saved-prompts",
      icon: RiBookmarkLine,
    },
    {
      label: "My Reviews",
      href: "/dashboard/user/my-reviews",
      icon: RiMessage3Line,
    },
    {
      label: "Profile",
      href: "/dashboard/user/my-profile",
      icon: RiUserLine,
    }
  ],

  // 🎨 Creator Dashboard Routes
  creator: [
    {
      label: "Dashboard Home",
      href: "/dashboard/creator",
      icon: RiBarChartBoxLine,
    },
    {
      label: "Add Prompt",
      href: "/dashboard/creator/add-prompt",
      icon: RiAddCircleLine,
    },
    {
      label: "My Prompts",
      href: "/dashboard/creator/my-prompts",
      icon: RiFileList3Line,
    },
    {
      label: "Profile",
      href: "/dashboard/creator/my-profile",
      icon: RiUserLine,
    },
  ],

  // 👑 Admin Dashboard Routes
  admin: [
    {
      label: "Analytics",
      href: "/dashboard/admin",
      icon: RiDashboardLine,
    },
    {
      label: "All Users",
      href: "/dashboard/admin/all-users",
      icon: RiTeamLine,
    },
    {
      label: "All Prompts",
      href: "/dashboard/admin/all-prompts",
      icon: RiFileList3Line,
    },
    {
      label: "All Payments",
      href: "/dashboard/admin/all-payments",
      icon: RiBankCardLine,
    },
    {
      label: "Reported Prompts",
      href: "/dashboard/admin/reported-prompts",
      icon: RiShieldLine,
    },
    {
      label: "Profile",
      href: "/dashboard/admin/my-profile",
      icon: RiUserLine,
    },
  ],
};