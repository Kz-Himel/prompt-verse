"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  HiBars3,
  HiXMark,
  HiChevronDown,
  HiChevronUp,
  HiOutlineSquares2X2,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { useSession, signOut } from "@/lib/auth-client";
import { useTheme } from "@/contexts/ThemeContext";

function UserAvatar({ src, name, size = "sm" }) {
  const [imgError, setImgError] = useState(false);
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const dimClass =
    size === "lg"
      ? "w-11 h-11 text-sm"
      : size === "md"
      ? "w-9 h-9 text-xs"
      : "w-7 h-7 text-[10px]";

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || "User Avatar"}
        onError={() => setImgError(true)}
        className={`${dimClass} rounded-full object-cover border border-[var(--border)] shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${dimClass} rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-black shadow-sm shrink-0`}
    >
      {initials}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef(null);

  const role = session?.user?.role || "user";

  const dashboardHref =
    role === "admin"
      ? "/dashboard/admin"
      : role === "creator"
      ? "/dashboard/creator"
      : "/dashboard/user";

  const profileHref =
    role === "admin"
      ? "/dashboard/admin/my-profile"
      : role === "creator"
      ? "/dashboard/creator/my-profile"
      : "/dashboard/user/my-profile";

  const addPromptHref =
    role === "admin"
      ? "/dashboard/admin/all-prompts"
      : role === "creator"
      ? "/dashboard/creator/add-prompt"
      : "/dashboard/user/add-prompt";

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
    setProfileOpen(false);
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
    `rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
      isActive(href)
        ? "bg-[var(--primary)] text-white shadow-[var(--glow-primary)]"
        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl neu-card flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg
              className="w-5 h-5 text-[var(--primary)] drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6l6 6-6 6" />
              <line x1="16" y1="17" x2="16" y2="17" strokeWidth="3" />
              <path
                d="M19 6.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6z"
                fill="currentColor"
                fillOpacity="0.6"
                stroke="none"
              />
            </svg>
          </div>
          <span className="text-lg font-black tracking-tight text-[var(--text)]">
            Prompt<span className="text-[var(--primary)]">Verse</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex p-1 rounded-full neu-card-inset">
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
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="neu-icon-button w-9 h-9 rounded-full cursor-pointer"
          >
            {theme === "dark" ? (
              <HiOutlineSun size={18} className="text-amber-400" />
            ) : (
              <HiOutlineMoon size={18} className="text-slate-600" />
            )}
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="neu-icon-button w-9 h-9 rounded-full relative cursor-pointer"
          >
            <HiOutlineBell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--primary)]" />
          </button>

          {/* Loading Skeleton */}
          {(!mounted || isPending) && (
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 rounded-full neu-card-inset animate-pulse" />
              <div className="w-20 h-8 rounded-full neu-card-inset animate-pulse" />
            </div>
          )}

          {/* Logged Out View */}
          {mounted && !isPending && !session && (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="neu-button-secondary px-4 py-2 text-xs sm:text-sm font-bold rounded-full"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="neu-button-primary px-5 py-2 text-xs sm:text-sm font-bold rounded-full"
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
                className="neu-button-secondary py-1 pl-1.5 pr-3 rounded-full flex items-center gap-2.5 cursor-pointer"
              >
                <UserAvatar
                  src={session?.user?.image ? String(session.user.image) : undefined}
                  name={session?.user?.name || "User"}
                  size="sm"
                />
                <span className="max-w-[110px] truncate text-xs font-bold text-[var(--text)]">
                  {session?.user?.name || "User"}
                </span>
                {profileOpen ? (
                  <HiChevronUp size={14} className="text-[var(--text-muted)]" />
                ) : (
                  <HiChevronDown size={14} className="text-[var(--text-muted)]" />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl neu-card p-0 shadow-[var(--shadow-elevated)] border border-[var(--border)] z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Dropdown Header */}
                  <div className="border-b border-[var(--border)] p-4 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        src={session?.user?.image ? String(session.user.image) : undefined}
                        name={session?.user?.name || "User"}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-[var(--text)] text-sm">
                          {session?.user?.name || "User"}
                        </p>
                        <p className="truncate text-xs text-[var(--text-muted)]">
                          {session?.user?.email}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider text-[var(--primary)] px-2 py-0.5 rounded-full bg-[var(--primary)]/10">
                            {role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="p-1.5 space-y-0.5">
                    <Link
                      href={dashboardHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <HiOutlineSquares2X2 size={18} className="text-[var(--primary)]" />
                      Dashboard
                    </Link>

                    <Link
                      href={profileHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <HiOutlineUser size={18} className="text-[var(--primary)]" />
                      My Profile
                    </Link>

                    <Link
                      href={addPromptHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <HiOutlinePlusCircle size={18} className="text-[var(--primary)]" />
                      {role === "admin" ? "All Prompts" : "Create Prompt"}
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-[var(--border)] p-1.5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <HiOutlineArrowRightOnRectangle size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Action & Toggle Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="neu-icon-button w-9 h-9 rounded-xl cursor-pointer"
          >
            {theme === "dark" ? (
              <HiOutlineSun size={18} className="text-amber-400" />
            ) : (
              <HiOutlineMoon size={18} className="text-slate-600" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="neu-icon-button w-9 h-9 rounded-xl cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
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
          </nav>

          {/* User Auth Section in Mobile */}
          <div className="pt-3 border-t border-[var(--border)]">
            {mounted && !isPending && !session && (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center neu-button-secondary py-2.5 text-xs sm:text-sm font-bold rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center neu-button-primary py-2.5 text-xs sm:text-sm font-bold rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}

            {mounted && !isPending && session && (
              <div className="space-y-3">
                {/* User Info Card */}
                <div className="flex items-center gap-3 p-3 rounded-2xl neu-card-inset">
                  <UserAvatar
                    src={session?.user?.image ? String(session.user.image) : undefined}
                    name={session?.user?.name || "User"}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs sm:text-sm font-bold text-[var(--text)]">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="truncate text-[11px] text-[var(--text-muted)]">
                      {session?.user?.email}
                    </p>
                    <span className="inline-block mt-0.5 text-[9px] font-black uppercase tracking-wider text-[var(--primary)] px-2 py-0.5 rounded-full bg-[var(--primary)]/10">
                      {role}
                    </span>
                  </div>
                </div>

                {/* Quick Dashboard Links */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 neu-card py-2.5 rounded-xl text-xs font-bold text-[var(--text)]"
                  >
                    <HiOutlineSquares2X2 size={16} className="text-[var(--primary)]" />
                    Dashboard
                  </Link>

                  <Link
                    href={profileHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 neu-card py-2.5 rounded-xl text-xs font-bold text-[var(--text)]"
                  >
                    <HiOutlineUser size={16} className="text-[var(--primary)]" />
                    My Profile
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-500 neu-card hover:bg-rose-500/10 cursor-pointer transition"
                >
                  <HiOutlineArrowRightOnRectangle size={16} />
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
