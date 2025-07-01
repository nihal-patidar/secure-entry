import { useState } from "react";

export default function DropdownSelectOption({
  opts = ["Option A", "Option B", "Option C"],
  isPreview = false,
  field = {},
  onUpdate,
  isBuilder = true,
}) {
  const [options, setOptions] = useState(field?.options || opts);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [fieldName, setFieldName] = useState(
    field?.label || "Dropdown Question"
  );
  const [description, setDescription] = useState(
    field?.description || "Description"
  );

  // Update external state if in builder mode
  const updateField = (newState) => {
    if (isBuilder && onUpdate) {
      onUpdate({
        ...field,
        label: fieldName,
        description,
        options,
        required: true,
        ...newState,
      });
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newOptions = [...options];
    [newOptions[index - 1], newOptions[index]] = [
      newOptions[index],
      newOptions[index - 1],
    ];
    setOptions(newOptions);
    updateField({ options: newOptions });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    const newOptions = [...options];
    [newOptions[index], newOptions[index + 1]] = [
      newOptions[index + 1],
      newOptions[index],
    ];
    setOptions(newOptions);
    updateField({ options: newOptions });
  };

  const duplicateOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index + 1, 0, options[index]);
    setOptions(newOptions);
    updateField({ options: newOptions });
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    if (selectedOption >= index && selectedOption > 0) {
      setSelectedOption((prev) => prev - 1);
    }
    updateField({ options: newOptions });
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    updateField({ options: newOptions });
  };

  const selectOption = (index) => {
    setSelectedOption(index);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative group bg-white text-black rounded-lg">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-2">
        {/* Title */}
        {isPreview ? (
          <div className="text-black bg-white text-lg font-medium w-full">
            {fieldName}
            {field?.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <input
            className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
            type="text"
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value);
              updateField({ label: e.target.value });
            }}
            placeholder="Dropdown Question"
          />
        )}

        {/* Description */}
        {isPreview ? (
          <div className="text-sm text-gray-500">{description}</div>
        ) : (
          <input
            type="text"
            className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              updateField({ description: e.target.value });
            }}
            placeholder="Description"
          />
        )}

        {/* Dropdown */}
        <div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-left text-gray-800 hover:border-gray-400 focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <span>{options[selectedOption] || "Select an option"}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectOption(index)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      selectedOption === index
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Option Editor (Builder Only) */}
        {isBuilder && (
          <div className="space-y-3">
            <h3 className="text-base font-medium text-gray-800 mt-4 mb-2">
              Configure Options:
            </h3>
            {options.map((option, index) => (
              <div key={index}>
                <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm text-gray-600 bg-gray-50">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="text-sm font-medium text-black bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5"
                    />
                  </div>

                  <div className="flex items-center gap-2">
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
                      className="text-gray-500 hover:text-gray-600 disabled:opacity-30"
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
                      className="text-gray-500 hover:text-red-500 disabled:opacity-30"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
