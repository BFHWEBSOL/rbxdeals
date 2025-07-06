"use client";
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReferralsPage() {
  const { user } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const referralStats = {
    totalReferrals: 8,
    activeReferrals: 5,
    totalEarned: 240,
    pendingEarnings: 45
  };

  const referrals = [
    {
      id: 1,
      username: "GamerPro123",
      joinedDate: "2024-01-15",
      status: "active",
      earnings: 30
    },
    {
      id: 2,
      username: "RobloxFan2024",
      joinedDate: "2024-01-20",
      status: "active",
      earnings: 25
    },
    {
      id: 3,
      username: "VirtualWorld",
      joinedDate: "2024-01-25",
      status: "inactive",
      earnings: 15
    }
  ];

  const referralLink = `https://robuminer.com/ref/${user.username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Referrals</p>
                <p className="text-2xl font-bold text-green-600">{referralStats.activeReferrals}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-purple-600">{referralStats.totalEarned} Robux</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{referralStats.pendingEarnings} Robux</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Referral Link</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this link with your friends. You&apos;ll earn 10 Robux for each friend who signs up and completes their first task!
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Share Your Link</h3>
              <p className="text-sm text-gray-600">Copy and share your unique referral link with friends</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Friend Signs Up</h3>
              <p className="text-sm text-gray-600">Your friend creates an account using your link</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Earn Rewards</h3>
              <p className="text-sm text-gray-600">Get 10 Robux when they complete their first task</p>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Referrals</h2>
          {referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{referral.username}</td>
                      <td className="py-3 px-4 text-gray-600">{referral.joinedDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-green-600">{referral.earnings} Robux</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No referrals yet. Share your link to start earning!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 