"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "../context/SessionContext";

const CLOUD_FUNCTION_URL = "https://us-central1-speed-camera-50eee.cloudfunctions.net/getRobloxUser";

type Blog = { title: string; date: string; desc: string };
type Faq = { q: string; a: string };

const blogs: Blog[] = [
  {
    title: "How to Get Free Robux in 2025",
    date: "2 months ago",
    desc: "Discover the latest, safest ways to earn Robux for free on Robuminer!",
  },
  {
    title: "Dress to Impress Roblox: Tips and Style",
    date: "1 month ago",
    desc: "Level up your Roblox avatar with these pro styling tips.",
  },
  {
    title: "How to Apply for the IKEA Roblox Job",
    date: "3 weeks ago",
    desc: "Step-by-step guide to landing the viral IKEA Roblox job!",
  },
  {
    title: "Claim Robux on Robuminer Events",
    date: "5 days ago",
    desc: "Don't miss out on our latest events and giveaways!",
  },
];

const faqs: Faq[] = [
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

export default function RobuminerLanding() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [robloxUser, setRobloxUser] = useState<null | {
    username: string;
    userId: string | number;
    displayName: string;
    avatarUrl: string;
  }>(null);
  const { user, setUser } = useSession();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen w-full font-sans bg-main-bg-light text-primary-text-light">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 w-full bg-[#f8f8f8] border-b border-border-light transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-tight select-none">
            <span>Robuminer</span>
          </div>
          {/* Nav Links */}
          <nav className="hidden md:flex gap-8 text-base font-medium">
            <a href="#hero" className="hover:text-accent transition">Earn Robux</a>
            <a href="#faq" className="hover:text-accent transition">Help</a>
            <a href="#blogs" className="hover:text-accent transition">Blog</a>
          </nav>
          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* User Avatar + Balance */}
            {user ? (
              <div className="flex items-center gap-3 relative h-14">
                <div
                  className={`h-14 w-14 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all duration-150 border-accent bg-[#f8f8f8] hover:scale-110 ${dropdownOpen ? "border-accent scale-105" : ""}`}
                  onClick={() => setDropdownOpen((open) => !open)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  style={{ boxSizing: 'border-box' }}
                >
                  <img src={user?.avatarUrl || "/avatar-placeholder.png"} alt="User avatar" className="w-12 h-12 rounded-lg object-cover transition-transform duration-150" />
                </div>
                <div className="h-14 flex items-center gap-1 px-6 rounded-xl border font-bold text-lg min-w-[90px] justify-center bg-card-bg-light border-accent text-accent"
                  style={{ boxSizing: 'border-box' }}
                >
                  <span>{typeof user?.robuxBalance === 'number' ? user.robuxBalance : '0.5'}</span>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2"/>
                    <rect x="8" y="8" width="8" height="8" rx="2" fill="#10a37f"/>
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">R$</text>
                  </svg>
                </div>
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute top-14 left-0 z-50 w-48 rounded-xl shadow-lg bg-[#f8f8f8] text-primary-text-light py-2 flex flex-col gap-1 animate-fade-in"
                    tabIndex={-1}
                  >
                    <button className="text-left px-4 py-2 hover:bg-hover-dark rounded-lg transition" onClick={() => setDropdownOpen(false)}>Profile</button>
                    <button className="text-left px-4 py-2 hover:bg-hover-dark rounded-lg transition" onClick={() => setDropdownOpen(false)}>Offer history</button>
                    <button className="text-left px-4 py-2 hover:bg-hover-dark rounded-lg transition" onClick={() => setDropdownOpen(false)}>Withdraw history</button>
                    <button className="text-left px-4 py-2 hover:bg-hover-dark rounded-lg transition text-red-400" onClick={() => { setUser(null); setDropdownOpen(false); }}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-xl font-bold text-base shadow transition"
                onClick={() => setModalOpen(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-16 gap-8">
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Earn free <span className="text-accent">ROBUX</span> by doing easy tasks
          </h1>
          <p className="text-lg mb-8 max-w-xl">
            Watch videos, play games and fill in short surveys to be rewarded with Robux — withdraw instantly!
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-bold text-lg shadow transition"
              onClick={() => {
                if (user) {
                  router.push("/dashboard");
                } else {
                  setModalOpen(true);
                }
              }}
            >
              Start Earning
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src="/images/robux-coins.png" alt="Robux coins" className="w-72 md:w-96 rounded-xl shadow-lg" />
        </div>
      </section>

      {/* How You Can Earn Robux */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16" id="earn">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">How You Can Earn Free Robux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="rounded-2xl p-6 flex flex-col items-center text-center shadow-lg bg-card-bg-light">
            <span className="text-4xl mb-3">🛡️</span>
            <div className="font-bold text-lg mb-1">Complete easy tasks</div>
            <div className="text-sm text-gray-400">Surveys, mobile games</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-center text-center shadow-lg bg-card-bg-light">
            <span className="text-4xl mb-3">🏷️</span>
            <div className="font-bold text-lg mb-1">Redeem promocodes</div>
            <div className="text-sm text-gray-400">Get bonus Robux from promo codes</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-center text-center shadow-lg bg-card-bg-light">
            <span className="text-4xl mb-3">💸</span>
            <div className="font-bold text-lg mb-1">Withdraw your Robux</div>
            <div className="text-sm text-gray-400">Minimum withdrawal after 5–7 Robux via game pass/private server</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-center text-center shadow-lg bg-card-bg-light">
            <span className="text-4xl mb-3">🎁</span>
            <div className="font-bold text-lg mb-1">Enjoy more rewards</div>
            <div className="text-sm text-gray-400">Level-up bonuses, events, giveaways</div>
          </div>
        </div>
      </section>

      {/* Blogs, Guides & Chatter */}
      <section id="blogs" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Blogs, Guides & Chatter</h2>
          <a href="#" className="text-accent hover:underline font-semibold">View All Blogs →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="rounded-2xl p-6 shadow-lg flex flex-col gap-2 bg-card-bg-light">
              <div className="font-bold text-lg mb-1">{blog.title}</div>
              <div className="text-xs text-gray-400 mb-2">{blog.date}</div>
              <div className="text-sm text-gray-300">{blog.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-4xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">FAQ</h2>
        <div className="rounded-2xl shadow-lg">
          {faqs.map((faq, i) => (
            <div key={i} className="mb-2 bg-transparent">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold focus:outline-none transition bg-transparent"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                aria-expanded={faqOpen === i}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-accent text-2xl">{faqOpen === i ? "−" : "+"}</span>
              </button>
              <div
                className={`px-6 pb-4 text-sm text-gray-300 transition-all duration-200 ease-in-out ${faqOpen === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                style={{ transitionProperty: 'max-height, opacity' }}
              >
                {faqOpen === i && <div>{faq.a}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-main-bg-light text-gray-700 pt-12 pb-6 px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-2xl font-extrabold tracking-tight select-none">
              <span>Robuminer</span>
            </div>
            <div className="max-w-xs text-sm">
              Robuminer makes earning free Robux fun, fast, and fair. Complete simple offers and redeem instantly.
            </div>
            <div className="flex gap-4 mt-2">
              {/* Social icons (placeholder links) */}
              <a href="#" aria-label="TikTok" className="hover:text-accent"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2v14.25a2.25 2.25 0 11-2.25-2.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M16.5 2a4.5 4.5 0 004.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></a>
              <a href="#" aria-label="Instagram" className="hover:text-accent"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
              <a href="#" aria-label="YouTube" className="hover:text-accent"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6z"/><rect x="3" y="5" width="18" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/></svg></a>
              <a href="#" aria-label="Discord" className="hover:text-accent"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369A19.791 19.791 0 0016.885 3.2a.117.117 0 00-.124.06c-.543.96-1.146 2.22-1.573 3.22a18.726 18.726 0 00-5.376 0c-.427-1-1.03-2.26-1.573-3.22a.117.117 0 00-.124-.06A19.791 19.791 0 003.683 4.369a.105.105 0 00-.047.043C.533 9.043-.32 13.579.099 18.057a.12.12 0 00.045.082c1.9 1.387 3.743 2.223 5.585 2.773a.116.116 0 00.127-.043c.43-.594.812-1.22 1.142-1.877a.112.112 0 00-.062-.155c-.627-.237-1.223-.53-1.803-.868a.117.117 0 01-.012-.194c.121-.09.242-.18.36-.27a.115.115 0 01.12-.01c3.781 1.728 7.87 1.728 11.627 0a.115.115 0 01.12.01c.119.09.239.18.36.27a.117.117 0 01-.012.194c-.58.338-1.176.631-1.803.868a.112.112 0 00-.062.155c.33.657.712 1.283 1.142 1.877a.116.116 0 00.127.043c1.842-.55 3.685-1.386 5.585-2.773a.12.12 0 00.045-.082c.5-5.177-.838-9.713-3.537-13.645a.105.105 0 00-.047-.043z"/></svg></a>
              <a href="#" aria-label="Twitter" className="hover:text-accent"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.69.11 1.02C7.69 5.4 4.07 3.6 1.64.96c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.18 3.01 4.1 3.05A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.36 0 12.94-6.93 12.94-12.94 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg></a>
            </div>
          </div>
          {/* Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="font-bold mb-2">Ways to Earn</div>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-accent">Offerwalls</a></li>
                <li><a href="#" className="hover:text-accent">Promocodes</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Blogs & Guides</div>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-accent">All Blogs</a></li>
                <li><a href="#" className="hover:text-accent">now.gg Guides</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Help</div>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-accent">Help Center</a></li>
                <li><a href="#" className="hover:text-accent">Missing Robux?</a></li>
                <li><a href="#" className="hover:text-accent">Withdraw Guide</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Legal</div>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-xs text-center mt-8 opacity-70">
          ©2025 Robuminer. All rights reserved. Not affiliated with ROBLOX Corporation.
        </div>
      </footer>

      {/* Modal for Roblox username signup/login */}
      {modalOpen && !showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="rounded-2xl p-8 w-full max-w-md shadow-xl relative mx-2 bg-[#f8f8f8]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Enter your Roblox username</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                if (!username.trim()) {
                  setError("Please enter your Roblox username.");
                  return;
                }
                setLoading(true);
                try {
                  const res = await fetch(`${CLOUD_FUNCTION_URL}?username=${encodeURIComponent(username.trim())}`);
                  const data = await res.json();
                  if (data.error) throw new Error(data.error);
                  // Check Firestore for user existence
                  const userRef = doc(db, "users", String(data.userId));
                  const userSnap = await getDoc(userRef);
                  if (userSnap.exists()) {
                    // User exists: set user and close modal immediately
                    const userDoc = userSnap.data();
                    setUser({
                      userId: String(userDoc.userId),
                      username: userDoc.username,
                      avatarUrl: userDoc.avatarUrl,
                      robuxBalance: userDoc.robuxBalance,
                      redemptions: userDoc.redemptions || [],
                      createdAt: userDoc.createdAt,
                    });
                    setModalOpen(false);
                    setShowConfirm(false);
                    router.push("/dashboard");
                  } else {
                    // User does not exist: show confirmation
                    setRobloxUser(data);
                    setShowConfirm(true);
                  }
                } catch (err: unknown) {
                  if (err instanceof Error) {
                    setError(err.message || "Failed to fetch user. Try again.");
                  } else {
                    setError("Failed to fetch user. Try again.");
                  }
                } finally {
                  setLoading(false);
                }
              }}
              className="flex flex-col gap-4"
            >
              <input
                className="rounded-xl border px-4 py-3 text-lg focus:outline-none focus:ring-2 border-border-light bg-card-bg-light text-primary-text-light focus:ring-accent"
                placeholder="Roblox username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-3 bg-accent text-white font-bold hover:bg-accent-hover transition w-full"
                disabled={loading}
              >
                {loading ? "Checking..." : "Continue"}
              </button>
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Popup */}
      {modalOpen && showConfirm && robloxUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="rounded-2xl p-8 w-full max-w-xs shadow-xl relative mx-2 flex flex-col items-center bg-[#f8f8f8]">
            <img src={robloxUser.avatarUrl} alt="Roblox avatar" className="w-28 h-28 rounded-full mb-4" />
            <div className="text-xl font-bold mb-1">@{robloxUser.username}</div>
            <div className="text-gray-400 mb-6">Is this you?</div>
            <div className="flex gap-4 w-full">
              <button
                className="flex-1 rounded-xl px-0 py-3 bg-accent text-white font-bold text-lg border-2 border-accent hover:bg-accent-hover transition focus:outline-none"
                onClick={() => {
                  setUser({
                    userId: String(robloxUser.userId),
                    username: robloxUser.username,
                    avatarUrl: robloxUser.avatarUrl,
                    robuxBalance: 0,
                    redemptions: [],
                    createdAt: null,
                  });
                  setShowConfirm(false);
                  setModalOpen(false);
                  router.push("/dashboard");
                }}
              >
                Yes
              </button>
              <button
                className="flex-1 rounded-xl px-0 py-3 bg-red-400 text-white font-bold text-lg border-2 border-red-400 hover:bg-red-500 transition focus:outline-none"
                onClick={() => {
                  setShowConfirm(false);
                  setRobloxUser(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
