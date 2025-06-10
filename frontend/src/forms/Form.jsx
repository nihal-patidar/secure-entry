import { DefaultQuestion, PlaceHolders } from "./Aside.jsx";
import img from "./images/DefaultCover.jpg"
import StartTimer from "./FormComponents/Timer.jsx";
import SingleSelect from "./FormComponents/SingleSelect.jsx";
import InputFile from "./FormComponents/InputFile.jsx";
import { useEffect, useState } from "react";
import Logo from "./FormComponents/Logo.jsx";
import DropDown from "./VisitorFormsComponents/dropDown.jsx";
import FullName from "./FormComponents/FullName.jsx";
// import QueNav from "./FormComponents/questionNav.jsx";


function QueNavONETIME({ Remove }){
    return (
        <div style={{display:"flex", justifyContent:"end"}}>
            <button onClick={Remove}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    )
}

function QueNav({cnt, Duplicate, Remove, dispay}){
    return (
        <div style={{display:`${dispay}`, transition:"all 1s"}}>
            <div style={{display:"flex", justifyContent:"end", width:"52vw"}}>
                <button onClick={() => Duplicate(cnt)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </button>
                <button onClick={() => Remove(cnt)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}


function AddButton({appendTo}){
    const label = document.createElement('label');
    label.setAttribute('contenteditable', 'true'); 
    label.textContent = "Edit Option";
  
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
  
    const wrap = document.createElement('div');
    wrap.prepend(checkbox);
    
    document.getElementById(`${appendTo}`).appendChild(warp);
    document.getElementById(`${appendTo}`).appendChild(label);
}




export default function FoRm({ques, Duplicate, Remove, isLogo, isCover, isTimer, setQuantity, editMode}){
    let count = 1;



    function Question({type, count}){
        const QueKey = type == "Logo" || type == "Timer" || type == "Terms and Conditions" || type ==  "Cover" || type ==  "ending page" || type == "welcome page" ? 0 : 1;
        return (
            <div key={`${QueKey}`}>
                <div  style={{width:"50vw", background:"white", color:"black", minHeight:"20vh", margin:"1vw", borderRadius:"15px"}}>
                    <div>
                        <h2 style={{fontSize:"1.5vw"}}>
                            {DefaultQuestion[type]}
                        </h2>
                        {
                            type === "single selection" ?
                                                        <SingleSelect count={count} QType="S" type={type} opts={["A", "B", "C", "D"]}></SingleSelect>
                                                        :
                            type === "multiple selection"?
                                                        <SingleSelect count={count} QType="M" type={type} opts={["A", "B", "C", "D"]}></SingleSelect>
                                                        :
                            type === "Dropdown Selection"?
                                                        <SingleSelect count={count} QType="D" type={type} opts={["A", "B", "C", "D"]}></SingleSelect>
                                                        :
                            type === "Logo"?
                                                        <>
                                                        <div style={{display:"none"}}>
                                                            {
                                                                setTimeout(() => {
                                                                    addLogo()
                                                                }, 0)
                                                            }
                                                        </div>
                                                        </>
                                                        :
                            type === "special Render over Choise" ? 
                                                        <SingleSelect count={count} QType="M" type={type} opts={["A", "B", "C", "D"]}></SingleSelect>
                                                        :
                            type === "FullName" ?
                                                        <FullName/>:
                            type === "address" ?
                                                        <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                        :
                            type === "Phone no."?
                                                        <input type={`${"number"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                        :
                            type === "upload image"? 
                                                        <InputFile name="Image"/>
                                                        :
                            type === "upload file"?
                                                        <InputFile name="File"/>
                                                        :
                            type === "Timer"?
                                                        <div style={{display:"none"}}>
                                                            {
                                                                setTimeout(() => {
                                                                    addTimer()
                                                                }, 0)
                                                            }
                                                        </div>
                                                        :
                            type === "Terms and Conditions"?
                                                        <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"24vh", width:"60vh", marginTop:"4vh"}}/>
                                                        :
                            type === "Cover" ? 
                                                        <div style={{display:"none"}}>
                                                            {
                                                                setTimeout(() => {
                                                                    addCover()
                                                                }, 0)
                                                            }
                                                        </div>
                                                        :
                            type === "ending page" ? 
                                                        <>
                                                        </>
                                                        : 
                            type === "welcome page" ? 
                                                        <>
                                                        </>
                                                        :     
                                                        <input type={`${type}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                // <AddButton appendTo={`question-${count}-input`}></AddButton>        
                        }
                    </div>
                </div>
            </div>
        )
    }

    function addTimer(){
        document.getElementById("Timer").classList.toggle("hidden");
    }
    function RemoveTimer(){
        document.getElementById("Timer").classList.add("hidden");
        setQuantity("Timer")
    }
    function addLogo(){
        document.getElementById("Logo").classList.toggle("hidden");
    }
    function addCover(){
        document.getElementById("Cover").classList.toggle("hidden");
    }
    function RemoveCover(){
        document.getElementById("Cover").classList.add("hidden");
        setQuantity("Cover")
    }
    function removeLogo(){
        document.getElementById("Logo").classList.add("hidden");
        setQuantity("Logo")
    }

    return(
        <div style={{width:"67vw", overflow:"hidden"}}>
            <div id="Form" style={{border: "2px solid #eaeaea", margin:"2vh", marginLeft:"2vh", width:"66vw", justifyItems:"center", height:"92vh", background:"#fff", borderRadius:"15px", overflowY:"scroll",scrollbarWidth:"none"}}>
                {isCover ?
                    <div id="Cover" style={{width:"100%"}}>
                        <img src={img}  width={"100%"} style={{maxHeight:"100px", marginTop:"0px", zIndex:"-1", resize:"both"}} alt="" />
                        <div style={{maxHight:"1px", zIndex:"1", overflow:"visible"}}>
                            <div style={{display:"flex", justifyContent:"end", overflow:"visible"}}>
                                <button onClick={RemoveCover} style={{overflow:"visible", maxHight:"1px"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }

                {isLogo ? 
                    <div id="Logo" style={{justifySelf:"start", margin:"30px", marginTop:`${isCover ? "-90px" : "70px"}`}}>
                        <Logo name={"Logo"} />
                        <div style={{display:"none"}}>
                            {
                                setTimeout(() => {
                                    document.getElementById("DeleteLogo").onclick = removeLogo
                                }, 0)
                            }
                        </div>
                    </div>
                    :
                    <></>
                }

                {isTimer ? 
                    <div id="Timer">
                        <div style={{minHight:"180px", border:""}}>
                          {/* <QueNav Remove={RemoveTimer} /> */}
                            <QueNavONETIME Remove={RemoveTimer}  />
                        </div>
                        <StartTimer time={{days: 0}} />
                    </div>
                    :
                    <></>    
                }

                <div id="Head-Form" style={{minWidth:"280px"}}>
                    <h2 contentEditable="true" style={{color:"#000", fontWeight:"bold", outline:"none", textAlign:"center", fontSize:"2.5vw", paddingTop:"40px"}}>Form Heading</h2>
                    <div style={{border:"1px dotted black"}}></div>
                    <p contentEditable="true" style={{outline:"none", textAlign:"center"}}>Details</p>
                </div>
                <div id="Ques">
                    {
                        ques.map((element, index) => (
                            <div>
                                <div style={{border:"1px solid #eaeaea", borderRadius:"10px", marginTop:"10px"}}>
                                    {
                                        (Question({type:element, count:{index}})).key == 1 ? (
                                                <div id={`Question-${index}`} style={{display:"flex", width:"fit-content"}}>
                                                    <div style={{width:"52vw"}}>
                                                        <div style={{minHight:"180px", border:""}}>
                                                          <QueNav dispay={/*editMode[index] == "1" ? */"flex"/* : "none"*/} cnt={index} Duplicate={Duplicate} Remove={Remove} />
                                                        </div>
                                                        <div style={{marginTop:"0px"}}></div>
                                                        <Question id={`que-container-${index}`} type={`${element}`} count={index}/>
                                                    </div>
                                                    <div style={{display:"none",justifyContent:"space-around", flexDirection:"column" ,height:"200px", minWidth:"8vw", alignContent:"center", textAlign:"center"}}>
                                                        <span> Up </span>
                                                        
                                                        <span> Down</span>
                                                    </div>
                                                </div>
                                            ) : <></>
                                    }
                                </div>
                                {/* <div style={{display:"none"}}>
                                    {index++} */}
                                {/* </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>    
        </div>
    )
}