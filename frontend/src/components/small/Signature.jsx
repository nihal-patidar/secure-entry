import { Linkedin } from "lucide-react";
import React, { useState } from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const MadeWithLove = () => {
  const [hovered, setHovered] = useState(false);
  const nihal = {name : "Nihal Patidar" , linkedin : "https://www.linkedin.com/in/nihal-patidar/" , instagram : "https://www.instagram.com/nihal_x_patidar/"};
  const yagya = {name : "Yagyadeep Ahirwar" , linkedin : "" , instagram : "https://www.instagram.com/yagyadeep_ahirwar786/"};

  return (
    <div className="hidden sm:flex items-center justify-center h-full relative right-28">
      {/* Main Card */}
      <div
        className=" text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="text-lg font-semibold tracking-wide">Made with</span>
        <span className="text-red-500 text-2xl mx-2 animate-pulse">❤️</span>

        {/* Hover Popup Card */}
        {hovered && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-80 bg-[#640d60] backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl transition-all duration-300 scale-105 border border-white/30">
            {/* <p className="text-xl font-bold text-center mb-3">Connect With Us</p> */}
            <div className="flex justify-between items-center">
              {/* Nihal */}
              <div className="flex flex-col items-center">
                {/* <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-full shadow-md">
                  <span className="text-lg font-bold">N</span>
                </div> */}
                <div className="flex space-x-3 mt-2">
                  <a href={nihal.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-blue-400 text-2xl hover:text-blue-600 transition-colors" />
                  </a>
                  <a href={nihal.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-pink-400 text-2xl hover:text-pink-600 transition-colors" />
                  </a>
                </div>
                <p className="mt-2 font-medium text-nowrap tracking-wide">{nihal.name}</p>
              </div>

              {/* Divider */}
              <div className="w-0.5 bg-white/30 h-16 mx-3"></div>

              {/* Yagyadeep */}
              <div className="flex flex-col items-center">
                {/* <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-full shadow-md">
                  <span className="text-lg font-bold">Y</span>
                </div> */}
                <div className="flex space-x-3 mt-2">
                  <a href={yagya.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-blue-400 text-2xl hover:text-blue-600 transition-colors" />
                  </a>
                  <a href={yagya.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-pink-400 text-2xl hover:text-pink-600 transition-colors" />
                  </a>
                </div>
                <p className="mt-2 font-medium text-nowrap">{yagya.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MadeWithLove;
