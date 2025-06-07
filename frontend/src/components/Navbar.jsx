import React, { useState, useEffect } from "react";
import { Menu, X, Ticket, ScanLine } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import { Link } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 70;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` fixed z-50 transition-all duration-300 lg:max-w-full max-w-[90%] ease-in-out   ${
        isScrolled
          ? "lg:top-4 lg:left-1/2 lg:-translate-x-1/2  lg:rounded-full lg:w-[60%] lg:shadow-lg opacity-0 lg:opacity-100"
          : " w-full  translate-x-0 rounded-none shadow-none"
      } 
      lg:bg-[#2C3ED3] lg:opacity-100  lg:pointer-events-auto bg-transparent w-full `}
    >
      <div className=" mx-auto px-4 sm:px-6  lg:px-8">
        <div className="flex items-center justify-between h-16  ">
          {/* Logo of secure entry */}
          <div className="flex items-center">
            <span className=" text-xl font-bold  nav-txt lg:text-white  hover:cursor-pointer">
              SecureEntry
            </span>
          </div>
          {/* Mid portion of navbar */}
          <div className="hidden md:block">
            <div className=" flex items-baseline gap-16">
              <a href="#services" className="nav-link-updated">
                Services
              </a>
              <a href="#creator" className="nav-link-updated">
                Where we operate
              </a>
              <a href="#contact" className="nav-link-updated">
                Help & support
              </a>
            </div>
          </div>

          {/* <a href='login'> <button className='p-2 bg-blue-gray-600 text-black font-semibold'>Login</button></a> */}
          {/* right portion - get started button */}
          <div className=" hidden lg:flex justify-center items-center gap-4">
            <Link to="login">
              <Button className="btn-outline">Get Started</Button>
            </Link>
            <img
              src="info-icon.png"
              alt="info"
              className="hover:cursor-pointer"
            />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Old one */}
      {isMenuOpen && (
        <div className="md:hidden  pr-8 ">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg">
            <a href="#home" className="mobile-nav-link">
              Home
            </a>
            <a href="#services" className="mobile-nav-link">
              Services
            </a>
            <a href="#creator" className="mobile-nav-link">
              Creator
            </a>
            <a href="#contact" className="mobile-nav-link">
              Contact
            </a>
          </div>
        </div>
      )}

      {/* New one */}

      {/* {isMenuOpen && (
        <div className=" w-[40%] z-500 backdrop-blur bg-yellow-200 ml-auto">
          <a href="#home" className="mobile-nav-link">
            Home
          </a>
          <a href="#services" className="mobile-nav-link">
            Services
          </a>
          <a href="#creator" className="mobile-nav-link">
            Creator
          </a>
          <a href="#contact" className="mobile-nav-link">
            Contact
          </a>
        </div>
      )} */}
    </nav>
  );
}
