import React, { useEffect, useRef } from "react";
import FieldRenderer from "./FieldRenderer";

const PreviewCanvas = ({ formConfig, setFormConfig, triggerRerender}) => {

  const sanitizedFields = formConfig.fields.filter(
    (field) =>
      !(
        field.label === "" &&
        field.placeholder === "Enter " &&
        field.required === false &&
        field.type === "" &&
        field.value === ""
      ) &&
      !(
        field.type === "Logo" &&
        (!field.previewUrl || field.previewUrl === "null")
      )
    );
    
    const coverField = sanitizedFields.find((f) => f.type === "Cover");
    const logoField = sanitizedFields.find((f) => f.type === "Logo");
    const timerField = sanitizedFields.find((f) => f.type === "Timer");
    const termsField = sanitizedFields.find(
      (f) => f.type === "Terms & Conditions"
    );
    
    const otherFields = sanitizedFields.filter(
      (f) => !["Cover", "Logo", "Timer", "Terms & Conditions"].includes(f.type)
    );
    console.log("Data bitch", sanitizedFields);
    
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
        <div className="p-4">
          {coverField && <FieldRenderer field={coverField} isBuilder={false} />}
          {logoField && (
            <FieldRenderer
              field={logoField}
              isBuilder={false}
              hasCover={!!coverField}
            />
          )}
          {timerField && <FieldRenderer field={timerField} isBuilder={false} />}

          <div className="p-6 border-b border-gray-100">
            <h1 className="text-4xl font-bold text-center">
              {formConfig.title}
            </h1>
            <p className="text-gray-600 text-center mt-2">
              {formConfig.description}
            </p>
          </div>

          <div className="space-y-6 px-4 py-6">
            {otherFields.map((field, index) => (
              <FieldRenderer
                key={field.id}
                field={field}
                index={index}
                isBuilder={false}
              />
            ))}
            {termsField && (
              <FieldRenderer field={termsField} isBuilder={false} />
            )}
          </div>
        </div>

        <div className="flex justify-between mx-10 py-4">
          <button
            onClick={triggerRerender}
            className="text-gray-500 hover:bg-[#1e2fd6] hover:text-white hover:font-semibold px-6 py-2 active:bg-[#2F44FF] rounded-lg flex items-center justify-center transition duration-200"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="bg-[#2F44FF] hover:bg-[#1e2fd6] text-white font-semibold px-6 py-2 active:bg-[#2F44FF] rounded-lg flex items-center justify-center transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;