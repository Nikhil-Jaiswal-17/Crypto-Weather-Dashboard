"use client";

import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8">
          {[
            { title: "Weather", link: "/weather", emoji: "🌤" },
            { title: "Cryptocurrency", link: "/crypto", emoji: "💰" },
            { title: "News", link: "/news", emoji: "📰" },
          ].map((item) => (
            <Link key={item.title} href={item.link}>
              <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:bg-gray-100 cursor-pointer transition">
                <span className="text-4xl mb-2">{item.emoji}</span>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      );
}

