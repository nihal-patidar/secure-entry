import { useState } from "react";

export default function SingleSelectOption({ opts = ["A", "B", "C"], count = 2, type, QType }) {
  const [options, setOptions] = useState(opts);
  const [selectedOption, setSelectedOption] = useState(0);

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

  return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2>
              <input 
                className="text-2xl font-semibold text-gray-800 placeholder:text-black active:border-none outline-none bg-white" 
                type="text" 
                placeholder="Single Select Question"
              />
            </h2>
            <input 
              type="text"  
              className="text-gray-600 mt-1 outline-none bg-white" 
              placeholder="Description"
            />
          </div>
          
        </div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      selectedOption === index 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onClick={() => setSelectedOption(index)}
                  >
                    {selectedOption === index && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
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