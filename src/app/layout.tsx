import React from "react";
import "./globals.css";
import { SessionProvider } from "../context/SessionContext";

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors">
        <SessionProvider>
          <main className="flex-1 w-full">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
