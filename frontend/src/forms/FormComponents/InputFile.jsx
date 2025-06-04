import React, { useRef } from "react";

const InputFile = ({name}) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected ${name}:`, file.name);
    }
  };

  return (
    <div style={{textAlign: "center", marginTop: "2rem"}}>
      <button style={{padding: "10px 20px", fontSize: "16px", backgroundColor: "#2C3ED3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}} onClick={handleClick}>
        Choose a {`${name}`}
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default InputFile;
