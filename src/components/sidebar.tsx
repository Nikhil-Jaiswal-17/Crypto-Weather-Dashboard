"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to get current route
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { HomeIcon, Cloud, DollarSign, Newspaper, User, Building } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [userName, setUserName] = useState("Profile");

  useEffect(() => {
    // Fetch the user's name from localStorage
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile && savedProfile.name) {
      setUserName(savedProfile.name);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r shadow-md flex flex-col p-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-5 ml-4">Dashboard</h1>

        <nav className="space-y-3 flex-grow">
          <NavItem href="/home" icon={<HomeIcon size={20} />} label="Home" active={pathname === "/home"} />
          <NavItem href="/weather" icon={<Cloud size={20} />} label="Weather" active={pathname === "/weather"} />
          <NavItem href="/crypto" icon={<DollarSign size={20} />} label="Cryptocurrency" active={pathname === "/crypto"} />
          <NavItem href="/news" icon={<Newspaper size={20} />} label="News" active={pathname === "/news"} />
          <NavItem href="/cityDetails" icon={<Building size={20} />} label="City Details" active={pathname === "/cityDetails"} />
        </nav>

        {/* Profile Section */}
        <Card
          className={`flex items-center gap-3 p-3 mt-5 cursor-pointer transition ${
            pathname === "/profile" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          onClick={() => router.push("/profile")}
        >
          <User size={20} className="text-gray-500" />
          <span className="text-sm font-medium">{userName}</span>
        </Card>
      </aside>
    </div>
  );
};

const NavItem = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 transition ${
      active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="text-md">{label}</span>
  </Link>
);

export default Sidebar;
