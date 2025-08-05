import React from 'react';

const InputWithIcon = ({ label, icon, type = "text", ...props }) => (
  <div className="flex flex-col gap-1.5 w-full max-w-sm">
    {label && (
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-base pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        placeholder={props.placeholder}
        className="pl-10 pr-4 py-2 text-sm text-gray-800 bg-white placeholder-gray-400 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-150 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-fill-black"
        {...props}
        autoComplete={props.autoComplete || "on"}
      />
    </div>
  </div>
);

export default InputWithIcon;
