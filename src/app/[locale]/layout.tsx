import React from "react";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "../../context/SessionContext";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'pt' },
    { locale: 'de' },
    { locale: 'nl' },
    { locale: 'fr' },
  ];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return metadata;
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans transition-colors">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages} locale={params.locale}>
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