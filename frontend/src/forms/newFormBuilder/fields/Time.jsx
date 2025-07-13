import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const TimeField = ({ 
  field = {}, 
  isBuilder = true, 
  onUpdate,
  register, // ✅ used in preview mode only
}) => {
  const [formData, setFormData] = useState({
    label: field.label || "Enter Time",
    time: field.time || "",
    note: field.note || "Note/Instruction (If any)",
    required: field.required || false,
  });

  // Used to create unique field names for registration
  const fieldKey = field.label || "Enter Time";

  useEffect(() => {
    if (isBuilder) {
      setFormData({
        label: field.label || "Enter Time",
        time: field.time || "",
        note: field.note || "Note/Instruction (If any)",
        required: field.required || false,
      });
    }
  }, [field]);

  const handleChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    if (onUpdate) {
      onUpdate({ ...field, ...updated });
    }
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-2">
        {/* Label */}
        {isBuilder ? (
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Time Label"
            className="text-lg font-medium w-full bg-white outline-none px-1 py-0.5"
          />
        ) : (
          <div className="text-lg font-medium text-black">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        )}

        {/* Time Picker with Clock Icon */}
        <div className="relative w-full">
          {!isBuilder && typeof register === "function" ? (
            <input
              {...register(`${fieldKey}_time`)} // ✅ Register for react-hook-form
              type="time"
              className="w-full px-4 py-2 pr-10 border border-gray-300 bg-white text-black rounded-md focus:outline-none text-sm"
            />
          ) : (
            <input
              type="time"
              name="time"
              value={isBuilder ? formData.time : field.time || ""}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 bg-white text-black rounded-md focus:outline-none text-sm"
            />
          )}
          <div className="absolute right-11 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Note */}
        {isBuilder ? (
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="Note (optional)..."
            className="text-xs text-gray-400 bg-white outline-none px-1 py-0.5 w-full"
          />
        ) : (
          <div className="text-xs text-gray-400">{field.note}</div>
        )}
      </div>
    </div>
  );
};

export default TimeField;