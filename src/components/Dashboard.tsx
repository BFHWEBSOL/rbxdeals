"use client";
import React from "react";
import { useSession } from "../context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, setUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      try {
        router.push("/login");
      } catch (navErr) {
        console.error("Navigation error:", navErr);
      }
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  // Defensive fallback for user fields
  const username = typeof user.username === "string" ? user.username : "?";
  const avatarUrl = typeof user.avatarUrl === "string" ? user.avatarUrl : "";
  const userId = typeof user.userId === "string" || typeof user.userId === "number" ? user.userId : "?";
  const robuxBalance = typeof user.robuxBalance === "number" ? user.robuxBalance : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-4 w-full max-w-sm">
        <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full mb-2" />
        <h2 className="text-2xl font-bold">{username}</h2>
        <div className="text-gray-500 text-sm mb-2">UserID: {userId}</div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <span>Robux Balance:</span>
            <span className="font-bold text-green-600">{robuxBalance}</span>
          </div>
        </div>
        <button
          className="mt-4 px-4 py-2 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={() => {
            setUser(null);
            try {
              router.push("/login");
            } catch (navErr) {
              console.error("Navigation error:", navErr);
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
} 