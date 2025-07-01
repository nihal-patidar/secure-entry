import React, { useState } from "react";

const PasswordField = ({value}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const password = value; // Replace with your actual password value

  return (
    <>
      
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.477-4.294M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.15 6.15l1.2-1.2m4.8-4.8l1.2-1.2"
            />
          </svg>
        )}
      </button>
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={password}
        readOnly
        className="w-24 bg-transparent focus:outline-none text-gray-800 px-2"
      />
    </>
  );
};

export default PasswordField;
