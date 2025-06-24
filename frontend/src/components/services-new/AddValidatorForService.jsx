
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
import UploadImage from "../small/UploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validatorEndpoints } from "../../api/apis";
import { apiConnector } from "../../api/apiconnector";
import InputWithIcon from "../small/InputWithIcon";

export const AddValidatorForService = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    address: "",
    aadharNumber: "",
    imageFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
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
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      password: "",
      address: "",
      aadharNumber: "",
      imageFile: null,
    });
  };

  console.log("out");
  

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!serviceId) {
      toast.error("Service ID not found.");
      return;
    }
    console.log("function");
    
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key === "imageFile" ? "image" : key, value);
      });

      const response = await apiConnector(
        "PUT",
        validatorEndpoints.ADD_VALIDATOR(serviceId),
        formPayload,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      console.log("try");
      
      toast.success("Validator added successfully!");
      resetForm();
      navigate(-1);
    } catch (err) {
      console.log("catch");
      console.error(err);
      toast.warning(err.response?.data?.msg || "Failed to add validator.");
    }
  };

  return (
    <div className="mx-auto mt-10 px-11 py-[23px] rounded-[15px] bg-white absolute top-[109px] left-[334px] border border-gray-300 w-[1160px] h-[559px] gap-6 shadow-[0px_1px_8.5px_0px_#00000014]">
      <div className="mb-6">
        <p className="text-2xl font-semibold text-gray-700">Add Validator</p>
        <p className="text-sm text-gray-600">
          Fill this form to add a new validator for that service
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <p className="mb-2 text-sm text-gray-700 font-medium">
            Upload Validator’s Photo
          </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <InputWithIcon
            label="Validator's Name"
            icon={<AiOutlineUser />}
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={changeHandler}
          />

          {/* Mobile Number */}
          <InputWithIcon
            label="Validator's Mobile Number"
            icon={<AiOutlinePhone />}
            name="mobileNumber"
            placeholder="Enter Mobile No."
            value={formData.mobileNumber}
            onChange={changeHandler}
            pattern="[0-9]{10}"
            maxLength={10}
          />

          {/* Email */}
          <InputWithIcon
            label="Validator's Email"
            icon={<AiOutlineMail />}
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={changeHandler}
            type="email"
          />

          {/* Password */}
          <label className="flex flex-col">
            <span className="mb-1 text-sm text-gray-700">
              Validator's Password
            </span>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Set Password"
                value={formData.password}
                onChange={changeHandler}
                required
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </label>

          {/* Address */}
          <InputWithIcon
            label="Validator's Address"
            icon={<AiOutlineHome />}
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={changeHandler}
          />

          {/* Aadhar Number */}
          <InputWithIcon
            label="Validator's Aadhar Number"
            icon={<AiOutlineIdcard />}
            name="aadharNumber"
            placeholder="Enter Aadhar No."
            value={formData.aadharNumber}
            onChange={changeHandler}
            pattern="[0-9]{12}"
            maxLength={12}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
          >
            Add Validator
          </button>
        </div>
      </form>
    </div>
  );
};