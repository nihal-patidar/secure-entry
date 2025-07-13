import React, { useEffect, useState } from "react";
import FieldRenderer from "./FieldRenderer";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PaymentField from "./fields/PaymentField";

const FormCanvas = ({ formConfig, setFormConfig, isPreview = false }) => {
  const [serviceId, setServiceId] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const coverField = formConfig.fields.find((f) => f.type === "Cover");
  const logoField = formConfig.fields.find((f) => f.type === "Logo");
  const timerField = formConfig.fields.find((f) => f.type === "Timer");
  const paymentFields = formConfig.fields.filter((f) => f.type === "Payment Fields");
  const termsField = formConfig.fields.find(
    (f) => f.type === "Terms & Conditions"
  );
  const otherFields = formConfig.fields.filter(
    (f) => !["Cover", "Logo", "Timer", "Terms & Conditions", "Payment Fields"].includes(f.type)
  );

  const otherPlusPaymentFields = formConfig.fields.filter(
    (f) => !["Cover", "Logo", "Timer", "Terms & Conditions"].includes(f.type)
  );

  useEffect(() => {
    if (params.serviceId) {
      setServiceId(params.serviceId);
    }
  }, []);

  const updateFormTitle = (title) => {
    setFormConfig((prev) => ({ ...prev, title }));
  };

  const updateFormDescription = (description) => {
    setFormConfig((prev) => ({ ...prev, description }));
  };

  const updateField = (fieldId, updates) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const removeField = (fieldId) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
  };

  const duplicateField = (field, index) => {
    const duplicated = {
      ...field,
      id: Date.now().toString(),
      originalId: field.originalId || field.id,
    };

    setFormConfig((prev) => {
      const updatedFields = [...prev.fields];
      const fieldIndex = updatedFields.findIndex((f) => f.id === field.id);
      updatedFields.splice(fieldIndex + 1, 0, duplicated);
      return { ...prev, fields: updatedFields };
    });
  };

  const handleSaveForm = async () => {
    try {
      let token = localStorage.getItem("userData");
      console.log(serviceId,token,formConfig);
      if (serviceId && formConfig && token) {
        let data = formConfig;
        const response = await api.post(`/service/addForm/${serviceId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          toast.success("Login Successfully!");
          navigate(-1);
        }
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };


  return (
    <div className="flex-1 overflow-y-auto p-4 ">
      <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
        <div className="p-4">
          {/* Cover */}
          {coverField && (
            <FieldRenderer
              field={coverField}
              onUpdate={(updates) => updateField(coverField.id, updates)}
              onRemove={
                isPreview ? undefined : () => removeField(coverField.id)
              }
              isBuilder={!isPreview}
            />
          )}

          {/* Logo */}
          {logoField && (
            <FieldRenderer
              field={logoField}
              onUpdate={(updates) => updateField(logoField.id, updates)}
              onRemove={isPreview ? undefined : () => removeField(logoField.id)}
              isBuilder={!isPreview}
              hasCover={!!coverField}
            />
          )}

          {/* Timer */}
          {timerField && (
            <FieldRenderer
              field={timerField}
              onUpdate={(updates) => updateField(timerField.id, updates)}
              onRemove={
                isPreview ? undefined : () => removeField(timerField.id)
              }
              isBuilder={!isPreview}
            />
          )}

          {/* Title + Description */}
          <div className="p-6 border-b border-gray-100">
            <input
              type="text"
              value={formConfig.title}
              onChange={(e) => updateFormTitle(e.target.value)}
              className={`text-4xl font-bold w-full border-none outline-none bg-transparent text-center leading-[1.3] ${
                isPreview ? "pointer-events-none text-gray-700" : ""
              }`}
              placeholder="Form Title"
              readOnly={isPreview}
            />
            <textarea
              value={formConfig.description}
              onChange={(e) => updateFormDescription(e.target.value)}
              className={`text-gray-600 w-full border-none outline-none bg-transparent mt-2 text-center resize-none overflow-hidden ${
                isPreview ? "pointer-events-none" : ""
              }`}
              placeholder="Form Description"
              rows={1}
              readOnly={isPreview}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </div>

          {/* Other Fields */}
          {otherFields.length > 0 && (
            <div className="space-y-6">
              {otherFields.map((field, index) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  index={index}
                  onUpdate={(updates) => updateField(field.id, updates)}
                  onRemove={isPreview ? undefined : () => removeField(field.id)}
                  onDuplicate={isPreview ? undefined : () => duplicateField(field, index)}
                  isBuilder={!isPreview}
                />
              ))}
            </div>
          )}

          {
            paymentFields.length && (
              <div style={{display:""}}>
              {
              paymentFields.map((field, index) => (
                <>
                  <div style={{height:"50px"}}></div>
                    <PaymentField field={field} handleUserFills={setFormConfig} fieldList={otherPlusPaymentFields} fieldInd={index} fieldId={index}  paymentFields={paymentFields}/>
                  </>
                ))
              }
              {termsField ? <div style={{height:"4vw"}}></div> :<div style={{height:"7vw"}}></div>}
              </div>
            )
          }
          {
            (!otherFields) && !paymentFields.length &&
            <div className="text-center py-12 text-gray-500">
              <p>Click on fields from the sidebar to add them to your form</p>
              <p>Leave a space in fields you don't want in your Final Form</p>
            </div>
          }

          {termsField && (
            <div className="space-y-6">
              <FieldRenderer
                field={termsField}
                onUpdate={(updates) => updateField(termsField.id, updates)}
                onRemove={isPreview ? undefined : () => removeField(termsField.id)}
                isBuilder={!isPreview}
                />
                <div className="h-10"></div>
            </div>
            )}
              <button
                type="submit"
                onClick={handleSaveForm}
                className="bg-[#2F44FF] m-auto hover:bg-[#1e2fd6] text-white font-semibold px-6 py-2 active:bg-[#2F44FF] rounded-lg flex items-center justify-center transition duration-200"
              >
                Save & Exit
              </button>
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;
