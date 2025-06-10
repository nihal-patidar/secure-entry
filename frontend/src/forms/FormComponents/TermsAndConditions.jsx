import React, { useState } from 'react';

const Terms = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [accepted, setTermsAccepted] = useState(false);
    const handlePopUp = () => {
        setIsPopupOpen(isPopupOpen === true ? false : true);
    };
    const [Terms, setTerms] = useState("Terms and conditions. Please read them carefully.");
    
    return (
        <div style={{height:"30px", width:"50vw", marginBottom: "40px"}}>
            <button style={{height:"20px", width:"25px", background:"transparent", borderRadius:"5px", color:"black", border:"1px solid #eaeaea"}} onClick={() => setTermsAccepted(accepted == true ? false : true)}>
                {
                    accepted && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    )
                }
            </button>
            <button style={{width:"30vw", fontSize:"1.4vw", textAlign:"start", paddingLeft:"2vw", color:"black"}} onClick={handlePopUp}>{Terms[0]}{Terms[1]}{Terms[2]}{Terms[3]}{Terms[4]}{Terms[5]}{Terms[6]}{Terms[7]}{Terms[8]}{Terms[9]}{Terms[10]}{Terms[11]}{Terms[12]}{Terms[13]}{Terms[14]}{Terms[15]}{Terms[16]}{Terms[17]}{Terms[18]}{Terms[19]}{" ..."}</button>
            {isPopupOpen === true ? (
                <div className="popup-overlay" style={{paddingTop:"20px"}}>
                    <div contentEditable="true" onChange={(e) => {() => {setTerms(e); console.log(e)}}} className="popup-content">
                        {Terms}

                    </div>
                </div>
            ) : <></>}
        </div>
    );
};

export default Terms;