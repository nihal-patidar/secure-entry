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

const FormBuilderSidebar = ({ onUpdate, idd, qId, oId }) => {
  const [blinkingItem, setBlinkingItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    "Contact Details": false,
    Essentials: false,
    "Date & Time": false,
    "Legal & Consent": false,
  });
  let activeTab = "Field"

  const handleItemClick = (item) => {
    setBlinkingItem(item);
    {if (onFieldSelect) {
      // onFieldSelect(setSelectedFields, item, idd);
    }}
    if (isMobile) setIsSidebarOpen(false);

    setTimeout(() => {
      setBlinkingItem(null);
    }, 300);
  };

  const handlePayClick = (item) => {
    setBlinkingItem(item);
    onUpdate((prev) => {
      console.log(prev)
      return {
        ...prev,
        fields: fields.map(field => {
          field.id === qId ?
          {...field,
            options:[...options, { 
                              value:item,
                              id:`${qId}${oId}`,
                              amount: 0,
                              selectedFields:{
                                title: "Form Heading",
                                description: "Form Description",
                                fields: [],
                              }
            }]
          }
          : field
        })}
    })

    if (isMobile) setIsSidebarOpen(false);

    setTimeout(() => {
      setBlinkingItem(null);
    }, 300);
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
      {(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" ></div>
      )}

      <div
        className={`sidebar-container ${isMobile ? "fixed" : "relative"} ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        } ${
          isMobile ? "z-40" : "z-auto"
        } w-80 bg-gray-50 border-r border-gray-200 h-[490px] flex transition-transform duration-300 ease-in-out`}
      >
          <div className="flex-1 p-4" style={{overflowY:"scroll", maxHeight:"1000px"}}>
          Select Field types
            {/* Field rendering */}
            {
              fieldsData.map((section) => (
                <div key={section.title} className="mb-4">
                  
                  {(
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
                              item.name !== "Payment Fields" ?
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
                                  onClick={() => handlePayClick(item.name)}
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
      {/* </div> */}
    </>
  );
};

export default FormBuilderSidebar;
