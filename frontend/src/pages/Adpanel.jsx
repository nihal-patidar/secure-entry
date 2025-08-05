import React, { useState } from "react";
import { Eye, Zap, DollarSign, MoreVertical, Send } from "lucide-react";

// Header Component
const Header = ({ activeTab, setActiveTab, ads }) => {
  const statusCounts = ads.reduce((acc, ad) => {
    const key =
      ad.status.charAt(0).toUpperCase() + ad.status.slice(1).toLowerCase(); 
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const tabs = [
    "Pending",
    "Approved",
    "Rejected",
    "Active",
    "Blocked",
    "Completed",
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-medium text-gray-800">Advertisements</h1>
      </div>

      <div className="flex space-x-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-[#2C3ED3] text-[#2C3ED3]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab} {statusCounts[tab] ? `(${statusCounts[tab]})` : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

// Stats Cards Component
const StatsCards = () => {
  const stats = [
    { label: "Impression", value: "0", icon: Eye, bgColor: "bg-[#2C3ED3]" },
    { label: "Clicks", value: "0", icon: Zap, bgColor: "bg-[#2C3ED3]" },
    {
      label: "Revenue",
      value: "0",
      icon: DollarSign,
      bgColor: "bg-[#2C3ED3]",
    },
    { label: "Total Ads", value: "0", icon: null, bgColor: "bg-[#2C3ED3]" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} text-white p-4 rounded-lg relative`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            {stat.icon && (
              <div className="absolute top-4 right-4">
                <stat.icon className="w-5 h-5 text-blue-200" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const AdCard = ({ ad, onApprove, onReject, activeTab }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header with buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {/* Pending or Rejected Tab: Show Approve */}
          {(activeTab === "Pending" || activeTab === "Rejected") && (
            <button
              onClick={() => onApprove(ad.id)}
              className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-200 hover:bg-green-100 transition-colors"
            >
              Approve
            </button>
          )}

          {/* Pending Tab: Show Reject */}
          {activeTab === "Pending" && (
            <button
              onClick={() => onReject(ad.id)}
              className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-200 hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
          )}

          {/* Approved Tab: Show Remove */}
          {activeTab === "Approved" && (
            <button
              onClick={() => onReject(ad.id)} // same handler for simplicity
              className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-200 hover:bg-red-100 transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Ad Title */}
      <h3 className="text-sm font-medium text-gray-800 mb-3">{ad.title}</h3>

      {/* Ad Preview */}
      <div className="bg-cyan-400 rounded-lg h-20 mb-3"></div>

      {/* Posted Date */}
      <p className="text-xs text-gray-500 mb-4">Posted on {ad.postedDate}</p>

      {/* Stats */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Impressions</span>
          <span className="font-medium text-gray-800">{ad.impressions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Clicks</span>
          <span className="font-medium text-gray-800">{ad.clicks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Revenue</span>
          <span className="font-medium text-gray-800">${ad.revenue}</span>
        </div>
      </div>

      {/* Send Overview Button */}
      <button className="w-full text-white py-2 px-4 rounded-md text-sm font-medium bg-[#2C3ED3] hover:bg-[#1E30C8] active:bg-[#2C3ED3] transition-colors flex items-center justify-center space-x-2">
        <Send className="w-4 h-4" />
        <span>Send Overview</span>
      </button>
    </div>
  );
};


// Main Dashboard Component
const AdDashboard = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Sweets shop ad",
      postedDate: "3:00 PM 12/06/2025",
      impressions: 222,
      clicks: 100,
      revenue: 30,
      status: "pending",
    },
    {
      id: 2,
      title: "Barbers shop ad",
      postedDate: "3:00 PM 12/06/2025",
      impressions: 69,
      clicks: 10,
      revenue: 300,
      status: "pending",
    },
    {
      id: 3,
      title: "Cake Shop",
      postedDate: "3:00 PM 12/06/2025",
      impressions: 222,
      clicks: 100,
      revenue: 30,
      status: "pending",
    },
  ]);

  const handleApprove = (adId) => {
    setAds(
      ads.map((ad) => (ad.id === adId ? { ...ad, status: "approved" } : ad))
    );
  };

  const handleReject = (adId) => {
    setAds(
      ads.map((ad) => (ad.id === adId ? { ...ad, status: "rejected" } : ad))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} ads={ads} />
        <StatsCards />

        <div className="grid grid-cols-3 gap-6">
          {ads
            .filter((ad) => ad.status.toLowerCase() === activeTab.toLowerCase())
            .map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                activeTab={activeTab}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdDashboard;
