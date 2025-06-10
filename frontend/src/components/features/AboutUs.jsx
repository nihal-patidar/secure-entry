import React from "react";

function AboutUs() {
  return (
    <section className=" px-10 min-h-screen py-24 lg:px-20 text-black  flex flex-col items-center gap-24">
      <div className="flex flex-col items-center gap-8">
        <div className="border-[#ABABAB] w-fit text-black border-2 bg-transparent rounded-xl px-4 text-sm cursor-pointer">
          About Us
        </div>{" "}
        <h1 className="text-5xl font-bold">
          About <span className="txt-landing-blue">Founders</span> of Secure
          Entry
        </h1>
      </div>
      <div className="relative">
        <img src="Nihal.png" className="relative hidden md:block" alt="" />
        <img
          src="Line 8.png"
          className="absolute inset-0 top-1/2 transform translate-x-60 hidden md:block"
          alt=""
        />
        <img src="Nihal phone.png" className="md:hidden" alt="" />
      </div>
      <div className="relative">
        <img src="Yagya.png" className="relative hidden md:block" alt="" />
        <img
          src="Line 8.png"
          className="absolute inset-0 top-1/2 left-[26vw] hidden md:block"
          alt=""
        />
        <img src="Yagya phone.png" className="md:hidden" alt="" />
      </div>
    </section>
  );
}

export default AboutUs;
