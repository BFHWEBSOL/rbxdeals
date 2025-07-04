"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "../context/SessionContext";
import { usePathname } from "next/navigation";
import { useLoginModal } from "../app/layout";

export default function Navbar() {
  const { user } = useSession();
  const pathname = usePathname();
  const { setOpen: setLoginOpen } = useLoginModal();

  // Map routes to titles
  const routeTitles: { [key: string]: string } = {
    "/Earn": "Earn Robux",
    "/Withdraw": "Withdraw",
    "/referrals": "Referrals",
    "/dashboard": "Dashboard",
    "/offers": "Offers",
    "/": "Home",
    "/privacy": "Privacy Policy",
    "/login": "Login",
    "/signup": "Sign Up",
    "/auth": "Auth",
    "/postback": "Postback",
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-2 bg-[#f8f8f8] border-b border-[#e3e3e3] fixed top-0 left-0 z-30 h-14">
      {/* Left: Logo and Nav Links */}
      <div className="flex items-center gap-6 min-w-max">
        <Link href="/">
          <Image src="/images/rbx.svg" alt="Robuminer Logo" width={32} height={32} className="-rotate-12 cursor-pointer" />
        </Link>
        <div className="flex items-center gap-6 text-[17px] font-medium text-[#23272e]">
          {user ? (
            <>
              <Link href="/Earn" className={pathname === "/Earn" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Earn Robux</Link>
              <Link href="#faq" className={pathname === "#faq" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Help</Link>
              <Link href="#blogs" className={pathname === "#blogs" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Blog</Link>
              <Link href="/Withdraw" className={pathname === "/Withdraw" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Withdraw</Link>
              <Link href="/referrals" className={pathname === "/referrals" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Referrals</Link>
            </>
          ) : (
            <>
              <Link href="#faq" className={pathname === "#faq" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Help</Link>
              <Link href="#blogs" className={pathname === "#blogs" ? "border-b-4 border-[#23272e] pb-1" : "pb-1"}>Blog</Link>
            </>
          )}
        </div>
      </div>
      {/* Right: User, Balance, or Start Earning */}
      <div className="flex items-center gap-6 min-w-max">
        {user ? (
          <>
            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#e3e3e3] flex items-center justify-center text-[#23272e] font-bold text-lg">
                {typeof user.username === "string" ? user.username[0] : "?"}
              </div>
              <span className="text-[15px] font-medium text-[#23272e]">{user.username}</span>
            </div>
            {/* Robux Balance */}
            <div className="flex items-center gap-1 bg-[#ededed] px-3 py-1 rounded-2xl">
              <svg width="20" height="20" fill="none" stroke="#23272e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#23272e">R$</text></svg>
              <span className="font-semibold text-[#23272e]">{typeof user.robuxBalance === "number" ? user.robuxBalance : 0}</span>
            </div>
          </>
        ) : (
          <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-xl font-bold text-base shadow transition" onClick={() => setLoginOpen(true)}>
            Start Earning
          </button>
        )}
      </div>
    </nav>
  );
} 