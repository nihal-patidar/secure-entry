import React from "react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  optionLabelKey = "label",
  optionValueKey = "value",
}) => {
  return (
    <div className=" flex flex-col gap-1.5 w-full max-w-sm">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-none
                   transition duration-200
                   hover:border-gray-400
                   disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        <option value="" disabled className="text-gray-400">
          Select an option
        </option>

        {options.map((opt, idx) => {
          const label =
            typeof opt === "object" && optionLabelKey in opt
              ? opt[optionLabelKey]
              : opt;
          const val =
            typeof opt === "object" && optionValueKey in opt
              ? opt[optionValueKey]
              : opt;

          return (
            <option key={idx} value={val} className="text-gray-700">
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
