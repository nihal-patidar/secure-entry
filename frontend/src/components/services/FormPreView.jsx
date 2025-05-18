import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const FormPreView = ({ service_id, service_data }) => {
  const navigate = useNavigate();
  // const baseURL = window.location.origin;
  // const formUrl = baseURL + `/ticket-generation/${service_id}`

  return (
    <div className="flex justify-around items-center w-1/2 h-28">
      {/* <Link to={formUrl}><Button style={{backgroundColor : "blue", color: "white"}}>Form Preview</Button></Link> */}
      <Button
        onClick={() => {
          navigate("/home/create-visitor-form", {
            state: { service_id: service_id },
          });
        }}
        className="theme-button h-10 w-24 hover:bg-[#D91656]"
      >
        Create
      </Button>
      <Button
        onClick={() => {
          navigate(`/form/${service_id}`, {
            state: { service_data: service_data },
          });
        }}
        className="theme-button h-10 w-24 hover:bg-[#D91656]"
      >
        Preview
      </Button>
    </div>
  );
};

export default FormPreView;
