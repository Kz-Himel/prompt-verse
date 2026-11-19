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
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : session?.user?.role === "creator"
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
    `rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
      isActive(href)
        ? "bg-[var(--primary)] text-white shadow-[0px_3px_10px_rgba(15,118,110,0.35)]"
        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff] dark:hover:shadow-[inset_2px_2px_4px_#080b0f,inset_-2px_-2px_4px_rgba(255,255,255,0.02)]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
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
          <h1 className="text-lg font-black tracking-tight flex items-center">
            <span className="text-[var(--text)]">Prompt</span>
            <span className="text-[var(--primary)] ml-[1px]">
              Verse
            </span>
          </h1>
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

        {/* Desktop Controls & User Profile */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="neu-icon-button w-9 h-9 rounded-full"
          >
            {theme === "dark" ? (
              <HiOutlineSun size={18} />
            ) : (
              <HiOutlineMoon size={18} />
            )}
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="neu-icon-button w-9 h-9 rounded-full"
          >
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
                className="neu-button-primary px-5 py-2 text-xs sm:text-sm font-semibold rounded-full"
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
                className="neu-button-secondary py-1 pl-1.5 pr-3 rounded-full flex items-center gap-2"
              >
                <Avatar
                  size="sm"
                  src={
                    session?.user?.image
                      ? String(session.user.image)
                      : undefined
                  }
                  name={session?.user?.name || "U"}
                  className="w-7 h-7"
                />
                <span className="max-w-[110px] truncate text-xs font-bold text-[var(--text)]">
                  {session?.user?.name || "User"}
                </span>
                {profileOpen ? (
                  <HiChevronUp
                    size={14}
                    className="text-[var(--text-muted)]"
                  />
                ) : (
                  <HiChevronDown
                    size={14}
                    className="text-[var(--text-muted)]"
                  />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl neu-card p-0 shadow-[var(--shadow-elevated)] border border-[var(--border)] z-50">
                  <div className="border-b border-[var(--border)] p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="md"
                        src={
                          session?.user?.image
                            ? String(session.user.image)
                            : undefined
                        }
                        name={session?.user?.name || "User"}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-[var(--text)] text-sm">
                          {session?.user?.name}
                        </p>
                        <p className="truncate text-xs text-[var(--text-muted)]">
                          {session?.user?.email}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] px-2 py-0.5 rounded-full bg-[var(--primary)]/10">
                          {session?.user?.role || "user"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    <HiOutlineSquares2X2
                      size={18}
                      className="text-[var(--primary)]"
                    />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs sm:text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition border-t border-[var(--border)]"
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
          className="neu-icon-button w-9 h-9 rounded-xl md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
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

          <div className="pt-3 border-t border-[var(--border)]">
            {mounted && !isPending && !session && (
              <div className="flex flex-col gap-2.5 mt-2">
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
                  className="block text-center neu-button-primary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full"
                >
                  Register
                </Link>
              </div>
            )}

            {mounted && !isPending && session && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar
                    size="sm"
                    src={
                      session?.user?.image
                        ? String(session.user.image)
                        : undefined
                    }
                    name={session?.user?.name || "U"}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs sm:text-sm font-bold text-[var(--text)]">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="truncate text-[11px] text-[var(--text-muted)]">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-xs sm:text-sm font-medium text-[var(--text)]"
                >
                  <HiOutlineSquares2X2
                    size={18}
                    className="text-[var(--primary)]"
                  />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-left text-xs sm:text-sm font-medium text-rose-500"
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
