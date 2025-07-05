"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "../context/SessionContext";

export default function Navbar() {
  const { user } = useSession();
  const pathname = usePathname();
  const menu = [
    { label: "Earn", href: "/earn" },
    { label: "Withdraw", href: "/withdraw" },
    { label: "Referrals", href: "/referrals" },
  ];
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-2 bg-[#f8f8f8] border-b border-[#e3e3e3] fixed top-0 left-0 z-30 h-14">
      {/* Left: Logo */}
      <div className="flex items-center gap-6 min-w-max">
        <Link href="/">
          <Image src="/images/rbx.svg" alt="Robuminer Logo" width={32} height={32} className="-rotate-12" />
        </Link>
        {user && (
          <div className="flex items-center gap-2 text-[17px] font-medium text-[#23272e]">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl transition font-bold ${pathname === item.href ? "bg-[#10A37F] text-white shadow-lg" : "hover:bg-[#e3e3e3]"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Right: User or Get Started */}
      <div className="flex items-center gap-6 min-w-max">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#e3e3e3] flex items-center justify-center text-[#23272e] font-bold text-lg">
                {typeof user.username === "string" ? user.username[0] : "?"}
              </div>
              <span className="text-[15px] font-medium text-[#23272e]">{user.username}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#ededed] px-3 py-1 rounded-2xl">
              <svg width="20" height="20" fill="none" stroke="#23272e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#23272e">R$</text></svg>
              <span className="font-semibold text-[#23272e]">{typeof user.robuxBalance === "number" ? user.robuxBalance : 0}</span>
            </div>
          </>
        ) : (
          <Link href="/login" className="px-6 py-2 rounded-xl bg-[#10A37F] text-white font-bold hover:bg-[#0e8c6c] transition shadow-lg">Get Started</Link>
        )}
      </div>
    </nav>
  );
} 