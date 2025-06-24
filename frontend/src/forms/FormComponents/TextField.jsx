import { useState, useEffect } from "react";

const TextField = ({ QType, element, updateField }) => {
  const [fieldData, setFieldData] = useState({ ...element });

  useEffect(() => {
    setFieldData({ ...element });
  }, [element]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateField(element.field_id, name, value);
  };

  return (
    <div className="pl-12 mt-5 max-w-xl w-full">
      {/* Editable field name as heading */}
      <input
        name="field_name"
        placeholder="Field Name"
        value={fieldData.field_name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full text-lg font-semibold mb-1 outline-none bg-transparent placeholder:text-black"
      />

      {/* Description field */}
      <textarea
        name="field_desc"
        placeholder="Description"
        value={fieldData.field_desc}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full text-sm text-gray-500 mb-2 bg-transparent outline-none resize-none h-6"
      />

      {/* Main input field */}
      <input
        type={
          QType === "A" || QType === "E" || QType === "T" ? "text" : "number"
        }
        name="field_placeholder"
        placeholder="Enter Text"
        value={fieldData.field_placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="w-full p-2 border border-gray-300 rounded-md text-base mb-1"
      />

      {/* Error message */}
      {fieldData.field_error && (
        <p className="text-red-600 text-sm mt-1">{fieldData.field_error}</p>
      )}

      {/* Note / requirements */}
      <textarea
        name="field_note"
        placeholder="Add requirements (e.g. password must be at least 8 characters)"
        value={fieldData.field_note}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full text-xs text-gray-500 mt-1 bg-transparent outline-none resize-none h-6"
      />
    </div>
  );
};

export default TextField;
