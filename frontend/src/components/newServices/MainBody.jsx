import React from "react";
import { Card } from "./Card";
import { MockData } from "../constants/Data";
import Header from "./Header";
import { SideBar } from "./SideBar";
import { TabletMenu } from "./TabletMenu";
import "../../index.css"; // Import the custom CSS file
import Cards from "./Cards.jsx";
const MainBody = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 min-w-[256px] sticky top-0 h-screen z-10 bg-white border-r border-gray-300 overflow-y-auto">
                <SideBar />
            </div>

            {/* Mobile/Tablet Sidebar */}
            <div className="block lg:hidden fixed top-0 left-0 h-full w-16 z-10 bg-white border-r border-gray-300">
                <TabletMenu />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white shadow-sm pl-4 lg:pl-6 pr-4">
                    <Header />
                </div>

                {/* Cards Section */}
                <div className="flex-1 px-4 bg-[#F2F3F9] border-2 border-[#EAEAEA] rounded-3xl mt-28 ml-16 lg:ml-14 mr-6">
                    {/* Section Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between mt-6 mb-2 px-6 py-3 rounded-xl shadow-sm">
                        <h1 className="text-[#4B4B4B] text-2xl font-semibold">Services</h1>
                        <button className="bg-[#2C3ED3] text-white text-base font-semibold rounded-3xl py-2 px-5 hover:bg-[#1f2fb8] transition duration-200">
                            Add Services
                        </button>
                    </div>

                    {/* Scrollable Card Grid with hidden scrollbar */}
                    <div
                        className="px-6 pb-6 overflow-y-auto hide-scrollbar"
                        style={{ maxHeight: "calc(100vh - 220px)" }}
                    >
                        <Cards  />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default MainBody;
