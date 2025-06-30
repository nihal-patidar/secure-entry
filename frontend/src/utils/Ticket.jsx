import { ArrowLeft, Settings, MapPin, Calendar, Clock } from "lucide-react";
import {useNavigate } from "react-router-dom";

export default function EventTicket({
  eventName = "Event Name",
  eventEntry = "Event Entry",
  address = "123, Any Street, Anycity, Any State",
  date = "12 June 2025",
  time = "12:00PM",
  validity = "6 hrs",
  price = "20 Rs.",
  serialNumber = "#40",
  qrCode = "ABC123",
  description = "A 36 Hour held by Jabalpur Engineering college. Showcase your programming skills and innovative ideas.",
}) {
  const navigate = useNavigate();
  const handleNavigationButton = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600  to-blue-500 p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-8">
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={handleNavigationButton}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            SecureEntry
          </span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Ticket Card Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm">

          {/* Main Ticket Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Event Details Section */}
            <div className="relative flex justify-between w-full">
              <div className="bg-[#8326d4]">
                <div className="relative w-8 h-8 bg-[url('./assets/images/Ellipse44.png')] bg-center z-50"></div>
              </div>
              <div className="bg-[#8326d4]">
                <div className="relative w-8 h-8 bg-[url('./assets/images/Ellipse44.png')] bg-center z-50"></div>
              </div>
            </div>
            <div className="px-8 py-8 pb-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                  {eventName}
                </h1>
                <p className="text-gray-500 text-base font-medium">
                  {eventEntry}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-relaxed flex-1">
                    {address}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    {date}, {time}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    Validity: {validity}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-2xl">
                  {price}
                </span>
                <span className="text-gray-600 font-semibold text-lg">
                  {serialNumber}
                </span>
              </div>
            </div>

            {/* Dashed separator with side circles */}
            <div className="relative m-0 p-0">
              <div className="border-t-4 border-dashed border-gray-300 mx-8"></div>
              <div className="absolute -left-4 top-0 w-8 h-8 bg-[#8326d4] rounded-full transform -translate-y-4 shadow-lg"></div>
              <div className="absolute -right-4 top-0 w-8 h-8 bg-[#8326d4] rounded-full transform -translate-y-4 shadow-lg"></div>
            </div>

            {/* QR Code Section */}
            <div className="px-8 py-8 pt-12 text-center">
              <div className="mb-6">
                {/* Enhanced QR Code */}
                <div className="w-36 h-36 mx-auto bg-black relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-800 mb-6 tracking-[0.3em] font-mono">
             QR Code
              </div>

              <p className="text-gray-500 text-sm leading-relaxed px-2 font-medium">
                {description}
              </p>
            </div>
            <div className="relative flex justify-between w-full ">
              <div className="bg-[#8326d4]">
                <div className="relative rounded-full w-8 h-8 bg-[url('./assets/images/Ellipse44.png')] bg-center z-50"></div>
              </div>
              <div className="bg-[#8326d4]">
                <div className="relative w-8 h-8 bg-[url('./assets/images/Ellipse44.png')] bg-center z-50"></div>
              </div>
            </div>

            {/* Bottom decorative elements */}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 max-w-sm mx-auto w-full">
        <button className="flex-1 bg-transparent border-2 border-white/80 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
          Share Ticket
        </button>
        <button className="flex-1 bg-white text-purple-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
          Download Ticket
        </button>
      </div>
    </div>
  );
}
