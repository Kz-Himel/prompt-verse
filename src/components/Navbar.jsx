"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut as authSignOut } from '@/lib/auth-client'; 

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x12="20" y1="12" y2="12"></line><line x1="4" x12="20" y1="6" y2="6"></line><line x1="4" x12="20" y1="18" y2="18"></line></svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false); // ⭐️ অবতার ড্রপডাউন স্টেট
  const dropdownRef = useRef(null);

  // লাইভ সেশন ডাটা রিড করা
  const { data: session, isPending } = useSession(); 
  
  const isLoggedIn = !!session;
  const userRole = session?.user?.role || "user"; 
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";
  const userImage = session?.user?.image || ""; // যদি প্রোফাইল পিকচার থাকে

  // ড্যাশবোর্ডের ডাইনামিক রুট
  const getDashboardLink = () => {
    if (userRole === "admin") return "/dashboard/admin";
    if (userRole === "creator") return "/dashboard/creator";
    return "/dashboard/user";
  };

  const handleLogout = async () => {
    try {
      await authSignOut(); 
      setIsMobileMenuOpen(false);
      setIsAvatarDropdownOpen(false);
      window.location.href = '/'; 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ⭐️ ড্রপডাউনের বাইরে ক্লিক করলে মেনু অটো বন্ধ হওয়ার লজিক
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAvatarDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return <header className="w-full h-16 bg-white border-b border-gray-100 sticky top-0 z-50"></header>;
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo & Main Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0f172a] tracking-tight transition-transform active:scale-95">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#6366f1] to-[#a855f7] rounded-xl flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-100">
              P
            </div>
            <span className="font-extrabold text-gray-900 tracking-tight">Prompt<span className="text-[#6366f1]">Verse</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#6366f1]' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <div className="relative group">
              <Link href="/all-prompts" className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === '/all-prompts' ? 'text-[#6366f1]' : 'text-gray-600 hover:text-gray-900'}`}>
                Explore Prompts
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <ChevronDownIcon />
                </span>
              </Link>
            </div>
            <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Categories</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
          </nav>
        </div>

        {/* Right Section: Search & Dynamic Auth/Avatar Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors cursor-pointer" aria-label="Search">
            <SearchIcon />
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">Login</Link>
              <Link href="/auth/register" className="px-4 py-2 text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] active:scale-95 rounded-xl shadow-sm transition-all">Sign Up</Link>
            </div>
          ) : (
            /* ⭐️ মডার্ন অবতার ড্রপডাউন মেনু */
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
              >
                {userImage ? (
                  <img src={userImage} alt={userName} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <ChevronDownIcon />
                </span>
              </button>

              {/* ড্রপডাউন কন্টেন্ট বক্স */}
              {isAvatarDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* ১. ইউজার ইনফো সেকশন */}
                  <div className="px-4 py-2.5 border-b border-gray-50">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{userEmail}</p>
                  </div>

                  {/* ২. ড্যাশবোর্ড বাটন */}
                  <Link 
                    href={getDashboardLink()}
                    onClick={() => setIsAvatarDropdownOpen(false)}
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </Link>

                  {/* ৩. লগআউট বাটন */}
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50/50 transition-colors text-left cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full" aria-label="Search Context"><SearchIcon /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><MenuIcon /></button>
        </div>

      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full left-0 z-50">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Home</Link>
          <Link href="/all-prompts" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">All Prompts</Link>
          <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Categories</Link>
          <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Pricing</Link>
          
          <hr className="border-gray-100 my-2" />

          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl">Login</Link>
              <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-[#6366f1] rounded-xl">Register</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl border border-gray-200">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-xl">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}