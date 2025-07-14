import React, { useRef, useState } from "react";

const InputFile = ({ name }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // console.log(`Selected ${name}:`, file.name);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-6">
      {/* Description Input */}
      <input
        type="text"
        className="w-[80%] p-3 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter description"
      />

      {/* Upload Field */}
      <div
        onClick={handleClick}
        className="w-[80%] flex items-center justify-between px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-blue-500 transition duration-200"
      >
        <span className="text-gray-500">
          {fileName ? `Selected: ${fileName}` : `Click to choose ${name}`}
        </span>
        <span className="text-blue-600 font-medium">Browse</span>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Note Input */}
      <input
        type="text"
        className="w-[80%] p-3 rounded-md border border-gray-300 bg-white text-red-600 outline-none focus:ring-2 focus:ring-red-400"
        placeholder="Enter Note / Requirements"
      />
    </div>
  );
};

export default InputFile;
