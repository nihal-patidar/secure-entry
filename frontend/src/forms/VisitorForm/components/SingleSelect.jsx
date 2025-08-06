import { useState, useEffect } from "react";
import { devLog } from "../../../../devLog";

export default function SingleSelectOption({ field = {}, handleUserFills, master, fieldInd }) {
  const [options, setOptions] = useState(field.options || ["A", "B", "C"]);
  const [selectedOption, setSelectedOption] = useState(field.selected || -1);
  const [fieldName, setFieldName] = useState(field.label || "Single Select Question");
  const [description, setDescription] = useState(field.description || "Description");
  function concat(prev, index){
    let prev2 = [];
    for(let i = 0;i <= fieldInd;i++){
        prev2.push(prev[i]);
    }

    devLog.log("Master Length", master.length);
    let cnt = 0;
    for(let i = 0;i < master.length;i++){
        devLog.log("pass", i);
        devLog.log(master[i].isSpecial ? master[i].special.id : "NOT FOUND1 ");
        // devLog.log("pass2");
        devLog.log(field.options[index]?.id);
        // devLog.log("pass3");
        if(master[i].isSpecial ? (master[i].special.id == field.options[index]?.id) : 0){
            prev2.push(master[i]);
        }
        if(master[i].isSpecial ? (master[i].special.id == field.options[selectedOption]?.id) : 0){
            // prev2.push(master[i]);
            cnt++;
        }
        else if(master[i].isSpecial){devLog.log("I am not the error bro.")}
    }

    let start = fieldInd+1;
    if(selectedOption != -1){
        start+= cnt;
    }
    for(let i = start;i < prev.length;i++){
        prev2.push(prev[i]);
    }
    
    return prev2;
  }
  let isPreview = false;
  const handleSelect = (index) => {
    setSelectedOption(index);
    // devLog.log(index, selectedOption, field.options[selectedOption]?.value)
    const option = field[index];
    if( typeof option === "string") {
        // devLog.log("string")
    } else{
        handleUserFills(prev => concat(prev, index))
    }   
  };

  return (
    <div className="w-full relative group bg-white rounded-lg ">
      <div className="max-w-3xl mx-auto bg-white shadow-sm px-8  rounded-lg space-y-2">
        {/* Title & Description */}
        {isPreview ? (
          <>
            <div className="text-lg font-medium text-black">
              {field.label || "Single Select Question"}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div className="text-sm text-gray-500">{field.description}</div>
          </>
        ) : (
          <>
            {/* <input
              className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Single Select Question"
            /> */}
            <h2 className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5">{fieldName}</h2>
            {/* <input
              type="text"
              className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            /> */}
            <h2 className="text-sm text-gray-500 bg-white outline-none w-full px-1 py-0.5">{description}</h2>
          </>
        )}

        {/* Option List */}
        <div className="space-y-3">
          {(isPreview ? field.options || [] : options).map((option, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition" onClick={() => handleSelect(index)}>
                <div className="flex items-center gap-3" >
                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      (isPreview ? field.selected : selectedOption) === index
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {(isPreview ? field.selected : selectedOption) === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {/* Option Text */}
                  {isPreview ? (
                    <div className="text-sm font-medium text-gray-800">{option}</div>
                  ) : (
                    // <input
                    //   type="text"
                    //   value={option}
                    //   onChange={(e) => updateOption(index, e.target.value)}
                    //   className="text-sm font-medium text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5"
                    // />
                    <div>
                    {
                        typeof option === "string" ? (
                            <p className="text-sm font-medium text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1 py-0.5">
                                {option}
                            </p>
                        ) : (
                            <div>
                                {option.value}
                            </div>
                        )
                    }
                    </div>
                  )}
                </div>
{/* 

                {!isPreview && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="text-gray-500 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === options.length - 1}
                      className="text-gray-500  disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => duplicateOption(index)}
                      className="text-gray-500 "
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
                  </div> 
                  
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}