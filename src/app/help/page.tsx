"use client";
import React from "react";

const faqs = [
  {
    q: "Is Robuminer legit?",
    a: "Yes! Robuminer is a trusted platform used by thousands of Roblox players. We never ask for your password and use only official payout methods.",
  },
  {
    q: "How does it work?",
    a: "Complete simple tasks, offers, or surveys. Earn Robux for each completed offer, then withdraw instantly!",
  },
  {
    q: "Why can't I see my Robux?",
    a: "Some offers may take a few hours to process. If you're missing Robux, check the Help Center or contact support.",
  },
  {
    q: "Do I need my password?",
    a: "No! You only need your Roblox username. Never share your password with anyone.",
  },
  {
    q: "How do I withdraw?",
    a: "Go to the Withdraw page, follow the instructions for group payout or game pass/private server payout.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Help Center</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-2">{faq.q}</h2>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 