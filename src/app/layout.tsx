"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
// import { ThemeProvider } from "@/components/theme-provider"; // Light/Dark Mode Support
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Dashboard App",
//   description: "A modern dashboard with fixed sidebar",
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
        {/* <ThemeProvider> */}
          {/* Fixed Sidebar */}
          <div className="w-64 h-full bg-white border-r shadow-md fixed top-0 left-0 flex flex-col">
            <Sidebar />
          </div>
          {/* Main Content */}
          <main className="flex-1 ml-64 p-8 overflow-auto">{children}</main>
        {/* </ThemeProvider> */}
      </body>
    </html>
    </Provider>
  );
}
