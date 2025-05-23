import React from "react";
import { QrCode, Shield, Users, BarChart } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "QR Code Generation",
      description: "Generate secure QR codes for easy ticket validation",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Fraud Prevention",
      description: "Advanced security features to prevent ticket duplication",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-User Access",
      description: "Manage team permissions and roles effectively",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Analytics",
      description: "Track ticket usage and attendance in real-time",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen px-10 lg:px-20 flex flex-col gap-16 bg-white text-black mt-20"
    >
      {/* TExt part */}
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="border-[#ABABAB] border-2 bg-transparent rounded-xl px-4 text-sm cursor-pointer">
          See How It Works
        </div>
        <div className=" text-3xl lg:text-5xl font-bold max-w-xl  text-center leading-snug">
          Create Your First <br className="lg:hidden" />{" "}
          <span className="txt-landing-blue ">Event</span> & Generate{" "}
          <br className="lg:hidden" /> Tickets
          <div className="text-sm font-normal mt-6">
            Start in minutes - no setup hassle
          </div>
          <div className="text-sm font-normal text-center hidden lg:block ">
            Customize your event form, share it instantly,
            <br /> and let attendees generate secure QR tickets <br />
            automatically. It's that easy.
          </div>
        </div>
      </div>
      {/* Laptop version */}
      <div className="hidden  lg:flex flex-row items-center justify-center  gap-10 px-14 ">
        <div className="select-none relative w-full lg:w-[20vw] flex flex-col  p-6  gap-6 hover:scale-105 transition-all ease-in-out ">
          <img
            src="Outer-rectangle.png"
            alt=""
            className="absolute inset-0 -left-2 object-contain pointer-events-none"
          />
          {/* Icon */}
          <img src="create-event.png" className="w-10 h-10" alt="" />
          {/* Heading */}
          <div className="text-2xl font-bold">
            You create an event
            <div className="font-extralight text-xs ">
              Add event name, form questions, and entry rules. Then Circulate
              the form.
            </div>
          </div>
        </div>
        <div className="select-none relative  w-full lg:w-[20vw] flex flex-col  p-6 gap-6 hover:scale-105 transition-all ease-in-out ">
          <img
            src="Outer-rectangle.png"
            alt=""
            className="absolute inset-0 -left-2 object-contain pointer-events-none"
          />
          {/* Icon */}
          <img src="form.png" className="w-10 h-10" alt="" />
          {/* Heading */}
          <div className="text-2xl font-bold">
            People Fill the Form
            <div className="font-extralight text-xs ">
              After filling the form, they will get a QR code as their digital
              pass.
            </div>
          </div>
        </div>
        <div className="select-none relative w-full lg:w-[20vw] flex flex-col  py-8 pl-4 gap-6 hover:scale-105 transition-all ease-in-out">
          <img
            src="Outer-rectangle.png"
            alt=""
            className="absolute inset-0 -left-2 object-contain pointer-events-none"
          />
          {/* Icon */}
          <img src="validator.png" className="w-10 h-10" alt="" />
          {/* Heading */}
          <div className="text-2xl font-bold">
            Validators Scan QR
            <div className="font-extralight text-xs">
              Entry allowed only for verified QR codes.
            </div>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className="lg:hidden px-10">
        <img src="Frame 33.png" alt="" />
        <img src="Frame 34.png" alt="" />
        <img src="Frame 35.png" alt="" />
      </div>
    </section>
  );
}
