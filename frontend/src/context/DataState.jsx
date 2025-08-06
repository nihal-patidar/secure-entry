import { useState } from "react";
import { createContext } from "react";
import { devLog } from "../../devLog";

export const dataContext = createContext('default');

export const DataState = (props) => {
    const [fields , setFieldsDatatype] = useState([]);
    const [isOpen , setIsOpen] = useState({formPreView : false ,serviceForm : false,
    qrPreView: false , addValidatorForm : false , registerCompany : false , form1 : true , form2 : false , login : false , addServiceForm : false,updateServiceForm : false,registration : true})
    const [allValidators, setAllValidator] = useState([])
    const [users , setUsers] = useState([])
    const [currentServiceFormId , setCurrentServiceFormId] = useState();

    const Heloo = ()=>{
        //devLog.log("hello, ram ram ji")
    }

    const openPopup = (match) => {
        setIsOpen((prev)=>{
            return ({...prev , [match] : true})
        })
    };

    const closePopup = (match) => {
        setIsOpen((prev)=>{
            return ({...prev , [match] : false})
        })
    };

    const AddValidator = (validatordata)=>{
        let id =  Object.keys(validators).length;
        setValidator((prev)=>{
            return({...prev , [id] : validatordata})
        })
    }
    
    return (
        <dataContext.Provider value={
            {Heloo ,currentServiceFormId , setCurrentServiceFormId,fields , setFieldsDatatype ,isOpen , setIsOpen , allValidators, setAllValidator ,AddValidator ,openPopup , closePopup,users , setUsers}
        }>
            {props.children}
        </dataContext.Provider>
    )
}
