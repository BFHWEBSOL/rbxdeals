"use client";
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";

function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark"
  );
  React.useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

const sidebarLinks = [
  { label: "Earn Robux", icon: "💰" },
  { label: "Withdraw", icon: "⬇️" },
];

export default function Dashboard() {
  const { user, setUser, mounted } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [activeTab, setActiveTab] = useState("Earn Robux");
  const [theme, setTheme] = useTheme();
  React.useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  if (!mounted) return null;
  if (!user) return null;

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#343541]' : 'bg-[#FFFFFF]'} text-white`}>
      {/* Sidebar */}
      <aside className={`w-64 min-h-screen flex flex-col py-8 px-4 border-r ${theme === 'dark' ? 'bg-[#202123] border-[#3E3F4B]' : 'bg-[#F7F7F8] border-[#D9D9E3]'}`}>
        <div className="text-2xl font-extrabold tracking-tight mb-10 select-none">
          <span>RBX</span><span style={{ color: '#10a37f' }}>Deals</span>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-lg font-medium mb-2
                ${activeTab === link.label
                  ? `${theme === 'dark' ? 'border-2 border-[#10A37F] bg-[#202123] text-[#10A37F]' : 'border-2 border-[#10A37F] bg-[#F7F7F8] text-[#10A37F] shadow-[0_0_0_2px_#10A37F]'}`
                  : `${theme === 'dark' ? 'text-[#8E8EA0] hover:bg-[#2A2B32]' : 'text-[#6E6E80] hover:bg-[#E7E7E9]'}`}
              `}
              onClick={() => {
                setActiveTab(link.label);
                if (link.label === "Withdraw") setShowWithdraw(true);
                else setShowWithdraw(false);
              }}
              style={activeTab === link.label ? { boxShadow: "0 0 0 2px #7dd3fc" } : {}}
            >
              <span className={`text-xl ${activeTab === link.label ? 'text-[#10A37F]' : theme === 'dark' ? 'text-[#8E8EA0]' : 'text-[#6E6E80]'}`}>{link.icon}</span>
              <span className={activeTab === link.label ? "font-bold" : ""}>{link.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen ${theme === 'dark' ? 'bg-[#343541]' : 'bg-[#FFFFFF]'}`}>
        {/* Header */}
        <header className={`flex items-center justify-between px-8 py-4 border-b ${theme === 'dark' ? 'bg-[#343541] border-[#3E3F4B]' : 'bg-[#FFFFFF] border-[#D9D9E3]'}`}>
          <div className="text-2xl font-extrabold tracking-tight select-none">
            <span>RBX</span><span style={{ color: '#10a37f' }}>Deals</span>
          </div>
          <div className="flex items-center gap-4">
            <select className="h-12 min-w-[120px] rounded-xl px-4 py-2 bg-transparent border text-base font-medium appearance-none focus:outline-none border-[#343541] text-white">
              <option>English</option>
            </select>
            <div className="h-12 w-px bg-[#343541] mx-2 hidden md:block" />
            <div className="flex items-center gap-3 relative">
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-xl border-2 border-[#10a37f] bg-[#23272F] cursor-pointer hover:scale-110 transition-all duration-150 ${dropdownOpen ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setDropdownOpen((open) => !open)}
                tabIndex={0}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                style={{ boxSizing: 'border-box' }}
              >
                <img src={user.avatarUrl} alt="User avatar" className="w-10 h-10 rounded-lg object-cover" />
              </div>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className={`absolute top-14 left-0 z-50 w-56 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-[#282a36] text-white' : 'bg-white text-[#202123]'} py-2 flex flex-col gap-1 animate-fade-in`} tabIndex={-1}>
                  <button className="text-left px-5 py-3 text-lg hover:bg-[#23272F] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Profile</button>
                  <button className="text-left px-5 py-3 text-lg hover:bg-[#23272F] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Offer history</button>
                  <button className="text-left px-5 py-3 text-lg hover:bg-[#23272F] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Withdraw history</button>
                  <button className="text-left px-5 py-3 text-lg hover:bg-[#23272F] rounded-lg transition text-red-400" onClick={() => { setUser(null); setDropdownOpen(false); }}>Sign out</button>
                </div>
              )}
              <div className={`h-12 flex items-center gap-1 px-6 rounded-xl border font-bold text-lg min-w-[90px] justify-center ${theme === 'dark' ? 'bg-[#202123] border-[#3E3F4B] text-[#10A37F]' : 'bg-[#F7F7F8] border-[#10A37F] text-[#10A37F]'}`}>
                <span>{typeof user.robuxBalance === 'number' ? user.robuxBalance : '0.5'}</span>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2"/>
                  <rect x="8" y="8" width="8" height="8" rx="2" fill="#10a37f"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">R$</text>
                </svg>
              </div>
            </div>
            <button
              aria-label="Toggle theme"
              className="rounded-lg p-2 ml-4 hover:bg-[#343541] transition"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
              )}
            </button>
          </div>
        </header>
        {/* Main Sections */}
        {activeTab === "Earn Robux" && (
          <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Offerwalls */}
            <section className={`${theme === 'dark' ? 'bg-[#202123]' : 'bg-[#F7F7F8]'} rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border ${theme === 'dark' ? 'border-[#3E3F4B]' : 'border-[#D9D9E3]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#ECECF1]' : 'text-[#000000]'}`}>Offerwalls</h2>
              </div>
              <div className={`${theme === 'dark' ? 'text-[#8E8EA0]' : 'text-[#6E6E80]'} mb-4`}>Complete offers or watch videos to get robux!</div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>TOROX</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>AYE STUDIOS</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Bitlabs Offers</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>AdGateMedia</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Lootably</div>
              </div>
            </section>
            {/* Surveys */}
            <section className={`${theme === 'dark' ? 'bg-[#202123]' : 'bg-[#F7F7F8]'} rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border ${theme === 'dark' ? 'border-[#3E3F4B]' : 'border-[#D9D9E3]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#ECECF1]' : 'text-[#000000]'}`}>Surveys</h2>
              </div>
              <div className={`${theme === 'dark' ? 'text-[#8E8EA0]' : 'text-[#6E6E80]'} mb-4`}>Answer and complete surveys to get robux!</div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Bitlabs</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Prime Surveys</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>CPX RESEARCH</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>theoremreach</div>
              </div>
            </section>
            {/* Tasks */}
            <section className={`${theme === 'dark' ? 'bg-[#202123]' : 'bg-[#F7F7F8]'} rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border ${theme === 'dark' ? 'border-[#3E3F4B]' : 'border-[#D9D9E3]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#ECECF1]' : 'text-[#000000]'}`}>Tasks</h2>
              </div>
              <div className={`${theme === 'dark' ? 'text-[#8E8EA0]' : 'text-[#6E6E80]'} mb-4`}>Follow our social media accounts for some free robux!</div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Discord</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Instagram <span className="ml-2 text-xs bg-blue-900 text-blue-400 px-2 py-1 rounded-lg">NEW</span></div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Twitter/X</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Instagram</div>
                <div className={`${theme === 'dark' ? 'bg-[#2A2B32] text-[#ECECF1] border border-[#3E3F4B]' : 'bg-[#FFFFFF] border border-[#10A37F] text-[#10A37F]'} rounded-xl flex items-center justify-center p-4 font-bold text-lg hover:bg-[#10A37F] hover:text-white transition`}>Twitter/X</div>
              </div>
            </section>
          </main>
        )}
        {showWithdraw && activeTab === "Withdraw" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className={`${theme === 'dark' ? 'bg-[#23272F]' : 'bg-white'} rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border ${theme === 'dark' ? 'border-[#343541]' : 'border-[#e5e7eb]'}`}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl" onClick={() => setShowWithdraw(false)}>&times;</button>
              <h2 className="text-3xl font-bold mb-6 text-white">Withdraw robux</h2>
              <div className={`${theme === 'dark' ? 'bg-[#202123]' : 'bg-[#f3f4f6]'} rounded-xl p-6 mb-6 flex flex-col gap-6 border ${theme === 'dark' ? 'border-[#343541]' : 'border-[#e5e7eb]'}`}>
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="text-gray-400 text-sm mb-1">Your balance:</div>
                  <div className="text-2xl font-bold text-green-400 flex items-center gap-1">{user.robuxBalance} <svg width='20' height='20' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='#10a37f' strokeWidth='2'/><rect x='8' y='8' width='8' height='8' rx='2' fill='#10a37f'/></svg></div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-400 text-sm mb-1">Select game</div>
                  <div className={`flex items-center ${theme === 'dark' ? 'bg-[#282a36]' : 'bg-[#f3f4f6]'} rounded-xl px-4 py-3 mb-2 border ${theme === 'dark' ? 'border-[#343541]' : 'border-[#e5e7eb]'}`}>
                    <img src="/images/robux-coins.png" alt="Game" className="w-10 h-10 rounded-lg mr-4" />
                    <span className="text-lg text-white font-medium">salakkaaz&apos;s Place</span>
                    <button className="ml-auto text-green-400 hover:underline text-sm font-semibold" onClick={() => {}}>Create new game</button>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-gray-400 text-sm mb-1">How much would you like to withdraw?</div>
                  <div className="text-xs text-gray-500 mb-2">Between 5 and 1500</div>
                  <input type="number" min={5} max={1500} className={`w-full rounded-xl px-4 py-3 ${theme === 'dark' ? 'bg-[#181A20] text-white' : 'bg-white text-[#202123]'} border ${theme === 'dark' ? 'border-[#343541]' : 'border-[#e5e7eb]'} text-lg focus:outline-none focus:ring-2 focus:ring-green-400`} placeholder="" />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-[#232b36] border-[#2e3742] text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-800'} border rounded-lg px-4 py-3 text-sm`}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2"/><rect x="8" y="8" width="8" height="8" rx="2" fill="#10a37f"/></svg>
                    We pay the roblox creator tax (30%) for you! That&apos;s why we will expect to find a pass with the value as price in the selected server.
                  </div>
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-[#2e2620] border-[#bfa76a] text-yellow-200' : 'bg-yellow-50 border-yellow-200 text-yellow-800'} border rounded-lg px-4 py-3 text-sm`}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fbbf24" strokeWidth="2"/><rect x="8" y="8" width="8" height="8" rx="2" fill="#fbbf24"/></svg>
                    Make sure to turn off &quot;Regional Price&quot; when creating a gamepass for withdrawing!
                  </div>
                </div>
                <button className={`mt-8 w-full rounded-xl font-bold text-lg py-4 transition ${theme === 'dark' ? 'bg-[#10a37f] hover:bg-green-700 text-white' : 'bg-[#10a37f] hover:bg-green-700 text-white'}`}>Redeem</button>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className={`${theme === 'dark' ? 'bg-[#202123] border-[#3E3F4B]' : 'bg-[#F7F7F8] border-[#D9D9E3]'} border-t px-8 py-8 mt-8`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div className="text-2xl font-extrabold tracking-tight select-none">
                <span>RBX</span><span style={{ color: '#10a37f' }}>Deals</span>
              </div>
              <div className="max-w-xs text-sm">
                RBXDeals strives to build a fun and easy experience of getting free Robux. We do this by rewarding consistent and honest users with a lot of bonuses, promocodes and events.
              </div>
              <div className="flex gap-4 mt-2">
                {/* Social icons (placeholder links) */}
                <a href="#" aria-label="TikTok" className="hover:text-green-400"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2v14.25a2.25 2.25 0 11-2.25-2.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M16.5 2a4.5 4.5 0 004.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></a>
                <a href="#" aria-label="Instagram" className="hover:text-green-400"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
                <a href="#" aria-label="YouTube" className="hover:text-green-400"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6z"/><rect x="3" y="5" width="18" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/></svg></a>
                <a href="#" aria-label="Discord" className="hover:text-green-400"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369A19.791 19.791 0 0016.885 3.2a.117.117 0 00-.124.06c-.543.96-1.146 2.22-1.573 3.22a18.726 18.726 0 00-5.376 0c-.427-1-1.03-2.26-1.573-3.22a.117.117 0 00-.124-.06A19.791 19.791 0 003.683 4.369a.105.105 0 00-.047.043C.533 9.043-.32 13.579.099 18.057a.12.12 0 00.045.082c1.9 1.387 3.743 2.223 5.585 2.773a.116.116 0 00.127-.043c.43-.594.812-1.22 1.142-1.877a.112.112 0 00-.062-.155c-.627-.237-1.223-.53-1.803-.868a.117.117 0 01-.012-.194c.121-.09.242-.18.36-.27a.115.115 0 01.12-.01c3.781 1.728 7.87 1.728 11.627 0a.115.115 0 01.12.01c.119.09.239.18.36.27a.117.117 0 01-.012.194c-.58.338-1.176.631-1.803.868a.112.112 0 00-.062.155c.33.657.712 1.283 1.142 1.877a.116.116 0 00.127.043c1.842-.55 3.685-1.386 5.585-2.773a.12.12 0 00.045-.082c.5-5.177-.838-9.713-3.537-13.645a.105.105 0 00-.047-.043z"/></svg></a>
                <a href="#" aria-label="Twitter" className="hover:text-green-400"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.69.11 1.02C7.69 5.4 4.07 3.6 1.64.96c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.18 3.01 4.1 3.05A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.36 0 12.94-6.93 12.94-12.94 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg></a>
              </div>
            </div>
            {/* Navigation Columns */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <div className="font-bold mb-2">Ways to Earn Free Robux</div>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-green-400">Earn Robux Through Offerwalls</a></li>
                  <li><a href="#" className="hover:text-green-400">Rewards & Promocodes</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold mb-2">Blogs, Guides & Tutorials</div>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-green-400">Blogs</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold mb-2">Help & Support</div>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-green-400">Help center</a></li>
                  <li><a href="#" className="hover:text-green-400">How to earn free robux</a></li>
                  <li><a href="#" className="hover:text-green-400">How to withdraw</a></li>
                  <li><a href="#" className="hover:text-green-400">Missing robux?</a></li>
                </ul>
              </div>
              <div>
                <div className="font-bold mb-2">Legal</div>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-green-400">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-xs text-center mt-8 opacity-70">
            ©2025 RBXDeals. All rights reserved. Not affiliated with ROBLOX Corporation.
          </div>
        </footer>
      </div>
    </div>
  );
} 