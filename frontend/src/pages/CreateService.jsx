import React, { useContext, useState } from "react";
import {
  MdLocationOn,
  MdAccessTime,
  MdEvent,
  MdInfo,
  MdAttachMoney,
  MdCheck,
} from "react-icons/md";
import { FaQrcode } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import UploadImage from "../components/small/UploadImage";
import InputWithIcon from "../components/small/InputWithIcon";
import SelectField from "../components/small/SelectField";
import api from "../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";

const now = new Date();
const currentDate = now.toISOString().split("T")[0];
const currentTime = now.toTimeString().slice(0, 5);

const CreateService = () => {
  const [formData, setFormData] = useState({
    service_image_url: null,
    service_name: "",
    service_address: "",
    service_date: currentDate,
    service_time: currentTime,
    valid_scans: "",
    service_discription: "",
    service_type: "",
    ticket_validity: "",
    ticket_price: "",
    payment_option: "Paid",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setService } = useContext(ServiceContext);
  const navigate = useNavigate();

  const serviceTypes = ["Ticket", "Pass", "Badge"];
  const validityOptions = [
    { label: "3 Hours", value: "3" },
    { label: "12 Hours", value: "12" },
    { label: "1 Day", value: "24" },
    { label: "7 Days", value: "168" },
    { label: "15 Days", value: "360" },
    { label: "1 Month", value: "744" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field Changed → ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    console.log("Payment Option Selected:", value);
    setFormData((prev) => ({ ...prev, payment_option: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("📸 Image selected:", file.name, file);
      setFormData((prev) => ({ ...prev, service_image_url: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, service_image_url: null }));
    setPreviewImage(null);
  };

  const resetForm = () => {
    console.log("🧹 Resetting form...");
    setFormData({
      service_image_url: null,
      service_name: "",
      service_address: "",
      service_date: currentDate,
      service_time: currentTime,
      valid_scans: "",
      service_discription: "",
      service_type: "",
      ticket_validity: "",
      ticket_price: "",
      payment_option: "Paid",
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service_image_url) {
      toast.error("Please upload an image.");
      console.warn("❌ No image uploaded.");
      return;
    }

    const token = localStorage.getItem("userData");
    if (!token) {
      toast.error("Token missing.");
      console.error("❌ No token found in localStorage.");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("📤 Submitting form...");

      const { service_image_url, ...rest } = formData;

      const cleanData = {
        ...rest,
        ticket_price:
          formData.payment_option === "Free" ? "0" : formData.ticket_price,
      };

      console.log("🧼 Clean data to send:", cleanData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(cleanData));
      formPayload.append("image", service_image_url);

      console.log("📦 FormData being sent:");
      for (let pair of formPayload.entries()) {
        console.log(`${pair[0]} →`, pair[1]);
      }

      const res = await api.put(`/service/addService`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Server Response:", res.data);

      const newService = res.data?.service;

      if (!newService || !newService._id) {
        toast.error("Service creation failed.");
        console.warn("⚠️ No newService returned from backend.");
        return;
      }

      console.log("🎉 New service created:", newService);

      // Update context
      setService((prev) => {
        const updated = {
          ...prev,
          [newService._id]: newService,
        };
        console.log("🧠 Updating context with new service:", updated);
        return updated;
      });

      toast.success("Service created successfully!");
      resetForm();

      // Navigate with force-fetch
      console.log("🧭 Navigating to new service detail page...");
      navigate(`/home/services/${newService._id}`, {
        state: { updated: true },
      });
    } catch (err) {
      console.error("❌ Error while creating service:", err);
      toast.error(err?.response?.data?.msg || "Failed to add service.");
    } finally {
      setIsSubmitting(false);
      console.log("📥 Submit complete.");
    }
  };

  return (
    <div className="absolute top-[109px] left-[134px] w-[1160px] h-[559px] rounded-[15px] border border-gray-300 px-[44px] py-[23px] bg-white flex flex-col gap-[24px] overflow-hidden">
      <h2 className="text-[26px] font-semibold text-gray-800">Add Service</h2>
      <p className="text-sm text-gray-500 -mt-2">
        Fill this form to add a new service
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
                    required
                  />
                  <InputWithIcon
                    label="Service Address"
                    icon={<MdLocationOn />}
                    placeholder="Enter Address"
                    name="service_address"
                    value={formData.service_address}
                    onChange={handleChange}
                    required
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
                    required
                  />
                  <InputWithIcon
                    label="Service Time"
                    icon={<MdAccessTime />}
                    type="time"
                    name="service_time"
                    value={formData.service_time}
                    onChange={handleChange}
                    required
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
                    required
                  />
                  <InputWithIcon
                    label="Service Description"
                    icon={<MdInfo />}
                    placeholder="Enter Description"
                    name="service_discription"
                    value={formData.service_discription}
                    onChange={handleChange}
                    required
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
                        name="payment_option"
                        value={opt}
                        checked={formData.payment_option === opt}
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
                disabled={formData.payment_option === "Free"}
                required
              />

              <SelectField
                label="Service Type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                options={serviceTypes}
                required
              />

              <SelectField
                label="Ticket Validity"
                name="ticket_validity"
                value={formData.ticket_validity}
                onChange={handleChange}
                options={validityOptions}
                optionLabelKey="label"
                optionValueKey="value"
                required
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
              {isSubmitting ? "Adding..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
