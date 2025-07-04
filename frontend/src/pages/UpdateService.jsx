import React, { useState, useContext, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import UploadImage from "../components/small/UploadImage";
import InputWithIcon from "../components/small/InputWithIcon";
import SelectField from "../components/small/SelectField";
import {
  MdLocationOn,
  MdAccessTime,
  MdEvent,
  MdInfo,
  MdAttachMoney,
  MdCheck,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaQrcode } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../axiosConfig";
import { ServiceContext } from "../context/ServiceContext";
import BouncingDotsLoader from "../components/small/BouncingDotsLoader";
import { Button } from "@material-tailwind/react";

const UpdateService = () => {
  const { serviceId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { service, setService } = useContext(ServiceContext);

  const serviceData = state?.service?.[serviceId] || service?.[serviceId];

  const [formData, setFormData] = useState({
    service_image_url: null,
    service_name: "",
    service_address: "",
    service_date: "",
    service_time: "",
    valid_scans: "",
    service_discription: "",
    service_type: "",
    ticket_validity: "",
    ticket_price: "",
    paymentOption: "Paid",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!serviceData) {
      toast.error("Error in Data");
      return;
    }

    setFormData({
      service_image_url: serviceData.service_image_url || "",
      service_name: serviceData.service_name || "",
      service_address: serviceData.service_address || "",
      service_date: serviceData.service_date || "",
      service_time: serviceData.service_time || "",
      valid_scans: serviceData.valid_scans || "",
      service_discription: serviceData.service_discription || "",
      service_type: serviceData.service_type || "",
      ticket_validity: serviceData.ticket_validity || "",
      ticket_price: serviceData.ticket_price || "",
      paymentOption: serviceData.payment_option || "Paid",
    });

    // Show preview if image is URL string
    // if (typeof serviceData.service_image_url === "string") {
    //   setPreviewImage(serviceData.service_image_url);
    // }
  }, [serviceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, paymentOption: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, service_image_url: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, service_image_url: null }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userData");
    if (!token) return toast.error("Token missing. Please log in again.");

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        ticket_price:
          formData.paymentOption === "Free" ? "0" : formData.ticket_price,
      };

      const res = await api.put(
        `/service/updateService/${serviceId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = res.data?.serviceData;
      if (!updated || !updated._id) {
        toast.error("Service update failed.");
        return;
      }

      setService((prev) => ({
        ...prev,
        [updated._id]: updated,
      }));

      toast.success("Service updated successfully!");
      navigate(`/home/services/${updated._id}`, { state: { updated: true } });
    } catch (err) {
      console.error("Error updating service:", err);
      toast.warning(err?.response?.data?.msg || "Update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  if (!serviceData) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <BouncingDotsLoader />
      </div>
    );
  }
  return (
    <div className="absolute top-[109px] left-[134px] w-[1160px] h-[559px] rounded-[15px] border border-gray-300 px-[44px] py-[23px] bg-white flex flex-col gap-[24px] overflow-hidden">
      <h2 className="text-[26px] font-semibold text-gray-800">
        Update Service
      </h2>
      <p className="text-sm text-gray-500 -mt-2">
        Edit the form and update your service
      </p>

      <div className="flex-grow hide-scrollbar overflow-y-auto pr-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-[88px]">
            {/* Left */}
            <div className="flex flex-col gap-6 max-w-[662px] md:w-[66%]">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm text-gray-700 font-medium">
                  Upload an Image
                </p>
                {!previewImage ? (
                  <div className="flex justify-center">
                    <label className="relative flex items-center justify-center w-full h-[180px] px-5 border-2 border-dashed border-indigo-300 bg-indigo-100 rounded-[10px] cursor-pointer text-center">
                      <UploadImage />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-[180px] relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-[160px] object-contain rounded-lg border"
                    />
                    <button
                      onClick={removeFile}
                      className="absolute top-2 right-2  bg-red-50 hover:bg-red-100 text-red-400 text-sm p-1 rounded-full transition"
                      title="Remove file"
                    >
                      <RxCross2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-[30px] w-full">
                <div className="flex flex-col md:flex-row gap-4">
                  <InputWithIcon
                    label="Service Name"
                    icon={<MdEvent />}
                    placeholder="Enter Service Name"
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                  />
                  <InputWithIcon
                    label="Service Address"
                    icon={<MdLocationOn />}
                    placeholder="Enter Address"
                    name="service_address"
                    value={formData.service_address}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <InputWithIcon
                    label="Service Date"
                    icon={<MdEvent />}
                    type="date"
                    name="service_date"
                    value={formData.service_date}
                    onChange={handleChange}
                  />
                  <InputWithIcon
                    label="Service Time"
                    icon={<MdAccessTime />}
                    type="time"
                    name="service_time"
                    value={formData.service_time}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <InputWithIcon
                    label="Valid Scans"
                    icon={<FaQrcode />}
                    placeholder="No. of Scans"
                    name="valid_scans"
                    value={formData.valid_scans}
                    onChange={handleChange}
                  />
                  <InputWithIcon
                    label="Service Description"
                    icon={<MdInfo />}
                    placeholder="Enter Description"
                    name="service_discription"
                    value={formData.service_discription}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-end gap-[30px] w-full md:w-[34%]">
              <div className="flex flex-col gap-2">
                <span className="text-base font-medium text-gray-700">
                  Payment Option
                </span>
                <div className="flex gap-6">
                  {["Paid", "Free"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="paymentOption"
                        value={opt}
                        checked={formData.paymentOption === opt}
                        onChange={() => handleRadioChange(opt)}
                        className="peer hidden"
                      />
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-transparent peer-checked:bg-[#2C3ED3] transition-all duration-200">
                        <MdCheck className="text-white text-md" />
                      </div>
                      <span className="text-base text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <InputWithIcon
                label="Ticket Price"
                icon={<MdAttachMoney />}
                placeholder="Enter Ticket Price"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleChange}
                disabled={formData.paymentOption === "Free"}
              />

              <SelectField
                label="Service Type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                options={["Ticket", "Pass", "Badge"]}
              />
              <SelectField
                label="Ticket Validity"
                name="ticket_validity"
                value={formData.ticket_validity}
                onChange={handleChange}
                options={[
                  { label: "3 Hours", value: "3h" },
                  { label: "12 Hours", value: "12h" },
                  { label: "1 Day", value: "1" },
                  { label: "7 Days", value: "7" },
                  { label: "15 Days", value: "15" },
                  { label: "1 Month", value: "31" },
                ]}
                optionLabelKey="label"
                optionValueKey="value"
              />
            </div>
          </div>

          <div className="mt-6 text-center bg-white pt-2 pb-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-6 rounded-full transition duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
