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

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import UploadImage from "../components/small/UploadImage";
import InputWithIcon from "../components/small/InputWithIcon";
import SelectField from "../components/small/SelectField";
import api from "../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import { devLog } from "../../devLog";

const now = new Date();


const CreateService = () => {
  const [formData, setFormData] = useState({
    service_image_url: null,
    service_name: "",
    service_address: "",
    service_live_date: "",
    service_close_date: "",
    form_live_date: "",
    form_close_date: "",
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
    devLog.log(`Field Changed → ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    devLog.log("Payment Option Selected:", value);
    setFormData((prev) => ({ ...prev, payment_option: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      devLog.log("📸 Image selected:", file.name, file);
      setFormData((prev) => ({ ...prev, service_image_url: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, service_image_url: null }));
    setPreviewImage(null);
  };
  const handleDateChange = (selectedDates, dateStr, instance) => {
    const name = instance.input.name;
    setFormData((prev) => ({ ...prev, [name]: dateStr }));
  };

  const resetForm = () => {
    devLog.log("🧹 Resetting form...");
    setFormData({
      service_image_url: null,
      service_name: "",
      service_address: "",
      service_live_date: "",
      service_close_date: "",
      form_live_date: "",
      form_close_date: "",
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
      devLog.log("📤 Submitting form...");

      const { service_image_url, ...rest } = formData;

      const cleanData = {
        ...rest,
        ticket_price:
          formData.payment_option === "Free" ? "0" : formData.ticket_price,
      };

      devLog.log("🧼 Clean data to send:", cleanData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(cleanData));
      formPayload.append("image", service_image_url);

      devLog.log("📦 FormData being sent:");
      for (let pair of formPayload.entries()) {
        devLog.log(`${pair[0]} →`, pair[1]);
      }

      const res = await api.put(`/service/addService`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      devLog.log("✅ Server Response:", res.data);

      const newService = res.data?.service;

      if (!newService || !newService._id) {
        toast.error("Service creation failed.");
        console.warn("⚠️ No newService returned from backend.");
        return;
      }

      devLog.log("🎉 New service created:", newService);

      // Update context
      setService((prev) => {
        const updated = {
          ...prev,
          [newService._id]: newService,
        };
        devLog.log("🧠 Updating context with new service:", updated);
        return updated;
      });

      toast.success("Service created successfully!");
      resetForm();

      // Navigate with force-fetch
      devLog.log("🧭 Navigating to new service detail page...");
      navigate(`/home/services/${newService._id}`, {
        state: { updated: true },
      });
    } catch (err) {
      console.error("❌ Error while creating service:", err);
      toast.error(err?.response?.data?.msg || "Failed to add service.");
    } finally {
      setIsSubmitting(false);
      devLog.log("📥 Submit complete.");
    }
  };

  return (
    <div className="absolute top-[70px] left-[114px] w-full max-w-[1185px] h-[calc(100vh-100px)] rounded-2xl border border-gray-300 bg-white flex flex-col overflow-hidden">
  {/* Header - Fixed */}
  <div className="px-4 md:px-11 py-4 md:py-6 border-b border-gray-200">
    <h2 className="text-lg md:text-2xl font-semibold text-gray-800">Add Service</h2>
    <p className="text-xs md:text-sm text-gray-500 mt-1">Fill this form to add a new service</p>
  </div>

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto px-4 md:px-11 py-6 hide-scrollbar">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="flex flex-col gap-3 w-full">
        <label className="text-sm font-medium text-gray-700">Upload an Image</label>
        {!previewImage ? (
          <label className="relative flex flex-col items-center justify-center w-full h-40 sm:h-44 md:h-48 border-2 border-dashed border-indigo-300 bg-indigo-100 rounded-xl cursor-pointer text-gray-600 text-sm font-medium hover:bg-indigo-200 transition-colors">
            <UploadImage />
            <span className="mt-2">Click or drag image here</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        ) : (
          <div className="relative flex justify-center items-center w-full h-40 sm:h-44 md:h-48">
            <img
              src={previewImage}
              alt="Uploaded preview"
              className="max-h-36 sm:max-h-40 md:max-h-44 object-contain rounded-lg border border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 bg-white border border-red-200 hover:bg-red-100 text-red-500 p-1 rounded-full"
              aria-label="Remove image"
            >
              <RxCross2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {/* Service Name & Address */}
          <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Date-Time Pickers */}
          {[
            { label: "Service Live", name: "service_live_date", value: formData.service_live_date },
            { label: "Service Closing", name: "service_close_date", value: formData.service_close_date },
            { label: "Form Live", name: "form_live_date", value: formData.form_live_date },
            { label: "Form Closing", name: "form_close_date", value: formData.form_close_date },
          ]
            .reduce((acc, field, idx) => {
              if (idx % 2 === 0) acc.push([]);
              acc[acc.length - 1].push(field);
              return acc;
            }, [])
            .map((pair, i) => (
              <div className="flex flex-col sm:flex-row gap-4" key={i}>
                {pair.map((field) => (
                  <div className="w-full" key={field.name}>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">{field.label}</label>
                    <div className="flex items-center pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 focus-within:ring-2 focus-within:ring-indigo-500">
                      <Flatpickr
                        name={field.name}
                        data-enable-time
                        value={field.value}
                        onChange={handleDateChange}
                        options={{
                          dateFormat: "d-m-Y h:i K",
                          minDate: "today",
                          time_24hr: false,
                          clickOpens: true,
                        }}
                        placeholder="DD-MM-YYYY 12:00 AM"
                        className="w-full bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {/* Valid Scans & Description */}
          <div className="flex flex-col sm:flex-row gap-4">
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

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {/* Payment Option */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-700">Payment Option</label>
            <div className="flex gap-6">
              {["Paid", "Free"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_option"
                    value={opt}
                    checked={formData.payment_option === opt}
                    onChange={() => handleRadioChange(opt)}
                    className="peer hidden"
                  />
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-transparent">
                    <MdCheck className="text-white text-sm" />
                  </div>
                  <span className="text-base text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ticket Price */}
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

          {/* Service Type */}
          <SelectField
            label="Service Type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            options={serviceTypes}
            required
          />

          {/* Ticket Validity */}
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

      {/* Submit Button */}
      <div className="mt-5 mb-10 flex justify-center ">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-indigo-600 text-white text-sm font-medium py-3 px-8 rounded-full shadow-md transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700 hover:shadow-lg"
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
