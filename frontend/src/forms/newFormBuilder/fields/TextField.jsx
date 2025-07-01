import React, { useState, useEffect } from 'react';

const TextField = ({ onUpdate, field = {}, isPreview = false }) => {
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

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white px-8 rounded-lg space-y-2">
        {/* Label */}
        {isPreview ? (
          <label className="text-black text-lg font-medium block">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
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
        <input
          type={localField.type}
          name={localField.name}
          value={localField.value}
          onChange={(e) => handleFieldChange('value', e.target.value)}
          placeholder={localField.placeholder}
          required={localField.required}
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none text-sm"
        />

        {/* Placeholder & Note */}
        {isPreview ? (
          <>
            {field.note && <div className="text-xs text-gray-400">{field.note}</div>}
          </>
        ) : (
          <>
            {/* Placeholder Editor */}
            <input
              type="text"
              value={displayPlaceholder}
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
          </>
        )}
      </div>
    </div>
  );
};

export default TextField;
