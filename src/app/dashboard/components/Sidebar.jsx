"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { TbLayoutSidebar } from "react-icons/tb";

import { sidebarLinks } from "../data/sidebar-links";

export default function Sidebar({
  role = "user",
}) {
  const pathname = usePathname();

  const links =
    sidebarLinks[role] ||
    sidebarLinks.user;

  const navContent = (
    <nav className="flex flex-col gap-1">
      {links.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
              ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-default"
              }
            `}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-default-100 p-4 lg:block">
        {navContent}
      </aside>

      {/* Mobile Drawer Trigger */}
      <Drawer>
        <Button
          isIconOnly
          className="fixed left-4 top-4 z-50 lg:hidden mt-12"
          variant="light"
        >
          <TbLayoutSidebar className="size-5" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="w-64"
          >
            <Drawer.Dialog>
              <Drawer.Header>
                <Drawer.Heading>
                  {role} Workspace
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}