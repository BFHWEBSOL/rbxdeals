"use client";
import React, { useRef, useState, useEffect } from "react";
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
  const { user, setUser } = useSession();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    if (avatarMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [avatarMenuOpen]);

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
        <div className="flex items-center gap-4 relative">
          <img
            ref={avatarRef}
            src={user.avatarUrl || "/avatar-placeholder.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
            onClick={() => setAvatarMenuOpen((open) => !open)}
          />
          {avatarMenuOpen && (
            <div className="absolute left-0 top-12 z-50 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col animate-fade-in">
              <button
                className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition text-red-500 font-semibold"
                onClick={() => { setUser(null); setAvatarMenuOpen(false); }}
              >
                Logout
              </button>
            </div>
          )}
          <span className="font-semibold text-base text-[#23272e]">{user.username}</span>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-2xl border border-gray-200">
            <span className="font-bold text-lg text-[#10a37f]">{typeof user.robuxBalance === "number" ? user.robuxBalance : "0"}</span>
            <Image src="/images/rbx.svg" alt="Robux Icon" width={24} height={24} />
          </div>
        </div>
      </div>
    </header>
  );
} 