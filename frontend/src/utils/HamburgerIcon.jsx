import React from "react";
import { Menu, X } from "lucide-react";

const HamburgerIcon = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div className="z-50 md:hidden " onClick={toggleMenu}>{isOpen ? <X size={28} /> : <Menu size={28} />}</div>
    </>
  );
};

export default HamburgerIcon;
