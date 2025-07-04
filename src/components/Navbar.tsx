"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "../context/SessionContext";

export default function Navbar() {
  const { user } = useSession();
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-2 bg-[#f8f8f8] border-b border-[#e3e3e3] fixed top-0 left-0 z-30 h-14">
      {/* Left: Logo and Nav Links */}
      <div className="flex items-center gap-6 min-w-max">
        <Link href="/">
          <Image src="/images/rbx.svg" alt="Robuminer Logo" width={32} height={32} className="-rotate-12" />
        </Link>
        {user && (
          <div className="flex items-center gap-6 text-[17px] font-medium text-[#23272e]">
            <Link href="/Earn">Earn</Link>
            <Link href="/Withdraw">Withdraw</Link>
            <Link href="/referrals">Referrals</Link>
          </div>
        )}
      </div>
      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="w-[320px] max-w-full px-4 py-1.5 rounded-lg border border-[#e3e3e3] bg-[#f7f7f7] text-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#c1c1c1]"
        />
      </div>
      {/* Right: User, Notifications, Robux, Settings */}
      {user && (
        <div className="flex items-center gap-6 min-w-max">
          {/* User Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3e3e3] flex items-center justify-center text-[#23272e] font-bold text-lg">
              {typeof user.username === "string" ? user.username[0] : "?"}
            </div>
            <span className="text-[15px] font-medium text-[#23272e]">{user.username}</span>
          </div>
          {/* Notifications */}
          <div className="relative">
            <button className="w-8 h-8 flex items-center justify-center">
              <svg width="22" height="22" fill="none" stroke="#23272e" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/></svg>
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">3</span>
          </div>
          {/* Robux Balance */}
          <div className="flex items-center gap-1 bg-[#ededed] px-3 py-1 rounded-2xl">
            <svg width="20" height="20" fill="none" stroke="#23272e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#23272e">R$</text></svg>
            <span className="font-semibold text-[#23272e]">{typeof user.robuxBalance === "number" ? user.robuxBalance : 0}</span>
          </div>
          {/* Settings */}
          <button className="w-8 h-8 flex items-center justify-center">
            <svg width="22" height="22" fill="none" stroke="#23272e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.82 1.65 1.65 0 0 0 3.5 15H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 12c0-.36-.13-.7-.33-.98A1.65 1.65 0 0 0 3.5 9H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 5 4.6c.36 0 .7.13.98.33A1.65 1.65 0 0 0 9 3.5V3a2 2 0 1 1 4 0v.09c.36 0 .7.13.98.33A1.65 1.65 0 0 0 15 4.6c0 .36.13.7.33.98A1.65 1.65 0 0 0 19.4 9c.36 0 .7.13.98.33A1.65 1.65 0 0 0 21 8.09V9a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-.33.98c0 .36.13.7.33.98z"/></svg>
          </button>
        </div>
      )}
    </nav>
  );
} 