import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./VisitorForm";
// import Footer from "../components/Footer";
import InvitationCard from "../../components/visitor/Ticket";
// import Slogo from "../components/small/Slogo";
import BouncingDotsLoader from "../../components/small/BouncingDotsLoader";
import VisitorForm from "./VisitorForm";

export function TicketForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [amount, setAmount] = React.useState(null);
  var [serviceData, setServiceData] = useState(null);

  const [visitorData, setVisitorData] = useState(null);
  const { formId } = useParams();

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  let token = localStorage.getItem("userData");

  return (
    <div className="w-full flex flex-col items-center sm:w-full bg-white">
      {/* <Slogo /> */}
      <div className="w-full pt-4">
        {activeStep == 0 ? (
          <VisitorForm
            setVisitorData={setVisitorData}
            setActiveStep={setActiveStep}
            formId={formId}
            serviceData={serviceData}
            setServiceData={setServiceData}
            setAmount={setAmount}
            amount={amount}
          />
        ) : null}

        {activeStep == 1 && (
          <>
            {visitorData !== null ? (
              <InvitationCard
                data={{ visitorData, formId, setActiveStep, serviceData }}
              />
            ) : (
              <BouncingDotsLoader />
            )}
          </>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TicketForm;
