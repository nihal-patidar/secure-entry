import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/outline";
import ServiceDetails from "../components/services/ServiceDetails";
import { useForm } from "react-hook-form";

import { dataContext } from "../context/DataState";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import api from "../../axiosConfig";

import { toast } from "react-toastify";
// import { UpdateForm } from "./UpdateForm";
import { useLocation } from "react-router-dom";

export function UpdateServiceForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [isLastStep, setIsLastStep] = React.useState(false);
  // const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState();
  const location = useLocation();
  const service_id = location.state.service_id || null;

  // const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  // let { serviceFormData, setServiceFormData } = useContext(ServiceContext);
  // let token = localStorage.getItem("userData");

  useEffect(() => {
    if (service_id) {
      api
        .get(`/service/getThisService/${service_id}`)
        .then((response) => {
          //console.log("form data is here :----", response.data.service_data)
          setInitialValues(response.data.service_data);
        })
        .catch((err) => {
          //console.log(err);
          toast.warning(err.response.data.msg);
        });
    }
  }, []);

  return (
    <div className="sm:w-1/2 w-full h-full theme-form-bg">
      {initialValues ? (
        <UpdateForm
          initialValues={initialValues}
          currentServiceFormId={service_id}
        ></UpdateForm>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

function UpdateForm({ initialValues, currentServiceFormId }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  //   const [initialValues , setInitialValues] = React.useState();
  const { closePopup } = useContext(dataContext);
  const navigate = useNavigate();
  let { register, handleSubmit, getValues } = useForm({
    defaultValues: initialValues,
  });

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  let { serviceFormData, setServices } = useContext(ServiceContext);
  let token = localStorage.getItem("userData");

  const handleDelete = async () => {
    //console.log("current service id", currentServiceFormId);

    await api
      .post(`/service/deleteService/${currentServiceFormId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/home/services");
        // window.location.reload();
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
    // closePopup("updateServiceForm");
  };

  const serviceFormHandler = async (data) => {
    await api
      .put(`/service/updateService/${currentServiceFormId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        // setServices((prev) => [...prev, response.data.service]);
        toast.success("Updattion successfully done!!");
        navigate("/home/services");
        // window.location.reload();

        reset();
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
  };
  return (
    <form onSubmit={handleSubmit(serviceFormHandler)} className="w-full">
      <div className="w-full px-10 sm:px-24 py-4 flex flex-col gap-4">
        <div className="steps w-full">
          <h1 className="w-fit mx-auto text-2xl"> Service Details </h1>
        </div>
        <div className="forms mt-10">
          {activeStep == 0 ? <ServiceDetails register={register} /> : <></>}
        </div>
      </div>
      <div className="flex justify-around w-80 mx-auto mt-40">
        <Button
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}
