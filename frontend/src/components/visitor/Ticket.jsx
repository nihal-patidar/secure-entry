import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
import { Share2, DownloadIcon } from "lucide-react";

// --- SVG Icon Components ---
const ArrowLeftIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
);

const SettingsIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
);

const MapPinIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
);

const CalendarIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

const StarIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const QrCodePlaceholder = ({ qrHtml, className }) => (
    <div className={className}>
      {qrHtml ? (
          <div dangerouslySetInnerHTML={{ __html: qrHtml }} className="w-full h-full" />
      ) : (
          // fallback SVG illustrated QR if none
          <svg viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="152" height="152" fill="white"/>
            <rect x="8" y="8" width="48" height="48" fill="black"/>
            <rect x="16" y="16" width="32" height="32" fill="white"/>
            <rect x="24" y="24" width="16" height="16" fill="black"/>
            <rect x="96" y="8" width="48" height="48" fill="black"/>
            <rect x="104" y="16" width="32" height="32" fill="white"/>
            <rect x="112" y="24" width="16" height="16" fill="black"/>
            <rect x="8" y="96" width="48" height="48" fill="black"/>
            <rect x="16" y="104" width="32" height="32" fill="white"/>
            <rect x="24" y="112" width="16" height="16" fill="black"/>
            <rect x="72" y="8" width="8" height="8" fill="black"/>
            <rect x="72" y="24" width="8" height="8" fill="black"/>
            <rect x="72" y="40" width="8" height="8" fill="black"/>
            <rect x="8" y="72" width="8" height="8" fill="black"/>
            <rect x="24" y="72" width="8" height="8" fill="black"/>
            <rect x="40" y="72" width="8" height="8" fill="black"/>
            <rect x="72" y="72" width="8" height="8" fill="black"/>
            <rect x="88" y="72" width="8" height="8" fill="black"/>
            <rect x="104" y="72" width="8" height="8" fill="black"/>
            <rect x="120" y="72" width="8" height="8" fill="black"/>
            <rect x="136" y="72" width="8" height="8" fill="black"/>
            <rect x="72" y="88" width="8" height="8" fill="black"/>
            <rect x="72" y="104" width="8" height="8" fill="black"/>
            <rect x="88" y="96" width="8" height="8" fill="black"/>
            <rect x="104" y="88" width="8" height="8" fill="black"/>
            <rect x="120" y="96" width="8" height="8" fill="black"/>
            <rect x="136" y="88" width="8" height="8" fill="black"/>
            <rect x="72" y="120" width="8" height="8" fill="black"/>
            <rect x="88" y="136" width="8" height="8" fill="black"/>
            <rect x="104" y="120" width="8" height="8" fill="black"/>
            <rect x="120" y="136" width="8" height="8" fill="black"/>
            <rect x="136" y="120" width="8" height="8" fill="black"/>
          </svg>
      )}
    </div>
);

// --- InvitationCard Modern UI ---
const InvitationCard = ({ data }) => {
  const cardRef = useRef(null);
  const [error, setError] = useState(null);
//   const navigate = useNavigate();

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const rect = cardRef.current.getBoundingClientRect();
      const padding = 40; // extra space around ticket

      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "transparent",
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        pixelRatio: 3,
        style: {
          transform: `translate(${padding}px, ${padding}px)`,
          transformOrigin: "top left"
        }
      });
        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "ticket.png", { type: "image/png" });
          await navigator.share({
            title: "Check this ticket!",
            text: "I found this ticket interesting.",
            files: [file],
          });
        } else {
          downloadImage(dataUrl);
        }
      } catch (error) {
        setError("Error sharing the ticket.");
      }
    } else {
      setError("Ticket reference not found!");
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

  // Extracting relevant data:
  const service = data?.serviceData || {};
  const visitor = data?.visitorData || {};

  return (
      <div className="ticketpage min-h-screen absolute right-0 left-0 top-0 -bottom-32 bg-gradient-to-br from-[#b45309] via-[#9a3412] to-[#7f1d1d]  flex flex-col" style={{fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif"}}>
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between text-white mb-8 px-2 pt-4">
            {/* <button className="p-2" onClick={() => { navigate(-1); if(data.setActiveStep) data.setActiveStep(0); }}>
              <ArrowLeftIcon className="h-6 w-6" />
            </button> */}
            {/* <div className="flex items-start gap-2">
              <SettingsIcon className="h-5 w-5" />
              <h1 className="text-xl font-semibold">SecureEntry</h1>
            </div> */}
            <div className="w-10"></div>
          </header>

          {/* PREMIUM GOLDEN TICKET */}
          <main ref={cardRef} className="relative overflow-hidden mx-2" style={{ minWidth: '340px' }}>
            {/* Golden gradient background with texture */}
            <div className="bg-gradient-to-br from-[#FDE04D] via-[#FDE688] to-[#F97C1F] rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 ">
                {/* <div className="absolute top-6 left-4 w-8 h-8  text-amber-600 font-bold  text-2xl  rounded-full">S</div> */}
                {/* <div className="absolute top-8 right-8 w-6 h-6 border-2 border-amber-600 rounded-full">h</div>
                <div className="absolute bottom-12 left-8 w-4 h-4 border-2 border-amber-600 rounded-full">h</div>
                <div className="absolute bottom-8 right-12 w-6 h-6 border-2 border-awhite rounded-full">h</div> */}
              </div>
              
              {/* Premium header section */}
              <div className="relative z-10 pt-8 px-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex gap-1">
                    <StarIcon className="h-5 w-5 text-amber-900" />
                    <StarIcon className="h-5 w-5 text-amber-900" />
                    <StarIcon className="h-5 w-5 text-amber-900" />
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold tickettext-primary mb-2 leading-tight" style={{fontFamily: "'Inter', sans-serif", letterSpacing: '-0.025em'}}>
                    {service.service_name || "EXCLUSIVE EVENT"}
                  </h2>
                  <div className="inline-block ticket-primary text-amber-100 px-4 py-2 rounded-full text-md font-semibold" style={{letterSpacing: '0.1em'}}>
                    {/* {service.service_type === "Pass" ? "VIP PASS" : "PREMIUM ENTRY"} */}
                    Secure Entry
                  </div>
                </div>

                {/* Event details in elegant boxes */}
                <div className="space-y-3 mb-6">
                  <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-4 border border-amber-600">
                    <div className="flex items-center gap-3 ">
                      <MapPinIcon className="h-5 w-5 tickettext-primary" />
                      <p className="text-md font-semibold tickettext-primary">{service.service_address || "Address not specified"}</p>
                    </div>
                    
                  </div>
                  
                  {
                //   service.event_date
                true
                   && (
                    <div className="">
                      <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-4 border border-amber-600">
                        <div className="flex items-center gap-2 ">
                          <CalendarIcon className="h-4 w-4 tickettext-primary" />
                          <div>
                            <p className="text-xs tickettext-primary font-medium text-start">DATE</p>
                            <p className="text-md font-semibold tickettext-primary">{service.service_live_date || "dd/mm/yy"}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* {
                    //   service.ticket_validity
                      true
                       && (
                        <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-4 border border-amber-600">
                          <div className="flex items-center gap-2 ">
                            <CheckCircleIcon className="h-4 w-4 tickettext-primary" />
                            <div>
                              <p className="text-xs tickettext-primary font-medium text-start">VALID</p>
                              <p className="text-md font-semibold tickettext-primary">{service.ticket_validity} hrs</p>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  )}
                </div>
              </div>

              {/* Price section with gold accent */}
              <div className="relative z-10 px-6 pb-6 mt-5">
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <p className="text-xs font-medium opacity-90">PRICE</p>
                    <p className="text-2xl font-black" style={{fontFamily: "'Inter', sans-serif"}}>{service.price ? `₹${service.price}` : "FREE"}</p>
                  </div>
                  <div className="text-right flex gap-3 items-center">
                    {/* <p className="text-md text-amber-700 font-bold">TICKET ID</p>
                    <p className="text-md font-bold text-amber-900" style={{fontFamily: "'Inter', sans-serif"}}>{visitor.vis_id ? `#${visitor.vis_id}` : "#001"}</p> */}
                    <div className="tickettext-primary text-start ">
                    <p>Validity - <span className="font-semibold">{service.ticket_validity} hrs</span></p>
                    <p>Type - <span className="font-semibold">{service.service_type}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elegant separator with decorative elements */}
              <div className="relative px-6 my-6">
                <div className="absolute left-0 top-1/2 h-6 w-6 rounded-full bg-red-800 transform -translate-x-1/2 -translate-y-1/2 "></div>
                
                <div className="absolute right-0 top-1/2 h-6 w-6 rounded-full   transform translate-x-1/2 -translate-y-1/2 bg-red-800"></div>

                <div className="flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-900 to-transparent"></div>
                  <div className="flex gap-2 px-4">
                    <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-900 to-transparent"></div>
                </div>
              </div>

              {/* QR code section with premium styling */}
              <div className="relative z-10 px-6 pb-8 text-center">
                <div className="flex justify-center mb-6">
                  <div id="qr-container" className="relative">
                    <div className="w-48 h-56 mx-auto bg-white rounded-2xl shadow-xl p-1  border-4 border-amber-500 flex flex-col justify-center items-center">
                        <div className="text-sm font-bold tickettext-primary mb-2" style={{fontFamily: "'Inter', sans-serif"}}>{visitor.vis_id ? `#${visitor.vis_id}` : ""}</div>
                        <div className="px-6 ">
                      <QrCodePlaceholder qrHtml={visitor.qrData} className="w-full h-full rounded-lg mb-0" />
                      </div>
                    <div className="text-center tickettext-primary text-md font-bold whitespace-nowrap mb-1">
                      Secure Entry
                    </div>
                    </div>
                  </div>
                </div>
                
                {/* <div className="mb-6 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-amber-300">
                  <p className="text-xs text-amber-700 font-medium mb-1">ENTRY CODE</p>
                  <p className="text-xl font-black text-amber-900" style={{fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace", letterSpacing: '0.15em'}}>{visitor.ticket_code || "SECURE001"}</p>
                </div> */}
                
                <div className=" ticket-primary text-amber-100 rounded-xl p-4 text-center">
                  <p className="text-sm font-medium leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                    {service.service_discription || "Experience an exclusive premium event."}
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Footer Buttons */}
          <footer className="mx-2 mt-6 grid grid-cols-2 gap-4 bg-[#c2410c] px-6 py-6 rounded-3xl shadow-xl">
            {service.service_type === "Pass" ? (
                <button
                    className="py-3 px-6 rounded-xl border-2 border-amber-300 text-white font-semibold hover:bg-amber-600 hover:bg-opacity-20 transition-all duration-300 flex justify-center items-center gap-2 backdrop-blur-sm"
                    style={{fontFamily: "'Inter', sans-serif"}}
                    onClick={downloadQR}
                >
                  <DownloadIcon size={20} /> Download QR
                </button>
            ) : (
                <button
                    className="py-3 px-6 rounded-xl border-2 border-amber-300 text-white font-semibold hover:bg-amber-600 hover:bg-opacity-20 transition-all duration-300 flex justify-center items-center gap-2 backdrop-blur-sm"
                    style={{fontFamily: "'Inter', sans-serif"}}
                    onClick={handleShare}
                >
                  <Share2 size={20} /> Share Ticket
                </button>
            )}
            <button
  className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-300 ticket-primary font-bold hover:from-amber-200 hover:to-yellow-200 transition-all duration-300 flex justify-center items-center gap-2 shadow-lg"
  style={{ fontFamily: "'Inter', sans-serif" }}
  onClick={async () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const padding = 40; // extra space around ticket

      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "transparent",
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        pixelRatio: 3,
        style: {
          transform: `translate(${padding}px, ${padding}px)`,
          transformOrigin: "top left"
        }
      });

      downloadImage(dataUrl);
    }
  }}
>
  <DownloadIcon size={20} /> Download Ticket
</button>


          </footer>
        </div>
      </div>
  );
};

export default InvitationCard;