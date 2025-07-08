import React, { useState, useEffect } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
  AiOutlineIdcard,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import UploadImage from "../small/UploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../axiosConfig";

export const AddValidatorForService = () => {
  const [formData, setFormData] = useState({
    validator_name: "",
    mobile_number: "",
    validator_email: "",
    validator_password: "",
    validator_address: "",
    aadhar_number: "",
    validator_image_url: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const token = localStorage.getItem("userData");

  useEffect(() => {
    if (!serviceId) {
      toast.error("No service selected.");
      navigate("/home/services");
    }
  }, [serviceId, navigate]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, validator_image_url: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, validator_image_url: null }));
    setPreviewImage(null);
  };

  const resetForm = () => {
    setFormData({
      validator_name: "",
      mobile_number: "",
      validator_email: "",
      validator_password: "",
      validator_address: "",
      aadhar_number: "",
      validator_image_url: null,
    });
    setPreviewImage(null);
  };

 const submitHandler = async (event) => {
  event.preventDefault();

  if (!serviceId) {
    toast.error("Service ID not found.");
    return;
  }

  if (isSubmitting) return; // Prevent double submission

  setIsSubmitting(true);
  try {
    const formPayload = new FormData();

    const validatorData = {
      validator_name: formData.validator_name || "",
      mobile_number: formData.mobile_number || "",
      validator_email: formData.validator_email || "",
      validator_password: formData.validator_password || "",
      validator_address: formData.validator_address || "",
      aadhar_number: formData.aadhar_number || "",
    };

    formPayload.append("validatorData", JSON.stringify(validatorData));
    formPayload.append("image", formData.validator_image_url);

    const response = await api.put(
      `/validator/addValidator/${serviceId}`,
      formPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Validator added successfully!");
    resetForm();
    navigate(-1);
  } catch (err) {
    console.error("Full error:", err);
    toast.error(err.response?.data?.msg || "Failed to add validator.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
  <div className="absolute top-[109px] left-[134px] w-[1160px] h-[559px] rounded-[15px] border border-gray-300 px-[44px] py-[23px] bg-white flex flex-col gap-[24px] overflow-hidden">
  
    <h2 className="text-2xl font-semibold text-gray-700">Add Validator</h2>
    <p className="text-sm text-gray-600">
      Fill this form to add a new validator for this service
    </p>
 

  <div className="flex-grow overflow-y-auto max-h-[calc(100vh-160px)] pr-1 hide-scrollbar ">
    <form onSubmit={submitHandler} className="space-y-6">
      {/* Image Upload */}
      <div>
        <p className="mb-2 text-sm text-gray-700 font-medium">
          Upload Validator’s Photo
        </p>
        {!previewImage ? (
          <div className="flex justify-center">
            <label className="relative flex items-center justify-center w-full h-[100px] px-5 border-2 border-dashed border-indigo-300 bg-indigo-100 rounded-[10px] cursor-pointer text-center">
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
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 text-red-400 text-sm p-1 rounded-full transition"
              title="Remove file"
            >
              <RxCross2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Name</span>
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="validator_name"
              value={formData.validator_name}
              onChange={changeHandler}
              required
              placeholder="Enter Full Name"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </label>

        {/* Mobile */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Mobile Number</span>
          <div className="relative">
            <AiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={changeHandler}
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Enter Mobile Number"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </label>

        {/* Email */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Email</span>
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="validator_email"
              value={formData.validator_email}
              onChange={changeHandler}
              required
              placeholder="user@example.com"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </label>

        {/* Password */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Password</span>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="validator_password"
              value={formData.validator_password}
              onChange={changeHandler}
              required
              placeholder="Set Password"
              className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </label>

        {/* Address */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Address</span>
          <div className="relative">
            <AiOutlineHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="validator_address"
              value={formData.validator_address}
              onChange={changeHandler}
              placeholder="Enter Address"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </label>

        {/* Aadhar */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-700">Validator's Aadhar Number</span>
          <div className="relative">
            <AiOutlineIdcard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="aadhar_number"
              value={formData.aadhar_number}
              onChange={changeHandler}
              pattern="[0-9]{12}"
              maxLength={12}
              placeholder="Enter Aadhar Number"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </label>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200 text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Validator"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddValidatorForService;
