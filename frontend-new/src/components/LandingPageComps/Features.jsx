import React from "react";
import { Ticket, QrCode, Share2 } from "lucide-react";
// import PassPreview from "./PassPreview";
// import { PassTemplate } from "./PassTemplate";

export default function PassCreator() {
  return (
    <section
      id="creator"
      className=" pr-10 lg:pr-0 min-h-screen flex justify-center lg:justify-between"
    >
      {/* Left gradient */}
      <div className="hidden lg:block">
        <img src="Ellipse 8.png" alt="" />
      </div>
      {/* Main content */}
      <div className="flex w-[40vw] flex-col items-center">
        {/* button */}
        <div className="border-[#ABABAB] w-fit text-black border-2 bg-transparent rounded-xl px-4 text-sm cursor-pointer">
          Features
        </div>
        {/* Heading */}
        <div className="text-black text-3xl lg:text-5xl font-bold w-[60vw] lg:w-[450px] leading-snug pt-8 text-center">
          {" "}
          Amazing <span className="txt-landing-blue">Features</span> We Provide
        </div>
        {/* Features */}
        <div className="text-black w-full pointer-events-none  flex flex-col gap-12 pt-12 ">
          {/* QR */}
          <div className="w-full relative  flex gap-12 justify-between  items-center">
            <div className="relative min-w-[400px] lg:min-w-0 ">
              <img
                src="Rectangle 18.png"
                className="absolute inset-0   w-full h-full object-contain hidden lg:block"
                alt=""
              />
              <img
                src="Rectangle 19.png"
                className="absolute inset-0 -left-[25%] lg:left-0 -top-full lg:top-0 min-h-[200px] lg:min-h-0 w-full h-full object-contain lg:hidden"
                alt=""
              />
              <div className="relative -left-[20%] lg:left-0  flex-start w-fit flex-col lg:p-8 lg:w-[20vw]">
                <div className="font-semibold text-2xl txt-landing-blue">
                  QR Code Generation
                </div>
                <div className="text-xs">
                  Generate secure QR codes for easy <br /> ticket validation
                </div>
              </div>
            </div>
            <img
              src="Line.png"
              className="absolute inset-0 left-[50%] top-[42%] hidden  lg:block"
              alt=""
            />
            <img
              src="QR image.png"
              className="lg:transform absolute md:static inset-0  left-full -top-2   lg:-translate-y-2 lg:-translate-x-[8vh] w-15 h-15"
              alt=""
            />
          </div>
          {/* Fraud prevention */}
          <div className="w-full hidden md:flex relative flex-row-reverse gap-12 justify-evenly items-center">
            <div className="relative">
              <img
                src="Rectangle 19.png"
                className="absolute inset-0  w-full h-full object-contain "
                alt=""
              />
              <div className="relative p-8  w-[20vw]">
                <div className="font-semibold text-2xl txt-landing-blue">
                  Fraud Prevention
                </div>
                <div className="text-xs">
                  Advanced security features to prevent ticket duplication
                </div>
              </div>
            </div>
            <img
              src="Line.png"
              className="absolute inset-0 left-[17%] top-[42%] hidden lg:block"
              alt=""
            />
            <img
              src="ensured.png"
              className=" transform -translate-y-2 -translate-x-[8vh]"
              alt=""
            />
          </div>
          {/* Fraud prevention mobile */}
          <div className="w-full relative md:hidden  flex gap-12 justify-between  items-center my-12">
            <div className="relative min-w-[400px]  ">
              <img
                src="Rectangle 19.png"
                className="absolute inset-0 -left-[25%]  -top-full  min-h-[200px]  w-full h-full object-contain "
                alt=""
              />
              <div className="relative -left-[20%]   flex-start w-fit flex-col ">
                <div className="font-semibold text-2xl txt-landing-blue">
                  Fraud Prevention
                </div>
                <div className="text-xs">
                  Advanced security features to prevent <br /> ticket br
                  duplication
                </div>
              </div>
            </div>

            <img
              src="ensured.png"
              className="lg:transform absolute md:static inset-0  left-full  w-15 h-15"
              alt=""
            />
          </div>
          {/* Analytics */}
          <div className="w-full relative  flex gap-12 justify-between items-center">
            <div className="relative grid-cols-3 min-w-[400px] lg:min-w-0 ">
              <img
                src="Rectangle 18.png"
                className="absolute inset-0   w-full h-full object-contain hidden lg:block"
                alt=""
              />
              <img
                src="Rectangle 19.png"
                className="absolute inset-0 -left-[25%] lg:left-0 -top-full lg:top-0 min-h-[200px] lg:min-h-0 w-full h-full object-contain lg:hidden"
                alt=""
              />
              <div className="relative -left-[20%] lg:left-0 col-span-2 flex-start w-fit flex-col lg:p-8 lg:w-[20vw]">
                <div className="font-semibold text-2xl txt-landing-blue">
                  Analytics
                </div>
                <div className="text-xs">
                  Track ticket usage and attendance in <br /> real-time
                </div>
              </div>
            </div>
            <img
              src="Line.png"
              className="absolute inset-0 left-[50%] top-[42%] hidden  lg:block"
              alt=""
            />
            <img
              src="analytics.png"
              className="lg:transform absolute md:static inset-0  left-full -top-2   lg:-translate-y-2 lg:-translate-x-[8vh] w-15 h-15"
              alt=""
            />
          </div>
          {/* Multi user access */}
          <div className="w-full relative hidden md:flex flex-row-reverse gap-12 justify-evenly items-center">
            <div className="relative">
              <img
                src="Rectangle 19.png"
                className="absolute inset-0 w-full h-full object-contain"
                alt=""
              />
              <div className="relative p-8 w-[20vw]">
                <div className="font-semibold text-2xl txt-landing-blue">
                  Multi-User Access
                </div>
                <div className="text-xs">
                  Manage team permissions and roles effectively
                </div>
              </div>
            </div>
            <img
              src="Line.png"
              className="absolute inset-0 left-[17%] top-[42%] hidden lg:block"
              alt=""
            />
            <img
              src="gridicons_multiple-users.png"
              className=" transform -translate-y-2 -translate-x-[8vh]"
              alt=""
            />
          </div>
          {/* Multi user mobile */}
          <div className="w-full relative md:hidden  flex gap-12 justify-between  items-center mt-12">
            <div className="relative min-w-[400px]  ">
              <img
                src="Rectangle 19.png"
                className="absolute inset-0 -left-[25%]  -top-full  min-h-[200px]  w-full h-full object-contain "
                alt=""
              />
              <div className="relative -left-[20%]   flex-start w-fit flex-col ">
                <div className="font-semibold text-2xl txt-landing-blue">
                  Multi-User Access
                </div>
                <div className="text-xs">
                  Manage team permissions and <br /> roles effectively
                </div>
              </div>
            </div>

            <img
              src="gridicons_multiple-users.png"
              className="lg:transform absolute md:static inset-0  left-full -top-2  w-15 h-15"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Right gradient */}
      <div className="hidden lg:block">
        <img src="Ellipse 9.png" alt="" />
      </div>
    </section>
  );
}
