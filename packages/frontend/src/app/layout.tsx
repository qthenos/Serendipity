import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";
import SupabaseProvider from "../providers/SupabaseProvider";
import UserProvider from "../providers/UserProvider";
import { DateProvider } from "@/contexts/date-context";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SupabaseProvider>
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
               <DateProvider>
                  <main>
                    {children}
                  </main>
                  <Toaster />
               </DateProvider>
            </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
