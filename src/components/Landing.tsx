"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src="/robux-coins.png" alt="Robux Coins" className="w-40 mb-8" />
      <h1 className="text-3xl font-bold mb-4">Welcome to Robux Rewards</h1>
      <p className="mb-8 text-gray-600">Earn Robux by completing tasks. Login with your Roblox username to get started!</p>
      <button
        className="px-6 py-3 bg-green-600 text-white rounded-2xl font-semibold shadow hover:bg-green-700 transition"
        onClick={() => router.push("/login")}
      >
        Login with Roblox Username
      </button>
    </div>
  );
} 