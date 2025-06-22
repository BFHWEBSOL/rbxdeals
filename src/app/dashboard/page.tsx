"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [redeemAmount, setRedeemAmount] = useState(50);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemError, setRedeemError] = useState("");
  const [redemptions, setRedemptions] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        router.push("/login");
        return;
      }
      const userRef = doc(db, "users", u.uid);
      const userSnap = await getDoc(userRef);
      setUserData(userSnap.data());
      setLoading(false);
      // Fetch redemption history
      const redemptionsRef = collection(db, "users", u.uid, "redemptions");
      const redemptionSnaps = await getDocs(redemptionsRef);
      setRedemptions(redemptionSnaps.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, [router]);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemLoading(true);
    setRedeemError("");
    try {
      if (!user) return;
      if (userData.balance < redeemAmount) throw new Error("Insufficient balance");
      // Add redemption record
      await addDoc(collection(db, "users", user.uid, "redemptions"), {
        amount: redeemAmount,
        createdAt: serverTimestamp(),
      });
      // Update user balance
      await updateDoc(doc(db, "users", user.uid), {
        balance: userData.balance - redeemAmount,
      });
      setUserData({ ...userData, balance: userData.balance - redeemAmount });
      setRedemptions([
        ...redemptions,
        { amount: redeemAmount, createdAt: { seconds: Date.now() / 1000 } },
      ]);
    } catch (err: any) {
      setRedeemError(err.message);
    } finally {
      setRedeemLoading(false);
    }
  };

  if (loading) return <div className="py-16 text-center">Loading...</div>;
  if (!userData) return null;

  const referralLink = `https://robominer.com/?ref=${userData.uid}`;

  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          onClick={() => signOut(auth).then(() => router.push("/login"))}
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Robux Balance: <span className="text-green-600">{userData.balance}</span></div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Referral Link:</span>
          <input
            className="px-2 py-1 rounded border bg-gray-50 dark:bg-gray-800 w-full max-w-xs text-xs"
            value={referralLink}
            readOnly
            onFocus={e => e.target.select()}
          />
        </div>
      </div>
      <button className="px-6 py-3 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition w-full max-w-xs mx-auto">
        Complete Offers
      </button>
      {userData.balance >= 50 && (
        <form onSubmit={handleRedeem} className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <div className="font-semibold">Redeem Robux</div>
          <input
            type="number"
            min={50}
            max={userData.balance}
            value={redeemAmount}
            onChange={e => setRedeemAmount(Number(e.target.value))}
            className="px-2 py-1 rounded border bg-gray-50 dark:bg-gray-700"
            required
          />
          {redeemError && <div className="text-red-500 text-sm">{redeemError}</div>}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            disabled={redeemLoading}
          >
            {redeemLoading ? "Processing..." : "Redeem"}
          </button>
        </form>
      )}
      <div>
        <div className="font-semibold mb-2">Redemption History</div>
        <ul className="space-y-2">
          {redemptions.length === 0 && <li className="text-gray-500 text-sm">No redemptions yet.</li>}
          {redemptions.map((r, i) => (
            <li key={i} className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 flex justify-between items-center text-sm">
              <span>{r.amount} Robux</span>
              <span>{r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleString() : ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 