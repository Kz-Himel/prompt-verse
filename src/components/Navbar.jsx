"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Gravity UI Icons (Standard SVG path variations mapped for reliability in Next 15)
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
  
  // এটি আপনার Authentication স্টেটের সাথে পরবর্তীতে কানেক্ট করবেন (JWT/Context)
  // টেস্ট করার জন্য true অথবা false করে দেখতে পারেন
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState("user"); // user, creator, admin
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ড্যাশবোর্ডের ডাইনামিক রুট ডিটারমিনেশন
  const getDashboardLink = () => {
    if (userRole === "admin") return "/dashboard/admin";
    if (userRole === "creator") return "/dashboard/creator";
    return "/dashboard/user";
  };

  const handleLogout = () => {
    // আপনার লগআউট ফাংশনালিটি এখানে যুক্ত করুন
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo & Main Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Logo (Exactly matching Screenshot 2026-06-24 004710.png) */}
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

            {/* Explore Prompts Menu Item with Chevron */}
            <div className="relative group">
              <Link href="/all-prompts" className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === '/all-prompts' ? 'text-[#6366f1]' : 'text-gray-600 hover:text-gray-900'}`}>
                Explore Prompts
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <ChevronDownIcon />
                </span>
              </Link>
            </div>
            
            <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Categories
            </Link>
            
            <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right Section: Search & Dynamic Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Trigger Button */}
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors cursor-pointer" aria-label="Search">
            <SearchIcon />
          </button>

          {/* Conditional Rendering base on Authentication State */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] active:scale-95 rounded-xl shadow-sm shadow-indigo-100 transition-all"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href={getDashboardLink()}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full" aria-label="Search Context">
            <SearchIcon />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <MenuIcon />
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full left-0 transition-all duration-200">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link 
            href="/all-prompts" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            All Prompts
          </Link>
          <Link 
            href="/categories" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Categories
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Pricing
          </Link>
          
          <hr className="border-gray-100 my-2" />

          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-[#6366f1] rounded-xl"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link 
                href={getDashboardLink()} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-xl"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}