"use client";
import { ExternalLink, Scan, Users } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Navbar() {
  const [activeTab, setActiveTab] = useState("Visitors");
  const router = useRouter();
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Secure Entry
                </h1>
                <p className="text-sm text-slate-500">
                  Visitor Management System
                </p>
              </div>
            </div>

            <div className="flex bg-slate-100 rounded-xl p-1">
              <Button
                variant="ghost"
                onClick={() => {
                  setActiveTab("Scanner");
                  router.push("/home/scanner");
                }}
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
                onClick={() => {
                  setActiveTab("Visitors");
                  router.push("/home");
                }}
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
          </div>

          <Button
            variant="outline"
            size="icon"
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
