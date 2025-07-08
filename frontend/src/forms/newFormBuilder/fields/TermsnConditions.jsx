import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const Terms = ({
  field = {},
  isBuilder = true,
  onRemove,
  onUpdate,
}) => {
  const [accepted, setAccepted] = useState(false);
  const [termsText, setTermsText] = useState(
    field?.terms || "Terms and conditions. Please read them carefully."
  );
  const [label, setLabel] = useState(
    field?.checkboxLabel || "I accept the terms and conditions"
  );
  const [title, setTitle] = useState(field?.title || "Terms and Conditions");

  useEffect(() => {
    if (isBuilder && onUpdate) {
      onUpdate({
        ...field,
        title,
        checkboxLabel: label,
        terms: termsText,
        required: true, // Always required
      });
    }
  }, [title, label, termsText]);

  const toggleAccepted = () => {
    setAccepted(!accepted);
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto border relative group rounded-lg bg-white shadow-sm py-6 px-8 space-y-4">
        
        {/* Remove button only in builder */}
        {isBuilder && (
          <button
            onClick={onRemove}
            className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all z-10 bg-white rounded-full p-[2px] shadow"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Checkbox + Label */}
        <div className="flex items-start space-x-3">
          <button
            onClick={toggleAccepted}
            className={`h-5 w-5 mt-1 border border-gray-400 rounded flex items-center justify-center ${
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
                className="w-3.5 h-3.5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {isBuilder ? (
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setLabel(e.target.innerText)}
              className="text-sm sm:text-base text-black leading-6 outline-none rounded px-1 py-0.5 min-w-[200px]"
            >
              {label}
            </span>
          ) : (
            <span className="text-sm sm:text-base text-black">
              {label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          )}
        </div>

        {/* Collapsible Terms Section — only visible if not accepted */}
        {!accepted && (
          <div className="w-full">
            {isBuilder ? (
              <>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setTitle(e.target.innerText)}
                  className="text-base font-semibold mb-2 outline-none rounded px-1 py-0.5"
                >
                  {title}
                </h3>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setTermsText(e.target.innerText)}
                  className="w-full min-h-[120px] max-h-[300px] overflow-auto p-4 bg-gray-50 outline-none text-sm leading-6"
                >
                  {termsText}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold mb-2">{field.title}</h3>
                <div className="w-full text-sm bg-gray-50 rounded px-4 py-3 leading-6 text-gray-700">
                  {field.terms}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terms;
