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
  icons: "/favicon.png", // This should be a string URL or array of Icon objects
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const authorName = Array.isArray(metadata.authors) ? metadata.authors[0]?.name : metadata.authors?.name;
  const iconHref = typeof metadata.icons === "string" ? metadata.icons : "/default-favicon.png"; // Provide fallback icon URL
  const title = metadata.title ?? "Default Title";  // Provide fallback title

  // Type assertion to ensure `title` is a string (this forces TypeScript to treat it as a string)
  const titleString = String(title); 

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="description" content={metadata.description ?? "Default description"} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords ?? "default, keywords"} />
        {authorName && (
          <meta name="author" content={authorName} />
        )}
        <link rel="icon" href={iconHref} />
        <title>{titleString}</title>  {/* Ensuring title is a string */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
