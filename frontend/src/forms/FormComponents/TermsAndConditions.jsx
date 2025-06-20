import React, { useState } from "react";

const Terms = () => {
  const [accepted, setTermsAccepted] = useState(false);
  const [terms, setTerms] = useState(
    "Terms and conditions. Please read them carefully."
  );

  const toggleAccepted = () => {
    setTermsAccepted(!accepted);
  };

  return (
    <div className="flex flex-col w-[90vw] sm:w-[50vw] space-y-4 mb-10">
      {/* Checkbox Row */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleAccepted}
          className={`h-5 w-5 border border-gray-400 rounded flex items-center justify-center ${
            accepted ? "bg-blue-600" : "bg-transparent"
          }`}
          aria-label="Accept Terms"
        >
          {accepted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <span className="text-sm sm:text-base text-black select-none">
          I accept the terms and conditions
        </span>
      </div>

      {/* Terms collapsible section */}
      {!accepted && (
        <div>
          <h3 className="text-base font-semibold mb-1">Terms and Conditions</h3>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setTerms(e.target.innerText)}
            className="border border-gray-300 rounded p-3 min-h-[100px] outline-none bg-white transition-all duration-300 ease-in-out"
          >
            {terms}
          </div>
        </div>
      )}
    </div>
  );
};

export default Terms;
