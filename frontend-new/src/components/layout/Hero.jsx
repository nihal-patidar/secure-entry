import React from "react";
import { Ticket, ScanLine, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  return (
    // <div
    //   id="home"
    //   className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    // >
    //   <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    //       <div className="space-y-8">
    //         <h1 className="text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
    //           Secure Ticket Generation & Validation
    //         </h1>
    //         <p className="text-xl text-gray-600">
    //           Create, manage, and validate tickets with our powerful platform.
    //           Perfect for events, venues, and organizations.
    //         </p>
    //         <div className="flex flex-wrap gap-4">
    //           <Link to="register">
    //             <button className="btn-primary">
    //               Get Started
    //               <ArrowRight className="ml-2 h-5 w-5" />
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="relative">
    //         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
    //         <div className="relative bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="ticket-card">
    //               <Ticket className="h-8 w-8 text-indigo-600" />
    //               <h3 className="text-lg font-semibold mt-2">
    //                 Generate Tickets
    //               </h3>
    //               <p className="text-sm text-gray-600">
    //                 Create secure, unique tickets instantly
    //               </p>
    //             </div>
    //             <div className="ticket-card">
    //               <ScanLine className="h-8 w-8 text-purple-600" />
    //               <h3 className="text-lg font-semibold mt-2">
    //                 Scan & Validate
    //               </h3>
    //               <p className="text-sm text-gray-600">
    //                 Quick and reliable validation
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen min-w-full flex flex-col  items-center pt-16 px-10 lg:pt-6 lg:px-20  overflow-hidden lg:bg-gradient-to-br lg:from-blue-100 lg:via-white lg:to-blue-50 bg-white relative ">
      {/* Upper div */}
      <div className="flex min-w-full flex-col lg:flex-row gap-12 items-center px-4 lg:px-20 min-h-screen">
        {/* Left text */}
        <div className="justify-self-start mt-12 lg:pl-24 flex flex-col gap-6 lg:gap-12  text-black ">
          <div className="text-5xl font-bold leading-snug">
            Make <span className="txt-landing-blue">Event Entry</span>
            <br className="hidden lg:block" /> Easy, Safe & Smart!
          </div>
          <div className="txt-landing lg:w-[25vw]">
            Create events, collect registrations, and let people enter using
            their unique QR code — all managed in{" "}
            <span className="text-black">one simple website.</span>
          </div>
          <div className=" flex gap-4 ">
            <div className="btn-fill px-3 py-1 flex items-center lg:px-4 lg:py-2 hover:cursor-pointer">
              Get Started
            </div>
            <div className=" btn-outline-border-black px-4 py-2 flex gap-2 items-center hover:cursor-pointer ">
              Learn More{" "}
              <img className="w-4 h-4" src="Right-arrow.png" alt="" />
            </div>
          </div>
        </div>

        {/* Right photo + video */}
        <div className="relative max-w-[300px] h-[600px] mx-auto transform -translate-x-2  lg:translate-x-[30%]">
          <img
            src="Video-landing.gif"
            alt="Screen Animation"
            className="absolute w-[14rem] h-[29rem] top-[2.5rem] left-[2rem] object-cover rounded-lg z-0"
          />

          <img
            src="iPhone-Frame-PNG-Photo.png"
            alt="Phone Frame"
            className="w-full h-full object-contain z-10 relative"
          />
        </div>
      </div>

      {/* lower div */}
      <div className="z-10 flex flex-col pr-6 lg:pr-0 justify-center items-center gap-4">
        <div className=" text-3xl lg:text-5xl text-black font-semibold">
          Create New <span className="txt-landing-blue">Event</span> !
        </div>
        <div className=" w-[90vw] lg:w-[60vw] flex h-[32vh] lg:h-auto  lg:max-w-6xl mx-auto mb-4 bg-white rounded-2xl lg:rounded-full justify-evenly flex-col lg:flex-row p-2 lg:p-0">
          {/* Input */}
          <div className="flex items-center ml-2 flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 lg:justify-center">
            <div className="w-full relative">
              <img
                src="tick.png"
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:hidden"
              />
              <input
                type="text"
                className="outline-none text-black bg-white border-2 border-[#CACACA] py-2 text-center w-full rounded-full  lg:border-r-0 lg:rounded-l-full lg:rounded-r-none"
                placeholder="Event Name"
              />
            </div>
            <div className="w-full relative">
              <img
                src="dollar.png"
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:hidden"
              />
              <input
                type="text"
                className="outline-none text-black bg-white border-2 border-[#CACACA] py-2 text-center w-full rounded-full  lg:border-r-0 lg:rounded-l-none lg:rounded-r-none"
                placeholder="Ticket Price"
              />
            </div>
            <div className="w-full relative">
              <img
                src="email.png"
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:hidden"
              />
              <input
                type="text"
                className="outline-none text-black bg-white border-2 border-[#CACACA] py-2 text-center w-full rounded-full  lg:border-r-0 lg:rounded-l-none lg:rounded-r-none"
                placeholder="Validator Email"
              />
            </div>
            <div className="w-full relative">
              <img
                src="scan.png"
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:hidden"
              />
              <input
                type="text"
                className="outline-none text-black bg-white border-2 border-[#CACACA] py-2 text-center w-full rounded-full  lg:rounded-r-full lg:rounded-l-none"
                placeholder="No. of Scans"
              />
            </div>
          </div>
          {/* Button */}
          <div className="hover:cursor-pointer btn-fill px-6 py-2 my-2 flex justify-center items-center hover:curs ">
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
