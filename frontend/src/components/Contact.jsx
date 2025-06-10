import React from "react";
import email from "../assets/images/emailicon.png";
import phone from "../assets/images/phoneicon.png";
import address from "../assets/images/addressicon.png";
function Contact() {
  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-b from-white to-[#7850FA] font-sans mt-14"
    >
      {/* Header */}
      <div className="text-center py-16 h-[350px]">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Sign Up For <span className="text-[#7850FA]">Free</span> Today
        </h1>
        <div className="text-gray-600 mt-4 text-lg">
          <p>Simple for you. Seamless for them. Loved by</p>
          <p>organizers and attendees alike.</p>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-[#2C3ED3] text-white px-6 py-2 rounded-[20px] font-medium hover:bg-[#2C3ED9]">
            Get Started
          </button>
          <button className="border border-gray-400 px-6 py-2 rounded-[20px] text-black font-medium">
            Learn More
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-[#7850FA] py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 justify-between">
          {/* Left Contact Info */}
          <div className="max-w-md">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="text-sm mb-6">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>

            {/* Email */}
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-white text-[#7850FA] rounded-full mr-4 text-xl">
                <img src={email} alt="email" />
              </div>
              <div>
                <p className="text-sm">Email</p>
                asksolutionheap@gmail.com
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-white text-[#7850FA] rounded-full mr-4 text-xl">
                <img src={phone} alt="phone" />
              </div>
              <div>
                <p className="text-sm">Phone</p>
                <p>+91 6261677451</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-white text-[#7850FA] rounded-full mr-4 text-xl">
                <img src={address} alt="location" />
              </div>
              <div>
                <p className="text-sm">Address</p>
                <p>Jabalpur Engineering College, Hostel No. 8</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white text-black rounded-[20px] p-8 shadow-md w-full md:w-[449px]">
            <h2 className="text-xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7850FA] bg-white"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7850FA] bg-white"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm">Phone</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7850FA] bg-white"
                    onInput={(e) => {
                      // Allow only digits and trim to 10 characters max
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm">Message</label>
                <input
                  type="text"
                  placeholder="Your Message..."
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7850FA] bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium hover:bg-blue-700 transition"
              >
                ✈️ Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
