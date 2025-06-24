
const FullName = ({ placeholder, desc, note, err }) => {
  return (
    <div
      className="full-name-form"
      style={{ display: "", paddingLeft: "50px", marginTop: "30px" }}
    >
      <p
        style={{
          padding: "15px 0px 15px 10px",
          color: "#343443",
          fontSize: "1.1vw",
          outline: "none",
        }}
      >
        DESC: {desc}
      </p>
      <div style={{ display: "flex" }}>
        <div
          className="form-group"
          style={{
            borderRadius: "10px",
            border: "1px black solid",
            padding: "10px",
            maxWidth: "fit-content",
          }}
        >
          {/* <label htmlFor="firstName">First Name</label> */}
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder={placeholder[0]}
            required
            style={{
              background: "white",
              outline: "none",
              paddingLeft: "20px",
            }}
          />
        </div>
        <div
          className="form-group"
          style={{
            borderRadius: "10px",
            border: "1px black solid",
            marginLeft: "15px",
            padding: "10px",
            maxWidth: "fit-content",
          }}
        >
          {/* <label htmlFor="lastName">Last Name</label> */}
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={placeholder[1]}
            required
            style={{
              background: "white",
              outline: "none",
              paddingLeft: "20px",
            }}
          />
        </div>
      </div>
      <p
        style={{
          padding: "15px 0px 15px 10px",
          color: "#343443",
          fontSize: "1.1vw",
          outline: "none",
        }}
      >
        Note: {note}
      </p>
      <p className="error">{err ? err : ""}</p>
    </div>
  );
};

export default FullName;
