"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/toggle-theme";

const AdminNavbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
  ];

  return (
    <div className="flex w-full items-center justify-between border-b p-5">
      <div className="flex space-x-20">
        <h1>Admin</h1>
        <div className="flex space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={
                  isActive
                    ? "text-black dark:text-white" : "text-slate-500 hover:text-slate-700 hover:dark:text-slate-300"
                }
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default AdminNavbar;
