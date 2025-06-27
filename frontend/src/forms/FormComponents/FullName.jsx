import React, { useState, useRef, useEffect } from "react";

const FullName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [note, setNote] = useState("");

  const textareaRef = useRef(null);

  // Auto-grow textarea height on note change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note]);

  const showError = firstName.trim() === "" || lastName.trim() === "";

  return (
    <div className="px-8 py-6">
      {/* Description */}
      <p className="text-gray-700 text-lg font-medium mb-4">
        Full Name (Required)
      </p>

      {/* Input Fields */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* First Name */}
        <div className="flex flex-col w-full sm:w-1/2">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold text-gray-600 mb-1"
          >
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            className="border border-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col w-full sm:w-1/2">
          <label
            htmlFor="lastName"
            className="text-sm font-semibold text-gray-600 mb-1"
          >
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            className="border border-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>

      {/* Editable Auto-Growing Note */}
      <div className="flex flex-col mt-6">
        <label
          htmlFor="note"
          className="text-sm font-semibold text-gray-600 mb-1"
        >
          Note
        </label>
        <textarea
          ref={textareaRef}
          id="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter any additional note here..."
          className="border border-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none overflow-hidden"
        />
      </div>

      {/* Error */}
      {showError && (
        <p className="text-sm text-red-500 mt-2">
          Both first and last names are required.
        </p>
      )}
    </div>
  );
};

export default FullName;
