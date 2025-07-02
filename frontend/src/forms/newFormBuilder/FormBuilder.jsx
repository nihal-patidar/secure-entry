import React, { useState } from "react";
import FormBuilderSidebar from "./FormBuilderSidebar";
import FormCanvas from "./FormCanvas";
import PreviewCanvas from "./PreviewCanvas";

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState({
    title: "Form Heading",
    description: "Form Description",
    fields: [],
  });
  const [formKey, setFormKey] = useState(0);
  const [activeTab, setActiveTab] = useState("Fields");

  const addField = (type) => {
    if (["Cover", "Logo", "Timer", "Terms & Conditions"].includes(type)) {
      setFormConfig((prev) => {
        const exists = prev.fields.some((f) => f.type === type);
        const newField = { id: Date.now().toString(), type };

        let fields = [...prev.fields];
        if (exists) {
          return {
            ...prev,
            fields: fields.filter((f) => f.type !== type),
          };
        }

        const coverIndex = fields.findIndex((f) => f.type === "Cover");
        const logoIndex = fields.findIndex((f) => f.type === "Logo");
        const timerIndex = fields.findIndex((f) => f.type === "Timer");

        if (type === "Cover") {
          return {
            ...prev,
            fields: [newField, ...fields.filter((f) => f.type !== "Cover")],
          };
        }

        if (type === "Logo") {
          if (coverIndex !== -1) {
            fields.splice(coverIndex + 1, 0, newField);
          } else {
            fields.unshift(newField);
          }
          return { ...prev, fields };
        }

        if (type === "Timer") {
          if (logoIndex !== -1) {
            fields.splice(logoIndex + 1, 0, newField);
          } else if (coverIndex !== -1) {
            fields.splice(coverIndex + 1, 0, newField);
          } else {
            fields.unshift(newField);
          }
          return { ...prev, fields };
        }

        if (type === "Terms & Conditions") {
          return {
            ...prev,
            fields: [
              ...fields.filter((f) => f.type !== "Terms & Conditions"),
              newField,
            ],
          };
        }

        return prev;
      });
    } else {
      const newField = {
        id: Date.now().toString(),
        type,
        label: type,
        required: false,
        placeholder: `Enter ${type.toLowerCase()}`,
        value: "",
      };
      setFormConfig((prev) => ({
        ...prev,
        fields: [...prev.fields, newField],
      }));
    }
  };

  return (
    <div className="flex h-screen text-black bg-gray-100 ml-10 pb-24">
      <FormBuilderSidebar
        onFieldSelect={addField}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Fields" ? (
        <FormCanvas formConfig={formConfig} setFormConfig={setFormConfig} />
      ) : (
        <PreviewCanvas
          key={formKey}
          formConfig={formConfig}
          setFormConfig={setFormConfig}
          triggerRerender={() => setFormKey((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default FormBuilder;
