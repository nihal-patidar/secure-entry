export default function StartTimer({time}){
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = time;

  
  const pad = (n) => String(n).padStart(2, "0");

  const parts = [];

  if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
    if (days > 0 ) parts.push(pad(days) + " D  ");
    parts.push(pad(hours) + " H  ");
    parts.push(pad(minutes) + " M");
    if(days == 0){parts.push(pad(seconds) + " Seconds");}
    else{parts[parts.length-1]+= "inutes"}
  } else {
    parts.push("00 D  ", "00 H  ", "00 M  ", "00 Seconds");
  }

  let att = []
  parts.forEach((part) => {
    att.push(part[3]+part[4])
    
  })


  return (
    <div style={{display:"flex", justifyContent:"center", maxWidth:"60vw", marginTop:"30px"}}>
        <div style={containerStyle}>
            {
                parts.map((part, index) => (
                    <div style={{display:"contents"}}>
                        <span style={timeStyle} contentEditable="true">{part[0]}{part[1]}</span>
                        <span style={{color:"black", margin:"7px"}} >{att[index][1] !== ' ' ? att[index][1] === 'i' ? "Min" : att[index][1] === 'e' ? "Sec" : "M" : att[index][0]}</span>
                        {index !== parts.length-1 ? <span style={{margin:"7px 2px"}}> : </span> : <></>}
                    </div>
                ))
            }
        </div>
        <p style={{fontSize:"1.2vw", color:"red", opacity:"0.78", marginLeft:"-100px"}}>remaining</p>
    </div>
  );
};

const containerStyle = {
    //   display: "inline-block",
      padding: "5px 0",
      textAlign: "center",
      border: "1px solid #eaeaea",
    //   backgroundColor:,
     
      borderRadius: "8px",
      margin :"0 70px",
    //   fontFamily: "",
        width:"80%",
      fontSize: "1.8rem",
      color: "#212121"
      
    //   boxShadow: "0 0 8px rgba(0,0,0,0.1)"
};
const timeStyle = {
  letterSpacing: "2px",
    outline :"none",
    margin:"7px 2px"
};
const timeStyleAtt = {
    letterSpacing: "2px",
    outline :"none",
    marginLeft:"10px",
    zIndex:"-1"
};