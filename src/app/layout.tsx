"use client";
import React, { useState, createContext, useContext } from "react";
import "./globals.css";
import { SessionProvider } from "../context/SessionContext";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Login from "../components/Login";

// Create context for login modal
const LoginModalContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });
export function useLoginModal() {
  return useContext(LoginModalContext);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors">
        <LoginModalContext.Provider value={{ open: loginOpen, setOpen: setLoginOpen }}>
          <Navbar />
          <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Login">
            <Login />
          </Modal>
          <SessionProvider>
            <main className="flex-1 w-full">
              {children}
            </main>
          </SessionProvider>
        </LoginModalContext.Provider>
      </body>
    </html>
  );
}
