import React, { useState } from "react";

const ConfirmationModal = ({
  btnContent1 = "Cancel",
  btnContent2 = "Delete",
  onCancel,
  onConfirm,
  serviceName = "", // ⬅️ base deletion on service name
  title = "Are you sure you want to delete this service?",
  subtitle,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (inputValue.trim() === serviceName.trim()) {
      onConfirm();
    } else {
      setError("Service name does not match.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6 shadow-xl border border-gray-200">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm leading-6">
          {subtitle || `Type "${serviceName}" to confirm deletion.`}
        </p>
      </div>

      {/* Input */}
      <div>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-indigo-500"
          placeholder="Enter service name"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Actions */}
      <div className="flex justify-end space-x-5">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          {btnContent1}
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-2.5 bg-[#5621FF] hover:bg-[#4f25d6] rounded-lg text-white text-sm font-medium"
        >
          {btnContent2}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
