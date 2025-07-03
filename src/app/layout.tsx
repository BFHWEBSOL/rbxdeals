import React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "../context/SessionContext";
import { NextIntlProvider } from 'next-intl';

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

export default function RootLayout({ children, params }: { children: React.ReactNode, params?: { locale?: string } }) {
  const locale = params?.locale || 'en';
  let messages = {};
  try {
    messages = require(`../messages/${locale}.json`);
  } catch {
    messages = require('../messages/en.json');
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlProvider messages={messages} locale={locale} defaultTranslationValues={{}}>
              <main className="flex-1 w-full">
                {children}
              </main>
            </NextIntlProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
