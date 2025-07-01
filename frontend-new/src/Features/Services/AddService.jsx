import React, { useContext } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import ServiceDetails from "./ServiceDetails";
import { useForm } from "react-hook-form";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";
// import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

export function CreateService() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [serviceImage, setServiceImage] = React.useState(null);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const navigate = useNavigate();

  let { register, handleSubmit, reset } = useForm();
  let token = localStorage.getItem("userData");
  const serviceFormHandler = async (data) => {
    await api
      .put(
        "/service/addService",
        {
          data: data,
          image: serviceImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        //console.log(response);
        // setServices((prev) => [...prev, response.data.service]);
        navigate(-1);
        toast.success("Service Added !!");
        reset();
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(serviceFormHandler)(event);
      }}
      action=""
      className=" w-full sm:w-2/3 flex flex-col justify-between h-full theme-form-bg"
    >
      <div className="w-full px-10 sm:px-24 py-4 flex flex-col">
        <div className="steps w-full">
          <h1 className="w-fit mx-auto text-2xl"> Service Details </h1>
          {/* <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
            className="sm:w-2/3 px-0 rounded-full mx-auto font-semibold"
            itemProp={'theme-3'}
          >
            <Step onClick={() => setActiveStep(0)} className="theme-button">
              <UserIcon className="h-5 w-5" />
              <div className="absolute -bottom-[1.5rem] w-max text-center">
                <Typography
                  // color={activeStep === 0 ? "" : "gray"}
                  className={activeStep === 0 ? `theme-31` : 'none'}
                  
                >
                  Details
                </Typography>
              </div>
            </Step>
            <Step onClick={() => setActiveStep(1)} className="theme-button">
              <BuildingLibraryIcon className="h-5 w-5 theme-3" />
              <div className="absolute -bottom-[1.5rem] w-max text-center">
                <Typography
                  className={activeStep === 1 ? `theme-31` : 'none'}
            
                >
                  Payment
                </Typography>
              </div>
            </Step>
          </Stepper> */}
        </div>
        <div className="forms mt-10">
          {/* {activeStep == 0 ? ( */}
          <ServiceDetails
            register={register}
            setServiceImage={setServiceImage}
          />
          {/* ) : (
            <Payment />
          )} */}
        </div>
      </div>
      <div className="flex justify-around mx-auto w-80 mt-30 sm:mt-40 mb-5">
        <Button
          onClick={handlePrev}
          disabled={isFirstStep}
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
        >
          Prev
        </Button>
        <Button
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="theme-button h-10 w-fit hover:bg-[#D91656]"
        >
          Submit
        </Button>

        {/* {activeStep == 1 ? (
          <Button type="submit" className="theme-button h-10 w-fit hover:bg-[#D91656]">Submit</Button>
        ) : (
          <Button onClick={(event)=>{
            event.preventDefault();
            handleNext();
            }}
            disabled={isLastStep}
            className="theme-button h-10 w-fit hover:bg-[#D91656]"
            >
            Next
          </Button>
        )} */}
      </div>
    </form>
  );
}
