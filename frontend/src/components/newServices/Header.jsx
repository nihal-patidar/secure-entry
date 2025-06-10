import React from "react";
import { useLocation } from "react-dom"; //Use this when the full router is complete till then use vanillaJS window.location

const Header = () => {
  const currentPage = window.location;
  return (
    <div className="border-2 z-40 justify-between w-[70%] rounded-xl bg-[#F2F3F9] text-black border-gray-400 p-2 flex items-center fixed top-0 left-[15%] m-4">
      <div className="textArea text-xs">
        <span className="text-[#2C3ED3]">Location</span>: {currentPage.pathname}
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cursor-pointer w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <h1 className="text-[#2C3ED3] text-2xl font-semibold align-middle leading-tight">
            Services
          </h1>
        </div>
      </div>
      <div className="flex items-center w-[15%] justify-evenly">
        <img
          src="https://preview.redd.it/high-effort-meme-for-you-v0-7mj3pfzkdojb1.png?width=284&format=png&auto=webp&s=bb4e00de1d8d2a784d497f39f99772b13fc1e46c"
          className="rounded-full h-15"
        ></img>
        <div>
          <h2 className="text-[#494949] font-semibold">Aman Ahmad</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
