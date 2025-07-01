import React from "react";
import FieldRenderer from "./FieldRenderer";

const PreviewCanvas = ({ formConfig }) => {
  const coverField = formConfig.fields.find((f) => f.type === "Cover");
  const logoField = formConfig.fields.find((f) => f.type === "Logo");
  const timerField = formConfig.fields.find((f) => f.type === "Timer");
  const termsField = formConfig.fields.find((f) => f.type === "Terms & Conditions");

  const otherFields = formConfig.fields.filter(
    (f) => !["Cover", "Logo", "Timer", "Terms & Conditions"].includes(f.type)
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
        <div className="p-4">
          {coverField && (
            <FieldRenderer field={coverField} isBuilder={false} />
          )}
          {logoField && (
            <FieldRenderer field={logoField} isBuilder={false} hasCover={!!coverField} />
          )}
          {timerField && (
            <FieldRenderer field={timerField} isBuilder={false} />
          )}

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
      </div>
    </div>
  );
};

export default PreviewCanvas;
