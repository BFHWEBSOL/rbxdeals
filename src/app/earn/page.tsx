"use client";
import React from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";

export default function EarnPage() {
  const { user } = useSession();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#23272e] p-4">
      <div className="w-full max-w-xl bg-[#F7F7F8] rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border border-[#D9D9E3]">
        <h2 className="text-2xl font-bold mb-4 text-[#000000]">Earn Robux</h2>
        <div className="w-full h-96 bg-white rounded-2xl shadow-card-light flex items-center justify-center text-secondary-light text-lg mb-4">
          <iframe
            sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
            src={`https://cdnnd.com/list/Fh5A?subid=${user.userId}`}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "1rem" }}
            frameBorder="0"
            title="CPAlead Offer Wall"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
