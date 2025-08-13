"use client";
import { ExternalLink, Scan, Users, Menu, X, LogOut } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";

function Navbar() {
  const [activeTab, setActiveTab] = useState("Visitors");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const context = useContext<any>(UserContext);

  const { setUserData, setServiceId } = context;

  const handleNavClick = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
    setMenuOpen(false); // close menu on mobile
  };
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setUserData(null);
    setServiceId(null);
    router.push("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Entry
              </h1>
              <p className="text-xs text-slate-500">
                Visitor Management System
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex bg-slate-100 rounded-xl p-1">
            <Button
              variant="ghost"
              onClick={() => handleNavClick("Scanner", "/home/scanner")}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "Scanner"
                  ? "bg-white shadow-sm text-blue-600 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Scan className="w-4 h-4 mr-2" />
              Scanner
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("Visitors", "/home")}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "Visitors"
                  ? "bg-white shadow-sm text-blue-600 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Visitors
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex  items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="border-slate-200 hover:bg-slate-50 bg-transparent hidden w-[10vw] md:flex"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2 md:hidden">
            <Button
              variant="ghost"
              onClick={() => handleNavClick("Scanner", "/home/scanner")}
              className={`justify-start ${
                activeTab === "Scanner"
                  ? "bg-slate-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Scan className="w-4 h-4 mr-2" /> Scanner
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("Visitors", "/home")}
              className={`justify-start ${
                activeTab === "Visitors"
                  ? "bg-slate-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4 mr-2" /> Visitors
            </Button>
            <Button
              variant="outline"
              className="justify-start border-slate-200 hover:bg-slate-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
