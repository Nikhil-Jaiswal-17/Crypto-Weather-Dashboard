// app/layout.tsx
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
  keywords: ["crypto", "cryptocurrency", "weather", "bitcoin", "ethereum", "crypto news", "live prices", "dashboard"],
  authors: [{ name: "Nikhil Jaiswal", url: "https://yourportfolio.com" }],
  icons: "/favicon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="description" content={metadata.description ?? "Default description"} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords ?? "default, keywords"} />
        {metadata.authors && metadata.authors[0] && (
          <meta name="author" content={metadata.authors[0].name} />
        )}
        <link rel="icon" href={metadata.icons} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
