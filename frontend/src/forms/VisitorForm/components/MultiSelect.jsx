import { useState, useEffect } from "react";

export default function MultiSelectOption({ field = {}, isPreview = false, onUpdate }) {
  const [options, setOptions] = useState(field.options || ["A", "B", "C"]);
  const [selectedOptions, setSelectedOptions] = useState(field.selected || []);
  const [fieldName, setFieldName] = useState(field.label || "Multi Select Question");
  const [description, setDescription] = useState(field.description || "Description");

  // Sync changes in builder mode
  useEffect(() => {
    if (!isPreview && onUpdate) {
      onUpdate({
        label: fieldName,
        description,
        options,
        selected: selectedOptions,
      });
    }
  }, [fieldName, description, options, selectedOptions]);

  const moveUp = (index) => {
    if (index === 0) return;
    setOptions(prev => {
      const newOptions = [...prev];
      [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
      return newOptions;
    });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    setOptions(prev => {
      const newOptions = [...prev];
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
      return newOptions;
    });
  };

  const duplicateOption = (index) => {
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions.splice(index + 1, 0, prev[index]);
      return newOptions;
    });
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
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
    setSelectedOptions(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full relative group bg-white rounded-lg ">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-2">
        {/* Title and Description */}
        {isPreview ? (
          <>
            <div className="text-lg font-medium text-black bg-white">
              {field.label || "Multi Select Question"}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div className="text-sm text-gray-500">{field.description}</div>
          </>
        ) : (
          <>
            <h2 className="text-black text-lg font-medium w-full bg-white outline-none px-1 py-0.5">
                {fieldName}
            </h2>
            <h2 className="text-black text-lg font-medium w-full bg-white outline-none px-1 py-0.5">
                {description}
            </h2>
          </>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {(isPreview ? field.options || [] : options).map((option, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
                <div className="flex items-center gap-3">
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

                  {isPreview ? (
                    <div className="text-sm font-medium text-gray-700">{option}</div>
                  ) : (
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="text-sm font-medium text-black bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}