import React, { useRef, useState } from "react";
// import { removeLogo } from "../Form.jsx";
function removeLogo(){}

const Logo = ({name}) => {
  const inputRef = useRef();
  const [LogoPos, setLogoPos] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("null");

  const addLogo = () => {
    inputRef.current.click();
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected ${name}:`, file.name);
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setPreviewUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };
  function LogoToTheLeft(){
    if(LogoPos > 0){setLogoPos(LogoPos-1);}
    if(LogoPos == 0){
        document.getElementById("Logo").style.justifySelf = "start";
    }
    else if(LogoPos == 1){
        document.getElementById("Logo").style.justifySelf = "start";
    }
    else if(LogoPos == 2){
        document.getElementById("Logo").style.justifySelf = "center";
    }
  }
  function LogoToTheRight(){
    if(LogoPos < 2){setLogoPos(LogoPos+1);}
    if(LogoPos == 0){
        document.getElementById("Logo").style.justifySelf = "center";
    }
    else if(LogoPos == 1){
        document.getElementById("Logo").style.justifySelf = "end";
    }
    else {
        document.getElementById("Logo").style.justifySelf = "end";
    }
  }
  return (
    <div style={{textAlign: "center", marginTop: "-4rem", zIndex:"2"}}>
      <div style={{width:"156px", height:"156px", background:"#A5F0FF80", border:"1px solid #7850FA", borderRadius:"11px", padding:"20px"}} >
            <div style={{alignContent:"center", justifyItems:"center"}}>
                {previewUrl !== "null" ? (
                        <div style={{width:"90px", height:"90px", borderRadius:"100%", overflow:"hidden"}}>
                            <img
                                src={previewUrl}
                                alt="logo preview"
                                onClick={addLogo}
                                style={{borderRadius:"100%", height:"100px", width:"100px", objectFit: "contain" }}
                            />
                        </div>
                    )
                    :
                    <svg width="92" height="91" onClick={addLogo} viewBox="0 0 92 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="0.5" width="90" height="90" rx="45" fill="white"/>
                        <rect x="1" y="0.5" width="90" height="90" rx="45" stroke="black"/>
                        <g clip-path="url(#clip0_604_782)">
                        <path d="M57.4163 37.0833H36.583V57.9167H48.283C47.7815 56.9514 47.52 55.8795 47.5205 54.7917C47.5205 52.8125 48.3705 51.0313 49.7247 49.7927L43.8747 43.9438L38.6663 49.1521V39.1667H55.333V48.1C56.06 48.2131 56.7636 48.4439 57.4163 48.7833V37.0833Z" fill="#5D5D5D"/>
                        <path d="M51.1663 40.4688C50.4066 40.4688 49.678 40.7706 49.1408 41.3078C48.6036 41.845 48.3018 42.5736 48.3018 43.3333C48.3018 44.0931 48.6036 44.8217 49.1408 45.3589C49.678 45.8961 50.4066 46.1979 51.1663 46.1979C51.9261 46.1979 52.6547 45.8961 53.1919 45.3589C53.7291 44.8217 54.0309 44.0931 54.0309 43.3333C54.0309 42.5736 53.7291 41.845 53.1919 41.3078C52.6547 40.7706 51.9261 40.4688 51.1663 40.4688ZM53.2497 60H55.333V55.8333H59.4997V53.75H55.333V49.5833H53.2497V53.75H49.083V55.8333H53.2497V60Z" fill="#5D5D5D"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_604_782">
                        <rect width="25" height="25" fill="white" transform="translate(34.5 35)"/>
                        </clipPath>
                        </defs>
                    </svg>
                }
            </div>
            <div style={{maxWidth:"fit-content", justifyItems:"flex-end", minWidth:"116px"}}>
                
            </div>
            <div style={{display:"flex"}}>
                
                <button onClick={LogoToTheLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div style={{width:"20px"}}></div>
                <svg id="DeleteLogo" width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.28125 4.46875V4.8125H12.7188V4.46875C12.7188 4.01291 12.5377 3.57574 12.2153 3.25341C11.893 2.93108 11.4558 2.75 11 2.75C10.5442 2.75 10.107 2.93108 9.78466 3.25341C9.46233 3.57574 9.28125 4.01291 9.28125 4.46875ZM7.90625 4.8125V4.46875C7.90625 3.64824 8.2322 2.86133 8.81239 2.28114C9.39258 1.70095 10.1795 1.375 11 1.375C11.8205 1.375 12.6074 1.70095 13.1876 2.28114C13.7678 2.86133 14.0938 3.64824 14.0938 4.46875V4.8125H19.25C19.4323 4.8125 19.6072 4.88493 19.7361 5.01386C19.8651 5.1428 19.9375 5.31766 19.9375 5.5C19.9375 5.68234 19.8651 5.8572 19.7361 5.98614C19.6072 6.11507 19.4323 6.1875 19.25 6.1875H18.2133L16.9125 17.578C16.8166 18.4169 16.4153 19.1911 15.7851 19.7531C15.1549 20.315 14.34 20.6254 13.4956 20.625H8.50437C7.66003 20.6254 6.84507 20.315 6.2149 19.7531C5.58472 19.1911 5.18342 18.4169 5.0875 17.578L3.78675 6.1875H2.75C2.56766 6.1875 2.3928 6.11507 2.26386 5.98614C2.13493 5.8572 2.0625 5.68234 2.0625 5.5C2.0625 5.31766 2.13493 5.1428 2.26386 5.01386C2.3928 4.88493 2.56766 4.8125 2.75 4.8125H7.90625ZM6.45425 17.4212C6.51165 17.9244 6.75218 18.3889 7.13001 18.7262C7.50784 19.0634 7.99655 19.2499 8.503 19.25H13.4963C14.0028 19.2499 14.4915 19.0634 14.8693 18.7262C15.2471 18.3889 15.4877 17.9244 15.5451 17.4212L16.83 6.1875H5.17069L6.45425 17.4212ZM8.9375 8.59375C9.11984 8.59375 9.2947 8.66618 9.42364 8.79511C9.55257 8.92405 9.625 9.09891 9.625 9.28125V16.1562C9.625 16.3386 9.55257 16.5135 9.42364 16.6424C9.2947 16.7713 9.11984 16.8438 8.9375 16.8438C8.75516 16.8438 8.5803 16.7713 8.45136 16.6424C8.32243 16.5135 8.25 16.3386 8.25 16.1562V9.28125C8.25 9.09891 8.32243 8.92405 8.45136 8.79511C8.5803 8.66618 8.75516 8.59375 8.9375 8.59375ZM13.75 9.28125C13.75 9.09891 13.6776 8.92405 13.5486 8.79511C13.4197 8.66618 13.2448 8.59375 13.0625 8.59375C12.8802 8.59375 12.7053 8.66618 12.5764 8.79511C12.4474 8.92405 12.375 9.09891 12.375 9.28125V16.1562C12.375 16.3386 12.4474 16.5135 12.5764 16.6424C12.7053 16.7713 12.8802 16.8438 13.0625 16.8438C13.2448 16.8438 13.4197 16.7713 13.5486 16.6424C13.6776 16.5135 13.75 16.3386 13.75 16.1562V9.28125Z" fill="black"/>
                </svg>
                <div style={{width:"20px"}}></div>
                <button onClick={LogoToTheRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Logo;


// import React, { useRef, useState } from "react";
// import { removeLogo } from "../Form.jsx";

// const Logo = ({ name }) => {
//   const inputRef = useRef();
//   const [LogoPos, setLogoPos] = useState(1);
//   const [previewUrl, setPreviewUrl] = useState(null); // ✅ NEW

//   const addLogo = () => {
//     inputRef.current.click();
//   };

//   const handleChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log(`Selected ${name}:`, file.name);
//       const reader = new FileReader(); // ✅ NEW
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result); // ✅ NEW
//       };
//       reader.readAsDataURL(file); // ✅ NEW
//     }
//   };

//   function LogoToTheLeft() {
//     if (LogoPos > 0) setLogoPos(LogoPos - 1);
//     if (LogoPos === 0) document.getElementById("Logo").style.justifySelf = "start";
//     else if (LogoPos === 1) document.getElementById("Logo").style.justifySelf = "start";
//     else if (LogoPos === 2) document.getElementById("Logo").style.justifySelf = "center";
//   }

//   function LogoToTheRight() {
//     if (LogoPos < 2) setLogoPos(LogoPos + 1);
//     if (LogoPos === 0) document.getElementById("Logo").style.justifySelf = "center";
//     else if (LogoPos === 1) document.getElementById("Logo").style.justifySelf = "end";
//     else document.getElementById("Logo").style.justifySelf = "end";
//   }

//   return (
//     <div style={{ textAlign: "center", marginTop: "-4rem", zIndex: "2" }}>
//       <div style={{ width: "156px", height: "163px", background: "#A5F0FF80", border: "1px solid #7850FA", borderRadius: "11px", padding: "15px 20px" }} >
//         <div style={{ alignContent: "center", justifyItems: "center" }}>
//           <svg width="92" height="91" onClick={addLogo} viewBox="0 0 92 91" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <rect x="1" y="0.5" width="90" height="90" rx="45" fill="white" />
//             <rect x="1" y="0.5" width="90" height="90" rx="45" stroke="black" />
//             {/* ... existing SVG content ... */}
//           </svg>
//         </div>

//         {/* ✅ PREVIEW ADDED BELOW */}
        

//         {/* ... rest of your code stays untouched ... */}
//         <div style={{ display: "flex" }}>
//           <button onClick={LogoToTheLeft}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-8">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//             </svg>
//           </button>
//           <div style={{ width: "20px" }}></div>
//           <svg width="25" height="25" viewBox="0 0 22 22" onClick={removeLogo} fill="none" xmlns="http://www.w3.org/2000/svg">
//             {/* ... remove icon ... */}
//           </svg>
//           <div style={{ width: "20px" }}></div>
//           <button onClick={LogoToTheRight}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-8">
//               <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <input
//         type="file"
//         ref={inputRef}
//         onChange={handleChange}
//         style={{ display: "none" }}
//       />
//     </div>
//   );
// };

// export default Logo;
