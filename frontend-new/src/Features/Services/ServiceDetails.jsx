import React, { useState, useEffect, useContext, useMemo, memo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../axiosConfig.js";
import InfoForm from "../Forms/InfoForm.jsx";
import Overview from "./Overview";
import { toast } from "react-toastify";
import AddDataToValid from "./AddDataToValid.jsx";
import ValidatorDetailsData from "./ValidatorDetailsData.jsx";
import BouncingDotsLoader from "../../components/small/BouncingDotsLoader.jsx";
import { ServiceContext } from "../../context/ServiceContext.jsx";

const ServiceDetails = () => {
  const token = useMemo(() => localStorage.getItem("userData"), []);
  const navigate = useNavigate();
  const location = useLocation();
  const { visitors } = location.state || {};
  const { serviceId } = useParams();

  const { service, setService } = useContext(ServiceContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const serviceData = service?.[serviceId];

  useEffect(() => {
    const shouldFetch =
      !service ||
      Object.keys(service).length === 0 ||
      !(serviceId in service) ||
      location.state?.updated;

    console.log("=== [ServiceDetails - useEffect] ===");
    console.log("Token:", token);
    console.log("Location state:", location.state);
    console.log("Service context:", service);
    console.log("ServiceId param:", serviceId);
    console.log("ServiceData from context:", serviceData);
    console.log("Should fetch from backend:", shouldFetch);
    console.log("===================================");

    if (shouldFetch) {
      fetchService();
    } else {
      setIsLoading(false);
    }
  }, [serviceId, service, location.state]);

  const fetchService = async () => {
    setIsLoading(true);
    try {
      console.log("⏳ Fetching service from backend...");
      const response = await api.get(`/service/getThisService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response?.data?.service_data;
      console.log("✅ Fetched service data:", data);

      if (data && Object.keys(data).length > 0) {
        setService((prev) => {
          const updated = {
            ...prev,
            [serviceId]: data,
          };
          console.log("🧠 Setting updated service context:", updated);
          return updated;
        });
      } else {
        console.warn("⚠️ Service returned empty. Marking as not found.");
        setService((prev) => ({ ...prev, [serviceId]: -1 }));
      }

      if (location.state?.updated) {
        console.log("🔁 Resetting location state...");
        setTimeout(() => {
          navigate(location.pathname, { replace: true, state: {} });
        }, 0);
      }
    } catch (err) {
      console.error("❌ Error fetching service:", err);
      toast.warning(err.response?.data?.msg || "Failed to fetch service");
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateService = () => {
    console.log("📝 Navigating to update page for:", serviceId);
    navigate(`/home/services/${serviceId}/update`, {
      state: { service, updated: false },
    });
  };

  // === Conditional Rendering ===
  if (isLoading) {
    return (
      <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
        <div className="z-10 absolute left-[50%] top-[50%] flex justify-center items-center">
          <BouncingDotsLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
        <p className="text-center text-red-500 text-3xl">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (serviceData === -1) {
    return (
      <div className="flex justify-center items-center absolute right-7 left-12 h-[90%] ml-16 mt-8 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA]">
        <p className="text-center text-gray-500 text-3xl">
          No service details available.
        </p>
      </div>
    );
  }

  // === Main Render ===
  return (
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
  );
};

export default memo(ServiceDetails);
