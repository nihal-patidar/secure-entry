import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle navbar style on scroll for all pages
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Removed dependency on pathname to apply to all pages
  
  // Effect to close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /**
   * Handles navigation clicks.
   * If on the landing page, it scrolls smoothly to the section.
   * If on another page (like /team), it navigates to the landing page
   * and then scrolls to the section.
   * @param {string} sectionId - The ID of the section to navigate to (e.g., '#services').
   */
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/${sectionId}`);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // A simple wrapper for the navigation links to avoid code repetition.
  const NavLink = ({ sectionId, children }) => (
    <a
      href={sectionId}
      onClick={(e) => {
        e.preventDefault();
        handleNavClick(sectionId);
      }}
      className="nav-link-updated" // Using your original class name
    >
      {children}
    </a>
  );
  
  const MobileNavLink = ({ sectionId, children }) => (
    <a
      href={sectionId}
      onClick={(e) => {
        e.preventDefault();
        handleNavClick(sectionId);
        setIsMenuOpen(false); // Close menu on click
      }}
      className="mobile-nav-link" // Using your original class name
    >
      {children}
    </a>
  );
  
  // Use the same navbar style for all pages
  const navClasses = `lg:max-w-full max-w-[90%] ease-in-out ${
    isScrolled
      ? "lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-full lg:w-[60%] lg:shadow-lg opacity-0 lg:opacity-100"
      : "w-full translate-x-0 rounded-none shadow-none"
  } lg:bg-[#2C3ED3] lg:opacity-100 lg:pointer-events-auto bg-transparent w-full`;

  return (
    <nav className={`fixed z-50 transition-all duration-300 ${navClasses}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold nav-txt lg:text-white hover:cursor-pointer">
              SecureEntry
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:block">
            <div className="flex items-baseline gap-16">
              <NavLink sectionId="#services">Services</NavLink>
              <NavLink sectionId="#creator">Where we operate</NavLink>
              <NavLink sectionId="#contact">Help & support</NavLink>
              <Link to="/team" className="nav-link-updated">
                Our Team
              </Link>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="hidden lg:flex justify-center items-center gap-4">
            <Link to="/login">
              <Button className="btn-outline">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pr-8">
            {/* Using your original mobile menu style */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg">
            <MobileNavLink sectionId="#services">Services</MobileNavLink>
            <MobileNavLink sectionId="#creator">Where we operate</MobileNavLink>
            <MobileNavLink sectionId="#contact">Help & support</MobileNavLink>
            <Link to="/team" className="mobile-nav-link">
              Our Team
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-200">
                <Link to="/login">
                    <Button fullWidth className="btn-outline-dark"> {/* Assuming you have a dark variant for the button */}
                        Get Started
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
