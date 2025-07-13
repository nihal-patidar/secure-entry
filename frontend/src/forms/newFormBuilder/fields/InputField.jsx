import React, { useRef, useState } from "react";

const InputFile = ({
  name = "Upload File",
  isPreview = false,
  field = {},
  onUpdate,
  register, // ✅ used in preview mode only
}) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState(field.fileName || "");
  const [description, setDescription] = useState(field.description || name);
  const [note, setNote] = useState(field.note || "");

  // Extract type from name ("Upload File" or "Upload Image")
  const type = name.split(" ")[1] || "File";

  // Used to create unique field names for registration
  const fieldKey = field.description || description || name;

  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpdate?.({ ...field, fileName: file.name });
    }
  };

  const handleChange = (setter, key) => (e) => {
    setter(e.target.value);
    onUpdate?.({ ...field, [key]: e.target.value });
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white px-8 rounded-lg space-y-4">

        {/* Description Heading with optional red asterisk */}
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
            placeholder={`Heading (e.g., Upload ${type})`}
          />
        )}

        {/* File/Image Upload Box */}
        {isPreview && typeof register === "function" ? (
          // React Hook Form registered file input
          <div className="w-full">
            <input
              {...register(fieldKey)} // ✅ Register for react-hook-form
              type="file"
              className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg bg-white cursor-pointer hover:border-blue-400 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        ) : (
          // Interactive file upload for builder/non-preview mode
          <div
            onClick={handleFileClick}
            className={`w-full flex items-center justify-between px-4 py-3 border-2 border-dashed rounded-lg transition duration-200 ${
              isPreview
                ? "border-gray-200 bg-white cursor-pointer hover:border-blue-400"
                : "border-gray-300 bg-gray-50 cursor-pointer hover:border-blue-500"
            }`}
          >
            <span className="text-gray-500 text-sm truncate max-w-[70%]">
              {fileName ? `Selected: ${fileName}` : `Click to choose ${type}`}
            </span>
            <span className="text-blue-600 font-medium">Browse</span>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Note */}
        {isPreview ? (
          note && <div className="text-xs text-gray-400 mt-1">{note}</div>
        ) : (
          <input
            type="text"
            value={note}
            onChange={handleChange(setNote, "note")}
            className="text-sm text-gray-500 bg-white outline-none rounded-md w-full"
            placeholder={`Note (about the ${type.toLowerCase()}, optional)`}
          />
        )}
      </div>
    </div>
  );
};

export default InputFile;