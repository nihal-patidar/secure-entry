import { useState } from "react";


export default function SingleSelect({opts, count, type, QType}){
    const [options, setOptions] = useState(opts)
    const [showOptions, setShowOptions] = useState("1");
    setTimeout(() => {
        let countOpt = 0;
        options.forEach((option)=>{

            let element = document.getElementById(`question-${count}-option-${countOpt}-btn`);
            let editOptions = document.getElementById(`question-${count}-option-${countOpt}-edit`);
            
            element.addEventListener('mouseover', ()=>{
                element.style.background = "#dbe0f777";
                editOptions.style.display = "flex";
            });
            element.addEventListener('mouseleave', ()=>{
                element.style.background = "transparent";
                editOptions.style.display = "none";
            });
            // console.log(option)
            // console.log(`question-${count}-option-${countOpt}-btn`)
            // console.log(document.getElementById(`question-${count}-option-${countOpt}-btn`));
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
                    <div id={`question-${count}-option-${index}`} style={{display:"flex", paddingLeft: QType === "D" ? "1vw" : "2vw", width: QType === "D" ? "10vw" : "50vw", alignItems:"center"}}>
                        {/* <span style={{padding:"0 30px 0 10px", margin:"10px 0 0 40px"}}>{index}{`]`}</span> */}
                        <button id={`question-${count}-option-${index}-btn`} style={{alignItems:"center",display:"flex", background:"#fff", marginLeft: QType === "D" ? "0" : "2vw", height:"4.5vh", borderRadius:"8px", width:"50vw", paddingLeft:"1.6vw", paddingRight:"2vw", transition:"all 0.3s"}} >
                            <div>
                                {QType === "S" ?
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
                                :
                                QType === "D" ?
                                    // <div>
                                    //     <div id={`question-${count}-option-${index}-unSelected`} >
                                    //         <svg width="4vh" height="4vh" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //             <path d="M11.5 3.5C14.0196 3.5 16.4359 4.50089 18.2175 6.28249C19.9991 8.06408 21 10.4804 21 13C21 15.5196 19.9991 17.9359 18.2175 19.7175C16.4359 21.4991 14.0196 22.5 11.5 22.5C8.98044 22.5 6.56408 21.4991 4.78249 19.7175C3.00089 17.9359 2 15.5196 2 13C2 10.4804 3.00089 8.06408 4.78249 6.28249C6.56408 4.50089 8.98044 3.5 11.5 3.5ZM11.5 4.5C9.24566 4.5 7.08365 5.39553 5.48959 6.98959C3.89553 8.58365 3 10.7457 3 13C3 15.2543 3.89553 17.4163 5.48959 19.0104C7.08365 20.6045 9.24566 21.5 11.5 21.5C12.6162 21.5 13.7215 21.2801 14.7528 20.853C15.7841 20.4258 16.7211 19.7997 17.5104 19.0104C18.2997 18.2211 18.9258 17.2841 19.353 16.2528C19.7801 15.2215 20 14.1162 20 13C20 10.7457 19.1045 8.58365 17.5104 6.98959C15.9163 5.39553 13.7543 4.5 11.5 4.5Z" fill="#9A9A9A"/>
                                    //         </svg>
                                    //     </div>
                                    //     <div id={`question-${count}-option-${index}-selected`} style={{display:"none"}}>
                                    //         <svg width="4vh" height="4vh" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //             <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.5C4.477 20.5 0 16.023 0 10.5C0 4.977 4.477 0.5 10 0.5C15.523 0.5 20 4.977 20 10.5C20 16.023 15.523 20.5 10 20.5ZM8.823 12.64L6.058 9.873L5 10.931L8.119 14.052C8.30653 14.2395 8.56084 14.3448 8.826 14.3448C9.09116 14.3448 9.34547 14.2395 9.533 14.052L15.485 8.102L14.423 7.04L8.823 12.64Z" fill="#2C3ED3"/>
                                    //         </svg>
                                    //     </div>
                                    // </div>
                                    <>

                                    </>
                                :
                                    <div>
                                        <div id={`question-${count}-option-${index}-unSelected`} >
                                            <svg width="4vh" height="4vh" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                                            </svg>
                                        </div>
                                        <div id={`question-${count}-option-${index}-selected`} style={{display:"none"}}>
                                            <svg width="4vh" height="4vh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" class="size-6">
                                              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div style={{display:"flex", justifyContent:"space-between", padding:"2px 20px", width: QType === "D" ? "20vw" : "40vw", textAlign:"start"}}>    
                                <div id={`question-${count}-option-${index}-content`} onInput={(e) => updateOptions(index,e)} contentEditable="true" style={{minWidth:"100px", outline:"none"}}>
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
                                    <button onClick={() => Remove(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
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