import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventImg from "../../assets/serviceimg/codekumbh.png";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import addFiles from "../../assets/images/undraw_add-files_d04y.svg";
import FormDetails from "./FormDetails";
import { useNavigate } from "react-router-dom";

/*
service_data:

service_address:"JEC"
service_image_url: "https://storage.googleapis.com/e-validation-2.appspot.com/codekumbh.png"
service_name: "Codekumbh"
service_type: "Ticket"
ticket_price: 0
ticket_validity: 3
valid_scans: 1
validater_list: []
__v: 0
_id: "68557705dfa0ab47cb0df6ae"
*/

const InfoForm = ({serviceId, service}) => {
  const [formCreated, setFormCreated] = useState(false);

  const navigate = useNavigate() 

  const handleCreateForm = () => {
    /* form handle code*/
    navigate(`/home/services/${serviceId}/build-form`)

    setFormCreated(true);
  };
  

  return (
    <>
      <div className=" w-full h-fit bg-white border border-[#EAEAEA] rounded-xl  mx-auto  mb-14 ">
        <div className="infoform w-full h-fit  border-b border-b-[#EDEDED] rounded-t-xl flex lg:flex-row flex-col">
          <div className="info lg:w-[50%] w-[100%] pb-6 border-r  border-r-[#EDEDED]  ">
            <div className="bg-blue-400 rounded-tr-xl sm:rounded-tl-xl bg-[url('/blueback.jpg')] bg-cover bg-center">
            <img
              src={service?.service_image_url}
              alt="eventImg"
              className="w-full h-48  object-center object-contain rounded-t-xl sm:rounded-tl-xl "
            />
            </div>
            <div className="p-6">
              <h3 className="text-[#2D2D2D] text-2xl sm:text-3xl font-medium mb-5  ">
                {service.service_name}
              </h3>

              <div className="grid grid-cols-2 gap-10 ultrawide:grid-cols-3 justify-between divide-x divide-[#D8D8D8] pb-8 ">
                <div className=" text-start ">
                  <div className="flex gap-2 items-center">
                    <CalendarDaysIcon className="w-4 text-[#717171]" />
                    <p className="text-[#717171] text-sm sm:text-base">12 June 2025, 3:00 PM</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <MapPinIcon className="w-4 text-[#717171]" />
                    <p className="text-[#717171] text-sm sm:text-base">{service.service_address}</p>
                  </div>
                </div>
                <div className="text-center ">
                  <p className="text-[12px] sm:text-sm font-semibold tracking-wider text-[#717171] ">
                    Validity
                  </p>
                  <p className="text-secondary text-xl sm:text-2xl font-semibold ">{service.ticket_validity} Hours</p>
                </div>
                <div className="text-center  ">
                  <p className="text-[12px] sm:text-sm font-semibold tracking-wider text-[#717171]">
                    Ticket Price
                  </p>
                  <p className="text-secondary text-xl sm:text-2xl font-semibold">{service.ticket_price} Rs</p>
                </div>
              

              
                <div className="text-center ">
                  <p className="text-[12px] sm:text-sm font-semibold tracking-wider text-[#717171] ">
                    Validators
                  </p>
                  <p className="text-secondary text-xl sm:text-2xl font-semibold">{service.validater_list?.length}</p>
                </div>
                <div className="text-center ">
                  <p className="text-[12px] sm:text-sm font-semibold tracking-wider text-[#717171] ">
                    Valid Scans
                  </p>
                  <p className="text-secondary text-xl sm:text-2xl font-semibold">{service.valid_scans} </p>
                </div>
                <div className="text-center">
                  <p className="text-[12px] sm:text-sm font-semibold tracking-wider text-[#717171] ">
                    Type
                  </p>
                  <p className="text-secondary text-xl sm:text-2xl font-semibold">
                    {service.service_type} 
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="form lg:w-[50%] w-[100%]  text-center py-6 px-8">
            <h3 className="text-[rgb(75,75,75)] text-2xl font-semibold mb-3 ">
              Form & QR
            </h3>
            <hr />

            {!formCreated && (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <img src={addFiles} alt="No form" className="w-28 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No Form Created</h2>
                <p className="text-gray-500 text-lg mb-6 px-10">
                  You can edit details after it's created.
                </p>
                <button
                  className="button-primary "
                  onClick={() => handleCreateForm()}
                >
                  Create Form
                </button>
              </div>
            )}



            {formCreated && 
            <FormDetails 
            serviceId={serviceId} 
            formData={service.formData}
            formUrl={service.service_url}
            formQr={service.service_qr}
            formId={service._id} />}


          </div>
        </div>

        <div className="w-full h-auto   px-12 py-8  rounded-b-xl bg-white">
          <p className="text-secondary font-semibold mb-2">About Event</p>
          <p>{service?.service_discription}</p>   
        </div>
      </div>
    </>
  );
};

export default InfoForm;
