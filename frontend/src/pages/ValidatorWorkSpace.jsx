import React, { useState, useContext } from "react";
import Validator from "../components/validators/Validator";
import { Button } from "@material-tailwind/react";
import { PlusOutlined } from '@ant-design/icons';
import { dataContext } from '../context/DataState';
import "../index.css"
import { useNavigate } from "react-router-dom";



const ValidatorWorkSpace = () => {
    const { allValidators} = useContext(dataContext)
    //console.log("List of Validator", allValidators);
    const navigate = useNavigate();

    return (<>
        <div className="flex flex-col workspace theme-5">
        <div className="hidden sm:block btn1">
          <Button
            color="blue"
            size="md"
            onClick={()=>{
                navigate('/home/create-validator-form');
            }}
          >
            <PlusOutlined /> Add Validator
          </Button>
        </div>
            <div className="flex flex-row sm:flex-col w-full h-full">
                
                <div className="center w-[98%] h-full m-3 overflow-y-auto workspace-contents scroller gap-2">
                    {
                        allValidators.length ? allValidators.map((validator, index) => {
                            return (
                                <Validator key={index} validator={{ ...validator }} />
                            )
                        }) : <><h1 className="mx-auto mt-48 w-fit text-4xl sm:text-6xl theme-31">No Validator Added</h1></>
                    }
                </div>
                
            </div>
        </div>
    </>)
}

export default ValidatorWorkSpace; 