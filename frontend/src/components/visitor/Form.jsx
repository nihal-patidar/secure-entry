import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../axiosConfig";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import EmailOtpForm from "../small/EmailVerification";
import RazorpayPayment from "./Payment";
import LoadingDots from "../small/LoadingDots";

const Form = ({
  formId,
  setVisitorData,
  setActiveStep,
  serviceData,
  setServiceData,
  setAmount,
  amount,
}) => {
  let [enable, setEnable] = useState(true);
  let { register, handleSubmit } = useForm();
  let [validatorList, setValidatorList] = useState();
  let [fFData, setFFData] = useState(null);
  const [image, setImage] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/service/getFormData/${formId}`)
      .then((response) => {
        if (!response.data.serviceData?.form_structure) {
          alert("First Create the form");
          navigate(-1);
        }
        setServiceData(response.data.serviceData);
        setAmount(response.data.serviceData?.ticket_price);
        // console.log("serviceData",response.data.serviceData)
      })
      .catch((err) => {
        toast.warning(err.response.data.msg);
      });

    api
      .get(`/service/getThisService/${formId}`)
      .then((res) => {
        setValidatorList(res.data.validater_list);
      })
      .catch((err) => {
        toast.warning(err.response.data.msg);
      });
  }, []);

  const previewImage = (e) => {
    let value = e.target.files[0];
    setImage(value);
  };

  const postData = async ({ fData, paymentId, orderId }) => {
    let data = fData;
    let ticketId = null;
    // console.log("form data",paymentId , data);
    if (image === null) {
      await api
        .post(`/visitor/set-visitor/${formId}`, {
          visitorData: {
            visitor_data: data,
            validater_list: validatorList,
            validity: serviceData.ticket_validity,
            remain_scans: serviceData.valid_scans,
          },
          paymentId: paymentId,
          orderId: orderId,
        })
        .then((response) => {
          setVisitorData({
            ...response.data.visitorData,
            qrData: response.data.qrData,
          });
          ticketId = response.data.visitorData._id;
          // console.log("visitor info", response);
          setActiveStep(1);
          toast.success("Visitor Data Successfully Added !!!");
        })
        .catch((err) => {
          toast.warning(err.response);
        });
    } else {
      await api
        .post(
          `/visitor/set-visitor-t2/${formId}`,
          {
            visitorData: {
              visitor_data: data,
              validater_list: validatorList,
              validity: serviceData.ticket_validity,
              remain_scans: serviceData.valid_scans,
            },
            image: image,
            paymentId: paymentId,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((response) => {
          setVisitorData({
            ...response.data.visitorData,
            qrData: response.data.qrData,
          });
          setActiveStep(1);
          toast.success("Visitor Data Successfully Added !!!");
        })
        .catch((err) => {
          toast.warning(err.response);
        });
    }

    return ticketId;
  };

  const submitVisitorFormData = async (data) => {
    // console.log("onsubmit data", data, amount);
    if (amount === 0) {
      // console.log("free pass");
      postData({ fData: data, paymentId: "", orderId: "" });
    } else {
      setFFData(data);
      // console.log("paid pass");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitVisitorFormData)}
        className="flex w-full flex-col items-center justify-center border px-12 sm:p-3 rounded-md shadow-md bg-white"
      >
        <div className="text-center w-full rounded-md">
          {serviceData && (
            <p className="font-bold text-[#9757ba] w-fit mx-auto text-lg">
              {serviceData.service_name} Form
            </p>
          )}
          {/* <h2 className="text-2xl font-bold text-[#8f36be]">
            {serviceData && serviceData.service_name}
          </h2> */}
        </div>
        <div className="buttom flex flex-col items-start mt-3 gap-3 w-full">
          {!serviceData && <LoadingDots />}

          {serviceData &&
            serviceData.form_structure.map((ele, index) => {
              {
                /* console.log("form field", ele); */
              }
              {/* if (ele.fieldName === "email") {
                setEnable(false);
                return (
                  <EmailOtpForm register={register} setEnable={setEnable} />
                );
              } */}
              

              return (ele.fieldName === "email" ?
                <EmailOtpForm register={register} setEnable={setEnable} /> :
                <>{

              ele.fieldDataType === "select" ? (
                <>
                  {ele.fieldName === "Game Type" ? (
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        {ele.fieldName}
                      </label>
                      <select
                        // className="border p-2 rounded-md"
                        className="mt-1 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
                        {...register(ele.fieldName, { required: true })}
                        onChange={(e) => setAmount(e.target.value)}
                      >
                        {ele?.options?.map((option, index) => {
                          return (
                            <option key={index} value={option.value}>
                              {option.option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        {ele.fieldName}
                      </label>
                      <select
                        // className="border p-2 rounded-md"
                        className="mt-1 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
                        {...register(ele.fieldName, { required: true })}
                      >
                        {/* <option value="" disabled>
                      -- Select an option --
                    </option> */}
                        {ele?.options?.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              ) : (
                <div key={index} className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    {ele.fieldName}
                  </label>
                  <input
                    {...register(ele.fieldName, { required: true })}
                    type={ele.fieldDatatype}
                    placeholder={ele.fieldName}
                    className="mt-1 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
                    onChange={
                      ele.fieldDatatype === "file" ? previewImage : undefined
                    }
                  />
                </div>
              )
            }</>)

            })}

          {/* {serviceData && (
            <EmailOtpForm register={register} setEnable={setEnable} />
          )} */}

          <p className="mx-auto text-lg text-red-600 underline">
            Please wait after payment for ticket
          </p>
          <div className="buttons flex items-center justify-around w-full">
            {enable ? (
              <>
                {fFData === null ? (
                  <Button type="submit" className="bg-green-500 w-full">
                    Submit
                  </Button>
                ) : (
                  <RazorpayPayment
                    amount={amount}
                    postData={postData}
                    fData={fFData}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
        <p className="font-bold text-[#8f36be] w-fit pt-4 mx-auto">
          <span className="font-semibold">By :</span> SecureEntry
        </p>
      </form>
    </>
  );
};

export default Form;
