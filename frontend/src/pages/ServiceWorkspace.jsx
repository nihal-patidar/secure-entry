import React, { useState, useContext, useEffect, useCallback, Suspense } from "react";
import "../index.css";
import { PlusOutlined } from "@ant-design/icons";
import { dataContext } from "../context/DataState";
import { Button } from "@material-tailwind/react";
const Services = React.lazy(()=>import('../components/services/ServiceCard'));
import { useNavigate } from "react-router-dom";
const ServiceWorkSpace = () => {
  const {
    setFieldsDatatype,
    setAllValidator,
  } = useContext(dataContext);
  const navigate = useNavigate();

  const keywords = [
    {
      fieldName: "Name",
      fieldDatatype: "text",
    },
    { fieldName: "Email", fieldDatatype: "text" },
    { fieldName: "Gender", fieldDatatype: "select" },
    { fieldName: "MobileNo.", fieldDatatype: "text" },
    { fieldName: "Address", fieldDatatype: "text" },
  ];

  const addFormField = (obj) => {
    //console.log(obj);
    setFieldsDatatype((prev) => {
      return [...prev, obj];
    });
  };

  useEffect(() => {
    //console.log("fields");
    setAllValidator([]);
  }, []);
  return (
    <>
      <div className="flex flex-row sm:flex-col workspace theme-5">
        <div className="hidden sm:block btn1">
          <Button
            color="blue"
            size="md"
            onClick={()=>{navigate('/home/create-service')}}
          >
            <PlusOutlined /> Add Services
          </Button>
        </div>
        <div className="flex flex-row sm:flex-col p-0 m-0 w-full h-full">
          <Suspense fallback={()=><p>This is Loading...</p>}>
            <Services></Services>
          </Suspense>
        </div>
      </div>

      
    </>
  );
};

export default ServiceWorkSpace;