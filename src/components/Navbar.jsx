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
} from "react-icons/hi2";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

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

  // Neumorphic Soft UI Navigation Link Style
  const navLinkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? "bg-[#0F766E] text-white shadow-[0px_4px_12px_rgba(15,118,110,0.3)]"
        : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#1E293B] dark:hover:text-[#F1F5F9] hover:shadow-[inset_2px_2px_5px_#c7d0d8,inset_-2px_-2px_5px_#ffffff] dark:hover:shadow-[inset_2px_2px_5px_#0d1217,inset_-2px_-2px_5px_#1d2631]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#EBF1F5]/90 dark:bg-[#151C24]/90 backdrop-blur-md border-b border-white/60 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        
        {/* Logo with PromptVerse Brand Icon */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-[#EBF1F5] dark:bg-[#151C24] flex items-center justify-center shadow-[4px_4px_8px_#c7d0d8,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d1217,-4px_-4px_8px_#1d2631]">
            <svg
              className="w-5 h-5 text-[#0F766E] dark:text-[#2DD4BF]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#1E293B] dark:text-[#F1F5F9]">
              PromptVerse
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-3 md:flex">
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

        {/* Desktop Right Panel */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Logged Out View */}
          {mounted && !isPending && !session && (
            <>
              <Link href="/auth/login" className={navLinkClass("/auth/login")}>
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-full bg-[#0F766E] hover:bg-[#0D9488] px-5 py-2 text-sm font-semibold text-white shadow-[0px_4px_14px_rgba(15,118,110,0.35)] transition-all duration-200 active:scale-95"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged In View */}
          {mounted && !isPending && session && (
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full bg-[#EBF1F5] dark:bg-[#151C24] py-1 pl-1 pr-3 shadow-[4px_4px_8px_#c7d0d8,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d1217,-4px_-4px_8px_#1d2631] border border-white/60 dark:border-white/5 transition-all duration-200 active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]"
              >
                <Avatar
                  size="sm"
                  src={session?.user?.image ? String(session.user.image) : undefined}
                  name={session?.user?.name || "U"}
                  className="w-7 h-7"
                />

                <span className="max-w-[110px] truncate text-sm font-medium text-[#1E293B] dark:text-[#F1F5F9]">
                  {session?.user?.name?.split(" ")[0] || "User"}
                </span>

                {profileOpen ? (
                  <HiChevronUp size={16} className="text-[#64748B]" />
                ) : (
                  <HiChevronDown size={16} className="text-[#64748B]" />
                )}
              </button>

              {/* Neumorphic Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl bg-[#EBF1F5] dark:bg-[#151C24] shadow-[8px_8px_20px_#c7d0d8,-8px_-8px_20px_#ffffff] dark:shadow-[8px_8px_20px_#0d1217,-8px_-8px_20px_#1d2631] border border-white/60 dark:border-white/5">
                  {/* User Info */}
                  <div className="border-b border-black/5 dark:border-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="md"
                        src={session?.user?.image ? String(session.user.image) : undefined}
                        name={session?.user?.name || "User"}
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                          {session?.user?.name}
                        </p>

                        <p className="truncate text-xs text-[#64748B] dark:text-[#94A3B8]">
                          {session?.user?.email}
                        </p>

                        <p className="mt-1 text-xs font-semibold capitalize text-[#0F766E] dark:text-[#2DD4BF]">
                          {session?.user?.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={dashboardHref}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1E293B] dark:text-[#F1F5F9] transition hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <HiOutlineSquares2X2 size={18} className="text-[#0F766E] dark:text-[#2DD4BF]" />
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-500/10"
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
          className="rounded-xl p-2 bg-[#EBF1F5] dark:bg-[#151C24] text-[#1E293B] dark:text-[#F1F5F9] shadow-[4px_4px_8px_#c7d0d8,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d1217,-4px_-4px_8px_#1d2631] md:hidden"
        >
          {mobileOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="border-t border-black/5 dark:border-white/5 bg-[#EBF1F5] dark:bg-[#151C24] md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/"
              className={navLinkClass("/")}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/prompts"
              className={navLinkClass("/prompts")}
              onClick={() => setMobileOpen(false)}
            >
              All Prompts
            </Link>

            <Link
              href="/pricing"
              className={navLinkClass("/pricing")}
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Logged In View */}
            {mounted && !isPending && session && (
              <>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#EBF1F5] dark:bg-[#151C24] p-3 shadow-[inset_2px_2px_5px_#c7d0d8,inset_-2px_-2px_5px_#ffffff] dark:shadow-[inset_2px_2px_5px_#0d1217,inset_-2px_-2px_5px_#1d2631]">
                  <Avatar
                    size="md"
                    src={session?.user?.image ? String(session.user.image) : undefined}
                    name={session?.user?.name || "User"}
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                      {session?.user?.name}
                    </p>

                    <p className="truncate text-xs text-[#64748B] dark:text-[#94A3B8]">
                      {session?.user?.email}
                    </p>

                    <p className="mt-1 text-xs font-semibold capitalize text-[#0F766E] dark:text-[#2DD4BF]">
                      {session?.user?.role}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#1E293B] dark:text-[#F1F5F9] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <HiOutlineSquares2X2 size={18} className="text-[#0F766E] dark:text-[#2DD4BF]" />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-500/10"
                >
                  <HiOutlineArrowRightOnRectangle size={18} />
                  Logout
                </button>
              </>
            )}

            {/* Mobile Logged Out View */}
            {mounted && !isPending && !session && (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass("/auth/login")}
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-[#0F766E] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0px_4px_14px_rgba(15,118,110,0.35)]"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}