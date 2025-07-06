"use client";
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WithdrawPage() {
  const { user } = useSession();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("group");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setUsername(user.username);
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const withdrawalMethods = [
    {
      id: "group",
      title: "Group Payout",
      description: "Get paid through a Roblox group",
      minAmount: 5,
      fee: 0,
      icon: "👥"
    },
    {
      id: "gamepass",
      title: "Game Pass / Private Server",
      description: "Purchase a game pass or private server",
      minAmount: 7,
      fee: 0,
      icon: "🎮"
    }
  ];

  const handleWithdraw = async () => {
    if (!amount || !username) return;
    
    const numAmount = parseFloat(amount);
    const method = withdrawalMethods.find(m => m.id === selectedMethod);
    
    if (numAmount < method!.minAmount) {
      alert(`Minimum withdrawal amount is ${method!.minAmount} Robux`);
      return;
    }
    
    if (numAmount > user.robuxBalance) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert("Withdrawal request submitted! You'll receive your Robux within 24 hours.");
      setLoading(false);
      setAmount("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Available Balance</h2>
              <p className="text-3xl font-bold text-green-600">{user.robuxBalance} Robux</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Withdrawal Method</h2>
          
          {/* Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {withdrawalMethods.map((method) => (
              <div
                key={method.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Min: {method.minAmount} Robux • Fee: {method.fee}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (Robux)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min={withdrawalMethods.find(m => m.id === selectedMethod)?.minAmount}
              max={user.robuxBalance}
            />
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roblox Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Roblox username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={loading || !amount || !username}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Processing..." : "Withdraw Robux"}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Withdrawals are processed within 24 hours</li>
              <li>• Make sure your username is correct</li>
              <li>• You must have the minimum amount required</li>
              <li>• Contact support if you have any issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 