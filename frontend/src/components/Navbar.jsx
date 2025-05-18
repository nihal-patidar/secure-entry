import React, { useState, useEffect } from "react";
import { Menu, X, Ticket, ScanLine } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import { Link } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Ticket className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              SecureEntry
            </span>
          </div>

          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#creator" className="nav-link">Creator</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div> */}

          {/* <a href='login'> <button className='p-2 bg-blue-gray-600 text-black font-semibold'>Login</button></a> */}
          <div>
          <Link to="login">
            <Button className="btn-primary">Login</Button>
          </Link>

    
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

      {/* {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg">
            <a href="#home" className="mobile-nav-link">Home</a>
            <a href="#services" className="mobile-nav-link">Services</a>
            <a href="#creator" className="mobile-nav-link">Creator</a>
            <a href="#contact" className="mobile-nav-link">Contact</a>
          </div>
        </div>
      )} */}
    </nav>
  );
}
