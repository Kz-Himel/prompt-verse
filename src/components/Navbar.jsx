"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Magnifier,
  Moon,
  Sun,
  Bars,
  Xmark,
  ChevronDown,
} from "@gravity-ui/icons";
import {Sparkles} from '@gravity-ui/icons';
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        {/* Left */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5" />
          </div>

          <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
            Prompt
            <span className="text-violet-600">
              Verse
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <button className="flex items-center gap-1 text-[15px] font-medium text-zinc-600 transition hover:text-violet-600 dark:text-zinc-300">
            Explore Prompts
            <ChevronDown width={16} />
          </button>

          <Link
            href="/categories"
            className="text-[15px] font-medium text-zinc-600 transition hover:text-violet-600 dark:text-zinc-300"
          >
            Categories
          </Link>

          <Link
            href="/how-it-works"
            className="text-[15px] font-medium text-zinc-600 transition hover:text-violet-600 dark:text-zinc-300"
          >
            How It Works
          </Link>

          <Link
            href="/pricing"
            className="text-[15px] font-medium text-zinc-600 transition hover:text-violet-600 dark:text-zinc-300"
          >
            Pricing
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white transition hover:border-violet-300 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Magnifier width={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white transition hover:border-violet-300 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {theme === "dark" ? (
              <Sun width={18} />
            ) : (
              <Moon width={18} />
            )}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-xl border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-zinc-800 dark:text-zinc-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 lg:hidden dark:border-zinc-800"
          >
            {open ? (
              <Xmark width={20} />
            ) : (
              <Bars width={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <div className="flex flex-col gap-5">
            <Link href="/">
              Explore Prompts
            </Link>

            <Link href="/categories">
              Categories
            </Link>

            <Link href="/how-it-works">
              How It Works
            </Link>

            <Link href="/pricing">
              Pricing
            </Link>

            <div className="mt-4 flex gap-3">
              <Link
                href="/login"
                className="flex-1 rounded-xl border border-zinc-200 py-3 text-center dark:border-zinc-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex-1 rounded-xl bg-violet-600 py-3 text-center font-medium text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}