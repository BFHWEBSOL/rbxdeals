"use client";
import React, { useState } from "react";
import Link from "next/link";

const offerwalls = [
  { name: "TOROX", url: "https://torox.com/yourwall?subid=USER_ID" },
  { name: "AYE STUDIOS", url: "https://ayestudios.com/yourwall?subid=USER_ID" },
  { name: "Bitlabs Offers", url: "https://yourbitlabsurl.com?subid=USER_ID" },
  { name: "AdGateMedia", url: "https://adgatemedia.com/yourwall?subid=USER_ID" },
  { name: "Lootably", url: "https://lootably.com/yourwall?subid=USER_ID" },
  { name: "CPAlead", url: "https://cdnnd.com/list/Fh5A?subid=USER_ID" }, // CPAlead added
];

export default function OffersPage() {
  // TODO: Replace with actual user ID from session/context
  const userId = "1239044529";
  const [selected, setSelected] = useState(offerwalls[0].name);

  const selectedWall = offerwalls.find(w => w.name === selected) || offerwalls[0];

  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">Offerwalls</h1>
      <p className="mb-4 text-secondary-light dark:text-secondary-dark text-center">
        Complete offers or watch videos to get robux!
      </p>
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        {offerwalls.map(wall => (
          <button
            key={wall.name}
            className={`rounded-xl px-6 py-4 font-bold w-full ${selected === wall.name ? "bg-accent text-white" : "bg-card-light dark:bg-card-dark text-secondary-light dark:text-secondary-dark"}`}
            onClick={() => setSelected(wall.name)}
          >
            {wall.name}
          </button>
        ))}
      </div>
      <div className="w-full h-96 bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark flex items-center justify-center text-secondary-light dark:text-secondary-dark text-lg mb-4">
        <iframe
          sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
          src={selectedWall.url.replace("USER_ID", userId)}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "1rem" }}
          frameBorder="0"
          title={selectedWall.name + " Offer Wall"}
        ></iframe>
      </div>
      <Link href="/dashboard" className="px-6 py-2 rounded-2xl bg-accent text-white font-semibold hover:opacity-90 transition">Back to Dashboard</Link>
    </div>
  );
} 