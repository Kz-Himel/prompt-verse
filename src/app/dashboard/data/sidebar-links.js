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
      label: "Profile", // রিকোয়ারমেন্ট অনুযায়ী প্রোফাইল পেজ
      href: "/dashboard/profile",
      icon: RiUserLine,
    },
    {
      label: "Add Prompt", // ফ্রি ইউজার ৩টি এড করতে পারবে (ব্যাকএন্ড চেকসহ)
      href: "/dashboard/user/addprompt",
      icon: RiAddCircleLine,
    },
    {
      label: "My Prompts", // ⚠️ আপনার এটা মিস হয়েছিল (ইউজারের নিজের প্রম্পট টেবিল)
      href: "/dashboard/user/myprompts",
      icon: RiFileList3Line,
    },
    {
      label: "Saved Prompts", // বুকমার্ক করা প্রম্পট
      href: "/dashboard/saved-prompts",
      icon: RiBookmarkLine,
    },
    {
      label: "My Reviews", // ইউজারের দেওয়া রিভিউ লিস্ট
      href: "/dashboard/my-reviews",
      icon: RiMessage3Line,
    },
  ],

  // 🎨 Creator Dashboard Routes
  creator: [
    {
      label: "Dashboard Home", // Creator Dashboard Home (Analytics with Recharts)
      href: "/dashboard/creator/creator-dashboard-home",
      icon: RiBarChartBoxLine,
    },
    {
      label: "Add Prompt", // শেয়ার্ড রুট (ক্রিয়েটরের জন্য লিমিট নাই)
      href: "/dashboard/creator/add-prompt",
      icon: RiAddCircleLine,
    },
    {
      label: "My Prompts", // শেয়ার্ড টেবিল (আপডেট/ডিলিট অ্যাকশনসহ)
      href: "/dashboard/creator/my-prompts",
      icon: RiFileList3Line,
    },
    {
      label: "Profile", // কমন প্রোফাইল পেজ
      href: "/dashboard/creator/my-profile",
      icon: RiUserLine,
    },
  ],

  // 👑 Admin Dashboard Routes
  admin: [
    {
      label: "Analytics", // রিকোয়ারমেন্টের নাম অনুযায়ী (Total Users, Prompts, etc.)
      href: "/dashboard/admin-analytics",
      icon: RiDashboardLine,
    },
    {
      label: "All Users", // রোল চেঞ্জ ও ডিলিট টেবিল
      href: "/dashboard/all-users",
      icon: RiTeamLine,
    },
    {
      label: "All Prompts", // Approve/Reject/Delete টেবিল
      href: "/dashboard/all-prompts",
      icon: RiFileList3Line,
    },
    {
      label: "All Payments", // সব পেমেন্ট ডেটা টেবিল
      href: "/dashboard/all-payments",
      icon: RiBankCardLine,
    },
    {
      label: "Reported Prompts", // রিপোর্ট হ্যান্ডেল করার পেজ
      href: "/dashboard/reported-prompts",
      icon: RiShieldLine,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: RiUserLine,
    },
  ],
};