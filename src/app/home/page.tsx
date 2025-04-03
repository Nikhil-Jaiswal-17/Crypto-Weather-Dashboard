"use client";

import Link from "next/link";
import { Tooltip } from "@/components/ui/tooltip";
import { Sun, DollarSign, Newspaper } from "lucide-react";

export default function DashboardPage() {
  const categories = [
    {
      title: "Weather",
      link: "/weather",
      icon: <Sun className="h-10 w-10 text-blue-500" />,
      description: "Explore detailed weather updates for your favorite cities.",
    },
    {
      title: "Cryptocurrency",
      link: "/crypto",
      icon: <DollarSign className="h-10 w-10 text-green-500" />,
      description: "Track real-time prices of major cryptocurrencies.",
    },
    {
      title: "News",
      link: "/news",
      icon: <Newspaper className="h-10 w-10 text-orange-500" />,
      description: "Read the latest headlines and trending news.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Title */}
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Welcome to Your Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((item) => (
          <Link key={item.title} href={item.link}>
            {/* Card with hover effect */}
            <div className="relative group flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-r from-blue-200 via-white to-blue-300 transition-transform duration-300 cursor-pointer h-56">
              {/* Icon with Tooltip */}
              <Tooltip content={`Click to explore ${item.title.toLowerCase()}!`}>
                <span className="text-6xl mb-4 group-hover:animate-bounce">
                  {item.icon}
                </span>
              </Tooltip>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-800">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2 text-center group-hover:text-gray-700">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mt-12 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Your Ultimate Gateway to Information 🌟
        </h2>
        <p className="text-gray-500 text-center mt-4 mb-6">
          Welcome to a world of insights and possibilities! Discover the latest weather updates to plan your day with confidence, stay ahead in the financial game with live cryptocurrency trends, and stay informed about breaking news from around the globe. Your dashboard is designed to make your life simpler, smarter, and more connected.
        </p>
        <p className="text-gray-500 text-center mt-4 mb-6">
          Whether you are tracking the latest trends, staying informed on global news, or checking the forecast for your next big day, we have got you covered. Empower yourself with a world of information at your fingertips.
        </p>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            Explore, engage, and empower yourself—everything you need is just a click away!
          </p>
        </div>
      </footer>
    </div>
  );
}
