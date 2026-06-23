<<<<<<< HEAD
'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Sun, Moon, Magnifier, ChevronDown } from '@gravity-ui/icons';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  // এই স্টেটগুলো রিয়েল অ্যাপ্লিকেশনে Auth Context বা JWT সেশন থেকে আসবে
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-900 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LEFT SECTION: Logo & Brand Name */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Logo Graphic inspired by Screenshot 2026-06-23 224058.jpg */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
            P
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            PromptHub
          </span>
        </div>

        {/* MIDDLE SECTION: Navigation Links matching criteria & screenshot */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-zinc-300">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            All Prompts
          </a>
          
          {/* Explore Prompts Dropdown mimicking image spec */}
          <div className="relative">
            <button 
              onClick={() => setShowExploreDropdown(!showExploreDropdown)}
              className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Explore Prompts <ChevronDown size={14} />
            </button>
            {showExploreDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-xl p-2 flex flex-col gap-1 z-50">
                <a href="#" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800">Trending Prompts</a>
                <a href="#" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800">Top Rated</a>
                <a href="#" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800">New Releases</a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Categories
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            How It Works
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Pricing
          </a>
        </nav>

        {/* RIGHT SECTION: Search Shortcut & Authentication State mapping */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Inline Quick Search Trigger Icon */}
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors hidden sm:block">
            <Magnifier size={18} />
          </button>

          {/* Theme Toggle Wrapper Context */}
          <Button 
            isIconOnly 
            variant="light" 
            radius="full" 
            onClick={toggleTheme} 
            className="text-slate-500 dark:text-zinc-400"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* Dynamic Render according to Auth State Criteria */}
          {!isLoggedIn ? (
            <>
              <a 
                href="#" 
                className="text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-2 py-1"
              >
                Login
              </a>
              <Button 
                size="md" 
                radius="xl" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/10 px-5"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <a 
                href="#" 
                className="text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Dashboard
              </a>
              <Button 
                size="md" 
                radius="xl" 
                variant="bordered"
                onClick={() => setIsLoggedIn(false)}
                className="border-slate-200 dark:border-zinc-800 text-sm font-semibold text-rose-500"
              >
                Logout
              </Button>
            </>
          )}
        </div>

      </div>
=======
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
>>>>>>> 5aa5e910203ede1b983ee9c5870f283a4263306e
    </header>
  );
}