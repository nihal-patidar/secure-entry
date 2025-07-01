import React, { useState } from "react";
import { Icons } from "../../Utils/icons";

export const TabletMenu = (props) => {
  const [colorTrue, setColorTrue] = useState(null);

  const sidebarItems = [
    { id: "divA", icon: Icons.dashboard },
    { id: "divB", icon: Icons.services },
    { id: "divC", icon: Icons.addServices },
    { id: "divD", icon: Icons.validator },
    { id: "divE", icon: Icons.addValidator },
  ];

  return (
      <div
          className={`fixed flex flex-col items-center pt-20 p-4 gap-8 left-0 h-full bg-[#E2E6FF] text-black ${props.className || ""}`}
      >
        <h1 className="font-bold text-3xl text-black z-20 p-2">SE</h1>

        {sidebarItems.map((item) => {
          const isActive = colorTrue === item.id;
          return (
              <div
                  key={item.id}
                  className={`sidebar-icon overflow-clip cursor-pointer p-3 rounded-lg transition-colors ${
                      isActive
                          ? "bg-[#2C3ED3] text-white"
                          : "bg-[#E2E6FF] text-[#2D2D2D] hover:bg-[#CBD3FF]"
                  }`}
                  onClick={() => setColorTrue(item.id)}
              >
                {item.icon}
              </div>
          );
        })}
      </div>
  );
};
