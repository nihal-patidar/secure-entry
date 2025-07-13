import React, { useState ,useEffect} from "react";
import FormBuilderSidebar from "./FormBuilderSidebar";
import FormCanvas from "./FormCanvas";
import PreviewCanvas from "./PreviewCanvas";
import { useParams } from "react-router-dom";
import api from "../../../axiosConfig";
// import { id } from "zod/v4/locales";

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState({
    title: "Form Heading",
    description: "Form Description",
    fields: [],
  });
  const [formKey, setFormKey] = useState(0);
  const [activeTab, setActiveTab] = useState("Fields");
  const params = useParams();

  useEffect(() => {
    let formId = params.serviceId ;
    if (!formId) return;

    const fetchFormData = async () => {
      try {
        const response = await api.get(`/service/getStructure/${formId}`);
        console.log("response data",response.data)
        if(response.data?.form_structure){
          setFormConfig(response.data.form_structure);

        }
      } catch (error) {
        console.error("Failed to fetch form structure:", error);
      }
    };

    fetchFormData();
  }, []);

  const addField = (type, idd = formConfig.fields.length) => {
    console.log("Adding field of type:", type, idd, "final formCOnfig:" , formConfig);
    
    if ("Payment Fields" === type) { 
      setFormConfig((prev) => {
        if (type === "Payment Fields") {
          console.log("Adding payment field with id:", idd);
          const newPaymentFeild = {
            id: idd || Date.now().toString(),
            type,
            label: "Extra Payment Field",
            required: false,
            placeholder: `Enter ${type.toLowerCase()}`,
            value: "",
            amount:"",
            options:[ { value:"A",id:`${idd}A`}, {value:"B",id:`${idd}B`}, {value:"C",id:`${idd}C`} ]
          }
          console.log("New payment field:", newPaymentFeild);
          return {
            ...prev,
            fields: [
              ...prev.fields,
              newPaymentFeild,
            ],
          };
        }

        return {
          ...prev,}
      });
      return ;
    }
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
      return ;
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
    <div className="flex h-screen text-black bg-gray-100 ml-10 pb-3">
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