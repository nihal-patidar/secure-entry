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
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ConfirmationModal from "../components/ConfirmationModal.jsx";

const ServiceDetails = () => {
  const token = useMemo(() => localStorage.getItem("userData"), []);
  const navigate = useNavigate();
  const location = useLocation();
  const { visitors } = location.state || {};
  const { serviceId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const { service, setService } = useContext(ServiceContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

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
      state: { service, updated: true },
    });
  };
  const handleDelete = async () => {
    //console.log("current service id", currentServiceFormId);
    const token = localStorage.getItem("userData");
    if (!token) return toast.error("Token missing. Please log in again.");

    await api
      .post(`/service/deleteService/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/home/services", { state: { updated: true } });
        // setService((prev) => prev.filter((item) => item._id !== serviceId));
        // window.location.reload();
        setService((prev) => {
          const updatedServices = { ...prev };
          delete updatedServices[serviceId];
          return updatedServices;
        });
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
    // closePopup("updateServiceForm");
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
    <>
    <div className="flex absolute right-7 left-12 h-[90%] ml-16 gap-8 mt-8">
      <div className="w-full bg-[#F2F3F9] rounded-3xl pt-6 border border-[#EAEAEA]">
        <div className="flex justify-between items-center mb-8 lg:mx-14 mx-7">
          <h3 className="text-[#5621FF] text-xl md:text-2xl font-medium">
            {serviceData.service_name}
          </h3>

          <div className="relative inline-block text-left" >
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-2xl p-2 rounded-full hover:bg-gray-100 transition"
            >
              <PiDotsThreeOutlineVerticalFill />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-50 ">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleUpdateService();
                  }}
                  className="block w-full text-left px-10 py-2 text-md font-medium hover:bg-gray-200"
                >
                  Update
                </button>
                <button
  onClick={() => {
    setShowMenu(false);
    setShowModal(true); // ✅ this opens modal
  }}
  className="block w-full text-left px-10 py-2 text-md text-red-600 font-medium hover:bg-gray-200"
>
  Delete
</button>

              </div>
            )}
          </div>
        </div>

        <div className="w-full h-[85%] overflow-y-scroll lg:px-14 px-3 flex flex-col gap-10 items-center">
          <InfoForm serviceId={serviceId} service={serviceData} />
          <Overview serviceId={serviceId} visitors={visitors} />
          <AddDataToValid serviceId={serviceId} />
          <ValidatorDetailsData serviceId={serviceId} />
        </div>
      </div>
    </div>

   {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999]  backdrop-blur-0  bg-opacity-50">
    <ConfirmationModal
      serviceName={serviceData?.service_name} 
      onCancel={() => setShowModal(false)}
      onConfirm={handleDelete}
    />
  </div>
)}
    </>
  );
};

export default memo(ServiceDetails);
