// app/layout.tsx
// import ServerLayout from "./ServerLayout";
import ClientLayout from "./ClientLayout";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "CryptoWeather Nexus - Real-time Dashboard",
  description: "Track live cryptocurrency prices, weather updates, and the latest crypto news in one modern dashboard.",
  keywords: "crypto, cryptocurrency, weather, bitcoin, ethereum, crypto news, live prices, dashboard",
  authors: [{ name: "Nikhil Jaiswal", url: "https://yourportfolio.com" }],
  icons: "/favicon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ServerLayout>
      <ClientLayout>{children}</ClientLayout>
    // </ServerLayout>
  );
}