"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "../context/SessionContext";

// Define a type for navigation links
interface NavLink {
  href: string;
  label: string;
  match: RegExp;
}

const navLinks: NavLink[] = [
  { href: "/#faq", label: "Help", match: /#faq/ },
  { href: "/#blogs", label: "Blog", match: /#blogs/ },
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
              <div className="h-14 w-14 flex items-center justify-center rounded-xl border-2 border-accent bg-[#f8f8f8]">
                <img
                  src={user.avatarUrl || "/avatar-placeholder.png"}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="h-14 flex items-center gap-1 px-6 rounded-xl border font-bold text-lg min-w-[90px] justify-center bg-card-bg-light border-accent text-accent">
                <span>{typeof user.robuxBalance === "number" ? user.robuxBalance : "0"}</span>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2"/>
                  <rect x="8" y="8" width="8" height="8" rx="2" fill="#10a37f"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">R$</text>
                </svg>
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