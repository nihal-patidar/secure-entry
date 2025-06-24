import React, { useState, useEffect, useContext, useMemo, memo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../axiosConfig.js";
import InfoForm from "../components/services-new/InfoForm";
import Overview from "../components/services-new/Overview";
import { toast } from "react-toastify";
import AddDataToValid from "../components/services-new/AddDataToValid.jsx";
import ValidatorDetailsData from "../components/services-new/ValidatorDetailsData.jsx";
import BouncingDotsLoader from "../components/small/BouncingDotsLoader.jsx";
import { ServiceContext } from "../context/ServiceContext.jsx";

const ServiceDetails = () => {
  const token = useMemo(() => localStorage.getItem("userData"), []);
  const navigate = useNavigate();
  const location = useLocation();
  const { visitors } = location.state || {};
  const { serviceId } = useParams();

  const { service, setService } = useContext(ServiceContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const shouldFetch =
      !service ||
      Object.keys(service).length === 0 ||
      !(serviceId in service) ||
      location.state?.updated;

    if (shouldFetch) {
      fetchService();
    }
  }, [serviceId, service, location.state]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/service/getThisService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response?.data?.service_data;
      if (data && Object.keys(data).length > 0) {
        setService((prev) => ({
          ...prev,
          [serviceId]: data,
        }));
      } else {
        setService((prev) => ({ ...prev, [serviceId]: -1 }));
      }

      if (location.state?.updated) {
        // Replace state to remove stale `updated`
        setTimeout(() => {
          navigate(location.pathname, { replace: true, state: {} });
        }, 0);
      }

      console.log("Service details fetched");
    } catch (err) {
      toast.warning(
        <CustomToast
          message={err.response?.data?.msg || "Failed to fetch service"}
        />
      );
      setError(err);
    }
  };

  const handleUpdateService = () => {
    navigate(`/home/services/${serviceId}/update`, {
      state: { service, updated: false },
    });
  };

  const serviceData = service?.[serviceId];

  return (
    <>
      {serviceData && Object.keys(serviceData).length > 0 && !error && serviceData !== -1 ? (
        <div className="flex absolute right-7 left-12 h-[90%] ml-16 gap-8 mt-8">
          <div className="w-full bg-[#F2F3F9] rounded-3xl pt-6 border border-[#EAEAEA]">
            <div className="flex justify-between items-center mb-8 lg:mx-14 mx-7">
              <h3 className="text-[#5621FF] text-xl md:text-2xl font-medium">
                {serviceData.service_name}
              </h3>
              <button
                onClick={handleUpdateService}
                className="button-primary scale-90 md:scale-100"
              >
                Update
              </button>
            </div>

            <div className="w-full h-[85%] overflow-y-scroll lg:px-14 px-3 flex flex-col gap-10 items-center">
              <InfoForm serviceId={serviceId} service={serviceData} />
              <Overview serviceId={serviceId} visitors={visitors} />
              <AddDataToValid serviceId={serviceId} />
              <ValidatorDetailsData serviceId={serviceId} />
            </div>
          </div>
        </div>
      ) : (!service || Object.keys(service).length === 0 || !(serviceId in service)) ? (
        <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
          <div className="z-10 absolute left-[50%] top-[50%] flex justify-center items-center">
            <BouncingDotsLoader />
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
          <p className="text-center text-red-500 text-3xl">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      ) : serviceData === -1 ? (
        <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
          <p className="text-center text-gray-500 text-3xl">
            No service details available.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default memo(ServiceDetails);
