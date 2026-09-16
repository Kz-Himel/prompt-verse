"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { TbLayoutSidebar } from "react-icons/tb";
import { FaGithub, FaXTwitter, FaDiscord, FaLinkedin, FaCrown } from "react-icons/fa6";
import { FiZap } from "react-icons/fi";

import { sidebarLinks } from "../data/sidebar-links";

export default function Sidebar({ role = "user" }) {
  const pathname = usePathname();

  const links = sidebarLinks[role] || sidebarLinks.user;

  const navContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div>
        {/* ── Brand Logo Header ── */}
        <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-sm">
            <FiZap className="text-lg" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[var(--text)]">
            PromptVerse
          </span>
        </div>

        {/* ── Navigation Links ── */}
        <nav className="flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200
                  ${
                    active
                      ? "bg-[var(--primary)]/15 text-[var(--primary)] shadow-inner"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5"
                  }
                `}
              >
                <Icon className={`size-5 ${active ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Section (Promo Card & Social Footer) ── */}
      <div className="space-y-6 pt-4">
        
        {/* Neumorphic Promo / Premium Card */}
        <div className="neu-card p-4 rounded-2xl flex flex-col space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center">
            <FaCrown className="text-base" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text)]">Go Premium</h4>
            <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
              Unlock unlimited prompts, create custom collections and more.
            </p>
          </div>
          <Link
            href="/pricing"
            className="w-full font-bold py-2.5 px-3 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white text-xs text-center transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
          >
            Upgrade Now →
          </Link>
        </div>

        {/* Social Icons & Copyright */}
        <div className="space-y-3 px-1">
          <div className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
            <a href="#" className="hover:text-[var(--primary)] transition-colors"><FaGithub /></a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors"><FaXTwitter /></a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors"><FaDiscord /></a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors"><FaLinkedin /></a>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] leading-normal">
            © 2026 PromptVerse.<br />All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 bg-[var(--bg)] p-5 lg:block h-screen sticky top-0 transition-colors duration-300">
        <div className="neu-card h-full p-4 flex flex-col justify-between overflow-y-auto">
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
            className="w-72 bg-[var(--bg)] text-[var(--text)] p-4"
          >
            <Drawer.Dialog className="h-full">
              <Drawer.Header className="pb-2">
                <Drawer.Heading className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {role} Workspace
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="h-[calc(100%-3rem)] px-1">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}