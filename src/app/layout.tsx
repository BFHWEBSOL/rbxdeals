import "./globals.css";

export const metadata = {
  title: "Robuminer",
  description: "Earn Robux by completing offers and referrals.",
};

import DarkModeToggle from "@/components/DarkModeToggle";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="w-full py-4 px-6 flex items-center justify-between bg-gray-100 dark:bg-gray-800 shadow">
              <span className="font-bold text-xl tracking-tight">Robuminer</span>
              <DarkModeToggle />
            </header>
            <main className="flex-1 flex flex-col items-center justify-center p-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
