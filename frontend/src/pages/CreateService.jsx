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
import api from "../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
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
    payment_option: "Paid",
  });

  const serviceTypes = ["Ticket", "Pass", "Badge"];
  const validityOptions = ["3h", "12h", "1", "7", "15", "31"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, payment_option: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, service_image_url: file }));
  };

  const resetForm = () => {
    setFormData({
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
      payment_option: "Paid",
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.service_image_url) {
    toast.error("Please upload an image.");
    return;
  }

  const token = localStorage.getItem("userData");
  if (!token) {
    toast.error("Authentication token missing.");
    return;
  }

  const formPayload = new FormData();
  formPayload.append("image", formData.service_image_url); // ✅ fixed
  const { service_image_url, ...rest } = formData;
  formPayload.append("data", JSON.stringify(rest));

  try {
    console.log("formpayload",formPayload);
    const res = await api.put(`/service/addService`, formPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Service added successfully!");
    resetForm();
    navigate("/home/services");
  } catch (err) {
    console.error("Service Add Error →", err);
    toast.error(err?.response?.data?.msg || "Failed to add service.");
  }
};

  return (
    <div className="mx-auto mt-10 px-4 py-6 rounded-[15px] border bg-white absolute top-[60px] left-[120px] border-gray-300 w-[1160px] shadow-[0px_1px_8.5px_0px_#00000014]">
      <h2 className="text-[26px] font-semibold text-gray-800 mb-1">
        Add Service
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill this form to add a new service
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-[88px]">
          {/* Left */}
          <div className="flex flex-col gap-6 max-w-[662px] md:w-[66%]">
            <div className="flex flex-col gap-2 w-full max-w-[662px]">
              <p className="text-sm text-gray-700 font-medium">Upload an Image</p>
              <div className="flex justify-center">
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
          <div className="flex flex-col gap-[30px] w-full md:w-[34%]">
            <div className="flex flex-col gap-2">
              <span className="text-base font-medium text-gray-700">
                Payment Option
              </span>
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
