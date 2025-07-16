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

const FormBuilderSidebar = ({ onUpdate, qId, oId }) => {
  const [blinkingItem, setBlinkingItem] = useState(null);
  const [item, setItem] = useState("");
  const [TempField, setTempField] = useState({
    id: Date.now().toString(),
    type: item,
    label: item,
    required: false,
    placeholder: `Enter ${item.toLowerCase()}`,
    value: "",
  });
  const [PaymField, setPaymField] = useState({
    id: 0,
    type: item,
    label: "Extra Payment Field",
    required: false,
    placeholder: `Enter ${item.toLowerCase()}`,
    value: "",
    amount:"",
    options:[ { value:"A",id:`${qId}_A`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "",
      fields: [],
    }}, {value:"B",id:`${qId}_B`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "Form Description",
      fields: [],
    }}, {value:"C",id:`${qId}_C`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "Form Description",
      fields: [],
    }}]
  });


  const handleItemClick = (item) => {
    setBlinkingItem(item);

    // Update the formConfig with the new field
    setItem(item);
    console.log("Item NAme" , "Kuch toh hua hai yar")

    setTimeout(() => {
      setBlinkingItem(null);
    }, 300);
  };


  useEffect(() => {
    setTempField({
      id: Date.now().toString(),
      type: item,
      label: item,
      required: false,
      placeholder: `Enter ${item.toLowerCase()}`,
      value: "",
    })
    setPaymField({
      id: 0,
      type: item,
      label: "Extra Payment Field",
      required: false,
      placeholder: `Enter ${item.toLowerCase()}`,
      value: "",
      amount:"",
      options:[ { value:"A",id:`${qId}_A`, amount: 0, selected: false, selectedFields:{
        title: "",
        description: "",
        fields: [],
      }}, {value:"B",id:`${qId}_B`, amount: 0, selected: false, selectedFields:{
        title: "",
        description: "Form Description",
        fields: [],
      }}, {value:"C",id:`${qId}_C`, amount: 0, selected: false, selectedFields:{
        title: "",
        description: "Form Description",
        fields: [],
      }}]
    })
    onUpdate((prev) => { 
      console.log(prev)
      const newPrev = {
        ...prev,
        fields: prev.fields.map((f,i) => {
          console.log(f.id === qId)
          return f.id === qId ? {
                ...f, options: f.options.map((o,i) => {
                  return i === oId ? {
                    ...o, selectedFields: {
                      ...o.selectedFields,
                      fields: [
                        ...o.selectedFields.fields,
                        item === "Payment Fields" ? PaymField : TempField]
                    }
                  } : o
                })
              }
               : f
        })
      }
        //   
  // })
  //     }
      console.log("newPrev",newPrev);
      return newPrev;
    })
  }, [item]);

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

  return (
    <>
      {(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" ></div>
      )}

      <div
        className={`sidebar-container ${"relative"} ${
          "-translate-x-0"
        } ${
          "z-100"
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
                        const baseClass = isBlinking
                          ? "bg-deep-purple-50 animate-pulse"
                          : "hover:bg-gray-100";

                        return (
                          <div>
                            {
                              
                                <button
                                  key={item.name}
                                  onClick={() => handleItemClick(item.name)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${baseClass}`}
                                >
                                  <IconComponent
                                    className={`w-4 h-4 ${
                                      "text-[#2C3ED3]" 
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
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default FormBuilderSidebar;
