import React from 'react';

const InputWithIcon = ({ label, icon, type = "text", ...props }) => (
  <div className="flex flex-col gap-[3px] w-full max-w-[316px]">
    <label className="text-sm text-[#4B4B4B]">{label}</label>
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        {icon}
      </span>
      <input
        type={type}
        placeholder={props.placeholder}
        className="pl-10 pr-4 py-2 text-sm text-gray-700 border border-[#A3A3A3] rounded-[7px] w-full focus:outline-indigo-100 placeholder-gray-400"
        {...props}
      />
    </div>
  </div>
);

export default InputWithIcon;
