import React,{ useId } from "react";
import "../../index.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input as InputField,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
const Input = React.forwardRef(({
    label,
    preview=()=>{},
    makeEditable= ()=>{},
    updateName= ()=>{},
    updateEmail= ()=>{},
    className="",
    type="text",
    bgcolor=null,
    error,
    ...props
},ref)=>{
    const id= useId();
    return(
        <>
        <div className="w-full">
        <InputField 
        type={type}  
        color='yellow'
        className="theme-3 outline-none"
        label={label}
        ref={ref}
        {...props}
        
        onChange={(e)=>{
            preview(e);
            updateName(e);
            updateEmail(e);
        }}
        onClick={makeEditable}
        ></InputField>
        {error != "" && <p className="text-red-500">{error}</p>}
        </div>
        </>
    )
})

export default Input;