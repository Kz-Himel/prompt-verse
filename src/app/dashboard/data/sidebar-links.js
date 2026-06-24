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
  user: [
    {
      label: "Dashboard",
      href: "/dashboard/user",
      icon: RiDashboardLine,
    },
    {
      label: "Add Prompt",
      href: "/dashboard/user/add-prompt",
      icon: RiAddCircleLine,
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
      href: "/dashboard/user/profile",
      icon: RiUserLine,
    },
  ],

  creator: [
    {
      label: "Analytics",
      href: "/dashboard/creator",
      icon: RiDashboardLine,
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
      href: "/dashboard/creator/profile",
      icon: RiUserLine,
    },
  ],

  admin: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: RiDashboardLine,
    },
    {
      label: "All Users",
      href: "/dashboard/admin/users",
      icon: RiTeamLine,
    },
    {
      label: "All Prompts",
      href: "/dashboard/admin/prompts",
      icon: RiFileList3Line,
    },
    {
      label: "Payments",
      href: "/dashboard/admin/payments",
      icon: RiBankCardLine,
    },
    {
      label: "Reports",
      href: "/dashboard/admin/reports",
      icon: RiShieldLine,
    },
    {
      label: "Profile",
      href: "/dashboard/admin/profile",
      icon: RiUserLine,
    },
  ],
};