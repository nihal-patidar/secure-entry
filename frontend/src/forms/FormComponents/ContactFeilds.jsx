// export default function ContactFeild({placeholder, desc, note, err, QType}){
//     return (
//         <>
//             <div className="full-name-form"  style={{display:"", paddingLeft:"50px", marginTop:"15px"}}>
//                 <p style={{padding:"15px 0px 15px 10px", color:"#343443", fontSize:"1.1vw", outline:"none"}}>DESC: {desc}</p>
//                 <div className="form-group" style={{borderRadius:"10px", border:"1px black solid", padding:"10px", width: QType === "A" || QType === "T" ||QType === "E" ? "30vw" : "20vw"}}>
//                     {/* <label htmlFor="firstName">First Name</label> */}
//                     <input
//                         type={QType === "A" || QType === "E" || QType === "T" ? "text" : "number"}
//                         id="firstName"
//                         name="firstName"
//                         placeholder={placeholder}
//                         required
//                         style={{background:"white", outline:"none", paddingLeft:"20px"}}
//                     />
//                 </div>
//                 <p style={{padding:"15px 0px 15px 10px", color:"#343443", fontSize:"1.1vw", outline:"none"}}>NOTE: {note}</p>
//                 <p className='error'>{err ? err : ""}</p>
//             </div>
//         </>
//     )
// }

// import { useState } from "react";

import { useState, useEffect } from "react";

const ContactFeild = ({ QType, element, updateField }) => {
  const [fieldData, setFieldData] = useState({ ...element });

  // Optional: Keep fieldData in sync when element prop changes
  useEffect(() => {
    setFieldData({ ...element });
  }, [element]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateField(element.field_id, name, value);
  };

  return (
    <div style={{ paddingLeft: "50px", marginTop: "15px" }}>
      <input
        name="field_name"
        placeholder="Field Name"
        value={fieldData.field_name}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ padding: "10px", marginBottom: "10px", width: "30vw", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <textarea
        name="field_desc"
        placeholder="Description"
        value={fieldData.field_desc}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ padding: "10px", marginBottom: "10px", width: "30vw", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type={QType === "A" || QType === "E" || QType === "T" ? "text" : "number"}
        name="field_placeholder"
        placeholder="Input Placeholder"
        value={fieldData.field_placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        style={{ background: "white", outline: "none", paddingLeft: "20px", width: "30vw" }}
      />

      <textarea
        name="field_note"
        placeholder="Note"
        value={fieldData.field_note}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ padding: "10px", marginTop: "15px", width: "30vw", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <p className="error">{fieldData.field_error}</p>
    </div>
  );
};



export default ContactFeild;
