"use client";
import React from "react";
import Link from "next/link";

export default function OffersPage() {
  // TODO: Replace with actual user ID from session/context
  const userId = "1239044529";
  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">Offerwall</h1>
      <p className="mb-4 text-secondary-light dark:text-secondary-dark text-center">
        Complete offers or watch videos to get robux!
      </p>
      <div className="w-full h-96 bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark flex items-center justify-center text-secondary-light dark:text-secondary-dark text-lg mb-4">
        <iframe
          sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
          src={`https://cdnnd.com/list/Fh5A?subid=${userId}`}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "1rem" }}
          frameBorder="0"
          title="CPAlead Offer Wall"
        ></iframe>
      </div>
      <Link href="/dashboard" className="px-6 py-2 rounded-2xl bg-accent text-white font-semibold hover:opacity-90 transition">Back to Dashboard</Link>
    </div>
  );
} 