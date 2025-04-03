// app/ServerLayout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CryptoWeather Nexus - Real-time Dashboard",
    description: "Track live cryptocurrency prices, weather updates, and the latest crypto news in one modern dashboard.",
    keywords: "crypto, cryptocurrency, weather, bitcoin, ethereum, crypto news, live prices, dashboard",
    authors: [{ name: "Nikhil Jaiswal", url: "https://yourportfolio.com" }],
  };
  
export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
