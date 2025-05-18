import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Share2, AlertCircle, StepBackIcon, ArrowLeft, DownloadIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../small/Logo";
import Slogo from "../small/Slogo";

const InvitationCard = ({ data }) => {
  const cardRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // const service_data = location.state?.service_data || null;

  const handleBackNavigation = () => {
    const confirmBack = window.confirm(
      "Are you sure you want to navigate back?"
    );
    if (confirmBack) {
      navigate(-1); // Navigate back
      data.setActiveStep(0);
    } else {
      // Do nothing
    }
  };

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current);

        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "card.png", { type: "image/png" });

          await navigator.share({
            title: "Check this card!",
            text: "I found this card interesting.",
            files: [file],
          });
        } else {
          downloadImage(dataUrl);
        }
      } catch (error) {
        console.error("Error sharing the card:", error);
      }
    } else {
      alert("Card reference not found!");
    }
  };
  const downloadImage = (dataUrl) => {
    const link = document.createElement("a");
    link.download = "invitation.png";
    link.href = dataUrl;
    link.click();
  };

  const downloadQR = () => {
    const qrElement = document.getElementById("qr-container");
    html2canvas(qrElement, { backgroundColor: "#ffffff" }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "secureEntry_qr.png";
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 overflow-hidden">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <div className="flex">
            <AlertCircle className="h-6 w-6 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      <div
        ref={cardRef}
        className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full transform transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-300 opacity-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')] opacity-10" />
        <div className="relative p-8 space-y-2">
          <div className="mx-auto w-fit px-3">
            {/* <Logo /> */}
            <Slogo />
          </div>

          <h1 className="text-xl font-bold text-center text-indigo-600 animate-fade-in-down">
            Save Ticket For Entry
          </h1>
          <div className="flex flex-col w-full mx-auto items-center space-y-1 text-md font-semibold text-gray-700 font-sans">
            <p className="">Event : {data?.serviceData?.service_name}</p>
            <p className="">Address : {data?.serviceData?.service_address}</p>
            {/* <p className="">
              validity : {data?.serviceData?.ticket_validity} Hours
            </p> */}
            <p className="">Private ID : {data?.visitorData?.vis_id}</p>
          </div>
          {/* <div className="flex justify-center opacity-85 scale-110">
            <div
              style={{ height: "130px", width: "auto" }}
              dangerouslySetInnerHTML={{ __html: data.visitorData.qrData }}
            />
          </div> */}
          <div id="qr-container" className="p-4 pb-2 bg-white rounded-lg relative w-[180px] mx-auto">
            <div
              style={{ height: "130px", width: "auto" }}
              dangerouslySetInnerHTML={{ __html: data.visitorData.qrData }}
            />
            <p className="text-center mt-5 text-sm font-semibold text-blue-600">
              SecureEntry
            </p>
          </div>
          <div className="text-center space-y-2 animate-fade-in mt-5"></div>
        </div>
        <div className="relative flex justify-around bg-indigo-100 p-4">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-fit bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft className="mr-2" />
            Back
          </button>

          {data?.serviceData?.service_type === "Pass" ? 
          
          <button
            onClick={downloadQR}
            className="w-fit bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
          >
            <DownloadIcon className="mr-2" />
            Download QR
          </button>
          :
          <button
            onClick={handleShare}
            className="w-fit bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
          >
            <Share2 className="mr-2" />
            Share
          </button>
          }
        </div>
      </div>
    </div>
  );
};

// const QRCodeComponent = ({ data }) => {
//   const downloadQR = () => {
//     const qrElement = document.getElementById("qr-container");
//     html2canvas(qrElement, { backgroundColor: "#ffffff" }).then((canvas) => {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = "secureEntry_qr.png";
//       link.click();
//     });
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-lg">
//       <div id="qr-container" className="p-4 bg-white rounded-lg relative">
//         <div
//           style={{ height: "130px", width: "auto" }}
//           dangerouslySetInnerHTML={{ __html: data.visitorData.qrData }}
//         />
//         <p className="text-center mt-2 text-sm font-semibold">secureEntry</p>
//       </div>
//       <button
//         onClick={downloadQR}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Download QR Code
//       </button>
//     </div>
//   );
// };

export default InvitationCard;
