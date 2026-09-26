"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { TbLayoutSidebar } from "react-icons/tb";
import {
  FaGithub,
  FaXTwitter,
  FaDiscord,
  FaLinkedin,
  FaCrown,
} from "react-icons/fa6";
import { FiZap } from "react-icons/fi";

import { sidebarLinks } from "../data/sidebar-links";

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();

  const links = sidebarLinks[role] || sidebarLinks.user;
  const isFreeUser = role === "user"; // শুধুমাত্র ফ্রি ইউজারদের এড দেখানোর জন্য

  const navContent = (
    <div className="flex flex-col justify-between h-full space-y-4">
      <div>
        {/* ── Brand Logo Header ── */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-sm shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-[#EBF1F5] dark:bg-[#141B24] flex items-center justify-center shadow-[4px_4px_8px_#c7d0d8,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#080b0f,-4px_-4px_8px_rgba(255,255,255,0.03)] border border-white/60 dark:border-white/[0.08] transition-transform duration-300 group-hover:scale-105">
              <svg
                className="w-5 h-5 text-[#0F766E] dark:text-[#14B8A6] drop-shadow-sm"
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
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[var(--text)]">
            PromptVerse
          </span>
        </div>

        {/* ── Navigation Links ── */}
        <nav className="flex flex-col gap-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200
                  ${
                    active
                      ? "bg-[var(--primary)]/15 text-[var(--primary)] shadow-inner"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  className={`size-4.5 shrink-0 ${active ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Section (Promo Card & Social Footer) ── */}
      <div className="space-y-4 pt-2">
        {/* Neumorphic Promo Card (শুধু ফ্রি ইউজারদের দেখাবে) */}
        {isFreeUser && (
          <div className="neu-card p-3.5 rounded-2xl flex flex-col space-y-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center">
              <FaCrown className="text-sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text)]">
                Go Premium
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">
                Unlock unlimited prompts & premium features.
              </p>
            </div>
            <Link
              href="/pricing"
              className="w-full font-bold py-2 px-3 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white text-[11px] text-center transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              Upgrade Now →
            </Link>
          </div>
        )}

        {/* Social Icons & Copyright */}
        <div className="space-y-2 px-1">
          <div className="flex items-center gap-3 text-[var(--text-muted)] text-xs">
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              <FaDiscord />
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] leading-normal">
            © 2026 PromptVerse.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-60 shrink-0 bg-[var(--bg)] p-4 lg:block h-screen sticky top-0 transition-colors duration-300">
        <div className="neu-card h-full p-3.5 flex flex-col justify-between overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navContent}
        </div>
      </aside>

      {/* Mobile Drawer Trigger */}
      <Drawer>
        <Button
          isIconOnly
          className="fixed left-4 top-4 z-50 lg:hidden neu-card text-[var(--text)]"
          variant="light"
        >
          <TbLayoutSidebar className="size-5 text-[var(--primary)]" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="w-64 bg-[var(--bg)] text-[var(--text)] p-4"
          >
            <Drawer.Dialog className="h-full">
              <Drawer.Header className="pb-2">
                <Drawer.Heading className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {role} Workspace
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="h-[calc(100%-3rem)] px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
