import { useState } from "react";

export default function DropdownSelectOption({ opts = ["Option A", "Option B", "Option C"], count = 2, type, QType }) {
  const [options, setOptions] = useState(opts);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
      return newOptions;
    });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
      return newOptions;
    });
  };

  const duplicateOption = (index) => {
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions.splice(index + 1, 0, prevOptions[index]);
      return newOptions;
    });
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      return newOptions;
    });
    if (selectedOption >= index && selectedOption > 0) {
      setSelectedOption(prev => prev - 1);
    }
  };

  const updateOption = (index, value) => {
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const selectOption = (index) => {
    setSelectedOption(index);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>
            <input 
              className="text-2xl font-semibold text-gray-800 placeholder:text-black active:border-none outline-none bg-white" 
              type="text" 
              placeholder="Dropdown Question"
            />
          </h2>
          <input 
            type="text"  
            className="text-gray-600 mt-1 outline-none bg-white" 
            placeholder="Description"
          />
        </div>
      </div>

      {/* Dropdown Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview:</label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span>{options[selectedOption] || "Select an option"}</span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectOption(index)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedOption === index ? 'bg-blue-50 text-blue-700' : 'text-gray-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Options Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Configure Options:</h3>
        {options.map((option, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-50">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="bg-transparent text-lg font-medium text-gray-800 border-none outline-none flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Move up/down buttons */}
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === options.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Add/Remove buttons */}
                <button
                  onClick={() => duplicateOption(index)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button 
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 1}
                  className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}