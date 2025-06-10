import { useState } from "react";

const AddFieldPopUp = ({ onClose }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [error, setError] = useState("");

  const handleAddField = () => {
    if (fieldName.trim() && fieldType) {
      setError("");
      onClose();
    } else {
      setError("* Please fill in both fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-[18px] border border-[#EAEAEA] w-[490px] p-[30px] px-[35px] relative"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-center text-black text-xl font-medium mb-6">
          Add fields to show if this option is selected
        </h2>

        <div className="flex gap-[38px] justify-between mb-2">
          <div className="flex flex-col w-1/2">
            <label className="text-sm text-gray-600 mb-1">Field Name</label>
            <input
              type="text"
              className="bg-white border border-[#E2E2E2] rounded-[8px] px-3 py-4 text-sm text-black placeholder-gray-400"
              placeholder="Field Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm text-gray-600 mb-1">Field Type</label>
            <select
              className="bg-white border border-[#E2E2E2] rounded-[8px] px-3 py-4 text-sm text-black"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-1 ml-1">{error}</div>
        )}

        <p className="text-[12px] text-gray-500 italic mt-3">
          <span className="font-semibold">*Note :</span> Added fields appear at
          the bottom of the preview, for{" "}
          <span className="font-medium">editing</span>
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleAddField}
            className=" text-white px-10 py-2 text-sm font-medium rounded-full bg-blue-700 hover:bg-blue-800 transition-all"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

const SetPaymentPopUp = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSetPayment = () => {
    if (amount === "") {
      onClose();
    } else if (!isNaN(amount) && Number(amount) >= 0) {
      onClose();
    } else {
      setError("* Please enter a valid non-negative number");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-[18px] border border-[#EAEAEA] w-[490px] p-[30px] px-[35px] relative"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-black text-xl font-medium mb-6">
          Set Total Payment if this option is selected 
        </h2>

        <div className="flex gap-[38px] justify-between mb-2">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1 mt-4">Enter Payment Amount</label>
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


function MiniPopup () {
    const [addField, setField] = useState(false);
    const [Paymentpopup, setPaymentpopup] = useState(false);
    const [payment, setPayment] = useState(null);

    return (
        <>
            {!addField && !Paymentpopup && (<div style={{display:"flex", flexDirection:"column", height:"40px"}}>
                <button onClick={() => {setField(true);setPaymentpopup(false)}}>Add Field</button>
                <button onClick={() => {setField(false);setPaymentpopup(true)}}>SetPayment</button>
            </div>)}
            {
                addField && (
                    <AddFieldPopUp onClose={() => {setField(false)}} />
                )
            }
            {
                Paymentpopup && <SetPaymentPopUp onClose={() => {setPaymentpopup(false)}} />   
            }
        </>
    )
}

function Popup( {popup} ) {
    const [miniPopup, setMiniPopup] = useState(popup);
    
    const handlePaymentSubmit = (value) => {
      setPayment(value); 
      console.log("Payment Set To:", value);
    };
  
    return (
      <>
        <div style={{display:"flex"}}>
            {!miniPopup && <button onClick={() => setMiniPopup(true)} style={{width:"20px", borderRadius:"50%", background:"#fff"}}>i</button>}        
            {miniPopup && <MiniPopup />}
            {miniPopup && <button onClick={() => {setMiniPopup(false)}}>X</button>}
        </div>
      </>
    );
};


export default function SpecialRendering({opts, count, type, QType}){
    const [options, setOptions] = useState(opts)
    const [showOptions, setShowOptions] = useState("1");
    const [popup, setPopup] = useState(false);
    setTimeout(() => {
        let countOpt = 0;
        options.forEach((option)=>{

            let element = document.getElementById(`question-${count}-option-${countOpt}-btn`);
            let editOptions = document.getElementById(`question-${count}-option-${countOpt}-edit`);
            
            element.addEventListener('mouseover', () => {
                element.style.background = "#dbe0f777";
                editOptions.style.display = "flex";
            });
            element.addEventListener('mouseleave', () => {
                element.style.background = "transparent";
                editOptions.style.display = "none";
            });
            countOpt++;

        })
    }, 0);
    function moveUp(index){
        setTimeout(() => {
            if (index === 0) return;
            setOptions(prevOptions => {
                const newOptions = [...prevOptions];
                [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
                return newOptions;
            });
        }, 0);
    }
    function moveDown(index){
        setTimeout(() => {
            if (index === options.length - 1) return; 
            setOptions(prevOptions => {
                const newOptions = [...prevOptions];
                [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
                return newOptions;
            });
        }, 0);
    }
    function Remove(cnt){
        setTimeout(() => {
            
            setOptions(prevOptions => prevOptions.filter((_, index) => index !== cnt));

        }, 0);
    }
    function Duplicate(cnt){
        setTimeout(() => {

            setOptions(prevOptions => {
                const newOptions = [...prevOptions];
                const duplicatedValue = prevOptions[cnt];
                newOptions.splice(cnt + 1, 0, duplicatedValue);
                return newOptions;
            });
            
        }, 0);
    }
    function updateOptions(index, e){
        setTimeout(() => {
            const newText = e.target.innerText;
            setOptions(prevOptions => {
               const newOptions = [...prevOptions];
               newOptions[index] = newText;
               return newOptions;
            });
            
        }, 0);
    }

    function ToggleOptions(){
        setShowOptions(showOptions == "1" ? "0" : "1");
    }

    let disp = showOptions == "0" ? "block": "none";
    return (
        <div style={{width:"50vw"}}>

            {QType === "D" ? 
                <button id="Drop-btn" style={{width:"25vw", outline:"none", borderRadius:"10px", fontSize:"1.5vw", background:"#dbe0f7aa", border:"1px solid#dbe0f7", textAlign:"start", display:"flex", justifyContent:"space-between", padding:"5px 20px", marginLeft:"3vw"}} onClick={ToggleOptions}>
                    <p>Select</p>
                    <div style={{display: disp === "block" ? "block" : "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                    <div style={{display: disp === "block" ? "none": "block"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </button>
            : <></>}
            <div id={`question-${count}-options`} style={{display: disp === "block" ? "none": "block", margin: QType === "D" ? "10px 3vw" : "10px 0", width: QType === "D" ? "25vw" : "50vw", borderRadius:"10px", border: QType === "D" ? "1px solid rgb(216, 214, 214)" : "none", padding:"20px 0px"}}>
                {options.map((option, index) => (
                    <div id={`question-${count}-option-${index}`} style={{display:"flex", height:"54px", paddingLeft: QType === "D" ? "1vw" : "2vw", width: QType === "D" ? "10vw" : "50vw", alignItems:"center"}}>
                        {/* <span style={{padding:"0 30px 0 10px", margin:"10px 0 0 40px"}}>{index}{`]`}</span> */}
                        <button id={`question-${count}-option-${index}-btn`} style={{display:"flex", height:"47px", background:"#fff", justifySelf:"center", alignItems:"center", marginLeft: QType === "D" ? "0" : "2vw", borderRadius:"8px", width:"50vw", paddingLeft:"1.6vw", paddingRight:"2vw", marginBottom:"10px", transition:"all 0.3s"}} >
                            <div>
                                <div>
                                    <div id={`question-${count}-option-${index}-unSelected`} >
                                        <svg width="4vh" height="4vh" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.5 3.5C14.0196 3.5 16.4359 4.50089 18.2175 6.28249C19.9991 8.06408 21 10.4804 21 13C21 15.5196 19.9991 17.9359 18.2175 19.7175C16.4359 21.4991 14.0196 22.5 11.5 22.5C8.98044 22.5 6.56408 21.4991 4.78249 19.7175C3.00089 17.9359 2 15.5196 2 13C2 10.4804 3.00089 8.06408 4.78249 6.28249C6.56408 4.50089 8.98044 3.5 11.5 3.5ZM11.5 4.5C9.24566 4.5 7.08365 5.39553 5.48959 6.98959C3.89553 8.58365 3 10.7457 3 13C3 15.2543 3.89553 17.4163 5.48959 19.0104C7.08365 20.6045 9.24566 21.5 11.5 21.5C12.6162 21.5 13.7215 21.2801 14.7528 20.853C15.7841 20.4258 16.7211 19.7997 17.5104 19.0104C18.2997 18.2211 18.9258 17.2841 19.353 16.2528C19.7801 15.2215 20 14.1162 20 13C20 10.7457 19.1045 8.58365 17.5104 6.98959C15.9163 5.39553 13.7543 4.5 11.5 4.5Z" fill="#9A9A9A"/>
                                        </svg>
                                    </div>
                                    <div id={`question-${count}-option-${index}-selected`} style={{display:"none"}}>
                                        <svg width="4vh" height="4vh" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.5C4.477 20.5 0 16.023 0 10.5C0 4.977 4.477 0.5 10 0.5C15.523 0.5 20 4.977 20 10.5C20 16.023 15.523 20.5 10 20.5ZM8.823 12.64L6.058 9.873L5 10.931L8.119 14.052C8.30653 14.2395 8.56084 14.3448 8.826 14.3448C9.09116 14.3448 9.34547 14.2395 9.533 14.052L15.485 8.102L14.423 7.04L8.823 12.64Z" fill="#2C3ED3"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div style={{display:"flex", justifyContent:"space-between", padding:"2px 20px", width: QType === "D" ? "20vw" : "40vw", textAlign:"start"}}>    
                                <div id={`question-${count}-option-${index}-content`} onInput={(e) => updateOptions(index,e)} contentEditable="true" style={{minWidth:"100px", alignContent:"center", outline:"none"}}>
                                    {option}
                                </div>
                                <div id={`question-${count}-option-${index}-edit`} style={{display:"none", width:"150px", justifyContent:"space-between"}}>
                                    <div style={{display:"none"}}>
                                    </div>
                                    <button onClick={() => moveUp(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    </button>
                                    <button onClick={() => moveDown(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    <button onClick={() => Duplicate(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </button>
                                    {/* <button onClick={() => Remove(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button> */}
                                    <div style={{marginLeft:"20px", background: "#fff"}}>
                                        <Popup popup={popup}></Popup>
                                    </div>
                                </div>
                            </div>
                        </button>   
                        <div style={{display:"none"}}>
                        </div>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}