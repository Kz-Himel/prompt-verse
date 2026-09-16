"use client";

import { FiSearch, FiSliders, FiChevronDown } from "react-icons/fi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useRef, useEffect } from "react";

const CATEGORY_TAGS = ["Popular", "ChatGPT", "Midjourney", "Coding", "Marketing", "Writing"];

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sortBy") || "newest";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateParams(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "Popular") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  const sortLabels = {
    newest: "Newest to Oldest",
    oldest: "Oldest to Newest",
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar + Custom Soft UI Sorting Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* Search Input Box */}
        <div className="relative w-full flex-1 flex items-center">
          
          {/* Raised Search Icon Button */}
          <div className="absolute left-2.5 p-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.7)] dark:shadow-[2px_2px_4px_#080b0f,-2px_-2px_4px_rgba(255,255,255,0.02)] text-[var(--primary)] flex items-center justify-center pointer-events-none">
            <FiSearch className="w-3.5 h-3.5" />
          </div>

          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => updateParams("search", e.target.value)}
            placeholder="Search prompts, categories, or creators..."
            className="w-full neu-input py-2.5 pl-12 pr-20 text-xs sm:text-sm rounded-xl bg-[var(--card)] text-[var(--text)] placeholder-[var(--text-muted)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all duration-200"
          />

          {/* Raised Shortcut Button Badge (Ctrl K) */}
          <div className="absolute right-2.5 hidden sm:flex items-center gap-1 pointer-events-none text-[10px] font-bold text-[var(--text-muted)] bg-[var(--card)] px-2 py-1 rounded-lg border border-[var(--border)] shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.7)] dark:shadow-[2px_2px_4px_#080b0f,-2px_-2px_4px_rgba(255,255,255,0.02)]">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </div>

        {/* Custom Soft UI Dropdown Menu */}
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-semibold bg-[var(--card)] text-[var(--text)] transition-all duration-200 cursor-pointer ${
              isDropdownOpen
                ? "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]"
                : "shadow-[3px_3px_7px_rgba(0,0,0,0.05),-3px_-3px_7px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_6px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FiSliders className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>{sortLabels[currentSort]}</span>
            </div>
            <FiChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Elevated Popup Options */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-48 z-50 p-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[6px_6px_16px_rgba(0,0,0,0.08),-6px_-6px_16px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_18px_#080b0f,-4px_-4px_14px_rgba(255,255,255,0.03)] space-y-1">
              <button
                type="button"
                onClick={() => {
                  updateParams("sortBy", "newest");
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  currentSort === "newest"
                    ? "bg-[var(--primary)] text-white shadow-[0px_2px_8px_rgba(15,118,110,0.3)] font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]"
                }`}
              >
                Newest to Oldest
              </button>

              <button
                type="button"
                onClick={() => {
                  updateParams("sortBy", "oldest");
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  currentSort === "oldest"
                    ? "bg-[var(--primary)] text-white shadow-[0px_2px_8px_rgba(15,118,110,0.3)] font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]"
                }`}
              >
                Oldest to Newest
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Perfectly Stationary Inset-Hover Category Buttons */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-1 scrollbar-none">
        {CATEGORY_TAGS.map((tag) => {
          const isActive = 
            (tag === "Popular" && !currentCategory) || 
            currentCategory.toLowerCase() === tag.toLowerCase();

          return (
            <button
              key={tag}
              onClick={() => updateParams("category", tag === "Popular" ? "" : tag)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer border border-[var(--border)] ${
                isActive
                  ? "bg-[var(--primary)] text-white border-transparent shadow-[3px_3px_8px_rgba(15,118,110,0.35)]"
                  : "bg-[var(--card)] text-[var(--text-muted)] shadow-[3px_3px_7px_rgba(0,0,0,0.05),-3px_-3px_7px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_7px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] dark:hover:shadow-[inset_2px_2px_5px_#080b0f,inset_-2px_-2px_5px_rgba(255,255,255,0.02)] hover:text-[var(--text)]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}