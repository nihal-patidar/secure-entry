import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  MapPin,
  Mail,
  Phone,
  Image,
  Type,
  Hash,
  Circle,
  CheckSquare,
  Clock,
  Calendar,
  Timer,
  FileText,
  Palette,
  Menu,
  X,
  GalleryVertical,
  ScanEye,
  Eye,
  CloudUpload,
  IndianRupee,
} from "lucide-react";

const FormBuilderSidebar = ({ onFieldSelect, activeTab, setActiveTab }) => {
  const [blinkingItem, setBlinkingItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    "Contact Details": false,
    Essentials: false,
    "Date & Time": false,
    "Legal & Consent": false,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        !event.target.closest(".sidebar-container")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleItemClick = (item) => {
    setBlinkingItem(item);
    if (onFieldSelect) onFieldSelect(item);
    if (isMobile) setIsSidebarOpen(false);

    setTimeout(() => {
      setBlinkingItem(null);
    }, 300);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Fields") onFieldSelect("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fieldsData = [
    {
      title: "Contact Details",
      items: [
        { name: "Full Name", icon: User },
        { name: "Address", icon: MapPin },
        { name: "Email", icon: Mail },
        { name: "Phone", icon: Phone },
      ],
    },
    {
      title: "Essentials",
      items: [
        { name: "Logo", icon: Image },
        { name: "Cover", icon: GalleryVertical },
        { name: "Text", icon: Type },
        { name: "Number", icon: Hash },
        { name: "Single Selection", icon: Circle },
        { name: "Multiple Selection", icon: CheckSquare },
        { name: "Dropdown Selection", icon: ChevronDown },
        { name: "Upload File", icon: CloudUpload },
        { name: "Upload Image", icon: CloudUpload },
        { name: "Payment Fields", icon: IndianRupee },
      ],
    },
    {
      title: "Date & Time",
      items: [
        { name: "Timer", icon: Timer },
        { name: "Date", icon: Calendar },
        { name: "Time", icon: Clock },
      ],
    },
    {
      title: "Legal & Consent",
      items: [{ name: "Terms & Conditions", icon: FileText }],
    },
  ];

  const tabs = [
    { name: "Fields", icon: Palette },
    { name: "Preview", icon: ScanEye },
  ];

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 md:hidden"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      )}

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
      )}

      <div
        className={`sidebar-container ${isMobile ? "fixed" : "relative"} ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        } ${
          isMobile ? "z-40" : "z-auto"
        } w-80 bg-gray-50 border-r border-gray-200 h-screen flex transition-transform duration-300 ease-in-out`}
      >
        {/* Left vertical tab panel */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 mt-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center mb-4 transition-colors ${
                  isActive
                    ? "bg-[#2C3Ed3] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col pb-0 mt-2">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{activeTab}</h2>
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Field rendering */}
            {activeTab === "Fields" &&
              fieldsData.map((section) => (
                <div key={section.title} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                    {collapsedSections[section.title] ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {!collapsedSections[section.title] && (
                    <div className="ml-2 mt-1">
                      {section.items.map((item, index) => {
                        const IconComponent = item.icon;
                        const isBlinking = blinkingItem === item.name;

                        const isPayment = item.name === "Payment Fields";
                        const baseClass = isPayment
                          ? "bg-[#EAF1FF] text-[#2C3ED3] hover:bg-[#DBE8FF]"
                          : isBlinking
                          ? "bg-deep-purple-50 animate-pulse"
                          : "hover:bg-gray-100";

                        return (
                          <div>
                            {
                              !item.name === "Payment Fields" ?
                                <button
                                  key={item.name}
                                  onClick={() => handleItemClick(item.name)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${baseClass}`}
                                >
                                  <IconComponent
                                    className={`w-4 h-4 ${
                                      isPayment ? "text-[#2C3ED3]" : "text-gray-500"
                                    }`}
                                  />
                                  <span className="text-sm">{item.name}</span>
                                </button>
                                :
                                <button
                                  key={item.name}
                                  onClick={() => handleItemClick(item.name, index)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${baseClass}`}
                                >
                                  <IconComponent
                                    className={`w-4 h-4 ${
                                      isPayment ? "text-[#2C3ED3]" : "text-gray-500"
                                    }`}
                                  />
                                  <span className="text-sm">{item.name}</span>
                                </button>
                              }
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

            {/* Manual Preview Button */}
            {activeTab === "Preview" && (
              <div className="mb-4">
                <h4 className="text-gray-700 font-medium text-sm mb-2">
                  See Preview
                </h4>
                <button
                  // onClick={() => handleItemClick("Preview")}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Preview</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormBuilderSidebar;
