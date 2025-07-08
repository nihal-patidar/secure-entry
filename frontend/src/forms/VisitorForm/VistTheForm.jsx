import Text from "./components/Text.jsx";
import Email from "./components/Email.jsx";
import Phone from "./components/Phone.jsx";
import SingleSelect from "./components/SingleSelect.jsx";
import MultiSelect from "./components/MultiSelect.jsx";
import Name from "./components/Name.jsx";
import Address from "./components/Address.jsx";
// import SpecialRender from "./components/SpecialRender.jsx";
import DropDownSelect from "./components/DropDownSelect.jsx";
import { useEffect, useState } from "react";

export default function VisitorForm({master}){
    const [userFills, setUserFills] = useState([])
    master = [{
        feild_que: 'text',
        isSpecial:0
    },{
        feild_que: 'email',
        isSpecial:0
    },{
        feild_que: 'ph',
        isSpecial:0
    },{
        feild_que: 'ss',
        special:{value:1,id:"ABC"},
        isSpecial:1,
        label:"whats your branch",
        description:"pls enter your branch",
        options: [
            "Option 1",
            "Option 2",
        ],
    },{
        feild_que: 'ss',
        // special:{value:1,id:""},
        label:"whats your year",
        isSpecial:0,
        description:"pls enter your branch",
        options : [ { value:"A",id:"ABC"}, {value:"B",id:"ABD"}, {value:"C",id:"ABE"}]
    },{
        feild_que: 'ss',
        special:{value:1,id:"ABD"},
        isSpecial:1,
        label:"whats your hobbie",
        description:"pls enter your branch",
        options: [
            "Option 1",
            "Option 2",
        ],
    },{
        feild_que: 'ms',
        special:{value:1,id:"ABD"},
        isSpecial:1,
        label:"whats your hobbie",
        description:"pls enter your branch",
        options: [
            "Option 1",
            "Option 2",
        ],
    },{
        feild_que: 'name',
        isSpecial:0
    },{isSpecial:0,
        feild_que: 'address'
    },{
        
        feild_que: 'specials',

        feild_options: [
            "Option 1",
            "Option 2",
        ],
        isSpecial:0
    },{
        feild_que: 'drops',
        feild_options: [
            "Option 1",
            "Option 2",
        ],
        isSpecial:0
    }];


    let item = 3;
    useEffect(() => {  
        if(userFills.length == 0)  
        for(let i = 0;i < master.length;i++){
            if(!master[i].isSpecial)setUserFills(prev => [...prev, master[i]]);
        }
        console.log(userFills, master)}
    
    ,[userFills]);
        let padLeft = 0;
    return (
        <div>
            <h1
                className={`${
                  userFills.length === 0 ? "block" : "hidden"
                    } text-md text-[#FFEB55]`}
            >
            No field added yet
          </h1>

            <form style={{ padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {userFills.map((que, index) => (
                    item = que.feild_que,// Assign feid_name as changed in some later commit
                    <div>
                        <div style={{display:"none"}}>
                        {padLeft = que.isSpecial ? que.special.id.length : 0}
                        </div>
                        <div key={index} style={{ marginBottom: '20px', height:"250px", paddingLeft:`${padLeft}rem` }}>
                            {item === 'text' && <Text que="" disc="" err="" note=""></Text> }
                            {item === 'email' && <Email que="" disc="" err="" note=""></Email> }
                            {item === 'ph' && <Phone que="" disc="" err="" note=""/>}
                            {item === 'ss' && <SingleSelect field={que} handleUserFills={setUserFills} master={master} fieldInd={index}></SingleSelect> }
                            {item === 'ms' && <MultiSelect que="" disc="" err="" note=""></MultiSelect> }
                            {item === 'name' && <Name que="" disc="" err="" note=""/>}
                            {item === 'address' && <Address que="" disc="" err="" note=""></Address> }
                            {/* {item === 'spesials' && <SpecialRender que="" disc="" err="" note=""></SpecialRender> */}
                            {item === 'drops' && <DropDownSelect options={que.feild_options} que="" disc="" err="" note=""/>}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}