"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8 py-16">
      <h1 className="text-4xl font-extrabold text-center">Welcome to Robuminer</h1>
      <p className="text-lg text-center max-w-md">
        Earn Robux by completing offers, referring friends, and redeem your balance for rewards. Sign up to get started!
      </p>
      {user ? (
        <Link href="/dashboard" className="px-6 py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition">
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Log In
          </Link>
          <Link href="/signup" className="px-6 py-3 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
