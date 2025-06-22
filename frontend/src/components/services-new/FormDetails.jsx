import React, { useState, useEffect } from "react";
import api from "../../../axiosConfig.js";
import { toast } from "react-toastify";

import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // or 'airbnb', 'light', etc.
import QR from '/QR image.png'
import QRpreView from "../services/QRpreView.jsx";
import { useNavigate } from "react-router-dom";

/*
formData={ele.formData}
  formUrl={ele.service_url}
  formQr={ele.service_qr}
  formId={ele._id}
   */

const FormDetails = ({
  serviceId,
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
                console.log(response)
              // setFormData(response.data.service_data);
            } catch (err) {
                toast.warning(err.response?.data?.msg || "Failed to fetch Form Data");
            }
        };


  return (
    <>
    
      <div className="flex justify-between mt-8 mb-10 px-4">
        <div>
          <p className="text-sm font-medium tracking-wider text-[#717171]">
            Form Live
          </p>

          <div
            tabIndex={0}
            className="flex items-center pr-0 pl-4  border border-[#C8C8C8] rounded-lg  text-secondary text-center  focus-within:ring-2  focus-within:ring-blue-300  "
          >
            <button onClick={() => setLiveEditable(!liveeditable)} className="">
              {liveeditable ? (
                <BookmarkSquareIcon className="w-5 text-gray-800" />
              ) : (
                <PencilSquareIcon className="w-5 text-gray-800" />
              )}
            </button>
            <Flatpickr
              data-enable-time
              value={livedate}
              onChange={([selected]) => setLiveDate(selected)}
              options={{
                dateFormat: "d-m-Y h:i K",
                minDate: "today",
                time_24hr: false,
                clickOpens: liveeditable,
                defaultDate: "today",
              }}
              readOnly={!liveeditable}
              className="font-semibold focus:outline-none p-2 bg-transparent"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium tracking-wider text-[#717171]">
            Form Live
          </p>

          <div
            tabIndex={0}
            className="flex items-center pr-0 pl-4  border border-[#C8C8C8] rounded-lg  text-secondary text-center  focus-within:ring-2  focus-within:ring-blue-300  "
          >
            <button
              onClick={() => setClosingEditable(!closingeditable)}
              className=""
            >
              {closingeditable ? (
                <BookmarkSquareIcon className="w-5 text-gray-800" />
              ) : (
                <PencilSquareIcon className="w-5 text-gray-800" />
              )}
            </button>
            <Flatpickr
              data-enable-time
              value={closingdate}
              onChange={([selected]) => setClosingDate(selected)}
              options={{
                dateFormat: "d-m-Y h:i K",
                minDate: "today",
                time_24hr: false,
                clickOpens: closingeditable,
                defaultDate: "today",
              }}
              readOnly={!closingeditable}
              className="font-semibold focus:outline-none p-2 bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="qrpart flex justify-around items-center   ">
              <div className="w-[50%] ">
                <div className="w-36 h-fit m-auto mb-3 flex-col items-center justify-center border-2 border-gray-400 p-1">
                    {/* <img className="m-auto" width="120px"  src={QR} alt="" /> */}
                    <QRpreView formQr={formQr} />
                    <span className="text-secondary text-sm ">SecureEntry</span>
                </div>
                <button className="button-secondary mb-3">Download QR</button>
                <p className="text-[#545454] text-sm">*Note : QR code to fill the form</p>
              </div>

              <div className=" w-[50%] p-5 px-7 font-semibold text-lg tracking-wide">
                <button
                onClick={()=>{
                  navigate(`/home/services/${serviceId}/update-form`)
                }}
                className="button-secondary-outline   mb-3 w-full">Update Form</button>
                <button
                onClick={()=>{
                  navigate(`/home/services/${serviceId}/form-prev`)
                }}
                className="button-secondary-outline   mb-3 w-full ">Preview Form</button>
                <button
                onClick={()=>{
                  navigate(`/home/services/${serviceId}/ticket-prev`)
                }}
                className="button-secondary-outline   mb-3 w-full">Customize Ticket</button>
              </div>
      </div>
    
    </>
  );
};

export default FormDetails;
