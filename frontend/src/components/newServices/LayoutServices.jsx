import React from "react";
import HamburgerIcon from "../../utils/HamburgerIcon";
import { useState } from "react";
import { SideBar } from "./SideBar";
import MobileMenu from "./MobileMenu";
import { TabletMenu } from "./TabletMenu";


const LayoutServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
    <div className="flex z-50">
      {/*<HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />*/}

      <div className="w-1/4">
        {/*<TabletMenu className="hidden md:flex lg:hidden" />*/}
        <SideBar className="hidden lg:flex overflow-clip" />
      </div>

      {/*<MobileMenu isOpen={isOpen} className="flex md:hidden z-50" />*/}
      
        
    </div>

    </>
  );
};

export default LayoutServices;
