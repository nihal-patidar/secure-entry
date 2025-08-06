import React, { useEffect, useState } from "react";
import FieldRenderer from "./FieldRenderer";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";
import { useForm } from "react-hook-form";
import RazorpayPayment from "./Payment";
import EmailOtpForm from "../../components/small/EmailVerification";
import { Button } from "@material-tailwind/react";
// import LoadingDots from "../small/LoadingDots";
import BouncingDotsLoader from "../../components/small/BouncingDotsLoader";
import { toast } from "react-toastify";
import { devLog } from "../../../devLog";

const VisitorForm = ({ setVisitorData, setActiveStep, amount , setAmount,serviceData,setServiceData }) => {
  const { formId } = useParams();
  const [formConfig, setFormConfig] = useState(null);
  const [image, setImage] = useState(null);
  const [fFData, setFFData] = useState(null);
  const [enable, setEnable] = useState(true);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formRes = await api.get(`/service/getStructure/${formId}`);
        setFormConfig(formRes.data.form_structure);

        const serviceRes = await api.get(`/service/getThisService/${formId}`);
        setServiceData(serviceRes.data.service_data);
        devLog.log("serviceData", serviceRes.data.service_data);
        setAmount(serviceRes.data?.amount || 0);
      } catch (error) {
        toast.error("Failed to fetch form or service data");
      }
    };

    if (formId) fetchData();
  }, [formId]);

  const onSubmit = async (data) => {
    // Merge first and last name fields
    devLog.log("Data submitted:", data);
    const visitorData = { ...data };
    Object.keys(data).forEach((key) => {
      if (key.endsWith("_first")) {
        const baseKey = key.replace("_first", "");
        const first = data[key] || "";
        const last = data[`${baseKey}_last`] || "";
        visitorData[baseKey] = `${first} ${last}`.trim();
        delete visitorData[key];
        delete visitorData[`${baseKey}_last`];
      }
    });

    if (amount === 0) {
      postData({ fData: visitorData, paymentId: "", orderId: "" });
    } else {
      setFFData(visitorData);
    }
  };

  const postData = async ({ fData, paymentId, orderId }) => {
    try {
      let endpoint = image ? "/visitor/set-visitor-t2" : "/visitor/set-visitor";
      const payload = {
        visitorData: {
          visitor_data: fData,
          validater_list: serviceData.validater_list,
          validity: serviceData.ticket_validity,
          remain_scans: serviceData.valid_scans,
        },
        paymentId,
        orderId,
      };

      // devLog.log("payload visitor data",payload)

      const config = image
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined;

      if (image) payload.image = image;

      const response = await api.post(`${endpoint}/${formId}`, payload, config);
      setVisitorData({
        ...response.data.visitorData,
        qrData: response.data.qrData,
      });
      setActiveStep?.(1);
      toast.success("Visitor Data Successfully Added !!!");
    } catch (err) {
      // devLog.log(err);
      toast.warning("Error submitting form");
    }
  };

  const previewImage = (e) => {
    setImage(e.target.files[0]);
  };

  const sanitizedFields = formConfig?.fields.filter(
    (field) =>
      !(field.label === "" && field.placeholder === "Enter " && field.required === false && field.type === "" && field.value === "") &&
      !(field.type === "Logo" && (!field.previewUrl || field.previewUrl === "null")) &&
      !(field?.special !== undefined)
  );

  const coverField = sanitizedFields?.find((f) => f.type === "Cover");
  const logoField = sanitizedFields?.find((f) => f.type === "Logo");
  const timerField = sanitizedFields?.find((f) => f.type === "Timer");
  const termsField = sanitizedFields?.find((f) => f.type === "Terms & Conditions");
  const otherFields = sanitizedFields?.filter((f) => !["Cover", "Logo", "Timer", "Terms & Conditions"].includes(f.type));

  return (
    <>
      {sanitizedFields && (
        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
              <div className="p-4">
                {coverField && <FieldRenderer field={coverField} isBuilder={false} />}
                {logoField && <FieldRenderer field={logoField} isBuilder={false} hasCover={!!coverField} />}
                {timerField && <FieldRenderer field={timerField} isBuilder={false} />}

                <div className="p-6 border-b border-gray-100">
                  <h1 className="text-4xl font-bold text-center">{formConfig.title}</h1>
                  <p className="text-gray-600 text-center mt-2">{formConfig.description}</p>
                </div>

                <div className="space-y-6 px-4 py-6">
                  {otherFields?.map((field, index) => (
                    field.fieldName === "email" ? (
                      <EmailOtpForm key={field.id} register={register} setEnable={setEnable} />
                    ) : (
                      <FieldRenderer
                        key={field.id}
                        field={field}
                        index={index}
                        isBuilder={false}
                        register={register}
                        previewImage={previewImage}
                      />
                    )
                  ))}
                  {termsField && <FieldRenderer field={termsField} isBuilder={false} />}
                </div>
              </div>

              <p className="mx-auto text-lg text-red-600 underline text-center">
                Please wait after payment for ticket
              </p>

              <div className="flex justify-between mx-10 py-4">
                {enable && (
                  fFData ? (
                    <RazorpayPayment
                      amount={amount}
                      postData={postData}
                      fData={fFData}
                    />
                  ) : (
                    <Button type="submit" className="bg-green-500 w-full">
                      Submit
                    </Button>
                  )
                )}
              </div>
              <p className="font-bold text-[#8f36be] w-fit pt-4 mx-auto">
                <span className="font-semibold">By :</span> SecureEntry
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VisitorForm;