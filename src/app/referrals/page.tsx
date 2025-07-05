"use client";
import React from "react";
import { useState } from "react";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "abc123";
  const referralLink = `https://robuxrewards.com/?ref=${referralCode}`;
  const totalReferrals = 8;
  const robuxFromReferrals = 40;

  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">Referrals</h1>
      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark p-6 w-full flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full">
          <input
            className="px-2 py-1 rounded-2xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-xs flex-1"
            value={referralLink}
            readOnly
            onFocus={e => e.target.select()}
          />
          <button
            onClick={() => {navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 1200);}}
            className="ml-2 px-2 py-1 rounded-2xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition relative"
          >
            {copied ? <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-card-light dark:bg-card-dark text-accent px-2 py-1 rounded shadow-card-light dark:shadow-card-dark text-xs">Copied!</span> : null}
            <span role="img" aria-label="copy">📋</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1 bg-background-light dark:bg-background-dark rounded-2xl p-4 shadow-card-light dark:shadow-card-dark text-center">
            <div className="text-secondary-light dark:text-secondary-dark text-sm mb-1">Total Referrals</div>
            <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">{totalReferrals}</div>
          </div>
          <div className="flex-1 bg-background-light dark:bg-background-dark rounded-2xl p-4 shadow-card-light dark:shadow-card-dark text-center">
            <div className="text-secondary-light dark:text-secondary-dark text-sm mb-1">Robux from Referrals</div>
            <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">{robuxFromReferrals}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 