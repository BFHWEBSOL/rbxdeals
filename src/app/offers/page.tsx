"use client";
import Link from "next/link";

export default function OffersPage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">Offers Center</h1>
      <div className="w-full h-96 bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark flex items-center justify-center text-secondary-light dark:text-secondary-dark text-lg mb-4">
        <span>Offerwall iframe placeholder</span>
      </div>
      <p className="text-secondary-light dark:text-secondary-dark text-center">Complete offers to earn Robux!</p>
      <Link href="/dashboard" className="px-6 py-2 rounded-2xl bg-accent text-white font-semibold hover:opacity-90 transition">Back to Dashboard</Link>
    </div>
  );
} 