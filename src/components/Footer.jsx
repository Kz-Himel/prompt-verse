import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Marketplace",
      links: [
        { label: "Explore Prompts", href: "/prompts" },
        { label: "Pricing", href: "/pricing" },
        { label: "Top Creators", href: "/#top-creators" },
        { label: "How It Works", href: "/#how-it-works" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#why-choose-us" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Community Reviews", href: "/#reviews" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/register" },
        { label: "Dashboard", href: "/dashboard/user" },
        { label: "Become a Creator", href: "/auth/register" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Refund Policy", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--card)] text-[var(--text-muted)] font-sans text-sm pt-16 pb-8 border-t border-[var(--border)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo & Description Column */}
          <div className="lg:col-span-1 space-y-4">
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

            <p className="text-[var(--text-muted)] text-xs sm:text-sm max-w-xs leading-relaxed font-medium">
              The premier marketplace for discovering, sharing, and monetizing production-ready AI prompts.
            </p>

            {/* Social Icons (Neumorphic Buttons) */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                aria-label="Twitter / X"
                className="neu-icon-button w-9 h-9 rounded-xl"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="neu-icon-button w-9 h-9 rounded-xl"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="neu-icon-button w-9 h-9 rounded-xl"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-[var(--text)] font-extrabold text-sm tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-muted)] hover:text-[var(--primary)] text-xs sm:text-sm font-medium transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="neu-card-inset h-[2px] w-full my-8" />

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-semibold text-[var(--text-muted)]">
          <div>
            © {currentYear} PromptVerse. Crafted with precision for the AI generation.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/prompts" className="hover:text-[var(--primary)] transition-colors">
              Marketplace
            </Link>
            <span>•</span>
            <Link href="/pricing" className="hover:text-[var(--primary)] transition-colors">
              Pricing Plans
            </Link>
            <span>•</span>
            <Link href="/auth/register" className="hover:text-[var(--primary)] transition-colors">
              Become a Creator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
