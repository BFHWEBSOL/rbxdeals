"use client";
import React from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";

export default function EarnPage() {
  const { user, mounted } = useSession();
  const router = useRouter();
  React.useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  if (!mounted || !user) return null;
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#23272e]">
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 py-4 border-b bg-[#f8f8f8] border-[#D9D9E3] w-full">
        <div className="text-2xl font-extrabold tracking-tight select-none mb-2 sm:mb-0">
          <span>Robuminer</span>
        </div>
      </header>
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <section className="bg-[#F7F7F8] rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border border-[#D9D9E3]" style={{ width: '100%', maxWidth: 700 }}>
          <h2 className="text-2xl font-bold mb-4 text-[#000000]">Tasks</h2>
          <p className="text-[#6E6E80] mb-4">Complete offers or watch videos to get robux!</p>
          <div className="w-full h-96 bg-white rounded-2xl shadow-card-light flex items-center justify-center text-secondary-light text-lg mb-4">
            <iframe
              sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
              src={`https://cdnnd.com/list/Fh5A?subid=${user.userId}`}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "1rem" }}
              frameBorder="0"
              title="CPAlead Offer Wall"
            ></iframe>
          </div>
        </section>
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