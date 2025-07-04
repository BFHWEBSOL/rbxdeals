"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export type UserSession = {
  userId: string;
  username: string;
  avatarUrl: string;
  robuxBalance: number;
  redemptions: unknown[];
  createdAt?: unknown;
};

const SessionContext = createContext<{
  user: UserSession | null;
  setUser: (u: UserSession | null) => void;
  mounted: boolean;
}>({
  user: null,
  setUser: () => {},
  mounted: false,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserSession | null>(null);
  const [mounted, setMounted] = useState(false);

  // Rehydrate user from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('robuminer_user') : null;
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        // Ignore parsing errors
      }
    }
    setMounted(true);
  }, []);

  // Store user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('robuminer_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('robuminer_user');
    }
  }, [user]);

  // Wrap setUser to update state
  const setUser = (u: UserSession | null) => setUserState(u);

  if (!mounted) return null;

  return (
    <SessionContext.Provider value={{ user, setUser, mounted }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
} 