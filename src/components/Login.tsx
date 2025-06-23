"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // 1. Get Roblox user data from Cloud Function
      const res = await fetch(`${CLOUD_FUNCTION_URL}?username=${encodeURIComponent(username)}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const userId = data.userId;
      const avatarUrl = data.avatarUrl;
      const robloxUsername = data.username;
      // 2. Check Firestore for user
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      let userDoc: import("../context/SessionContext").UserSession;
      if (userSnap.exists()) {
        const d = userSnap.data();
        userDoc = {
          userId: typeof d.userId === "string" ? d.userId : "",
          username: typeof d.username === "string" ? d.username : "",
          avatarUrl: typeof d.avatarUrl === "string" ? d.avatarUrl : "",
          robuxBalance: typeof d.robuxBalance === "number" ? d.robuxBalance : 0,
          tasksCompleted: typeof d.tasksCompleted === "number" ? d.tasksCompleted : 0,
        };
      } else {
        userDoc = {
          userId,
          username: robloxUsername,
          avatarUrl,
          createdAt: serverTimestamp(), // not in UserSession, but ok for Firestore
          robuxBalance: 0,
          tasksCompleted: 0,
        } as any;
        await setDoc(userRef, userDoc);
      }
      // 3. Set session and navigate
      setUser(userDoc);
      try {
        if (typeof "/dashboard" === "string") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } catch (navErr) {
        console.error("Navigation error:", navErr);
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

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