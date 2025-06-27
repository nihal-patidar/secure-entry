import { useState } from "react";

const ContactFeild = ({ QType, element = {}, updateField }) => {
  const [fieldData, setFieldData] = useState({
    field_name: "",
    field_desc: "",
    field_placeholder: "",
    field_note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateField(element?.field_id, name, value);
  };

  return (
    <div className="pl-[50px] mt-4">
      <input
        name="field_name"
        placeholder={element?.field_name || "Field Name"}
        value={fieldData.field_name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mb-2 p-2 w-[30vw] rounded-md border border-gray-300 bg-white"
      />

      <textarea
        name="field_desc"
        placeholder={element?.field_desc || "Description"}
        value={fieldData.field_desc}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mb-2 p-2 w-[30vw] rounded-md border border-gray-300 bg-white"
      />

      <input
        type={QType === "A" || QType === "E" || QType === "T" ? "text" : "number"}
        name="field_placeholder"
        placeholder={element?.field_placeholder || "Input Placeholder"}
        value={fieldData.field_placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="mb-2 p-2 w-[30vw] rounded-md border border-gray-300 bg-white"
      />

      <textarea
        name="field_note"
        placeholder={element?.field_note || "Note"}
        value={fieldData.field_note}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mt-4 p-2 w-[30vw] rounded-md border border-gray-300 bg-white"
      />

      {fieldData.field_error && (
        <p className="text-red-500 text-sm mt-2">{fieldData.field_error}</p>
      )}
    </div>
  );
};

export default ContactFeild;
