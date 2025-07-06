"use client";
import React from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OffersPage() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const offers = [
    {
      id: 1,
      title: "Complete Survey",
      description: "Answer a 5-minute survey about gaming",
      reward: 25,
      time: "5 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Watch Video",
      description: "Watch a 30-second video ad",
      reward: 5,
      time: "30 sec",
      difficulty: "Very Easy"
    },
    {
      id: 3,
      title: "Download App",
      description: "Download and try a mobile game",
      reward: 50,
      time: "10 min",
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Sign Up Trial",
      description: "Sign up for a free trial service",
      reward: 100,
      time: "15 min",
      difficulty: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-green-600">{user.robuxBalance} Robux</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Tasks</p>
                <p className="text-2xl font-bold text-purple-600">{offers.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">📋</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {offer.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">⏱️</span>
                    {offer.time}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    +{offer.reward} Robux
                  </div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Start Task
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No more offers message */}
        <div className="text-center mt-12">
          <p className="text-gray-500">More offers coming soon! Check back regularly for new tasks.</p>
        </div>
      </div>
    </div>
  );
} 