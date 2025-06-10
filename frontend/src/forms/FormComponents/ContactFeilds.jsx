export default function ContactFeild({placeholder, desc, note, err, QType}){
    return (
        <>
            <div className="full-name-form"  style={{display:"", paddingLeft:"50px", marginTop:"15px"}}>
                <p style={{padding:"15px 0px 15px 10px", color:"#343443", fontSize:"1.1vw", outline:"none"}}>DESC: {desc}</p>
                <div className="form-group" style={{borderRadius:"10px", border:"1px black solid", padding:"10px", width: QType === "A" || QType === "T" ||QType === "E" ? "30vw" : "20vw"}}>
                    {/* <label htmlFor="firstName">First Name</label> */}
                    <input
                        type={QType === "A" || QType === "E" || QType === "T" ? "text" : "number"}
                        id="firstName"
                        name="firstName"
                        placeholder={placeholder}
                        required
                        style={{background:"white", outline:"none", paddingLeft:"20px"}}
                    />
                </div>
                <p style={{padding:"15px 0px 15px 10px", color:"#343443", fontSize:"1.1vw", outline:"none"}}>NOTE: {note}</p>
                <p className='error'>{err ? err : ""}</p>
            </div>
        </>
    )
}