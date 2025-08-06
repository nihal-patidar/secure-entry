import React, { memo, useContext, useEffect, useState } from "react";
import Validator_Strip from "./Validator_Strip";
import { dataContext } from "../../context/DataState";
import api from "../../../axiosConfig";
import { devLog } from "../../../devLog";


const ValidatorInService = (props) => {
    const {allValidators, setAllValidator } = useContext(dataContext);
    const [validators , setValidator] = useState({});

    useEffect(()=>{
        //devLog.log(props.service_id);
        getValidator();
    },[])

    const getValidator= () => {
        api.get(`/validator/getValidators/${props.service_id}`).then((response)=>{
            let data = response.data.validators ;
            setValidator(data)
            Object.values(data).forEach((value)=>{
                setAllValidator((prev)=>{
                    return ([...prev , value]);
                })
            })
        }).catch((err)=>{
            //devLog.log("error",err);
        })
    }

    //devLog.log("validators element", validators);
    
    let Element = [] ;
    const validatorList = ()=>{
        Object.keys(validators).forEach((key,indx)=>{
            let validator = validators[key];
            //devLog.log("validator and its key :-",validator , " -> " , key)
            Element.push(
                <Validator_Strip key={indx} validator={{...validator}}/>
            )
        })
        return Element ;
    }
    return(
        <div className="flex flex-col items-center h-28 overflow-y-scroll w-full">{validatorList()}</div>
    )
}

export default memo(ValidatorInService) ;