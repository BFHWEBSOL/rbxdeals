"use client";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ user = { username: "Player123", balance: 120 }, onLogout }: { user?: { username: string, balance: number }, onLogout?: () => void }) {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-main-bg-light dark:bg-main-bg-dark shadow-card-bg-light dark:shadow-card-bg-dark border-b border-border-light dark:border-border-dark fixed top-0 left-0 z-30">
      <Link href="/" className="font-extrabold text-xl tracking-tight text-primary-text-light dark:text-primary-text-dark">Robux Rewards</Link>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <DarkModeToggle />
        <div className="flex items-center gap-2 bg-card-bg-light dark:bg-card-bg-dark px-3 py-1 rounded-2xl shadow-card-bg-light dark:shadow-card-bg-dark">
          <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">{typeof user.username === "string" ? user.username[0] : "?"}</span>
          <span className="font-semibold text-primary-text-light dark:text-primary-text-dark">{typeof user.balance === "number" ? user.balance : 0}</span>
          <span className="ml-1 text-yellow-400">🪙</span>
        </div>
        {onLogout && (
          <button onClick={onLogout} className="ml-2 px-4 py-1 rounded-2xl bg-accent text-white font-semibold hover:opacity-90 transition">Logout</button>
        )}
      </div>
    </nav>
  );
} 