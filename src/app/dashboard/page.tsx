"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";

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
  useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  useEffect(() => { router.replace("/Earn"); }, [router]);
  if (!mounted) return null;
  if (!user) return null;

  return null;
} 