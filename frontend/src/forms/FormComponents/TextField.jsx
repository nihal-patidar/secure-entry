import { useState, useEffect } from "react";

const TextField = ({ QType, element, updateField }) => {
  const [fieldName, setFieldName] = useState(element.field_name || "");
  const [fieldDesc, setFieldDesc] = useState(element.field_desc || "");
  const [fieldPlaceholder, setFieldPlaceholder] = useState(element.field_placeholder || "");
  const [fieldNote, setFieldNote] = useState(element.field_note || "");

  useEffect(() => {
    setFieldName(element.field_name || "");
    setFieldDesc(element.field_desc || "");
    setFieldPlaceholder(element.field_placeholder || "");
    setFieldNote(element.field_note || "");
  }, [element]);

  const handleBlur = (fieldKey, value) => {
    updateField(element.field_id, fieldKey, value);
  };

  return (
    <div className="pl-12 mt-5 max-w-xl w-full">
      {/* Editable Field Name */}
      <input
        name="field_name"
        placeholder="Field Name"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
        onBlur={(e) => handleBlur("field_name", fieldName)}
        className="w-full text-lg font-semibold mb-1 outline-none bg-white"
      />

      {/* Description */}
      <textarea
        name="field_desc"
        placeholder="Description"
        value={fieldDesc}
        onChange={(e) => setFieldDesc(e.target.value)}
        onBlur={(e) => handleBlur("field_desc", fieldDesc)}
        className="w-full text-sm text-gray-500 mb-2 outline-none resize-none h-6 bg-white"
      />

      {/* Main Input */}
      <input
        type={
          QType === "A" || QType === "E" || QType === "T" ? "text" : "number"
        }
        name="field_placeholder"
        placeholder="Enter Text"
        value={fieldPlaceholder}
        onChange={(e) => setFieldPlaceholder(e.target.value)}
        onBlur={(e) => handleBlur("field_placeholder", fieldPlaceholder)}
        required
        className="w-full p-2 border border-gray-300 rounded-md text-base mb-1 bg-white placeholder:text-gray-600"
      />

      {/* Note */}
      <textarea
        name="field_note"
        placeholder="Add requirements (e.g. password must be at least 8 characters)"
        value={fieldNote}
        onChange={(e) => setFieldNote(e.target.value)}
        onBlur={(e) => handleBlur("field_note", fieldNote)}
        className="w-full text-xs text-gray-500 mt-1 outline-none resize-none h-6 bg-white"
      />
    </div>
  );
};

export default TextField;
