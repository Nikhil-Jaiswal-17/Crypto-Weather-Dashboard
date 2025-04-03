"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Sidebar from "@/components/sidebar";
import "./globals.css";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="flex h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
          {/* Fixed Sidebar */}
          <div className="w-64 h-full bg-white border-r shadow-md fixed top-0 left-0 flex flex-col">
            <Sidebar />
          </div>
          {/* Main Content */}
          <main className="flex-1 ml-64 p-8 overflow-auto">{children}</main>
        </body>
      </html>
    </Provider>
  );
}
