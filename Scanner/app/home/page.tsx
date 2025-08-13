"use client";

import type React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  Scan,
} from "lucide-react";
import axios from "axios";

interface Visitor {
  visitor_data: Record<string, string>;
  validation_status: boolean;
}

interface Tab {
  tabName: string;
  key: string;
  element: React.ReactNode;
}

// helper to render status badge
const getStatusBadge = (status: boolean) =>
  status ? (
    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
      ✓ Visited
    </Badge>
  ) : (
    <Badge className="bg-amber-100 text-amber-700 border-amber-200">
      ⏳ Pending
    </Badge>
  );

// single table component for all/visited/remaining
interface VisitorsTableProps {
  visitors: Visitor[];
  searchTerm: string;
  filter: (v: Visitor) => boolean;
}
const VisitorsTable: React.FC<VisitorsTableProps> = ({
  visitors,
  searchTerm,
  filter,
}) => {
  // first apply visited/unvisited filter, then search across all fields
  const rows = visitors
    .filter(filter)
    .filter((v) =>
      Object.values(v.visitor_data).some((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  if (rows.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          No entries found
        </h3>
        <p className="text-slate-500">Try adjusting your search</p>
      </div>
    );
  }

  // derive column headings dynamically
  const columns = Object.keys(rows[0].visitor_data);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-600"
              >
                {col.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((v, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white/80" : "bg-white/90"}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 whitespace-nowrap">
                  {v.visitor_data[col]}
                </td>
              ))}
              <td className="px-4 py-2">
                {getStatusBadge(v.validation_status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ServiceVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [activeKey, setActiveKey] = useState<string>("0");
  const [searchTerm, setSearchTerm] = useState("");
  const { setUserData } = useContext<any>(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/protected", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await response.json();
        setUserData(data.user.user);
        getVisitors(data.user.user.service_id);
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = "/login";
      }
    }
    checkAuth();
  }, []);

  const getVisitors = async (serviceId: any) => {
    if (!serviceId) return;
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/visitors", { serviceId });
      setVisitors(res.data.visitorList);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: visitors.length,
    visited: visitors.filter((v) => v.validation_status).length,
    remaining: visitors.filter((v) => !v.validation_status).length,
  };

  const Tabs: Tab[] = [
    {
      tabName: "All",
      key: "0",
      element: (
        <VisitorsTable
          visitors={visitors}
          searchTerm={searchTerm}
          filter={() => true}
        />
      ),
    },
    {
      tabName: "Visited",
      key: "1",
      element: (
        <VisitorsTable
          visitors={visitors}
          searchTerm={searchTerm}
          filter={(v) => v.validation_status}
        />
      ),
    },
    {
      tabName: "Remaining",
      key: "2",
      element: (
        <VisitorsTable
          visitors={visitors}
          searchTerm={searchTerm}
          filter={(v) => !v.validation_status}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen w-[99vw] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}

      {/* Content */}
      <div className="max-w-7xl w-[100vw] mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Visitors
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          {/* Visited */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Visited</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.visited}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-emerald-600 text-xl">✓</span>
              </div>
            </CardContent>
          </Card>
          {/* Remaining */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Remaining</p>
                <p className="text-3xl font-bold text-amber-600">
                  {stats.remaining}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-amber-600 text-xl">⏳</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {Tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeKey === tab.key ? "default" : "outline"}
                  onClick={() => setActiveKey(tab.key)}
                  className={`transition-all duration-200 ${
                    activeKey === tab.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {tab.tabName}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => getVisitors}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {loading ? "Loading..." : "Reload"}
              </Button>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search visitors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
              {/* <Button
                variant="outline"
                size="icon"
                className="border-slate-200 hover:bg-slate-50 bg-transparent"
              >
                <Download className="w-4 h-4" />
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Visitors List */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              {Tabs.map((tab) => (tab.key === activeKey ? tab.element : null))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceVisitors;
