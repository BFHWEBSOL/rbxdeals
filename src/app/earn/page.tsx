"use client";
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";



export default function Earn() {
  const { user, setUser, mounted } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  React.useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  if (!mounted) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#23272e]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b bg-[#FFFFFF] border-[#D9D9E3]">
        <div className="text-2xl font-extrabold tracking-tight select-none">
          <span>Robuminer</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 relative">
            <div
              className={`h-12 w-12 flex items-center justify-center rounded-xl border-2 border-[#10a37f] bg-[#F7F7F8] cursor-pointer hover:scale-110 transition-all duration-150 ${dropdownOpen ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setDropdownOpen((open) => !open)}
              tabIndex={0}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              style={{ boxSizing: 'border-box' }}
            >
              <img src={user.avatarUrl} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
            </div>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute top-14 left-0 z-50 w-56 rounded-xl shadow-lg bg-white text-[#202123] py-2 flex flex-col gap-1 animate-fade-in" tabIndex={-1}>
                <button className="text-left px-5 py-3 text-lg hover:bg-[#F7F7F8] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Profile</button>
                <button className="text-left px-5 py-3 text-lg hover:bg-[#F7F7F8] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Offer history</button>
                <button className="text-left px-5 py-3 text-lg hover:bg-[#F7F7F8] rounded-lg transition" onClick={() => setDropdownOpen(false)}>Withdraw history</button>
                <button className="text-left px-5 py-3 text-lg hover:bg-[#F7F7F8] rounded-lg transition text-red-400" onClick={() => { setUser(null); setDropdownOpen(false); }}>Sign out</button>
              </div>
            )}
            <div className="h-12 flex items-center gap-1 px-6 rounded-xl border font-bold text-lg min-w-[90px] justify-center bg-[#F7F7F8] border-[#10A37F] text-[#10A37F]">
              <span>{typeof user.robuxBalance === 'number' ? user.robuxBalance : '0.5'}</span>
              <img
                src="/images/rbx.svg"
                alt="Robux Icon"
                width={24}
                height={24}
                style={{
                  filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(104deg) brightness(1.1)',
                }}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Main Content: Only Offer Wall */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <section className="bg-[#F7F7F8] rounded-2xl shadow-[0_4px_24px_0_rgba(16,163,127,0.06)] p-6 flex flex-col gap-4 border border-[#D9D9E3]" style={{ width: '100%', maxWidth: 700 }}>
          <h2 className="text-2xl font-bold mb-4 text-[#000000]">cpalead</h2>
          <p className="text-[#6E6E80] mb-4">Complete offers or watch videos to get robux!</p>
          <div className="w-full h-96 bg-white rounded-2xl shadow-card-light flex items-center justify-center text-secondary-light text-lg mb-4">
            <iframe
              sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
              src={`https://cdnnd.com/list/Fh5A?subid=${user.userId}`}
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "1rem" }}
              frameBorder="0"
              title="CPAlead Offer Wall"
            ></iframe>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-[#F7F7F8] border-[#D9D9E3] border-t px-8 py-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-2xl font-extrabold tracking-tight select-none">
              <span>Robuminer</span>
            </div>
            <div className="max-w-xs text-sm">
              Robuminer strives to build a fun and easy experience of getting free Robux. We do this by rewarding consistent and honest users with a lot of bonuses, promocodes and events.
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
                <li><a href="#" className="hover:text-green-400">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400">Contact Support</a></li>
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
      </footer>
    </div>
  );
} 