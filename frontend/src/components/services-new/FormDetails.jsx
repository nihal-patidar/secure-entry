import React, { useState, useEffect } from "react";
import api from "../../../axiosConfig.js";
import { toast } from "react-toastify";
import { devLog } from "../../../devLog.js";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // or 'airbnb', 'light', etc.
import QR from '/QR image.png'
import QRpreView from "../services/QRpreView.jsx";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { MapPinIcon, CalendarDaysIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon, QrCodeIcon } from "@heroicons/react/24/outline";

 

/*
formData={ele.formData}
  formUrl={ele.service_url}
  formQr={ele.service_qr}
  formId={ele._id}
   */

const FormDetails = ({
  serviceId,
  service,
  formData,
  formUrl,
  formQr,
  formId
  
}) => {


  const token = localStorage.getItem("userData");
  const [livedate, setLiveDate] = useState(new Date());
  const [closingdate, setClosingDate] = useState(new Date());
  const [liveeditable, setLiveEditable] = useState(false);
  const [closingeditable, setClosingEditable] = useState(false);
  

  const navigate = useNavigate()

const downloadQR = () => {
    const qrElement = document.getElementById("qr-container");
    html2canvas(qrElement, { backgroundColor: "#ffffff" }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "secureEntry_qr.png";
      link.click();
    });
  };

  
  useEffect(() => {
            fetchFormData();
        }, [serviceId]);
    
        const fetchFormData = async () => {
            try {
                
                const response = await api.get(`/service/getFormData/${serviceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                devLog.log(response)
              // setFormData(response.data.service_data);
            } catch (err) {
                toast.warning(err.response?.data?.msg || "Failed to fetch Form Data");
            }
        };


  return (
    <>
    
     <div className="flex laptop:flex-row gap-4 flex-col justify-between mt-8 mb-10 px-4">
  {/* Date and Location Info */}
  <div className="flex-1 space-y-4">
    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
      <CalendarDaysIcon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-gray-700 text-sm sm:text-base font-semibold">
          Form Starting Date:
        </p>
        <span className="text-gray-600 font-normal text-sm sm:text-base">
          {service?.form_live_date || 'Not specified'}
        </span>
      </div>
    </div>
    
    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
      <CalendarDaysIcon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-gray-700 text-sm sm:text-base font-semibold">
          Form Closing Date:
        </p>
        <span className="text-gray-600 font-normal text-sm sm:text-base">
          {service?.form_close_date || 'Not specified'}
        </span>
      </div>
    </div>
  </div>
</div>
      

      <div className="qrpart flex flex-col laptop:flex-row  justify-around items-   ">
              <div className="laptop:w-[50%] flex-col w-full  ">
                <div className="w-fit h-[170px] m-auto mb-3 flex-col items-center justify-center border-2  border-gray-400 p-1 ">
                    {/* <img className="m-auto" width="120px"  src={QR} alt="" /> */}
                    <QRpreView formQr={formQr} />
                    {/* <span className="text-secondary text-sm ">SecureEntry</span> */}
                </div>
                <button onClick={downloadQR} className="button-secondary mb-3">Download QR</button>
                <p className="text-[#545454] text-sm ">*Note : QR code to fill the form</p>
              </div>

              <div className=" laptop:w-[50%] w-full p-5 px-7 font-semibold tracking-wide ">
                <button
                onClick={()=>{
                  navigate(`/home/services/${serviceId}/update-form`)
                }}
                className="w-full mb-3 
    button-secondary-outline lg:text-sm  md:text-sm sm:text-sm  ultrawide:text-base whitespace-nowrap">Update Form</button>
                <button
                onClick={()=>{
                  // navigate(`/home/services/${serviceId}/form-prev`)
                  navigate(`/form/${serviceId}`)
                }}
                className="w-full mb-3 
    button-secondary-outline lg:text-sm  md:text-sm sm:text-sm  ultrawide:text-base whitespace-nowrap">Preview Form</button>
                <button
                onClick={()=>{
                  navigate(`/home/services/${serviceId}/ticket-prev`)
                }}
                className="w-full mb-3 
    button-secondary-outline lg:text-sm  md:text-sm sm:text-sm  ultrawide:text-base whitespace-nowrap">Customize Ticket</button>
              </div>
      </div>
    
    </>
  );
};

export default FormDetails;
