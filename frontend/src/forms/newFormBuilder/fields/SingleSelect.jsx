// import { useState, useEffect } from "react";

// export default function SingleSelectOption({ 
//   field = {}, 
//   isPreview = false, 
//   onUpdate,
//   register // ✅ added register prop for react-hook-form
// }) {
//   const [options, setOptions] = useState(field.options || ["A", "B", "C"]);
//   const [selectedOption, setSelectedOption] = useState(field.selected ?? -1);
//   const [fieldName, setFieldName] = useState(field.label || "Single Select Question");
//   const [description, setDescription] = useState(field.description || "Description");

//   // Sync changes back to parent (builder mode)
//   useEffect(() => {
//     if (!isPreview && onUpdate) {
//       onUpdate({
//         label: fieldName,
//         description,
//         options,
//         selected: selectedOption,
//       });
//     }
//   }, [fieldName, description, options, selectedOption]);

//   const moveUp = (index) => {
//     if (index === 0) return;
//     setOptions((prev) => {
//       const newOptions = [...prev];
//       [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
//       return newOptions;
//     });
//   };

//   const moveDown = (index) => {
//     if (index === options.length - 1) return;
//     setOptions((prev) => {
//       const newOptions = [...prev];
//       [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
//       return newOptions;
//     });
//   };

//   const duplicateOption = (index) => {
//     setOptions((prev) => {
//       const newOptions = [...prev];
//       newOptions.splice(index + 1, 0, prev[index]);
//       return newOptions;
//     });
//   };

//   const removeOption = (index) => {
//     if (options.length <= 1) return;
//     setOptions((prev) => {
//       const newOptions = [...prev];
//       newOptions.splice(index, 1);
//       return newOptions;
//     });
//     if (selectedOption >= index && selectedOption > 0) {
//       setSelectedOption((prev) => prev - 1);
//     }
//   };

//   const updateOption = (index, value) => {
//     setOptions((prev) => {
//       const newOptions = [...prev];
//       newOptions[index] = value;
//       return newOptions;
//     });
//   };

//   const handleSelect = (index) => {
//     if (isPreview) {
//       // In preview mode, don't modify the field prop directly
//       // Let react-hook-form handle the value
//       return;
//     }
//     // In builder mode, update local state
//     setSelectedOption(index);
//   };

//   // Used to create unique field names for registration
//   const fieldKey = field.label || "SingleSelectQuestion";

//   return (
//     <div className="w-full relative group bg-white rounded-lg ">
//       <div className="max-w-3xl mx-auto bg-white shadow-sm px-8  rounded-lg space-y-2">
//         {/* Title & Description */}
//         {isPreview ? (
//           <>
//             <div className="text-lg font-medium text-black">
//               {field.label || "Single Select Question"}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </div>
//             <div className="text-sm text-gray-500">{field.description}</div>
//           </>
//         ) : (
//           <>
//             <input
//               className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
//               type="text"
//               value={fieldName}
//               onChange={(e) => setFieldName(e.target.value)}
//               placeholder="Single Select Question"
//             />
//             <input
//               type="text"
//               className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//             />
//           </>
//         )}

//         {/* Option List */}
//         <div className="space-y-3">
//           {(isPreview ? field.options || [] : options).map((option, index) => (
//             <div key={index} className="relative">
//               <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
//                 <div className="flex items-center gap-3">
//                   {/* Radio Circle */}
//                   {isPreview && typeof register === "function" ? (
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         {...register(fieldKey)} // ✅ Register for react-hook-form
//                         type="radio"
//                         value={index}
//                         className="sr-only"
//                       />
//                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center`}>
//                         {/* Visual radio button styling will be controlled by the actual radio input */}
//                       </div>
//                       <div className="text-sm font-medium text-gray-800">{option}</div>
//                     </label>
//                   ) : (
//                     <>
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
//                           (isPreview ? field.selected : selectedOption) === index
//                             ? "bg-blue-600 border-blue-600"
//                             : "border-gray-300 hover:border-blue-400"
//                         }`}
//                         onClick={() => handleSelect(index)}
//                       >
//                         {(isPreview ? field.selected : selectedOption) === index && (
//                           <div className="w-2 h-2 bg-white rounded-full" />
//                         )}
//                       </div>

//                       {/* Option Text */}
//                       {isPreview ? (
//                         <div className="text-sm font-medium text-gray-800">{option}</div>
//                       ) : (
//                         <input
//                           type="text"
//                           value={option}
//                           onChange={(e) => updateOption(index, e.target.value)}
//                           className="text-sm font-medium text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5"
//                         />
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {/* Controls */}
//                 {!isPreview && (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => moveUp(index)}
//                       disabled={index === 0}
//                       className="text-gray-500 disabled:opacity-30"
//                     >
//                       ↑
//                     </button>
//                     <button
//                       onClick={() => moveDown(index)}
//                       disabled={index === options.length - 1}
//                       className="text-gray-500  disabled:opacity-30"
//                     >
//                       ↓
//                     </button>
//                     <button
//                       onClick={() => duplicateOption(index)}
//                       className="text-gray-500 "
//                     >
//                       ⧉
//                     </button>
//                     <button
//                       onClick={() => removeOption(index)}
//                       disabled={options.length <= 1}
//                       className="text-gray-500 hover:text-red-500 disabled:opacity-40"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";

export default function SingleSelectOption({ 
  field = {}, 
  isPreview = false, 
  onUpdate,
  register // ✅ added register prop for react-hook-form
}) {
  const [options, setOptions] = useState(field.options || ["A", "B", "C"]);
  const [selectedOption, setSelectedOption] = useState(field.selected ?? -1);
  const [fieldName, setFieldName] = useState(field.label || "Single Select Question");
  const [description, setDescription] = useState(field.description || "Description");

  // Sync changes back to parent (builder mode)
  useEffect(() => {
    if (!isPreview && onUpdate) {
      onUpdate({
        label: fieldName,
        description,
        options,
        selected: selectedOption,
      });
    }
  }, [fieldName, description, options, selectedOption]);

  const moveUp = (index) => {
    if (index === 0) return;
    setOptions((prev) => {
      const newOptions = [...prev];
      [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
      return newOptions;
    });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    setOptions((prev) => {
      const newOptions = [...prev];
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
      return newOptions;
    });
  };

  const duplicateOption = (index) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index + 1, 0, prev[index]);
      return newOptions;
    });
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
    });
    if (selectedOption >= index && selectedOption > 0) {
      setSelectedOption((prev) => prev - 1);
    }
  };

  const updateOption = (index, value) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const addOption = () => {
    setOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  };

  const handleSelect = (index) => {
    if (isPreview) {
      // In preview mode, don't modify the field prop directly
      // Let react-hook-form handle the value
      return;
    }
    // In builder mode, update local state
    setSelectedOption(index);
  };

  // Used to create unique field names for registration
  const fieldKey = field.label || "SingleSelectQuestion";

  // Get validation rules for react-hook-form
  const getValidationRules = () => {
    const rules = {};
    
    if (field.required) {
      rules.required = `${field.label || 'This field'} is required`;
    }

    return rules;
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-4">
        {/* Title & Description */}
        {isPreview ? (
          <>
            <div className="text-lg font-medium text-black">
              {field.label || "Single Select Question"}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            {field.description && (
              <div className="text-sm text-gray-500">{field.description}</div>
            )}
          </>
        ) : (
          <>
            <input
              className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5 rounded"
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Single Select Question"
            />
            <input
              type="text"
              className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </>
        )}

        {/* Option List */}
        <div className="space-y-3">
          {(isPreview ? field.options || [] : options).map((option, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
                <div className="flex items-center gap-3 flex-1">
                  {/* Radio Button */}
                  {isPreview && typeof register === "function" ? (
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        {...register(fieldKey, getValidationRules())} // ✅ Register for react-hook-form
                        type="radio"
                        value={index}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="text-sm font-medium text-gray-800">{option}</div>
                    </label>
                  ) : (
                    <>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                          (isPreview ? field.selected : selectedOption) === index
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => handleSelect(index)}
                      >
                        {(isPreview ? field.selected : selectedOption) === index && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      {/* Option Text */}
                      {isPreview ? (
                        <div className="text-sm font-medium text-gray-800">{option}</div>
                      ) : (
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="text-sm font-medium text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5 flex-1"
                          placeholder="Option text"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Controls */}
                {!isPreview && (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-30 p-1"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === options.length - 1}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-30 p-1"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => duplicateOption(index)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Duplicate option"
                    >
                      ⧉
                    </button>
                    <button
                      onClick={() => removeOption(index)}
                      disabled={options.length <= 1}
                      className="text-gray-500 hover:text-red-500 disabled:opacity-40 p-1"
                      title="Remove option"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Option Button (Builder Mode) */}
        {!isPreview && (
          <button
            onClick={addOption}
            className="w-full border-2 border-dashed border-gray-300 rounded-md p-3 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + Add Option
          </button>
        )}

        {/* Required Toggle (Builder Mode) */}
        {!isPreview && (
          <label className="flex items-center text-sm text-gray-600 gap-2">
            <input
              type="checkbox"
              checked={field.required || false}
              onChange={(e) => {
                if (onUpdate) {
                  onUpdate({
                    ...field,
                    label: fieldName,
                    description,
                    options,
                    selected: selectedOption,
                    required: e.target.checked
                  });
                }
              }}
              className="rounded"
            />
            Required field
          </label>
        )}
      </div>
    </div>
  );
}