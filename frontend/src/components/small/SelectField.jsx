import React from 'react'

const SelectField = ({ label, name, value, onChange, options  }) => {
  const isSelected = value !== "";

  return (
    <div className="flex flex-col gap-[3px] w-full max-w-[316px]">
    <label className="text-sm text-[#4B4B4B]">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`text-sm text-gray-700 border border-[#A3A3A3] rounded-[7px] px-3 py-2 w-full focus:outline-indigo-100`} 
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option  key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  )
}

export default SelectField
