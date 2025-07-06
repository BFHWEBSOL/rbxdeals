import React from "react";
import "./globals.css";
import { SessionProvider } from "../context/SessionContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors" style={{fontFamily: 'Inter, sans-serif', background: 'var(--soft-white)', color: 'var(--soft-black)'}}>
        <SessionProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
