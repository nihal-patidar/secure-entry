import { useState, useEffect } from "react";

// const AddFieldPopUp = ({ onClose }) => {
//   const [fieldName, setFieldName] = useState("");
//   const [fieldType, setFieldType] = useState("");
//   const [error, setError] = useState("");

//   const handleAddField = () => {
//     if (fieldName.trim() && fieldType) {
//       setError("");
//       onClose();
//     } else {
//       setError("* Please fill in both fields");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-[18px] border border-[#EAEAEA] w-[490px] p-[30px] px-[35px] relative shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h2 className="text-center text-black text-xl font-medium mb-6">
//           Add fields to show if this option is selected
//         </h2>

//         <div className="flex gap-[38px] justify-between mb-2">
//           <div className="flex flex-col w-1/2">
//             <label className="text-sm text-gray-600 mb-1">Field Name</label>
//             <input
//               type="text"
//               className="bg-white border border-[#E2E2E2] rounded-[8px] px-3 py-4 text-sm text-black placeholder-gray-400"
//               placeholder="Field Name"
//               value={fieldName}
//               onChange={(e) => setFieldName(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col w-1/2">
//             <label className="text-sm text-gray-600 mb-1">Field Type</label>
//             <select
//               className="bg-white border border-[#E2E2E2] rounded-[8px] px-3 py-4 text-sm text-black"
//               value={fieldType}
//               onChange={(e) => setFieldType(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="text">Text</option>
//               <option value="number">Number</option>
//               <option value="date">Date</option>
//             </select>
//           </div>
//         </div>

//         {error && <div className="text-red-600 text-sm mt-1 ml-1">{error}</div>}

//         <p className="text-[12px] text-gray-500 italic mt-3">
//           <span className="font-semibold">*Note :</span> Added fields appear at
//           the bottom of the preview, for{" "}
//           <span className="font-medium">editing</span>
//         </p>

//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleAddField}
//             className="text-white px-10 py-2 text-sm font-medium rounded-full bg-blue-700 hover:bg-blue-800 transition-all"
//           >
//             Add Field
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { useState } from "react";
// import { X } from "lucide-react"; // Optional: for delete icon

import { X } from "lucide-react"; // assuming you're using lucide for icons

const AddFieldPopUp = ({
  onClose,
  fieldList,
  updateOptionDependedFieldsAtIndex,
  field_id,
  currentOptionIndex,
  element,
}) => {
  const [selectedFields, setSelectedFields] = useState(
    element.field_Options[currentOptionIndex].depended_field
  );

  const handleSelectField = (field) => {
    if (!selectedFields.find((f) => f.field_id === field.field_id)) {
      setSelectedFields((prev) => [...prev, field]);
    }
  };

  const handleRemoveField = (field_id) => {
    setSelectedFields((prev) =>
      prev.filter((f) => f.field_id !== field_id)
    );
  };

  const handleSetFields = () => {
    updateOptionDependedFieldsAtIndex(field_id, currentOptionIndex, selectedFields);
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
              {fieldList.length > 0 ? (
                fieldList.map((field) => (
                  <li
                    key={field.field_id}
                    className="cursor-pointer text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
                    onClick={() => handleSelectField(field)}
                  >
                    {field.field_name}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic text-sm">No fields available</li>
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
                    key={field.field_id}
                    className="flex items-center justify-between text-sm bg-blue-50 text-blue-900 px-3 py-2 rounded-md"
                  >
                    <span>{field.field_name}</span>
                    <button
                      onClick={() => handleRemoveField(field.field_id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Remove"
                    >
                      <X size={16} />
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



const SetPaymentPopUp = ({
  onClose,
  field_id,
  currentOptionIndex,
  updateOptionAmountAtIndex,
  element,
  fieldList
}) => {
  const [amount, setAmount] = useState(
    element?.field_Options[currentOptionIndex]?.amount
  );
  const [error, setError] = useState("");

  const handleSetPayment = () => {
    if (amount === "") {
      onClose(); // Close silently if empty (you can handle this differently if needed)
      return;
    }

    if (!isNaN(amount) && Number(amount) >= 0) {
      updateOptionAmountAtIndex(field_id, currentOptionIndex, Number(amount));
      onClose(); // Close only after successful update
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
            ₹ {element?.field_Options[currentOptionIndex]?.amount ?? 0}
          </span>
        </h2>
        <div className="flex gap-[38px] justify-between mb-2">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1 mt-4">
              Enter Payment Amount
            </label>
            <input
              type="text"
              className="bg-white border border-[#E2E2E2] w-full rounded-[8px] px-3 py-4 text-sm text-black placeholder-gray-400"
              placeholder="Payment Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          </div>
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

export default function SpecialRendering({
  element,
  updateField,
  fieldList,
  updateOptionAtIndex,
  updateOptionAmountAtIndex,
  updateOptionDependedFieldsAtIndex
}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(null);
  const [showAddFieldPopup, setShowAddFieldPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [actionMenuVisible, setActionMenuVisible] = useState({});
  const [hoveredButton, setHoveredButton] = useState(null);
  const [fieldData, setFieldData] = useState({ ...element });

  useEffect(() => {
    setFieldData({ ...element });
    setOptions(element.field_Options ?? []);
  }, [element.field_id]);

  const moveUp = (index) => {
    if (index === 0) return;
    setOptions((prev) => {
      const newOptions = [...prev];
      [newOptions[index - 1], newOptions[index]] = [
        newOptions[index],
        newOptions[index - 1],
      ];
      return newOptions;
    });
  };

  const moveDown = (index) => {
    if (index === options.length - 1) return;
    setOptions((prev) => {
      const newOptions = [...prev];
      [newOptions[index], newOptions[index + 1]] = [
        newOptions[index + 1],
        newOptions[index],
      ];
      return newOptions;
    });
  };

  // const duplicateOption = (index) => {
  //   setOptions((prev) => {
  //     const newOptions = [...prev];
  //     newOptions.splice(index + 1, 0, prev[index]);
  //     return newOptions;
  //   });
  // };

  // const removeOption = (index) => {
  //   if (options.length <= 1) return;
  //   setOptions((prev) => {
  //     const newOptions = [...prev];
  //     newOptions.splice(index, 1);
  //     return newOptions;
  //   });
  //   if (selectedOption >= index && selectedOption > 0) {
  //     setSelectedOption((prev) => prev - 1);
  //   }
  // };
  const duplicateOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index + 1, 0, options[index]);
    setOptions(newOptions);
    updateField(element.field_id, "field_Options", newOptions);
  };

  const removeOption = (index) => {
    if (options.length <= 1) return;

    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    updateField(element.field_id, "field_Options", newOptions);

    if (selectedOption >= index && selectedOption > 0) {
      setSelectedOption((prev) => prev - 1);
    }
  };

  const updateOption = (index, newValue) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = {
        ...newOptions[index],
        value: newValue,
      };
      return newOptions;
    });
  };

  const toggleActionMenu = (index) => {
    setActionMenuVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeActionMenu = (index) => {
    setActionMenuVisible((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setActionMenuVisible({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateField(element.field_id, name, value);
  };

  const handleBlurOption = (index, value) => {
    // const { name, value } = e.target;
    updateOptionAtIndex(element.field_id, index, value);
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
        <div className="flex flex-col items-center justify-between mb-6">
          <input
            name="field_name"
            placeholder="Field Name"
            value={fieldData.field_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full text-lg font-semibold mb-1 outline-none bg-transparent placeholder:text-black"
          />
          <textarea
            name="field_desc"
            placeholder="Description"
            value={fieldData.field_desc}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full text-sm text-gray-500 mb-2 bg-transparent outline-none resize-none h-6"
          />
        </div>

        <div className="space-y-4">
          {options?.map((option, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      selectedOption === index
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => setSelectedOption(index)}
                  >
                    {selectedOption === index && (
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
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) => updateOption(index, e.target.value)}
                    onBlur={(e) => handleBlurOption(index, e.target.value)}
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === options.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <svg
                      className="w-4 h-4"
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
                  </button>

                  {/* Add/Remove buttons */}
                  <button
                    onClick={() => duplicateOption(index)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 1}
                    className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  {/* Add Action Button with Hover Tooltip */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        toggleActionMenu(index);
                        setCurrentOptionIndex(index);
                      }}
                      onMouseEnter={() => setHoveredButton(index)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      Add Action
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>

                    {/* Hover Tooltip */}
                    {hoveredButton === index && !actionMenuVisible[index] && (
                      <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Add Action</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          Show fields & Set Payment if this option is selected
                        </p>
                        {/* Triangle pointer */}
                        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                      </div>
                    )}

                    {/* Action Menu Dropdown */}
                    {actionMenuVisible[index] && (
                      <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                        <div className="text-xs text-gray-500 mb-2 px-2">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Add Action</span>
                          </div>
                          <p className="mt-1">
                            Show fields & Set Payment if this option is selected
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setShowAddFieldPopup(true);
                            closeActionMenu(index);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                        >
                          Add Field
                        </button>

                        <button
                          onClick={() => {
                            setShowPaymentPopup(true);
                            closeActionMenu(index);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
                        >
                          Set Payment Amount
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <textarea
          name="field_note"
          placeholder="Add requirements (e.g. password must be at least 8 characters)"
          value={fieldData.field_note}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full text-xs text-gray-500 mt-1 bg-transparent outline-none resize-none h-6"
        />
      </div>

      {showAddFieldPopup && (
        <AddFieldPopUp
          onClose={() => setShowAddFieldPopup(false)}
          field_id={element.field_id}
          currentOptionIndex={currentOptionIndex}
          fieldList={fieldList}
          updateOptionDependedFieldsAtIndex={updateOptionDependedFieldsAtIndex}
          element={element}
        />
      )}
      {showPaymentPopup && (
        <SetPaymentPopUp
          onClose={() => setShowPaymentPopup(false)}
          field_id={element.field_id}
          currentOptionIndex={currentOptionIndex}
          updateOptionAmountAtIndex={updateOptionAmountAtIndex}
          element={element}
        />
      )}
    </div>
  );
}

// export default function SpecialRendering({ QType , element ,updateField }) {
//   const [options, setOptions] = useState();
//   const [selectedOption, setSelectedOption] = useState(0);
//   const [showAddFieldPopup, setShowAddFieldPopup] = useState(false);
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const [actionMenuVisible, setActionMenuVisible] = useState({});
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const [fieldData, setFieldData] = useState({ ...element });

//   useEffect(() => {
//       setFieldData({ ...element });
//     }, [element]);

//   const moveUp = (index) => {
//     if (index === 0) return;
//     setOptions(prevOptions => {
//       const newOptions = [...prevOptions];
//       [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
//       return newOptions;
//     });
//   };

//   const moveDown = (index) => {
//     if (index === options.length - 1) return;
//     setOptions(prevOptions => {
//       const newOptions = [...prevOptions];
//       [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
//       return newOptions;
//     });
//   };

//   const duplicateOption = (index) => {
//     setOptions(prevOptions => {
//       const newOptions = [...prevOptions];
//       newOptions.splice(index + 1, 0, prevOptions[index]);
//       return newOptions;
//     });
//   };

//   const removeOption = (index) => {
//     if (options.length <= 1) return; // Prevent removing the last option
//     setOptions(prevOptions => {
//       const newOptions = [...prevOptions];
//       newOptions.splice(index, 1);
//       return newOptions;
//     });
//     // Adjust selected option if necessary
//     if (selectedOption >= index && selectedOption > 0) {
//       setSelectedOption(prev => prev - 1);
//     }
//   };

//   const updateOption = (index, value) => {
//     setOptions(prevOptions => {
//       const newOptions = [...prevOptions];
//       newOptions[index] = value;
//       return newOptions;
//     });
//   };

//   const toggleActionMenu = (index) => {
//     setActionMenuVisible(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const closeActionMenu = (index) => {
//     setActionMenuVisible(prev => ({
//       ...prev,
//       [index]: false
//     }));
//   };

//   // Close action menus when clicking outside
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setActionMenuVisible({});
//     }
//   };

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFieldData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleBlur = (e) => {
//       const { name, value } = e.target;
//       updateField(element.field_id, name, value);
//     };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen" onClick={handleBackdropClick}>
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <input
//         name="field_name"
//         placeholder="Field Name"
//         value={fieldData.field_name}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         className="w-full text-lg font-semibold mb-1 outline-none bg-transparent placeholder:text-black"
//       />

//       {/* Description field */}
//       <textarea
//         name="field_desc"
//         placeholder="Description"
//         value={fieldData.field_desc}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         className="w-full text-sm text-gray-500 mb-2 bg-transparent outline-none resize-none h-6"
//       />
//           <div className="flex items-center gap-3">
//             <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//               </svg>
//             </button>
//             <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Options */}
//         <div className="space-y-4">
//           {options.map((option, index) => (
//             <div key={index} className="relative">
//               <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors">
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
//                       selectedOption === index
//                         ? 'bg-blue-600 border-blue-600'
//                         : 'border-gray-300 hover:border-blue-400'
//                     }`}
//                     onClick={() => setSelectedOption(index)}
//                   >
//                     {selectedOption === index && (
//                       <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <input
//                     type="text"
//                     value={option}
//                     onChange={(e) => updateOption(index, e.target.value)}
//                     className="bg-transparent text-lg font-medium text-gray-800 border-none outline-none flex-1"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {/* Move up/down buttons */}
//                   <button
//                     onClick={() => moveUp(index)}
//                     disabled={index === 0}
//                     className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => moveDown(index)}
//                     disabled={index === options.length - 1}
//                     className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* Add/Remove buttons */}
//                   <button
//                     onClick={() => duplicateOption(index)}
//                     className="p-1 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => removeOption(index)}
//                     disabled={options.length <= 1}
//                     className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                     </svg>
//                   </button>

//                   {/* Add Action Button with Hover Tooltip */}
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleActionMenu(index)}
//                       onMouseEnter={() => setHoveredButton(index)}
//                       onMouseLeave={() => setHoveredButton(null)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
//                     >
//                       Add Action
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </button>

//                     {/* Hover Tooltip */}
//                     {hoveredButton === index && !actionMenuVisible[index] && (
//                       <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
//                         <div className="flex items-center gap-2 mb-1">
//                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                           </svg>
//                           <span className="font-medium">Add Action</span>
//                         </div>
//                         <p className="text-xs text-gray-300">Show fields & Set Payment if this option is selected</p>
//                         {/* Triangle pointer */}
//                         <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
//                       </div>
//                     )}

//                     {/* Action Menu Dropdown */}
//                     {actionMenuVisible[index] && (
//                       <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
//                         <div className="text-xs text-gray-500 mb-2 px-2">
//                           <div className="flex items-center gap-2">
//                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                             </svg>
//                             <span>Add Action</span>
//                           </div>
//                           <p className="mt-1">Show fields & Set Payment if this option is selected</p>
//                         </div>

//                         <button
//                           onClick={() => {
//                             setShowAddFieldPopup(true);
//                             closeActionMenu(index);
//                           }}
//                           className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
//                         >

//                           Add Field
//                         </button>

//                         <button
//                           onClick={() => {
//                             setShowPaymentPopup(true);
//                             closeActionMenu(index);
//                           }}
//                           className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2"
//                         >

//                           Set Payment Amount
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add requirements text */}
//         {/* <div className="mt-6">
//           <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
//             Add requirements
//           </button>
//         </div> */}
//         <textarea
//         name="field_note"
//         placeholder="Add requirements (e.g. password must be at least 8 characters)"
//         value={fieldData.field_note}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         className="w-full text-xs text-gray-500 mt-1 bg-transparent outline-none resize-none h-6"
//       />
//       </div>

//       {/* Popups */}
//       {showAddFieldPopup && (
//         <AddFieldPopUp onClose={() => setShowAddFieldPopup(false)} />
//       )}

//       {showPaymentPopup && (
//         <SetPaymentPopUp onClose={() => setShowPaymentPopup(false)} />
//       )}
//     </div>
//   );
// }
