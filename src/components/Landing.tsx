"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Landing() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Robux Rewards!</h1>
      <p className="text-xl mb-8">The best place to earn Robux for free.</p>
      <img src="/images/robux-coins.png" alt="Robux Coins" className="w-40 mb-8" />
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 rounded bg-accent text-white font-semibold hover:bg-accent-hover transition">
          Login with Roblox Username
        </Link>
      </div>
    </div>
  );
} 