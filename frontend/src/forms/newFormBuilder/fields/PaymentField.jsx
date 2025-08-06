import { useState, useEffect } from "react";
import FormBuilderSidebar from "./FieldOpts"
import Operation from "antd/es/transfer/operation";
import {X} from "lucide-react";
import { button } from "@material-tailwind/react";
import FormCanvas from "../FormCanvas";
import PreviewCanvas from "../PreviewCanvas";
import { use } from "react";
import { devLog } from "../../../../devLog";

const AddFieldPopUp = ({
  onClose,
  onUpdate,
  qId,
  oId
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] border border-[#EAEAEA] w-[800px] h-[620px] p-6 relative shadow-xl flex flex-col">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-center text-lg font-semibold mb-4 text-black">
          Add fields to show if this option is selected
        </h2>

        <div className="flex gap-6 h-[600px]" style={{justifyContent:"center"}}>
          {/* {devLog.log(qId)} */}
          <FormBuilderSidebar onUpdate={onUpdate} qId={qId} oId={oId} />
          <div className="w-80 p-4" style={{background:"#fafafa"}}>
            selected
            <div></div>
          </div>
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
  element,
  onUpdate,
  qId, 
  oId,
  currentOptionIndex
}) => {
  let prevAmt;
  onUpdate(prev => {
    prev.fields.map(f => {
      f.id === qId ? prevAmt = f.options[currentOptionIndex].amount : {}
    })
    return prev;
  })
  const [amount, setAmount] = useState(
    prevAmt
  );
  const [error, setError] = useState("");


  const handleSetPayment = () => {
    if (amount === "") {
      onClose(); 
      return;
    }

    const num = Number(amount);
    if (!isNaN(num) && num >= 0) {
      // updateOptionAmountAtIndex(fieldId, currentOptionIndex, num);
      onUpdate(prev => {
        // devLog.log(prev)
        return {
          ...prev, 
          fields: prev.fields.map((f) => 
            f.id === qId ? { 
              ...f,
              options: f.options.map((o, ind) => 
                currentOptionIndex === ind ? {...o, amount} : o
              )
            } : f
          )
        };
      })
  
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
            ₹ {prevAmt}
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

export default function SpecialSelectOption({ 
  field = {}, 
  isPreview = false, 
  onUpdate,
  // updateOptionDependedFieldsAtIndex,
  // updateOptionAmountAtIndex,
  // paymentFields,
  fieldId,
  register, 
  isBuilder= true,
  onUpdateReq,
  onDuplicate,
  onRemove
}) {
  // Initialize options properly - use field.options if available, otherwise default
  const [options, setOptions] = useState(()=>{
    return field.options || [ { value:"A",id:`${field.id}_A`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "",
      fields: [],
    }}, {value:"B",id:`${field.id}_B`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "",
      fields: [],
    }}, {value:"C",id:`${field.id}_C`, amount: 0, selected: false, selectedFields:{
      title: "",
      description: "",
      fields: [],
    }} ];
  });
  
  const [selectedOptions, setSelectedOptions] = useState(field.selected || []);
  const [fieldName, setFieldName] = useState(field.label || "Special Select Question");
  const [description, setDescription] = useState(field.description || "Description");
  const [isMultiSelect, setIsMultiSelect] = useState(field.isMultiSelect ?? true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAddFieldPopup, setShowAddFieldPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(null);
  const [tempField, setTempField] = useState(field);
  const [selectedFields, setSelectedFields] = useState({
    title: "",
    description: "",
    fields: [],
  })
  // Used to create unique field names for registration
  const fieldKey = field.label || "Special Select Question";

  // Initialize field_Options properly
  const [fieldOptions, setFieldOptions] = useState(() => {
    if (field.field_Options) return field.field_Options;
    return options.map(() => ({
      depended_field: [],
      amount: 0
    }));
  });

  // Update options state when field.options changes (for preview mode)
  useEffect(() => {
    if (field.options && field.options.length > 0) {
      setOptions(field.options);
    }
    // setSelectedFields(prev => {
    //   let newFields = [];
    //   options.map((o, index) => {
    //     o.selected === true ? 
    //     {
    //       insert(o, newFields) {
    //         for(let i = 0;i < o.selectedFields.fields.length; i++){
    //           newFields.push(o.selectedFields.fields[i]);
    //         }
    //       }
    //       insert(o, newFields);
    //     } : 
    //     {
          
    //     }
    //   });
    //   return {
    //     ...prev,
    //     fields: newFields.map((f, index) => {return f})
    //   }
    // })
    setSelectedFields(prev => {
      let newFields = [];
      
      options.forEach((o, index) => {
        if (o.selected === true) {
          // Add all fields from this option's selectedFields
          for (let i = 0; i < o.selectedFields.fields.length; i++) {
            newFields.push(o.selectedFields.fields[i]);
          }
        }
      });
      
      return {
        ...prev,
        fields: newFields
      };
    });
    devLog.log("selected fields", selectedFields);
  }, [field.options]);


  // useEffect(() => {
  //   setSelectedFields(prev => {
  //     options.map((o, index) => {
  //       return o.selected === true ? 
  //         {
  //           ...o.selectedFields.fields,
  //         } : 
  //         {

  //         }
  //     })
  //   })
  // },[options])

  function save(){
    onUpdate(prev => {
      devLog.log(prev)
      return {
        ...prev, 
        fields: prev.fields.map((f) => 
          f.id === field.id ? {  ...tempField } : f
        )
      };
    })}

    useEffect(() => {
      if (onUpdate) {
        setTempField({...tempField,
          label: fieldName,
          description,
          options: options,
          selected: selectedOptions,
          isMultiSelect,
        })
      }
    }, [fieldName, description, options, selectedOptions, isMultiSelect, fieldOptions, isPreview]);
  
  
    useEffect(() => {
      save();
    }, [tempField]);
  
      
    // useEffect(() => {
    //   selectedFields.fields = [...options.filter((o) => o.selected === true)]
    // },[options])

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
    setTempField({...tempField, options: options});
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
    setTempField({...tempField, options: options});
  };

  const duplicateOption = (index) => {
    setOptions(prev => {
      const newOptions = [...prev];
      const duplicatedOption = { ...prev[index], id: `${fieldId}${Date.now()}` };
      newOptions.splice(index + 1, 0, duplicatedOption);
      return newOptions;
    });
    setFieldOptions(prev => {
      const newFieldOptions = [...prev];
      newFieldOptions.splice(index + 1, 0, { ...newFieldOptions[index] });
      return newFieldOptions;
    });
    setTempField({...tempField, options: options});
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
    setTempField({...tempField, options: options});
  };

  const updateOption = (index, value) => {
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions[index] = { ...newOptions[index], value };
      return newOptions;
    });
  };

  const addOption = () => {
    const newIndex = options.length;
    const newOption = { 
      value: `Option ${newIndex + 1}`, 
      id: `${fieldId}${Date.now()}` , 
      amount: 0,
      selectedFields:{
        title: "Form Heading",
        description: "Form Description",
        fields: [],
      }
    };
    setOptions(prev => [...prev, newOption]);
    setTempField({...tempField, options});
  };

  const toggleOption = (index) => {
    if (isMultiSelect) {
      setSelectedOptions(prev => {
          if(prev.includes(index)) {
            return prev.filter(i => i !== index)
          }
          else{
            return [...prev, index]
          }
        }
      );
    } else {
      setSelectedOptions(prev => {
        if(prev.includes(index)) {
          return []
        }
        else{
          return [index]
        }
      }
      );
    }
  };

  // useEffect(() => {
  //   setSelectedFields({...selectedFields, fields: 
  //     options.map((o) => {
  //       return o.selected === true && o.selectedFields.fields
  //     })
  //   })
  //   devLog.log("selected fields", selectedFields)
  // }, [selectedOptions])


  useEffect(() => {
    setOptions((prev) => {
      return prev.map((option, index) => {
        if (selectedOptions.includes(index)) {
          return { ...option, selected: true };
        } else {
          return { ...option, selected: false };
        }
      });
    })
    // onUpdate((prev) => {devLog.log("new opt selected: ",prev); return prev;})
  }, [selectedOptions]);

  const handleSelectTypeChange = (type) => {
    setIsMultiSelect(type === 'multi');
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

  const elementForPopup = {
    field_Options: fieldOptions
  };


  // useEffect(() => {
  //   setSelectedFields(prev => {
  //     let newFields = [];
      
  //     // Collect fields from all selected options
  //     options.forEach((option) => {
  //       if (option.selected === true && option.selectedFields?.fields) {
  //         newFields.push(...option.selectedFields.fields);
  //       }
  //     });
      
  //     return {
  //       ...prev,
  //       fields: newFields
  //     };
  //   });
  // }, [selectedOptions]);


  // useEffect(() => {
  //   setSelectedFields((prev) => {
  //     return {
  //       // ...prev,
  //       // fields: field.options.map(opt => {
  //       //   opt.selected === true ?
  //       //   {
  //       //     ...opt.selectedFields
  //       //   } 
  //       //   :
  //       //   {
            
  //       //   }
  //       // })
  //       ...prev
  //     }
  //   })
  // }, [selectedOptions])
  // onUpdate((prev) => {
  // devLog.log("formConfig", prev);
  // return prev;
  // })



  // setTimeout(() => {
    
    // useEffect(() => {
    //   setSelectedFields((prev) => {
    //     devLog.log("on toggle selected options", prev);
    //     // return {
    //       //   ...prev,
    //       //   // fields: [...prev.fields, field]
    //       // }
    //     });
    //   },[selectedOptions])
    // }, 1000);
  return (
    <div className="w-full relative group bg-white rounded-lg">
      
      {/* Top Controls */}
      {isBuilder && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700"></span>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => onUpdateReq({ required: !field.required })}
              className={`transition-all ${
                field.required
                  ? "text-green-600 hover:text-green-800"
                  : "text-gray-400 hover:text-yellow-500"
              }`}
              title={field.required ? "Mark as Optional" : "Mark as Required"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {field.required ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m0 14v1m8-8h1M4 12H3m15.364-5.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"
                  />
                )}
              </svg>
            </button>

            <button
              onClick={() => onDuplicate(field)}
              className="text-gray-400 hover:text-blue-500 transition-all"
              title="Duplicate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v12a2 2 0 002 2h6z"
                />
              </svg>
            </button>
            
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-all"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8 rounded-lg space-y-4">
        {/* Title and Description */}
        {isPreview ? (
          <>
            <div className="text-lg font-medium text-black bg-white">
              {fieldName}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div className="text-sm text-gray-500">{description}</div>
          </>
        ) : (
          <>
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
            {/* <p style={{fontWeight:"bold"}}>remember this is most crucial and complex field of the form there is a save button you need to press when completed editing this field just below add options button</p> */}
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
          {options.map((optionObj, index) => (
            <div key={optionObj.id} className="relative">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition">
                <div className="flex items-center gap-3">
                  {/* Selection Input with react-hook-form registration */}
                  {isPreview && typeof register === "function" ? (
                    isMultiSelect ? (
                      <input
                        {...register(`${fieldKey}_option_${index}`)}
                        type="checkbox"
                        className="w-5 h-5 rounded-sm border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <input
                        {...register(`${fieldKey}_selection`)}
                        type="radio"
                        value={optionObj.value}
                        className="w-5 h-5 border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )
                  ) : (
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
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === options.length - 1}
                        className="text-gray-500 hover:text-gray-600 disabled:opacity-40"
                        title="Move Down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => duplicateOption(index)}
                        className="text-gray-500 hover:text-gray-600"
                        title="Duplicate"
                      >
                        ⧉
                      </button>
                      <button
                        onClick={() => removeOption(index)}
                        disabled={options.length <= 1}
                        className="text-gray-500 hover:text-red-500 disabled:opacity-40"
                        title="Remove"
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
            onClick={addOption}
            className="w-full border-2 border-dashed border-gray-300 hover:border-[#2F44FF] text-gray-500 hover:text-[#2F44FF] py-3 rounded-md transition font-medium"
          >
            + Add Option
          </button>
        )}
      </div>

      <div style={{paddingLeft:"4vw"}}>
        {!isPreview ? (
            <>
              <div>
                <FormCanvas formConfig={selectedFields} onUpdate={onUpdate} setFormConfig={setSelectedFields} />
              </div>
            </>
          )
        :
          (
            <>
              <PreviewCanvas
                key={"formkey"}
                formConfig={selectedFields}
                setFormConfig={setSelectedFields}
                triggerRerender={() => {}/*setFormKey((prev) => prev + 1)*/}
              />
          </>
          )
        }
      </div>

      {/* Popups */}
      {showAddFieldPopup && (
        <AddFieldPopUp
          onClose={() => setShowAddFieldPopup(false)}
          onUpdate={onUpdate}
          qId={field.id}
          oId={currentOptionIndex}
        />
      )}

      {showPaymentPopup && (
        <SetPaymentPopUp
          onClose={() => setShowPaymentPopup(false)}
          element={elementForPopup}
          // oId={currentOptionIndex}
          currentOptionIndex={currentOptionIndex}
          qId={field.id}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}