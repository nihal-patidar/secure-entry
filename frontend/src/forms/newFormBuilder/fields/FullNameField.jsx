import React, { useState } from "react";

const FullName = ({
  onRemove,
  isPreview = false,
  field = {},
  onUpdate,
  register, // ✅ used in preview mode only
}) => {
  const [firstName, setFirstName] = useState(field.firstName || "");
  const [lastName, setLastName] = useState(field.lastName || "");
  const [note, setNote] = useState(field.note || "");
  const [description, setDescription] = useState(field.description || "Full Name");
  const [firstNameLabel, setFirstNameLabel] = useState(field.firstNameLabel || "First Name");
  const [lastNameLabel, setLastNameLabel] = useState(field.lastNameLabel || "Last Name");
  const [firstNamePlaceholder, setFirstNamePlaceholder] = useState(
    field.firstNamePlaceholder || "Enter your first name"
  );
  const [lastNamePlaceholder, setLastNamePlaceholder] = useState(
    field.lastNamePlaceholder || "Enter your last name"
  );

  const handleChange = (setter, key) => (e) => {
    setter(e.target.value);
    if (onUpdate) onUpdate({ ...field, [key]: e.target.value });
  };

  // Used to create unique field names for registration
  const fieldKey = field.description || "Full Name";

  return (
    <div className="w-full relative group bg-white rounded-lg ">
      <div className="max-w-3xl mx-auto relative bg-white px-8 rounded-lg space-y-4">
        {/* Heading / Description */}
        {isPreview ? (
          <div className="text-black text-lg font-medium">
            {description}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <input
            type="text"
            value={description}
            onChange={handleChange(setDescription, "description")}
            className="text-black bg-white text-lg font-medium outline-none rounded px-1 py-0.5 w-full"
            placeholder="Heading"
          />
        )}

        {/* First and Last Name Fields */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* First Name */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label className="text-sm font-semibold text-gray-600 bg-white mb-1">
              {firstNameLabel}
            </label>
            {/* {isPreview ? ( */}
            {isPreview && typeof register === "function" ? (
              <input
                {...register(`${fieldKey}_first`)} // ✅ Register for react-hook-form
                type="text"
                placeholder={firstNamePlaceholder}
                className="border border-gray-400 rounded-lg px-4 py-2 outline-none bg-white"
              />
            ) : (
              <>
               
                <input
                  value={firstName}
                  onChange={handleChange(setFirstName, "firstName")}
                  type="text"
                  placeholder={firstNamePlaceholder}
                  className="border border-gray-400 rounded-lg px-4 py-2 outline-none bg-white"
                />
            
              </>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              {lastNameLabel}
            </label>
            {isPreview && typeof register === "function" ? (
            // {isPreview ? (
              <input
                {...register(`${fieldKey}_last`)} // ✅ Register for react-hook-form
                type="text"
                placeholder={lastNamePlaceholder}
                className="border border-gray-400 rounded-lg px-4 py-2 outline-none bg-white"
              />
            ) : (
              <>
               
                <input
                  value={lastName}
                  onChange={handleChange(setLastName, "lastName")}
                  type="text"
                  placeholder={lastNamePlaceholder}
                  className="border border-gray-400 rounded-lg px-4 py-2 outline-none bg-white"
                />
               
              </>
            )}
          </div>
        </div>

        {/* Note Field */}
        <div className="flex flex-col mt-1">
          {isPreview ? (
            <input
              type="text"
              value={note}
              readOnly
              className="outline-none text-gray-400 bg-white text-sm"
            />
          ) : (
            <input
              type="text"
              value={note}
              onChange={handleChange(setNote, "note")}
              placeholder="Write a note here..."
              className="outline-none bg-white text-gray-400 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FullName;