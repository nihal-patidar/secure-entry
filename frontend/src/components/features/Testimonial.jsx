import React from "react";

function Testimonial() {
  return (
    <section className="py-20 px-20 flex flex-col select-none items-center gap-10 text-black">
      <div className="border-[#ABABAB] w-fit  border-2 bg-transparent rounded-xl px-4 text-sm cursor-pointer">
        Testimonials
      </div>
      <div className=" text-4xl leading-snug text-center lg:text-5xl font-bold mb-8">
        Events That <span className="txt-landing-blue">Trusted</span> Us
      </div>
      <div className="hidden lg:block pointer-events-none ">
        <img src="testimonial.png" alt="" />
      </div>
      <div className="lg:hidden pointer-events-none">
        <img src="testimonial-phone.png" alt="" />
      </div>
    </section>
  );
}

export default Testimonial;
