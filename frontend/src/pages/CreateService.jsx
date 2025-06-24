
import React, { useState } from "react";
import {
  MdLocationOn,
  MdAccessTime,
  MdEvent,
  MdInfo,
  MdAttachMoney,
  MdCheck,
} from "react-icons/md";
import { FaQrcode } from "react-icons/fa";
import UploadImage from "../components/small/UploadImage";
import InputWithIcon from "../components/small/InputWithIcon";
import SelectField from "../components/small/SelectField";
import { eventEndpoints } from "../api/apis";
import { apiConnector } from "../api/apiconnector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
  const [formData, setFormData] = useState({
    imageFile: null,
    eventName: "",
    eventAddress: "",
    eventDate: "",
    eventTime: "",
    validScans: "",
    aboutEvent: "",
    serviceType: "",
    ticketValidity: "",
    ticketPrice: "",
    paymentOption: "Paid",
  });

  const serviceTypes = ["Ticket", "Pass", "Badge"];
  const validityOptions = ["3h", "12h", "1", "7", "15", "31"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, paymentOption: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const resetForm = () => {
    setFormData({
      imageFile: null,
      eventName: "",
      eventAddress: "",
      eventDate: "",
      eventTime: "",
      validScans: "",
      aboutEvent: "",
      serviceType: "",
      ticketValidity: "",
      ticketPrice: "",
      paymentOption: "Paid",
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.imageFile) {
    toast.error("Please upload an image.");
    return;
  }

  const token = localStorage.getItem("userData") || "";
  if (!token) {
    toast.error("Authentication token missing.");
    return;
  }

  const formPayload = new FormData();

  // Append the image separately
  formPayload.append("image", formData.imageFile);

  // Append other data as JSON string under "data" field
  const { imageFile, ...restFormData } = formData;
  formPayload.append("data", JSON.stringify(restFormData));

  try {
    await apiConnector("PUT", eventEndpoints.ADD_SERVICE, formPayload, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    toast.success("Service added successfully!");
    resetForm();
    navigate("/home/services");
  } catch (err) {
    console.error("Service Add Error →", err);
    toast.error(err.response?.data?.msg || "Failed to add service.");
  }
};



  return (
    <div className="mx-auto mt-10 px-4 py-6 rounded-[15px] border bg-white absolute top-[60px] left-[120px] border-gray-300 w-[1160px]   shadow-[0px_1px_8.5px_0px_#00000014]">
      <h2 className="text-[26px] font-semibold text-gray-800 mb-1">
        Add Service
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill this form to add a new service
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-[88px]">
          {/* Left Side */}
          <div className="flex flex-col gap-6 max-w-[662px] md:w-[66%]">
            {/* Upload Section */}
            <div className="flex flex-col gap-2 w-full max-w-[316px] md:max-w-[662px]">
              <p className="text-sm text-gray-700 font-medium">
                Upload an Image
              </p>
              <div className="flex justify-center ">
                <label className="relative flex items-center justify-center w-full h-[60px] px-5 border-2 border-dashed border-indigo-300 bg-indigo-100 rounded-[10px] cursor-pointer text-center">
                  <UploadImage />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-[30px] w-full">
              <div className="flex flex-col md:flex-row gap-4">
                <InputWithIcon
                  label="Event Name"
                  icon={<MdEvent />}
                  placeholder="Enter Event Name"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
                <InputWithIcon
                  label="Event Address"
                  icon={<MdLocationOn />}
                  placeholder="Enter Address"
                  name="eventAddress"
                  value={formData.eventAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <InputWithIcon
                  label="Event Date"
                  icon={<MdEvent />}
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
                <InputWithIcon
                  label="Event Time"
                  icon={<MdAccessTime />}
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <InputWithIcon
                  label="Valid Scans"
                  icon={<FaQrcode />}
                  placeholder="No. of Scans"
                  name="validScans"
                  value={formData.validScans}
                  onChange={handleChange}
                  required
                />
                <InputWithIcon
                  label="About Event"
                  icon={<MdInfo />}
                  placeholder="Enter Details About Event"
                  name="aboutEvent"
                  value={formData.aboutEvent}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-[30px] w-full md:w-[34%]">
            <div className="flex flex-col gap-2">
              <span className="text-base font-medium text-gray-700">
                Payment Option
              </span>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="Paid"
                    checked={formData.paymentOption === "Paid"}
                    onChange={() => handleRadioChange("Paid")}
                    className="peer hidden"
                  />

                  {/* Custom Radio Circle */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center 
                  peer-checked:border-transparent peer-checked:bg-[#2C3ED3] transition-all duration-200"
                  >
                    <MdCheck className="text-white text-md " />
                  </div>

                  <span className="text-base text-gray-700">Paid</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="Free"
                    checked={formData.paymentOption === "Free"}
                    onChange={() => handleRadioChange("Free")}
                    className="peer hidden"
                  />

                  {/* Custom Radio Circle */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center 
                  peer-checked:border-transparent peer-checked:bg-[#2C3ED3] transition-all duration-200"
                  >
                    <MdCheck className="text-white text-md " />
                  </div>

                  <span className="text-base text-gray-700">Free</span>
                </label>
              </div>
            </div>

            <InputWithIcon
              label="Ticket Price"
              icon={<MdAttachMoney />}
              placeholder="Enter Ticket Price"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              disabled={formData.paymentOption === "Free"}
              required
            />

            <SelectField
              label="Service Type (Ticket, Pass, Badge)"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              options={serviceTypes}
              required
            />

            <SelectField
              label="Ticket Validity (3h, 12h, 1 , 7 , 15 , 31)"
              name="ticketValidity"
              value={formData.ticketValidity}
              onChange={handleChange}
              options={validityOptions}
              required
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-6 rounded-full transition duration-200"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateService;
