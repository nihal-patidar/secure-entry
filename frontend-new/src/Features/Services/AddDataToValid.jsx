import React, { useState } from "react";
import UploadImage from "../../components/small/UploadImage";

const AddDataToValid = () => {
  const [formData, setFormData] = useState({
    imageFile: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const submitHandler = () => {
    console.log("Opening a form to add data to valid before submitting any form");
  };

  return (
    <div className="w-full h-fit bg-white border border-[#EAEAEA] rounded-xl mx-auto mb-14 px-12 py-8">
      <div className="text-center mb-6">
        <p className="mb-2 text-sm text-gray-700 font-medium">
          Add selected candidates allowed to register for the event{" "}
          <span className="font-bold">(Optional)</span>
        </p>

        <div className="flex justify-center w-full">
          <label className="relative flex items-center justify-center w-full h-16 border-2 border-dashed border-indigo-300 bg-indigo-100 rounded-lg cursor-pointer transition">
            <UploadImage />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-between gap-3 my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="text-sm text-gray-500 whitespace-nowrap">OR</p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Manual Add Button */}
      <div className="text-center">
        <button
          onClick={submitHandler}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-200 text-sm font-medium"
        >
          Add Manually
        </button>
      </div>
    </div>
  );
};

export default AddDataToValid;
