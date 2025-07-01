import React from "react";
import { Mail, Palette, Image, Share2 } from "lucide-react";

export default function InvitationCreator() {
  return (
    <section className="py-20 pr-8 lg:pr-0  text-black ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 sm:px-6 lg:px-8">
        <div className=" border-[#ABABAB] w-fit border-2 bg-transparent rounded-xl px-4 text-sm cursor-pointer">
          Customize
        </div>
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="text-4xl font-bold">
            <div>
              Create <span className="txt-landing-blue">Custom</span> Passes{" "}
            </div>
          </div>
          <div className="w-[80%] text-center">
            Design beautiful passes with our intuitive creator
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-6 text-black">
          <div className="border-2 border-[#959595] rounded-lg w-[80vw] lg:w-[25vw] flex flex-col gap-4 items-center pt-6 pb-8">
            <div className="text-3xl font-semibold">Choose Template</div>
            <div className="bg-[#2C3ED3] flex gap-4 items-center px-4 py-2 w-[80%] lg:w-[65%] text-white font-semibold rounded-md">
              <img src="tick2.png" alt="" className="w-5 h-5" /> Event Pass
            </div>
            <div className=" border-2 flex gap-4 items-center border-[#959595] px-4 py-2 w-[80%] lg:w-[65%] text-[#959595] font-semibold rounded-md">
              {" "}
              <img src="tick3.png" alt="" className="w-5 h-5" />
              E-Invitation
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <img
              src="Pass.png"
              className=" h-[20vh] lg:h-[30vh] w-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
