"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Menu, Cloud, Bitcoin, Newspaper, User } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Cloud, DollarSign, Newspaper, User, HomeIcon } from "lucide-react";


const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col p-5">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-5">Dashboard</h1>
        
        <nav className="space-y-3 flex-grow">
          <NavItem href="/home" icon={<HomeIcon size={20} />} label="Home" />
          <NavItem href="/weather" icon={<Cloud size={20} />} label="Weather" />
          <NavItem href="/crypto" icon={<DollarSign size={20} />} label="Cryptocurrency" />
          <NavItem href="/news" icon={<Newspaper size={20} />} label="News" />
          <NavItem href="/cityDetails" icon={<Newspaper size={20} />} label="City Details" />
        </nav>

        {/* Profile Section */}
        <Card className="flex items-center gap-3 p-3 mt-5">
          <User size={20} className="text-gray-500" />
          <span className="text-sm font-medium">Profile</span>
        </Card>
      </aside>  
    </div>
  );
};

const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
      {icon}
      <span className="text-md font-medium">{label}</span>
    </Link>
  );

export default Sidebar;