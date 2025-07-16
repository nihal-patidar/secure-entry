import React, { useState, useEffect } from 'react';

const TextField = ({
  onUpdate,
  field = {},
  isPreview = false,
  register // ✅ added register prop for react-hook-form
}) => {
  const [localField, setLocalField] = useState({
    name: field?.name || '',
    type: field?.type || 'text',
    label: field?.label || 'Field Label',
    placeholder: field?.placeholder || 'Enter something...',
    required: field?.required || false,
    value: field?.value || '',
    note: field?.note || ''
  });

  useEffect(() => {
    if (!isPreview && onUpdate) {
      onUpdate(localField);
    }
  }, [localField]);

  const handleFieldChange = (key, value) => {
    if (key === 'value' && localField.type === 'number') {
      const numericRegex = /^-?\d*\.?\d*$/;
      if (value !== '' && !numericRegex.test(value)) return;
    }
    setLocalField(prev => ({ ...prev, [key]: value }));
  };

  const displayPlaceholder =
    localField.placeholder === 'Enter text' || localField.placeholder === 'Enter number'
      ? 'placeholder : ' + localField.placeholder
      : localField.placeholder;

  // Used to create unique field names for registration
  const fieldKey = field.label || "TextField";

  // Get the appropriate input type and validation rules
  const getInputType = () => {
    switch (localField.type) {
      case 'email':
        return 'email';
      case 'number':
        return 'number';
      case 'address':
        return 'text';
      case 'text':
      default:
        return 'text';
    }
  };

  // Get validation rules for react-hook-form
  const getValidationRules = () => {
    const rules = {};
    
    if (field.required) {
      rules.required = `${field.label} is required`;
    }

    switch (localField.type) {
      case 'email':
        rules.pattern = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        };
        break;
      case 'number':
        rules.pattern = {
          value: /^-?\d*\.?\d*$/,
          message: 'Please enter a valid number'
        };
        break;
      default:
        break;
    }

    return rules;
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto relative bg-white px-8 rounded-lg space-y-4">
        {/* Label */}
        {isPreview ? (
          <div className="text-black text-lg font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <input
            type="text"
            value={localField.label}
            onChange={(e) => handleFieldChange('label', e.target.value)}
            className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
            placeholder="Field Label"
          />
        )}

        {/* Input */}
        {isPreview && typeof register === "function" ? (
          <input
            {...register(fieldKey)}
            type={"text"}
            placeholder={localField.placeholder}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none text-sm"
          />
        ) : (
          <input
            type={getInputType()}
            value={localField.value}
            onChange={(e) => handleFieldChange('value', e.target.value)}
            placeholder={localField.placeholder}
            required={localField.required}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none text-sm"
          />
        )}

        {/* Placeholder & Note */}
        {isPreview ? (
          <>
            {field.note && <div className="text-xs text-gray-400">{field.note}</div>}
          </>
        ) : (
          <>
            {/* Type Selector
            <select
              value={localField.type}
              onChange={(e) => handleFieldChange('type', e.target.value)}
              className="text-xs text-gray-500 bg-white border border-gray-300 rounded px-2 py-1 outline-none"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="address">Address</option>
            </select> */}

            {/* Placeholder Editor */}
            <input
              type="text"
              value={localField.placeholder}
              onChange={(e) => handleFieldChange('placeholder', e.target.value)}
              className="text-xs text-gray-500 bg-white outline-none px-1 py-0.5 w-full"
              placeholder="Placeholder..."
            />

            {/* Note Field */}
            <input
              type="text"
              value={localField.note}
              onChange={(e) => handleFieldChange('note', e.target.value)}
              className="text-xs text-gray-400 bg-white outline-none px-1 py-0.5 w-full"
              placeholder="Note (optional)..."
            />

            {/* Required Toggle
            <label className="flex items-center text-xs text-gray-600">
              <input
                type="checkbox"
                checked={localField.required}
                onChange={(e) => handleFieldChange('required', e.target.checked)}
                className="mr-2"
              />
              Required field
            </label> */}
          </>
        )}
      </div>
    </div>
  );
};

export default TextField;