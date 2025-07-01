import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField = ({ field = {}, isPreview = false, onUpdate }) => {
  const dateRef = useRef(null);

  const [dateFieldData, setDateFieldData] = useState({
    label: field?.field_label || "Select a Date",
    date: field?.field_value ? new Date(field.field_value) : new Date(),
    note: field?.field_note || "",
    required: field?.required || false,
  });

  useEffect(() => {
    setDateFieldData({
      label: field?.field_label || "Select a Date",
      date: field?.field_value ? new Date(field.field_value) : new Date(),
      note: field?.field_note || "",
      required: field?.required || false,
    });
  }, [field]);

  const handleChange = (key, value) => {
    const updated = {
      ...dateFieldData,
      [key]: value,
    };
    setDateFieldData(updated);

    if (onUpdate) {
      onUpdate({
        field_label: updated.label,
        field_value: updated.date,
        field_note: updated.note,
      });
    }
  };

  return (
    <div className="w-full relative group bg-white rounded-lg ">
      <div className="max-w-3xl mx-auto bg-white px-8 rounded-lg space-y-4">
        {isPreview ? (
          <p className="text-black bg-white text-lg font-medium">
            {dateFieldData.label}
            {dateFieldData.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </p>
        ) : (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={dateFieldData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="Date Question"
              className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
            />
            
            
          </div>
        )}

        {/* Date Picker */}
        <div className="relative">
          <DatePicker
            selected={dateFieldData.date}
            onChange={(date) => handleChange("date", date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            ref={dateRef}
            className="w-full px-4 py-2 border bg-white outline-none border-gray-300 rounded-md text-sm pr-12"
            calendarClassName="!z-50"
          />
        </div>

        {/* Note */}
        {isPreview ? (
          dateFieldData.note && (
            <p className="text-xs text-gray-500 mt-1">{dateFieldData.note}</p>
          )
        ) : (
          <input
            type="text"
            value={dateFieldData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="Note (optional)..."
            className="text-xs text-gray-400 bg-white outline-none px-1 py-0.5 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default DateField;
