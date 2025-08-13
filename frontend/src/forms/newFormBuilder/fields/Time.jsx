import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

const DateField = ({
  field = {},
  isBuilder = true,
  onUpdate,
  control, // react-hook-form control
  errors = {}, // form errors
}) => {
  const [formData, setFormData] = useState({
    label: field.label || "Enter Date",
    date: field.date || null,
    time: field.time || "",
    note: field.note || "Note/Instruction (If any)",
    required: field.required || false,
    placeholder: field.placeholder || "Select a date",
  });

  // Create unique field name
  const fieldKey = (field.label || "Enter Date")
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase();

  useEffect(() => {
    if (isBuilder) {
      setFormData({
        label: field.label || "Enter Date",
        date: field.date || null,
        time: field.time || "",
        note: field.note || "Note/Instruction (If any)",
        required: field.required || false,
        placeholder: field.placeholder || "Select a date",
      });
    }
  }, [field, isBuilder]);

  const handleChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate({ ...field, ...updated });
    }
  };

  // Convert date string to Date object
  const parseDate = (dateValue) => {
    if (!dateValue) return null;
    if (dateValue instanceof Date) return dateValue;
    
    // Handle string dates
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    }
    
    return null;
  };

  // Get error message for time field
  const getTimeErrorMessage = () => {
    const fieldError = errors[`${fieldKey}_time`];
    return fieldError?.message || null;
  };

  // Custom DatePicker wrapper that handles the onChange properly
  const CustomDatePicker = ({ value, onChange, placeholder, className, hasError }) => {
    const handleDateChange = (date) => {
      // Create a synthetic event-like object that react-hook-form expects
      const syntheticEvent = {
        target: {
          name: `${fieldKey}_date`,
          value: date
        }
      };
      
      // Call onChange with the synthetic event
      onChange(syntheticEvent);
    };

    return (
      <DatePicker
        selected={parseDate(value)}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText={placeholder}
        className={className}
        showPopperArrow={false}
        popperClassName="z-50"
        calendarClassName="shadow-lg border border-gray-200 rounded-lg"
        dayClassName={(date) => "hover:bg-blue-500 hover:text-white rounded"}
        monthClassName={() => "hover:bg-blue-500 hover:text-white rounded"}
        yearClassName={() => "hover:bg-blue-500 hover:text-white rounded"}
      />
    );
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white px-8 py-4 rounded-lg space-y-2">
        {/* Label */}
        {isBuilder ? (
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Date Label"
            className="text-lg font-medium w-full bg-white outline-none px-1 py-0.5 border-b border-transparent"
          />
        ) : (
          <div className="text-lg font-medium text-black">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        )}

        {/* Date Input */}
        {/* Commented out - can be re-enabled when needed
        <div className="relative w-full">
          {!isBuilder && control ? (
            <Controller
              name={`${fieldKey}_date`}
              control={control}
              rules={{
                required: field.required ? `${field.label} is required` : false,
                validate: (value) => {
                  if (!value) return true;
                  const date = parseDate(value);
                  if (!date) return "Please enter a valid date";
                  return true;
                }
              }}
              render={({ field: controllerField }) => (
                <CustomDatePicker
                  value={controllerField.value}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    controllerField.onChange(dateValue);
                  }}
                  placeholder={field.placeholder || "Select a date"}
                  hasError={!!getErrorMessage()}
                  className={`w-full px-4 py-2 pr-10 border ${
                    getErrorMessage() 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm`}
                />
              )}
            />
          ) : (
            <DatePicker
              selected={parseDate(isBuilder ? formData.date : field.date)}
              onChange={(date) => handleChange("date", date)}
              dateFormat="MM/dd/yyyy"
              placeholderText={formData.placeholder}
              className="w-full px-4 py-2 pr-10 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              showPopperArrow={false}
              popperClassName="z-50"
              calendarClassName="shadow-lg border border-gray-200 rounded-lg"
              dayClassName={(date) => "hover:bg-blue-500 hover:text-white rounded"}
              monthClassName={() => "hover:bg-blue-500 hover:text-white rounded"}
              yearClassName={() => "hover:bg-blue-500 hover:text-white rounded"}
            />
          )}
        </div>
        */}

        {/* Time Input */}
        <div className="relative w-full">
          {!isBuilder && control ? (
            <Controller
              name={`${fieldKey}_time`}
              control={control}
              defaultValue=""
              rules={{
                required: field.required ? `Time is required` : false,
                validate: (value) => {
                  if (!value) return true;
                  // Basic time format validation (HH:MM)
                  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                  if (!timeRegex.test(value)) return "Please enter a valid time";
                  return true;
                }
              }}
              render={({ field: controllerField }) => (
                <input 
                  type="time" 
                  name={controllerField.name}
                  value={controllerField.value || ""}
                  onChange={(e) => controllerField.onChange(e.target.value)}
                  onBlur={controllerField.onBlur}
                  ref={controllerField.ref}
                  className={`w-full px-4 py-2 border ${
                    getTimeErrorMessage() 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm hover:border-gray-400 transition-colors duration-200 cursor-pointer`}
                  style={{
                    colorScheme: 'light'
                  }}
                />
              )}
            />
          ) : (
            <input 
              type="time" 
              name="time" 
              value={formData.time || ""}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-400 transition-colors duration-200 cursor-pointer"
              style={{
                colorScheme: 'light'
              }}
            />
          )}
        </div>

        {/* Time Error Message */}
        {!isBuilder && getTimeErrorMessage() && (
          <div className="text-xs text-red-500 mt-1">
            {getTimeErrorMessage()}
          </div>
        )}

        {/* Error Message */}
        {/* Commented out - was for date field
        {!isBuilder && getErrorMessage() && (
          <div className="text-xs text-red-500 mt-1">
            {getErrorMessage()}
          </div>
        )}
        */}

        {/* Note */}
        {isBuilder ? (
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="Note (optional)..."
            className="text-xs text-gray-400 bg-white outline-none px-1 py-0.5 w-full border-b border-transparent"
          />
        ) : (
          field.note && field.note !== "Note/Instruction (If any)" && (
            <div className="text-xs text-gray-400">{field.note}</div>
          )
        )}

        {/* Builder Options */}
        {/* Commented out - can be re-enabled when needed
        {isBuilder && (
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.required}
                onChange={(e) => handleChange("required", e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Required</span>
            </label>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Placeholder:</label>
              <input
                type="text"
                value={formData.placeholder}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Select a date"
              />
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default DateField;