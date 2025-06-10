import React from 'react';

const FullName = () => {
    return (
        <div className="full-name-form"  style={{display:"flex", paddingLeft:"50px", marginTop:"30px"}}>
                <div className="form-group" style={{borderRadius:"10px", border:"1px black solid", padding:"10px", maxWidth:"fit-content"}}>
                    {/* <label htmlFor="firstName">First Name</label> */}
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        required
                        style={{background:"white", outline:"none", paddingLeft:"20px"}}
                    />
                </div>
                <div className="form-group" style={{borderRadius:"10px", border:"1px black solid",marginLeft:"15px", padding:"10px", maxWidth:"fit-content"}}>
                    {/* <label htmlFor="lastName">Last Name</label> */}
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        required
                        style={{background:"white", outline:"none", paddingLeft:"20px"}}
                    />
                </div>
        </div>
    );
};

export default FullName;