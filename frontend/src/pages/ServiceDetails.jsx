import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../axiosConfig.js";

import InfoForm from "../components/services-new/InfoForm";
import Overview from "../components/services-new/Overview";
import { toast } from "react-toastify";
import BouncingDotsLoader from "../components/small/BouncingDotsLoader.jsx";
import AddDataToValid from "../components/services-new/AddDataToValid.jsx";
import ValidatorDetailsData from "../components/services-new/ValidatorDetailsData.jsx";

const ServiceDetails = () => {
  const token = localStorage.getItem("userData");
  const navigate = useNavigate();

  const location = useLocation();
  const { visitors } = location.state || {};
  const { serviceId } = useParams();
  const [service, setService] = useState({});

  //"/getThisService/:id"
  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/service/getThisService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setService(response.data.service_data);
    } catch (err) {
      toast.warning(err.response?.data?.msg || "Failed to fetch service");
    }
  };

  const handleUpdateService = () => {
    navigate(`/home/services/${serviceId}/update`);
  };

  return (
    <>
      {Object.keys(service).length > 0 ? (
        <div className="flex  h-[720px] ml-16 mr-6 gap-8 mt-8 ">
          <div className="w-[86%] bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]">
            <div className="flex justify-between align-middle items-center  mb-8 mx-14">
              <h3 className="text-[#5621FF] text-2xl font-medium ">
                {service.service_name}
              </h3>
              <button
                onClick={() => {
                  handleUpdateService();
                }}
                className="button-primary "
              >
                Update
              </button>
            </div>

            <div className="w-full h-[85%] overflow-y-scroll px-14 flex-col  ">
               {/* Info Section */}
            <div className=" rounded-2xl  p-8">
              <InfoForm serviceId={serviceId} service={service} />
            </div>

            {/* Overview */}
            <div className="rounded-2xl  p-4 ">
              <Overview serviceId={serviceId} visitors={visitors} />
            </div>

            {/* Upload validation data */}
            <div className="rounded-2xl  p-8 ">
              <AddDataToValid serviceId={serviceId} />
            </div>

            {/* Validator Table */}
            <div className=" rounded-2xl  p-8 ">
              <ValidatorDetailsData serviceId={serviceId}  />
            </div>
            </div>
          </div>

          <div className="w-[14%]  bg-[#F2F3F9] border border-[#EAEAEA] rounded-3xl ">

          </div>
        </div>
      ) : (
        <div className="flex  h-[720px] ml-16 mr-6 gap-8 mt-8  items-center align-middle justify-center bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]">
          <BouncingDotsLoader />
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
