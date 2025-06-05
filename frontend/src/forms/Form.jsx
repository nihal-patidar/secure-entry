import { DefaultQuestion, PlaceHolders } from "./Aside.jsx";
import img from "./images/DefaultCover.jpg"
import StartTimer from "./FormComponents/Timer.jsx";
import SingleSelect from "./FormComponents/SingleSelect.jsx";
import InputFile from "./FormComponents/InputFile.jsx";
import { useEffect, useState } from "react";
import Logo from "./FormComponents/Logo.jsx";
// import QueNav from "./FormComponents/questionNav.jsx";

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

function addTimer(){
    document.getElementById("Timer").classList.remove("hidden");
}
function addLogo(){
    document.getElementById("Logo").classList.remove("hidden");
}
export function removeLogo(){
    document.getElementById("Logo").classList.add("hidden");
}


function Question({type, count}){
    const QueKey = type == "logo" || type == "Timer" || type == "Terms and Conditions" || type ==  "cover" || type ==  "ending page" || type == "welcome page" ? 0 : 1;
    return (
        <div key={`${QueKey}`}>
            <div  style={{width:"65vw", background:"white", color:"black", minHeight:"20vh", margin:"1vw", borderRadius:"15px"}}>

                <div id={`question-${count}`}>
                    {
                        type === "single selection" ?
                                                    <SingleSelect count={count} type={type} opts={["A", "B", "C", "D"]}></SingleSelect>
                                                    :
                        type === "multiple selection"?
                                                    <></>
                                                    :
                        type === "Dropdown Selection"?
                                                    <></>
                                                    :
                        type === "logo"?
                                                    <>
                                                    <div style={{display:"none"}}>
                                                        {
                                                            setTimeout(() => {
                                                                addLogo()
                                                                // document.getElementById('Ques').removeChild(document.getElementById(`que-container-${count}`))
                                                            }, 10)
                                                        }
                                                    </div>
                                                    </>
                                                    :
                        type === "special Render over Choise" ? 
                                                    <></> 
                                                    :
                        type === "FullName" ?
                                                    <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
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
                                                    <div>
                                                        {
                                                            setTimeout(() => {
                                                                addTimer()
                                                            }, 10)
                                                        }
                                                    </div>
                                                    :
                        type === "Terms and Conditions"?
                                                    <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"24vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "cover" ? 
                                                    <InputFile name="Cover Image"/>
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




export default function FoRm({ques}){
    let count = 1;


    function EditModeToggle(){
        document.getElementById('Cover').classList.toggle('DontTouch');
    }

    return(
        <>
            <div id="Form" style={{border: "2px solid #eaeaea", margin:"2vh", marginLeft:"2vh", width:"68vw", justifyItems:"center", height:"92vh", background:"#fff", borderRadius:"15px", overflowY:"scroll",scrollbarWidth:"none"}}>
                <div className="DontTouch" style={{width:"100%", zIndex:"-1"}} id="Cover" onClick={EditModeToggle}>
                    <img src={img}  width={"100%"} style={{maxHeight:"100px", zIndex:"-1", resize:"both"}} alt="" />
                    <button style={{position:"absolute",top:"5px"}}>abc</button>
                </div>

                <div id="Logo" className="hidden" style={{justifySelf:"start", margin:"30px", marginTop:"0"}}>
                    <Logo name={"Logo"} />
                </div>
                <div id="Timer" className="hidden">
                    <StartTimer time={{days: 0}}/>
                </div>

                <div id="Head-Form" style={{minWidth:"280px"}}>
                    <h2 contentEditable="true" style={{color:"#000", fontWeight:"bold", outline:"none", textAlign:"center", fontSize:"2.5vw", paddingTop:"40px"}}>Form Heading</h2>
                    <div style={{border:"1px dotted black"}}></div>
                    <p contentEditable="true" style={{outline:"none", textAlign:"center"}}>Details</p>
                </div>
                <div id="Ques">
                    {
                        ques.map((element) => (
                            <div style={{border:"1px solid #eaeaea", borderRadius:"10px", marginTop:"10px"}}>
                                {
                                    (Question({type:element, count:{count}})).key == 1 ? (
                                            <div>
                                                <div style={{minHight:"180px", border:""}}>
                                                  {/* <QueNav cnt={count} /> */}
                                                </div>
                                                <div style={{marginTop:"0px"}}></div>
                                                <Question id={`que-container-${count}`} type={`${element}`} count={count++}/> 
                                            </div>    
                                        ) : <></>
                                }
                                
                            </div>
                        ))
                    }
                </div>
            </div>    
        </>
    )
}