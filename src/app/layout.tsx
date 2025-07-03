import React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "../context/SessionContext";
import { NextIntlClientProvider } from 'next-intl';

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode, params?: { locale?: string } }) {
  const locale = params?.locale || 'en';
  let messages = {};
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    messages = (await import('../messages/en.json')).default;
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <main className="flex-1 w-full">
                {children}
              </main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
