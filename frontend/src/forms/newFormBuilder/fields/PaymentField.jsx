import { useState, useEffect } from "react";

// AddFieldPopUp Component
const AddFieldPopUp = ({
  onClose,
  fieldList,
  updateOptionDependedFieldsAtIndex,
  fieldId,
  currentOptionIndex,
  element,
}) => {
  const [selectedFields, setSelectedFields] = useState(
    element?.field_Options?.[currentOptionIndex]?.depended_field || []
  );

  const handleSelectField = (field) => {
    if (!selectedFields.find((f) => f.id === field.id)) {
      setSelectedFields((prev) => [...prev, field]);
    }
  };

  const handleRemoveField = (id) => {
    setSelectedFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSetFields = () => {
    updateOptionDependedFieldsAtIndex(fieldId, currentOptionIndex, selectedFields);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] border border-[#EAEAEA] w-[880px] h-[420px] p-6 relative shadow-xl flex flex-col">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-center text-lg font-semibold mb-4 text-black">
          Add fields to show if this option is selected
        </h2>

        <div className="flex gap-6 h-[300px]">
          {/* Left: Master Field List */}
          <div className="w-1/2 border-r border-gray-300 pr-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Available Fields</h3>
            <ul className="space-y-2">
              {/* {console.log(fieldList)} */}
              {fieldList ? (
                fieldList.map((field) => {
                  if (field.id !== fieldId) {
                    return (
                      <li
                        key={field.id}
                        className="cursor-pointer text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
                        onClick={() => handleSelectField(field)}
                      >
                        {field.label}
                      </li>
                    );
                  }
                  return null;
                })
              ) : (
                <li className="text-gray-500 italic text-sm">
                  No fields available</li>
              )}
            </ul>
          </div>

          {/* Right: Selected Fields */}
          <div className="w-1/2 pl-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Fields</h3>
            <ul className="space-y-2 pr-2">
              {selectedFields.length > 0 ? (
                selectedFields.map((field) => (
                  <li
                    key={field.id}
                    className="flex items-center justify-between text-sm bg-blue-50 text-blue-900 px-3 py-2 rounded-md"
                  >
                    <span>{field.label}</span>
                    <button
                      onClick={() => handleRemoveField(field.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic text-sm">No fields selected</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSetFields}
            className="text-white px-10 py-2 text-sm font-medium rounded-full bg-blue-700 hover:bg-blue-800 transition-all"
          >
            Set Fields
          </button>
        </div>

        <p className="text-[12px] text-gray-500 italic text-center mt-3">
          <span className="font-semibold">*Note:</span> These fields will be displayed only when this option is selected by the user. Duplicate fields are not allowed.
        </p>
      </div>
    </div>
  );
};

// SetPaymentPopUp Component
const SetPaymentPopUp = ({
  onClose,
  fieldId,
  currentOptionIndex,
  updateOptionAmountAtIndex,
  element
}) => {
  const [amount, setAmount] = useState(
    element?.field_Options?.[currentOptionIndex]?.amount ?? ""
  );
  const [error, setError] = useState("");

  const handleSetPayment = () => {
    if (amount === "") {
      onClose(); return;
    }

    const num = Number(amount);
    if (!isNaN(num) && num >= 0) {
      updateOptionAmountAtIndex(fieldId, currentOptionIndex, num);
      onClose();
    } else {
      setError("* Please enter a valid non-negative number");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] border border-[#EAEAEA] w-[490px] p-[30px] px-[35px] relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-black text-md font-medium mb-6">
          Set Total Payment if this option is selected
        </h2>

        <h2 className="text-black text-xl font-semibold mb-6 flex items-center gap-2">
          Current Amount:
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-xl shadow-sm border border-green-300">
            ₹ {element?.field_Options?.[currentOptionIndex]?.amount ?? 0}
          </span>
        </h2>

        <div className="flex flex-col mb-2">
          <label className="text-sm text-gray-600 mb-1 mt-4">
            Enter Payment Amount
          </label>
          <input
            type="text"
            className="bg-white border border-[#E2E2E2] rounded-[8px] px-3 py-4 text-sm text-black placeholder-gray-400"
            placeholder="Payment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSetPayment}
            className="text-white px-10 py-3 text-sm font-semibold mt-3 rounded-full bg-blue-700 hover:bg-blue-800 transition-all"
          >
            Set Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function SpecialSelectOption({ 
  field = {}, 
  isPreview = false, 
  onUpdate,
  fieldList = [],
  updateOptionDependedFieldsAtIndex,
  updateOptionAmountAtIndex,
  paymentFields,
  fieldId,
  register // ✅ used in preview mode only
}) {
  const [options, setOptions] = useState(field.options || [ { value:"A",id:`${fieldId}A`}, {value:"B",id:`${fieldId}B`}, {value:"C",id:`${fieldId}C`} ]);
  const [selectedOptions, setSelectedOptions] = useState(field.selected || []);
  const [fieldName, setFieldName] = useState(field.label || "Special Select Question");
  const [description, setDescription] = useState(field.description || "Description");
  const [isMultiSelect, setIsMultiSelect] = useState(field.isMultiSelect ?? true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAddFieldPopup, setShowAddFieldPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(null);

  // Used to create unique field names for registration
  const fieldKey = field.label || "Special Select Question";

  // Initialize field_Options if it doesn't exist
  const [fieldOptions, setFieldOptions] = useState(() => {
    if (field.field_Options) return field.field_Options;
    return options.map((_, index) => ({
      depended_field: [],
      amount: 0
    }));
  });

  // Sync changes in builder mode
  useEffect(() => {
    if (!isPreview && onUpdate) {
      onUpdate({
        label: fieldName,
        description,
        options: options,
        selected: selectedOptions,
        isMultiSelect,
        field_Options: fieldOptions,
      });
    }
  }, [fieldName, description, options, selectedOptions, isMultiSelect, fieldOptions]);

  // Update fieldOptions when options change
  useEffect(() => {
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      // Add new option configs if options were added
      while (newFieldOptions.length < options.length) {
        newFieldOptions.push({
          depended_field: [],
          amount: 0
        });
      }
      // Remove option configs if options were removed
      if (newFieldOptions.length > options.length) {
        newFieldOptions.splice(options.length);
      }
      return newFieldOptions;
    });
  }, [options.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Functions to update field options
  const updateOptionDependedFields = (fieldId, optionIndex, dependedFields) => {
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      if (!newFieldOptions[optionIndex]) {
        newFieldOptions[optionIndex] = { depended_field: [], amount: 0 };
      }
      newFieldOptions[optionIndex].depended_field = dependedFields;
      return newFieldOptions;
    });
  };

  const updateOptionAmount = (fieldId, optionIndex, amount) => {
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      if (!newFieldOptions[optionIndex]) {
        newFieldOptions[optionIndex] = { depended_field: [], amount: 0 };
      }
      newFieldOptions[optionIndex].amount = amount;
      return newFieldOptions;
    });
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setOptions(prev => {
      const newOptions = [...prev];
      [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
      return newOptions;
    });
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      [newFieldOptions[index - 1], newFieldOptions[index]] = [newFieldOptions[index], newFieldOptions[index - 1]];
      return newFieldOptions;
    });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    setOptions(prev => {
      const newOptions = [...prev];
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
      return newOptions;
    });
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      [newFieldOptions[index], newFieldOptions[index + 1]] = [newFieldOptions[index + 1], newFieldOptions[index]];
      return newFieldOptions;
    });
  };

  const duplicateOption = (index) => {
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions.splice(index + 1, 0, prev[index]);
      return newOptions;
    });
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      newFieldOptions.splice(index + 1, 0, { ...newFieldOptions[index] });
      return newFieldOptions;
    });
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
    });
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      newFieldOptions.splice(index, 1);
      return newFieldOptions;
    });
    setSelectedOptions(prev =>
      prev.filter(i => i !== index).map(i => (i > index ? i - 1 : i))
    );
  };

  const updateOption = (index, value) => {
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const toggleOption = (index) => {
    if (isMultiSelect) {
      setSelectedOptions(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      // Single select - only one option can be selected
      setSelectedOptions(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const handleSelectTypeChange = (type) => {
    setIsMultiSelect(type === 'multi');
    // Clear selections when switching modes
    setSelectedOptions([]);
  };

  const toggleActionDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleAction = (action, optionIndex) => {
    setCurrentOptionIndex(optionIndex);
    setActiveDropdown(null);
    
    if (action === 'Add Payment') {
      setShowPaymentPopup(true);
    } else if (action === 'Add Field') {
      setShowAddFieldPopup(true);
    }
  };

  // Create element prop for popups
  const elementForPopup = {
    field_Options: fieldOptions
  };
  let option;

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-4">
        {/* Title and Description */}
        {isPreview ? (
          <>
            <div className="text-lg font-medium text-black bg-white">
              {field.label || "Special Select Question"}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div className="text-sm text-gray-500">{field.description}</div>
          </>
        ) : (
          <>
            {console.log("Payment Fis", field)}
            <input
              className="text-black text-lg font-medium w-full bg-white outline-none px-1 py-0.5"
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Special Select Question"
            />
            <input
              type="text"
              className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </>
        )}

        {/* Select Type Toggle */}
        {!isPreview && (
          <div className="flex items-center gap-4 py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Selection Type:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleSelectTypeChange('multi')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition ${
                  isMultiSelect
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Multi Select
              </button>
              <button
                onClick={() => handleSelectTypeChange('single')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition ${
                  !isMultiSelect
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Single Select
              </button>
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {/* {isPreview ? (<>{field.options}</>):(<>{options.length}</>)} */}
          {(field.options ? field.options || [] : options).map((optionObj, index) => (
            <div key={optionObj.id} className="relative">{
                            console.log("Payment Fields", paymentFields && paymentFields[0] && paymentFields[0].options && paymentFields[0].options[0] && paymentFields[0].options[0].value)}
                            <div className="hidden">{option = optionObj.value}{console.log(optionObj)}</div>
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
                <div className="flex items-center gap-3">
                  {/* Selection Input with react-hook-form registration */}
                  {isPreview && typeof register === "function" ? (
                    // Multi-select mode in preview with registration
                    isMultiSelect ? (
                      <input
                        {...register(`${fieldKey}_option_${index}`)}
                        type="checkbox"
                        className="w-5 h-5 rounded-sm border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      // Single-select mode in preview with registration
                      <input
                        {...register(`${fieldKey}_selection`)}
                        type="radio"
                        value={optionObj.value}
                        className="w-5 h-5 border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )
                  ) : (
                    // Builder mode or preview without registration - custom controls
                    isMultiSelect ? (
                      <div
                        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center cursor-pointer ${
                          selectedOptions.includes(index)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => toggleOption(index)}
                      >
                        {selectedOptions.includes(index) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          selectedOptions.includes(index)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => toggleOption(index)}
                      >
                        {selectedOptions.includes(index) && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    )
                  )}

                  {/* Option Text */}
                  {isPreview ? (
                    <label 
                      htmlFor={isMultiSelect ? `${fieldKey}_option_${index}` : `${fieldKey}_selection`}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {optionObj.value}
                    </label>
                  ) : (
                    <input
                      type="text"
                      value={optionObj.value}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="text-sm font-medium text-black bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5"
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Action Button - Only show in builder mode */}
                  {!isPreview && (
                    <div className="relative action-dropdown">
                      <button
                        onClick={() => toggleActionDropdown(index)}
                        className="bg-[#2F44FF] hover:bg-[#1e2fd6] text-white px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-1"
                      >
                        Action
                        <svg
                          className={`w-3 h-3 transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === index && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                            <button
                              onClick={() => handleAction('Add Payment', index)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2F44FF] transition"
                            >
                              Add Payment
                            </button>
                            <button
                              onClick={() => handleAction('Add Field', index)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2F44FF] transition border-t border-gray-100"
                            >
                              Add Field
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                  {/* Builder Controls */}
                  {!isPreview && (
                    <>
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="text-gray-500 hover:text-gray-600 disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === options.length - 1}
                        className="text-gray-500 hover:text-gray-600 disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => duplicateOption(index)}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        ⧉
                      </button>
                      <button
                        onClick={() => removeOption(index)}
                        disabled={options.length <= 1}
                        className="text-gray-500 hover:text-red-500 disabled:opacity-40"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Option Button (Builder Only) */}
        {!isPreview && (
          <button
            onClick={() => setOptions(prev => [...prev, `Option ${prev.length + 1}`])}
            className="w-full border-2 border-dashed border-gray-300 hover:border-[#2F44FF] text-gray-500 hover:text-[#2F44FF] py-3 rounded-md transition font-medium"
          >
            + Add Option
          </button>
        )}
      </div>

      {/* Popups */}
      {showAddFieldPopup && (
        <AddFieldPopUp
          onClose={() => setShowAddFieldPopup(false)}
          fieldList={fieldList}
          updateOptionDependedFieldsAtIndex={updateOptionDependedFields}
          fieldId={field.id}
          currentOptionIndex={currentOptionIndex}
          element={elementForPopup}
        />
      )}

      {showPaymentPopup && (
        <SetPaymentPopUp
          onClose={() => setShowPaymentPopup(false)}
          fieldId={field.id}
          currentOptionIndex={currentOptionIndex}
          updateOptionAmountAtIndex={updateOptionAmount}
          element={elementForPopup}
        />
      )}
    </div>
  );
}