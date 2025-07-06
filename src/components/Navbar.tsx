"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "../context/SessionContext";
import Image from "next/image";

// Define a type for navigation links
interface NavLink {
  href: string;
  label: string;
  match: RegExp;
}

const navLinks: NavLink[] = [
  { href: "/help", label: "Help", match: /^\/help/ },
  { href: "/blog", label: "Blog", match: /^\/blog/ },
];

const userLinks: NavLink[] = [
  { href: "/offers", label: "Tasks", match: /^\/offers/ },
  { href: "/withdraw", label: "Withdraw", match: /^\/withdraw/ },
  { href: "/referrals", label: "Referrals", match: /^\/referrals/ },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useSession();

  // Helper to check if a link is active
  const isActive = (link: NavLink) => {
    if (link.match instanceof RegExp) {
      return link.match.test(pathname);
    }
    return pathname === link.href;
  };

  return (
    <header className="w-full bg-[#f8f8f8] border-b border-[#e3e3e3] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight select-none">
          <Link href="/">Robuminer</Link>
        </div>
        {/* Nav Links */}
        <nav className="flex gap-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link)
                  ? "text-accent font-bold underline underline-offset-4"
                  : "hover:text-accent transition"
              }
            >
              {link.label}
            </Link>
          ))}
          {user &&
            userLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link)
                    ? "text-accent font-bold underline underline-offset-4"
                    : "hover:text-accent transition"
                }
              >
                {link.label}
              </Link>
            ))}
        </nav>
        {/* User Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.avatarUrl || "/avatar-placeholder.png"}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <span className="font-semibold text-base text-[#23272e]">{user.username}</span>
              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-2xl border border-gray-200">
                <span className="font-bold text-lg text-[#10a37f]">{typeof user.robuxBalance === "number" ? user.robuxBalance : "0"}</span>
                <Image src="/images/rbx.svg" alt="Robux Icon" width={24} height={24} />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-xl font-bold text-base shadow transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 