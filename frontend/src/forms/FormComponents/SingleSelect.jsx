import { DefaultQuestion } from "../Aside.jsx";

export default function SingleSelect({options, count, type}){
    let countOpt = 1;
    return (
        <>
            <div style={{display:"flex", padding:"1vh", paddingTop:"2vh"}} id={`question-${count}-head`}>
                    <p>{count}{`]`}</p>
                    <h2 style={{paddingLeft:"2.5vh", outline:"none"}} contentEditable="true">{DefaultQuestion[`${type}`]}</h2>
            </div>
            <div id={`question-${count}-options`} style={{margin:"10px 0"}}>
                {options.map((option, index) => (
                    <div id={`question-${count}-option-${countOpt}`}>
                        <span style={{padding:"0 30px 0 10px", margin:"10px 0 0 40px"}}>{countOpt++}{`]`}</span>
                        <button style={{background:"#fff", width:"50vw", textAlign:"start", paddingLeft:"10px"}} >{option}</button>    
                        <br />
                    </div>
                ))}
            </div>
        </>
    )
}