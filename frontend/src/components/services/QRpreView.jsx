import { Button } from "@material-tailwind/react";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

const QRpreView = ({ formQr }) => {
  const canvasRef = useRef(null);

  // const downloadQr = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const link = document.createElement("a");
  //     link.href = canvas.toDataURL("image/png");
  //     link.download = "qr-code.png";
  //     link.click();
  //   }
  // };

  // const renderQrToCanvas = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas && formQr) {
  //     const ctx = canvas.getContext("2d");
  //     const svgElement = new DOMParser().parseFromString(formQr, "image/svg+xml").documentElement;

  //     const svgData = new XMLSerializer().serializeToString(svgElement);
  //     const img = new Image();

  //     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  //     const url = URL.createObjectURL(svgBlob);

  //     img.onload = () => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);
  //       URL.revokeObjectURL(url);
  //     };

  //     img.src = url;
  //   }
  // };

  const downloadQR = () => {
    const qrElement = document.getElementById("qr-container");
    html2canvas(qrElement, { backgroundColor: "#ffffff" }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "secureEntry_qr.png";
      link.click();
    });
  };

  // React.useEffect(() => {
  //   if (formQr) renderQrToCanvas();
  // }, [formQr]);

  return (
    <div className="flex justify-center items-center w-full h-28 flex-col">
      <div className="flex flex-col  w-full">
        {formQr ? (
          <div className="flex w-2/3 justify-around h-full items-center">
            {/* <canvas ref={canvasRef} style={{ display: "none" , padding : "10px" , backgroundColor : "white" }} /> */}
            {/* <div
              style={{ height: "150px", width: "auto" }}
              dangerouslySetInnerHTML={{ __html: formQr }}
            /> */}
            <Button
              className="theme-button h-10 w-fit hover:bg-[#D91656]"
              onClick={downloadQR}
            >
              Download
            </Button>

            <div
              id="qr-container"
              className="p-4 pb-2 bg-white rounded-lg w-[180px] mx-auto scale-75 z-0"
            >
              <div
                style={{ height: "130px", width: "auto" }}
                dangerouslySetInnerHTML={{ __html: formQr }}
              />
              <p className="text-center mt-5 text-sm font-semibold text-blue-600">
                SecureEntry
              </p>
            </div>
            
          </div>
        ) : (
          <p>Loading SVG...</p>
        )}
      </div>
    </div>
  );
};

export default QRpreView;
