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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((opt, idx) => {
          // if option is object (e.g. {label: '1 Day', value: '24'}), extract it
          const label =
            typeof opt === "object" && optionLabelKey in opt
              ? opt[optionLabelKey]
              : opt;
          const val =
            typeof opt === "object" && optionValueKey in opt
              ? opt[optionValueKey]
              : opt;

          return (
            <option key={idx} value={val}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
