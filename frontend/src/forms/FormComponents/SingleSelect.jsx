import { useState } from "react";
import { DefaultQuestion } from "../Aside.jsx";


export default function SingleSelect({options, count, type}){
    let countOpt = 1;
    const [selected, setSelected] = useState(-1);
    function unSelect(){
        
        setTimeout(() => {
            let element = document.getElementById(`question-${count}-option-${selected}-btn`);
            let selectedImg = document.getElementById(`question-${count}-option-${selected}-selected`);
            let unSelectedImg = document.getElementById(`question-${count}-option-${selected}-unSelected`);
            element.style.border = "0";
            element.style.borderRadius = "8px";
            selectedImg.style.display="none";
            unSelectedImg.style.display="inline-block";
        }, 10);
    }
    setTimeout(() => {
        let countOpt = 1;
        options.forEach((option)=>{

            let element = document.getElementById(`question-${count}-option-${countOpt}-btn`);
            element.addEventListener('mouseover', ()=>{
                element.style.background = "#A5F0FF80";
            });
            element.addEventListener('mouseleave', ()=>{
                element.style.background = "transparent";
            });
            // console.log(option)
            // console.log(`question-${count}-option-${countOpt}-btn`)
            // console.log(document.getElementById(`question-${count}-option-${countOpt}-btn`));
            countOpt++;

        })
    }, 100);
    return (
        <>
            <div style={{display:"flex", padding:"1vh", paddingTop:"2vh"}} id={`question-${count}-head`}>
                    <p>{count}{`]`}</p>
                    <h2 style={{paddingLeft:"2.5vh", outline:"none"}} contentEditable="true">{DefaultQuestion[`${type}`]}</h2>
            </div>
            <div id={`question-${count}-options`} style={{margin:"10px 0"}}>
                {options.map((option, index) => (
                    <div id={`question-${count}-option-${countOpt}`} style={{display:"flex", paddingLeft:"5vw"}}>
                        {/* <span style={{padding:"0 30px 0 10px", margin:"10px 0 0 40px"}}>{countOpt}{`]`}</span> */}
                        <div id={`question-${count}-option-${countOpt}-unSelected`} >
                            <svg width="4vh" height="4vh" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 3.5C14.0196 3.5 16.4359 4.50089 18.2175 6.28249C19.9991 8.06408 21 10.4804 21 13C21 15.5196 19.9991 17.9359 18.2175 19.7175C16.4359 21.4991 14.0196 22.5 11.5 22.5C8.98044 22.5 6.56408 21.4991 4.78249 19.7175C3.00089 17.9359 2 15.5196 2 13C2 10.4804 3.00089 8.06408 4.78249 6.28249C6.56408 4.50089 8.98044 3.5 11.5 3.5ZM11.5 4.5C9.24566 4.5 7.08365 5.39553 5.48959 6.98959C3.89553 8.58365 3 10.7457 3 13C3 15.2543 3.89553 17.4163 5.48959 19.0104C7.08365 20.6045 9.24566 21.5 11.5 21.5C12.6162 21.5 13.7215 21.2801 14.7528 20.853C15.7841 20.4258 16.7211 19.7997 17.5104 19.0104C18.2997 18.2211 18.9258 17.2841 19.353 16.2528C19.7801 15.2215 20 14.1162 20 13C20 10.7457 19.1045 8.58365 17.5104 6.98959C15.9163 5.39553 13.7543 4.5 11.5 4.5Z" fill="#9A9A9A"/>
                            </svg>
                        </div>
                        <div id={`question-${count}-option-${countOpt}-selected`} style={{display:"none"}}>
                            <svg width="4vh" height="4vh" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.5C4.477 20.5 0 16.023 0 10.5C0 4.977 4.477 0.5 10 0.5C15.523 0.5 20 4.977 20 10.5C20 16.023 15.523 20.5 10 20.5ZM8.823 12.64L6.058 9.873L5 10.931L8.119 14.052C8.30653 14.2395 8.56084 14.3448 8.826 14.3448C9.09116 14.3448 9.34547 14.2395 9.533 14.052L15.485 8.102L14.423 7.04L8.823 12.64Z" fill="#2C3ED3"/>
                            </svg>
                        </div>

                        <button id={`question-${count}-option-${countOpt}-btn`} style={{background:"#fff", marginLeft:"2vw", height:"4vh", display:"flex", justifyContent:"space-between", borderRadius:"8px", width:"50vw", textAlign:"start", paddingLeft:"10px", transition:"0.6s"}} >
                            <div contentEditable="true" style={{minWidth:"100px", outline:"none"}}>    
                                {option}
                            </div>
                            <div style={{display:"flex", width:"150px", justifyContent:"space-between"}}>
                                <button onClick={() => moveUp(countOpt)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                </button>

                                <button onClick={() => moveDown(countOpt)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                <button onClick={() => Duplicate(countOpt)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </button>

                                <button onClick={() => Remove(countOpt)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </button>   
                        <div style={{display:"none"}}>
                            {countOpt++} 
                        </div>
                        <br />
                    </div>
                ))}
            </div>
        </>
    )
}