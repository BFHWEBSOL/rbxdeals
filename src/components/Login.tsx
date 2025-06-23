"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "../context/SessionContext";

// Replace with your actual deployed Cloud Function URL
const CLOUD_FUNCTION_URL = "https://us-central1-speed-camera-50eee.cloudfunctions.net/getRobloxUser";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useSession();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Please enter your Roblox username.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${CLOUD_FUNCTION_URL}?username=${encodeURIComponent(username.trim())}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const userRef = doc(db, "users", String(data.userId));
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        setUser({
          userId: String(userDoc.userId),
          username: userDoc.username,
          avatarUrl: userDoc.avatarUrl,
          robuxBalance: userDoc.robuxBalance,
          redemptions: userDoc.redemptions || [],
          createdAt: userDoc.createdAt,
        });
        router.push("/dashboard");
      } else {
        setUser({
          userId: String(data.userId),
          username: data.username,
          avatarUrl: data.avatarUrl,
          robuxBalance: 0,
          redemptions: [],
          createdAt: null,
        });
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch user. Try again.");
      } else {
        setError("Failed to fetch user. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow p-8 flex flex-col gap-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2">Login with Roblox Username</h2>
        <input
          className="rounded-2xl border px-4 py-3 text-lg"
          placeholder="Your Roblox username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-2xl px-4 py-3 bg-green-600 text-white font-bold hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
        <div className="bg-gray-200 rounded-2xl p-3 text-center text-xs">We never ask for your password.</div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
} 