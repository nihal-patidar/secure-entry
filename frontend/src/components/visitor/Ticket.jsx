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

const QrCodePlaceholder = ({ qrHtml, className }) => (
    <div className={className}>
      {qrHtml ? (
          <div dangerouslySetInnerHTML={{ __html: qrHtml }} style={{ width: "100%", height: "100%" }} />
      ) : (
          // fallback SVG illustrated QR if none
          <svg viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* ...as above... */}
          </svg>
      )}
    </div>
);

// --- InvitationCard Modern UI ---
const InvitationCard = ({ data }) => {
  const cardRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current);
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
      <div className="min-h-screen w-full bg-gradient-to-b from-purple-600 to-blue-600 font-inter p-4 flex flex-col" style={{fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif"}}>
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between text-white mb-8 px-2 pt-4">
            <button className="p-2" onClick={() => { navigate(-1); if(data.setActiveStep) data.setActiveStep(0); }}>
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <h1 className="text-xl font-semibold">SecureEntry</h1>
            </div>
            <div className="w-10"></div>
          </header>

          {/* TICKET */}
          <main ref={cardRef} className="bg-white rounded-t-3xl shadow-2xl overflow-hidden relative mx-4">
            <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-br-full"></div>
            <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-bl-full"></div>

            <div className="pt-8 px-8 pb-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-gray-700 mb-2 tracking-tight" style={{fontFamily: "'Inter', sans-serif"}}>
                  {service.service_name || "Event Name"}
                </h2>
                <p className="text-gray-400 text-lg font-medium tracking-wide" style={{fontFamily: "'Inter', sans-serif"}}>
                  {service.service_type === "Pass" ? "Pass Entry" : "Event Entry"}
                </p>
              </div>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-base font-semibold tracking-wide">{service.service_address || "Address not specified"}</span>
                </div>
                {service.event_date && (
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-semibold tracking-wide">{service.event_date}</span>
                    </div>
                )}
                {service.ticket_validity && (
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-semibold tracking-wide">Validity : {service.ticket_validity} hrs</span>
                    </div>
                )}
              </div>
            </div>

            {/* Price and seat/ID */}
            <div className="px-8 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-orange-500" style={{fontFamily: "'Inter', sans-serif"}}>{service.price ? `${service.price} Rs.` : ""}</span>
                {/* <span className="text-3xl font-black text-gray-600" style={{fontFamily: "'Inter', sans-serif"}}>{visitor.vis_id ? `#${visitor.vis_id}` : ""}</span> */}
              </div>
            </div>

            {/* Dashed line separator (with cutouts) */}
            <div className="relative px-8">
              <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-b from-purple-600 to-blue-600 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute right-0 top-0 h-8 w-8 rounded-full bg-gradient-to-b from-purple-600 to-blue-600 translate-x-1/2 -translate-y-1/2"></div>
              <div className="border-t-2 border-dashed border-gray-300"></div>
            </div>

            {/* QR code */}
            <div className="px-8 py-8 text-center">
              <div className="flex justify-center mb-6">
                <div id="qr-container" className="w-32 h-32 mx-auto bg-white rounded-lg">
                  <QrCodePlaceholder qrHtml={visitor.qrData} className="w-full h-full" />
                  {/* <p className="text-center mt-2 text-xs font-semibold text-blue-600">SecureEntry</p> */}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-black text-gray-600" style={{fontFamily: "'Inter', sans-serif"}}>{visitor.vis_id ? `#${visitor.vis_id}` : ""}</span>
                {/* <p className="text-2xl font-black tracking-widest text-gray-800" style={{fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"}}>{visitor.ticket_code || "TICKET CODE"}</p> */}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium" style={{fontFamily: "'Inter', sans-serif"}}>
                {service.event_description || "Showcase your programming skills and innovative ideas."}
              </p>
            </div>
          </main>

          {/* Footer Buttons */}
          <footer className="mx-4 grid grid-cols-2 gap-4 bg-gradient-to-b from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl">
            {service.service_type === "Pass" ? (
                <button
                    className="py-3 px-6 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
                    style={{fontFamily: "'Inter', sans-serif"}}
                    onClick={downloadQR}
                >
                  <DownloadIcon size={20} /> Download QR
                </button>
            ) : (
                <button
                    className="py-3 px-6 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
                    style={{fontFamily: "'Inter', sans-serif"}}
                    onClick={handleShare}
                >
                  <Share2 size={20} /> Share Ticket
                </button>
            )}
            <button
                className="py-3 px-6 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
                style={{fontFamily: "'Inter', sans-serif"}}
                onClick={async () => {
                  if (cardRef.current) {
                    const dataUrl = await toPng(cardRef.current);
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
