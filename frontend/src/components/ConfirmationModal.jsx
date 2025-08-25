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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl p-8 space-y-6 shadow-2xl border border-white/30 transform transition-all duration-300 hover:shadow-3xl">
                {/* Header */}
                <div className="space-y-3 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-[#2D2D2D]">{title}</h2>
                    <p className="text-[#4D4D4D] text-sm leading-6 max-w-xs mx-auto">
                        {subtitle || `Type "${serviceName}" to confirm deletion.`}
                    </p>
                </div>

                {/* Service Name Display */}
                {serviceName && (
                    <div className="bg-[#E2E6FF] rounded-xl p-4 border border-[#CBD3FF]">
                        <p className="text-xs uppercase tracking-wide text-[#4D4D4D] font-medium mb-1">
                            Service to delete
                        </p>
                        <p className="font-bold text-[#2C3ED3] text-lg">{serviceName}</p>
                    </div>
                )}

                {/* Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#4D4D4D] mb-2">
                        Confirm by typing the service name
                    </label>
                    <input
                        type="text"
                        className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl text-sm font-medium text-[#2D2D2D] placeholder-[#4D4D4D]/50 
              focus:outline-none focus:ring-2 focus:border-[#2C3ED3] transition-all duration-300
              ${error ? 'border-red-400 focus:ring-red-200' : 'border-[#CBD3FF] focus:ring-[#CBD3FF]/50'}
              hover:bg-white/90`}
                        placeholder="Enter service name"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setError("");
                        }}
                    />
                    {error && (
                        <div className="flex items-center space-x-2 mt-2">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-500 font-medium">{error}</p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-[#CBD3FF]/30" />

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-2">
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 text-sm font-medium bg-[#E2E6FF] hover:bg-[#CBD3FF] text-[#2D2D2D] rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        {btnContent1}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg
              ${inputValue.trim() === serviceName.trim()
                            ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                            : 'bg-gray-400 cursor-not-allowed opacity-50'
                        }`}
                        disabled={inputValue.trim() !== serviceName.trim()}
                    >
                        {btnContent2}
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center">
                    <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            inputValue.length > 0 ? 'bg-[#2C3ED3]' : 'bg-[#CBD3FF]'
                        }`}></div>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            inputValue.length >= serviceName.length / 2 ? 'bg-[#2C3ED3]' : 'bg-[#CBD3FF]'
                        }`}></div>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            inputValue.trim() === serviceName.trim() ? 'bg-[#2C3ED3]' : 'bg-[#CBD3FF]'
                        }`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;