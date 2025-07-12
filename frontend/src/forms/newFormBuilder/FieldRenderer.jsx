import React from "react";
import { X } from "lucide-react";

// Import all field components
import FullNameField from "./fields/FullNameField";
import TextField from "./fields/TextField";
import SingleSelect from "./fields/SingleSelect";
import MultiSelect from "./fields/MultiSelect";
import DropdownSelect from "./fields/DropDown";
import Logo from "./fields/Logo";
import Cover from "./fields/Cover";
import Timer from "./fields/Timer";
import Terms from "./fields/TermsnConditions";
import PhoneNumberField from "./fields/Phone";
import Date from "./fields/Date";
import TimeField from "./fields/Time";
import InputFile from "./fields/InputField";
import SpecialRendering from "./fields/SpecialRendering";

// Field type to component mapping
const fieldComponents = {
  "Full Name": FullNameField,
  Email: TextField,
  email: TextField,
  Text: TextField,
  Phone: PhoneNumberField,
  Address: TextField,
  Number: TextField,
  "Single Selection": SingleSelect,
  "Multiple Selection": MultiSelect,
  "Dropdown Selection": DropdownSelect,
  Cover: Cover,
  Logo: Logo,
  Timer: Timer,
  "Terms & Conditions": Terms,
  Date: Date,
  Time: TimeField,
  "Upload Image": InputFile,
  "Upload File": InputFile,
  "Payment Fields": SpecialRendering,
};

const FieldRenderer = ({
  field,
  index,
  onUpdate,
  onRemove,
  isBuilder = true,
  hasCover = false,
  onDuplicate,
  fieldList,
  register
}) => {
  const FieldComponent = fieldComponents[field.type];

  if (field.field_type === "Preview") return null;

  if (!FieldComponent) {
    return null;
  }
  // Handle one-time rendered components
  if (["Cover", "Logo", "Timer", "Terms & Conditions"].includes(field.type)) {
    return (
      <FieldComponent
        field={field}
        onUpdate={onUpdate}
        onRemove={onRemove}
        isBuilder={isBuilder}
        index={index}
        hasCover={hasCover}
        isPreview={!isBuilder}
      />
    );
  }

  // Normal fields
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow group">
      {/* Top Controls */}
      {isBuilder && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700"></span>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
            {/* Toggle Required */}
            <button
              onClick={() => onUpdate({ required: !field.required })}
              className={`transition-all ${
                field.required
                  ? "text-green-600 hover:text-green-800"
                  : "text-gray-400 hover:text-yellow-500"
              }`}
              title={field.required ? "Mark as Optional" : "Mark as Required"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {field.required ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m0 14v1m8-8h1M4 12H3m15.364-5.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"
                  />
                )}
              </svg>
            </button>

            {/* Duplicate */}
            <button
              onClick={() => onDuplicate(field)}
              className="text-gray-400 hover:text-blue-500 transition-all"
              title="Duplicate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v12a2 2 0 002 2h6z"
                />
              </svg>
            </button>

            {/* Remove */}
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-all"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Actual Field */}
      <FieldComponent
        name={field.type}
        field={field}
        onUpdate={onUpdate}
        isBuilder={isBuilder}
        index={index}
        hasCover={hasCover}
        isPreview={!isBuilder}
        fieldList={fieldList}
        {...(!isBuilder ? { register } : {})} // ✅ Pass only if isPreview
      />
    </div>
  );
};

export default FieldRenderer;
