import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-10 lg:px-20 flex flex-col gap-20 lg:gap-[30vh]  text-black bg-gradient-to-t from-[#a1aad7]  to-white"
    >
      <div className="max-w-7xl flex flex-col items-center gap-8 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-5xl font-semibold lg:font-bold text-center ">
          Sign Up For <span className="txt-landing-blue">Free</span> Today
        </div>
        <div className="flex flex-col gap-8 items-center">
          <p className="text-center">
            Simple for you. Seamless for them. Loved by <br /> organizers and
            attendees alike.
          </p>
          <div className="flex gap-6 items-center">
            <button className="btn-fill py-2 px-8">Get Started</button>
            <button className="btn-outline-border-black py-2 px-6 flex items-center ">
              Learn More <img src="right arrow.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 px-4 lg:px-32">
        <h1 className="text-4xl font-semibold">Get in touch</h1>
        <p className="">
          Have questions? We'd love to hear from you. Send us a <br /> message
          and we'll respond as soon as possible.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-[#373737] text-xs flex gap-2 underline hover:cursor-pointer">
            {" "}
            <img src="mail.png" alt="" className="w-4 h-4" />{" "}
            asksolutionheap@gmail.com
          </p>
          <p className="text-[#373737] text-xs flex gap-2 underline hover:cursor-pointer">
            <img src="phone.png" className="w-4 h-4" alt="" />
            +91 6261677451
          </p>
          <p className="text-[#373737] text-xs flex gap-2 underline hover:cursor-pointer">
            <img src="location.png" className="w-4 h-4" alt="" />
            Jabalpur Engineering College, Hostel No. 8
          </p>
        </div>
      </div>
    </section>
  );
}
