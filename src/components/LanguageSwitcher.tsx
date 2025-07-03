"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/").filter(Boolean);
    if (languages.some(l => l.code === segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push("/" + segments.join("/"));
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded px-3 py-2 border border-gray-300 bg-white text-black dark:bg-[#23272F] dark:text-white"
      style={{ minWidth: 120 }}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
} 