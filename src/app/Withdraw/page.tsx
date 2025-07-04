"use client";
import React from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {
  const { user, mounted } = useSession();
  const router = useRouter();
  React.useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  if (!mounted || !user) return null;
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#23272e]">
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border border-[#e5e7eb]">
          <h2 className="text-3xl font-bold mb-6 text-[#23272e]">Withdraw robux</h2>
          <div className="bg-[#f3f4f6] rounded-xl p-6 mb-6 flex flex-col gap-6 border border-[#e5e7eb]">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="text-gray-400 text-sm mb-1">Your balance:</div>
              <div className="text-2xl font-bold text-green-400 flex items-center gap-1">{user.robuxBalance} <svg width='20' height='20' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='#10a37f' strokeWidth='2'/><rect x='8' y='8' width='8' height='8' rx='2' fill='#10a37f'/></svg></div>
            </div>
            <div className="mb-2">
              <div className="text-gray-400 text-sm mb-1">Select game</div>
              <div className="flex items-center bg-[#f3f4f6] rounded-xl px-4 py-3 mb-2 border border-[#e5e7eb]">
                <img src="/images/robux-coins.png" alt="Game" className="w-10 h-10 rounded-lg mr-4" />
                <span className="text-lg text-[#23272e] font-medium">salakkaaz&apos;s Place</span>
                <button className="ml-auto text-green-400 hover:underline text-sm font-semibold" onClick={() => {}}>Create new game</button>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-gray-400 text-sm mb-1">How much would you like to withdraw?</div>
              <div className="text-xs text-gray-500 mb-2">Between 5 and 1500</div>
              <input type="number" min={5} max={1500} className="w-full rounded-xl px-4 py-3 bg-white text-[#202123] border border-[#e5e7eb] text-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-800 border rounded-lg px-4 py-3 text-sm">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2"/><rect x="8" y="8" width="8" height="8" rx="2" fill="#10a37f"/></svg>
                We pay the roblox creator tax (30%) for you! That&apos;s why we will expect to find a pass with the value as price in the selected server.
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 border-yellow-200 text-yellow-800 border rounded-lg px-4 py-3 text-sm">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fbbf24" strokeWidth="2"/><rect x="8" y="8" width="8" height="8" rx="2" fill="#fbbf24"/></svg>
                Make sure to turn off &quot;Regional Price&quot; when creating a gamepass for withdrawing!
              </div>
            </div>
            <button className="mt-8 w-full rounded-xl font-bold text-lg py-4 transition bg-[#10a37f] hover:bg-green-700 text-white">Redeem</button>
          </div>
        </div>
      </main>
      <footer className="bg-[#F7F7F8] border-[#D9D9E3] border-t px-8 py-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-2xl font-extrabold tracking-tight select-none">
              <span>Robuminer</span>
            </div>
            <div className="max-w-xs text-sm">
              Robuminer strives to build a fun and easy experience of getting free Robux. We do this by rewarding consistent and honest users with a lot of bonuses, promocodes and events.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 