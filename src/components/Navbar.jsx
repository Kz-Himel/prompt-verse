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
  const [mounted, setMounted] = useState(false); // হাইড্রেশন মিসম্যাচ রোধ করার জন্য স্টেট

  const dropdownRef = useRef(null);

  const dashboardHref =
    session?.user?.role === "creator"
      ? "/dashboard/creator"
      : "/dashboard/user";

  useEffect(() => {
    setMounted(true); // ব্রাউজারে কম্পোনেন্ট পুরোপুরি লোড হলে এটি true হবে

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

  const navLinkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg
            className="w-7 h-7 text-[#5643ff]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon
              points="12,6.5 13.5,9.5 16.8,9.5 14.2,11.5 15.2,14.8 12,12.8 8.8,14.8 9.8,11.5 7.2,9.5 10.5,9.5"
              fill="#fff"
            />
          </svg>

          <div>
            <h1 className="text-lg font-bold tracking-tight">PromptVerse</h1>
          </div>
        </Link>

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

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          {/* লগড-আউট ভিউ (শুধুমাত্র ক্লায়েন্টে মাউন্ট হওয়ার পর রেন্ডার হবে) */}
          {mounted && !isPending && !session && (
            <>
              <Link href="/auth/login" className={navLinkClass("/auth/login")}>
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
              >
                Register
              </Link>
            </>
          )}

          {/* লগড-ইন ভিউ (শুধুমাত্র ক্লায়েন্টে মাউন্ট হওয়ার পর রেন্ডার হবে) */}
          {mounted && !isPending && session && (
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1 pl-1 pr-3 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <Avatar
                  size="sm"
                  src={session?.user?.image ? String(session.user.image) : undefined}
                  name={session?.user?.name || "U"}
                />

                <span className="max-w-[110px] truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {session?.user?.name?.split(" ")[0] || "User"}
                </span>

                {profileOpen ? (
                  <HiChevronUp size={16} className="text-zinc-500" />
                ) : (
                  <HiChevronDown size={16} className="text-zinc-500" />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                  {/* User Info */}
                  <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="md"
                        src={session?.user?.image ? String(session.user.image) : undefined}
                        name={session?.user?.name || "User"}
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                          {session?.user?.name}
                        </p>

                        <p className="truncate text-xs text-zinc-500">
                          {session?.user?.email}
                        </p>

                        <p className="mt-1 text-xs font-medium capitalize text-indigo-600 dark:text-indigo-400">
                          {session?.user?.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={dashboardHref}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <HiOutlineSquares2X2 size={18} />
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <HiOutlineArrowRightOnRectangle size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden"
        >
          {mobileOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
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
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <Avatar
                    size="md"
                    src={session?.user?.image ? String(session.user.image) : undefined}
                    name={session?.user?.name || "User"}
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                      {session?.user?.name}
                    </p>

                    <p className="truncate text-xs text-zinc-500">
                      {session?.user?.email}
                    </p>

                    <p className="mt-1 text-xs font-medium capitalize text-indigo-600 dark:text-indigo-400">
                      {session?.user?.role}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  <HiOutlineSquares2X2 size={18} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
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
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
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