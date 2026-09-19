"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@heroui/react";
import {
  HiBars3,
  HiXMark,
  HiChevronDown,
  HiChevronUp,
  HiOutlineSquares2X2,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBell,
} from "react-icons/hi2";
import { useSession, signOut } from "@/lib/auth-client";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef(null);

  const dashboardHref =
    session?.user?.role === "creator"
      ? "/dashboard/creator"
      : "/dashboard/user";

  useEffect(() => {
    setMounted(true);

    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Close mobile menu automatically on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await signOut();

      setProfileOpen(false);
      setMobileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const navLinkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? "bg-[#0F766E] text-white shadow-[0px_4px_12px_rgba(15,118,110,0.3)]"
        : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#1E293B] dark:hover:text-white hover:shadow-[inset_2px_2px_5px_#c7d0d8,inset_-2px_-2px_5px_#ffffff] dark:hover:shadow-[inset_2px_2px_5px_#080b0f,inset_-2px_-2px_5px_rgba(255,255,255,0.02)]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#EBF1F5] dark:bg-[#0F141C] border-b border-white/60 dark:border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8 gap-4">

        {/* 4. The Quantum Spark / Neural Node Matrix Logo */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          {/* <div className="relative w-9 h-9 rounded-xl bg-[#EBF1F5] dark:bg-[#141B24] flex items-center justify-center shadow-[4px_4px_8px_#c7d0d8,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#080b0f,-4px_-4px_8px_rgba(255,255,255,0.03)] border border-white/60 dark:border-white/[0.08] transition-transform duration-300 group-hover:scale-105">
            <svg className="w-5 h-5 text-[#0F766E] dark:text-[#14B8A6] drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" className="opacity-30" />
              <path d="M12 6l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="currentColor" fillOpacity="0.15" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div> */}
          <h1 className="text-lg font-black tracking-tight flex items-center">
            <span className="text-[#111827] dark:text-[#F8FAFC]">Prompt</span>
            <span className="text-[#0F766E] dark:text-[#14B8A6] ml-[1px]">Verse</span>
          </h1>
        </Link>

        {/* Search Bar - Gawter Moto Inset Shadow */}
        <div className="hidden lg:flex relative flex-1 max-w-md mx-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] dark:text-[#94A3B8]">
            <HiOutlineMagnifyingGlass size={18} />
          </div>
          <input
            type="text"
            placeholder="Search prompts, categories, or creators..."
            className="w-full pl-10 pr-16 py-2 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] text-xs text-[#1E293B] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] outline-none shadow-[inset_3px_3px_6px_#c7d0d8,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-3px_-3px_6px_rgba(255,255,255,0.02)] border border-white/40 dark:border-white/[0.05] focus:border-[#0F766E]/40 dark:focus:border-[#14B8A6]/40 transition-all font-medium"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] bg-[#EBF1F5] dark:bg-[#0F141C] px-1.5 py-0.5 rounded shadow-[2px_2px_4px_#c7d0d8,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#080b0f,-2px_-2px_4px_rgba(255,255,255,0.02)] border border-white/30 dark:border-white/[0.05]">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/prompts" className={navLinkClass("/prompts")}>
            All Prompts
          </Link>
          <Link href="/pricing" className={navLinkClass("/pricing")}>
            Pricing
          </Link>
        </nav>

        {/* Desktop Controls & User Profile */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#080b0f,-3px_-3px_6px_rgba(255,255,255,0.03)] border border-white/40 dark:border-white/[0.05] hover:text-[#1E293B] dark:hover:text-white active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff] transition-colors"
          >
            {theme === "dark" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>

          <button className="w-9 h-9 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#080b0f,-3px_-3px_6px_rgba(255,255,255,0.03)] border border-white/40 dark:border-white/[0.05] hover:text-[#1E293B] dark:hover:text-white active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]">
            <HiOutlineBell size={18} />
          </button>

          {/* Logged Out View */}
          {mounted && !isPending && !session && (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className={navLinkClass("/auth/login")}>
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-[#0F766E] dark:bg-[#14B8A6] hover:bg-[#0D9488] dark:hover:bg-[#0D9488] px-5 py-2 text-sm font-semibold text-white shadow-[0px_4px_12px_rgba(15,118,110,0.35)] transition active:scale-95"
              >
                Register
              </Link>
            </div>
          )}

          {/* Logged In View */}
          {mounted && !isPending && session && (
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full bg-[#EBF1F5] dark:bg-[#141B24] py-1 pl-1 pr-3 shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#080b0f,-3px_-3px_6px_rgba(255,255,255,0.03)] border border-white/60 dark:border-white/[0.06] transition active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]"
              >
                <Avatar
                  size="sm"
                  src={session?.user?.image ? String(session.user.image) : undefined}
                  name={session?.user?.name || "U"}
                  className="w-7 h-7"
                />
                <span className="max-w-[110px] truncate text-xs font-bold text-[#1E293B] dark:text-[#F8FAFC]">
                  {session?.user?.name || "User"}
                </span>
                {profileOpen ? (
                  <HiChevronUp size={14} className="text-[#64748B] dark:text-[#94A3B8]" />
                ) : (
                  <HiChevronDown size={14} className="text-[#64748B] dark:text-[#94A3B8]" />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl bg-[#EBF1F5] dark:bg-[#141B24] shadow-[8px_8px_20px_#c7d0d8,-8px_-8px_20px_#ffffff] dark:shadow-[8px_8px_20px_#080b0f,-8px_-8px_20px_rgba(255,255,255,0.02)] border border-white/60 dark:border-white/[0.06]">
                  <div className="border-b border-black/5 dark:border-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="md"
                        src={session?.user?.image ? String(session.user.image) : undefined}
                        name={session?.user?.name || "User"}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#1E293B] dark:text-[#F8FAFC]">
                          {session?.user?.name}
                        </p>
                        <p className="truncate text-xs text-[#64748B] dark:text-[#94A3B8]">
                          {session?.user?.email}
                        </p>
                        <p className="mt-1 text-xs font-semibold capitalize text-[#0F766E] dark:text-[#14B8A6]">
                          {session?.user?.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    <HiOutlineSquares2X2 size={18} className="text-[#0F766E] dark:text-[#14B8A6]" />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-500/10 transition"
                  >
                    <HiOutlineArrowRightOnRectangle size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 bg-[#EBF1F5] dark:bg-[#141B24] text-[#1E293B] dark:text-[#F8FAFC] shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#080b0f,-3px_-3px_6px_rgba(255,255,255,0.03)] border border-white/40 dark:border-white/[0.05] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/60 dark:border-white/[0.06] bg-[#EBF1F5] dark:bg-[#0F141C] px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block ${navLinkClass("/")}`}
          >
            Home
          </Link>
          <Link
            href="/prompts"
            onClick={() => setMobileOpen(false)}
            className={`block ${navLinkClass("/prompts")}`}
          >
            All Prompts
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className={`block ${navLinkClass("/pricing")}`}
          >
            Pricing
          </Link>

          <div className="pt-2 border-t border-black/5 dark:border-white/5">
            {mounted && !isPending && !session && (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-center ${navLinkClass("/auth/login")}`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-full bg-[#0F766E] dark:bg-[#14B8A6] hover:bg-[#0D9488] dark:hover:bg-[#0D9488] px-5 py-2 text-sm font-semibold text-white transition active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}

            {mounted && !isPending && session && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Avatar
                    size="sm"
                    src={session?.user?.image ? String(session.user.image) : undefined}
                    name={session?.user?.name || "U"}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#1E293B] dark:text-[#F8FAFC]">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="truncate text-xs text-[#64748B] dark:text-[#94A3B8]">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC]"
                >
                  <HiOutlineSquares2X2 size={18} className="text-[#0F766E] dark:text-[#14B8A6]" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-left text-sm font-medium text-red-500"
                >
                  <HiOutlineArrowRightOnRectangle size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}