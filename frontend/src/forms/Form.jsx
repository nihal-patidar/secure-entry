function AddButton({appendTo}){
    const label = document.createElement('label');
    label.setAttribute('contenteditable', 'true'); // make label editable
    label.textContent = "Edit Option";
  
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
  
    const wrap = document.createElement('div');
    wrap.prepend(checkbox);
    
    document.getElementById(`${appendTo}`).appendChild(warp);
    document.getElementById(`${appendTo}`).appendChild(label);
}


function Question({type, count}){
    return (
        <>
            <div id={`question-${count}`} style={{width:"65vw", background:"white", color:"black", border:"1px solid #eaeaea", minHeight:"20vh", margin:"1vw", borderRadius:"15px"}}>

                <div style={{display:"flex", padding:"1vh", paddingTop:"2vh"}} id={`question-${count}-head`}>
                    <p>{count}{`]`}</p>
                    <h2 style={{paddingLeft:"2.5vh", outline:"none"}} contentEditable="true">Write your Question here</h2>
                </div>

                <div id={`question-${count}-input`}>
                    {
                        type === "single selection" ? 
                                                    <></> 
                                                    :
                        type === "multiple selection"?
                                                    <></>
                                                    :
                        type === "Dropdown Selection"?
                                                    <></>
                                                    :
                        type === "logo"?
                                                    <></>
                                                    :
                        type === "special Render over Choise" ? 
                                                    <></> 
                                                    :
                        type === "FullName" || type === "address"?
                                                    <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "Phone no."?
                                                    <input type={`${"number"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "upload image"?
                                                    <input type={`${"image"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"5vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "upload file"?
                                                    <input type={`${"file"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"5vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "Timer"?
                                                    <input type={`${"time"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "Terms and Conditions"?
                                                    <input type={`${"text"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"24vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                        type === "cover" ? 
                                                    <input type={`${"image"}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"5vh", width:"60vh", marginTop:"4vh"}}/>
                                                    :
                                                    <input type={`${type}`}  style={{marginLeft:"10vh", background:"white", color:"#212121", border:"2px solid #eaeaea", borderRadius:"7px", height:"6vh", width:"60vh", marginTop:"4vh"}}/>
                                            // <AddButton appendTo={`question-${count}-input`}></AddButton>        
                    }
                </div>
            </div>
        </>
    )
}


export default function FoRm({ques}){
    let count = 1;
    return(
        <>
            <div id="Ques" style={{border: "2px solid #eaeaea", margin:"2vh", marginLeft:"2vh", width:"68vw", justifyItems:"center", height:"92vh", background:"#F2F3F9", borderRadius:"15px", overflowY:"scroll",scrollbarWidth:"none"}}>
                {
                    ques.map((element) => (
                        <Question type={`${element}`} count={count++}/>
                    ))
                }
            </div>    
        </>
    )
}