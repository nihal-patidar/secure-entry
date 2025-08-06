import React, { useContext, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { dataContext } from "../context/DataState";
import { Form, Input, Select } from "antd";

import { Button } from "@material-tailwind/react";
import api from "../../axiosConfig";
import "../index.css";
import { devLog } from "../../devLog";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const ServiceForm = ({ formId }) => {
  const { fields, setFieldsDatatype, Heloo } = useContext(dataContext);
  const navigate = useNavigate();

  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  Heloo();

  const deleteField = (indx) => {
    const arr = fields.filter((val, index) => {
      if (indx != index) {
        return val;
      }
    });
    setFieldsDatatype(arr);
  };

  const createFormForVisitor = async () => {
    //devLog.log(formId);
    // devLog.log("formdata", fields);
    await api
      .post(`/service/addForm/${formId}`, {
        formData: fields,
      })
      .then((response) => {
        //devLog.log(response.data.serviceData);
        toast.success(response.data.msg);
        navigate(-1);
        setFieldsDatatype([]);
      })
      .catch((err) => {
        //devLog.log(err);
        toast.warning(err.response);
      });
  };

  return (
    <div className="flex flex-col justify-center w-full scroller border border-[#FFEB55] h-full p-5 rounded-lg">
      <h1
        className={`${
          fields.length === 0 ? "block" : "hidden"
        } text-md text-[#FFEB55]`}
      >
        No field added yet
      </h1>

      <div className="flex flex-wrap w-full h-full gap-4">
        {fields.map((field, indx) => {
          return (
            <div className="flex justify-between h-8 w-48 px-6 py-1 rounded-md border border-[#FFEB55] hover:border-[#D91656] font-normal bg-transparent text-[#FFEB55] hover:text-[#D91656]">
              <span>{field.fieldName}</span>
              <CloseCircleOutlined
                onClick={(e) => {
                  deleteField(indx);
                }}
                style={{
                  fontSize: "18px",
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        className={`${
          fields.length !== 0 ? "block" : "hidden"
        } theme-3 border border-[#FFEB55] bg-transparent h-10 w-fit hover:text-[#D91656] hover:border-[#D91656] relative top-3`}
        onClick={() => {
          //devLog.log("submitted form :", fields);
          createFormForVisitor();
        }}
      >
        Submit
      </Button>
    </div>
  );
};

const VisitorFormCreate = () => {
  const { fields, setFieldsDatatype } = useContext(dataContext);
  const [fieldName, setField] = useState("");
  const [fieldDataType, setFieldDataType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const service_id = (location.state && location.state.service_id) || null;

  const keywords = [
    {
      fieldName: "Name",
      fieldDataType: "text",
    },
    { fieldName: "email", fieldDataType: "text" },
    // { fieldName: "Gender", fieldDataType: "text" },
    { fieldName: "Upload", fieldDataType: "file" },
  ];

  const addFormField = (obj) => {
    //devLog.log(obj);
    setFieldsDatatype((prev) => {
      // Check if the array already contains obj
      const exists = prev.some(
        (item) => JSON.stringify(item) === JSON.stringify(obj)
      );

      // If not, add obj to the array
      return exists ? prev : [...prev, obj];
    });
  };
  return (
    <div className={`h-full sm:w-[98%] p-5 theme-form-bg`}>
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div className="flex w-full theme-3 px-8 justify-between ">
          <h2 className=""></h2>
          <button
            className=""
            onClick={() => {
              navigate(-1);
              setFieldsDatatype([]);
            }}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="w-full flex flex-row justify-evenly items-center h-80 sm:h-full">
            <div className="w-full sm:w-1/2 flex flex-col bg-gray-100 p-4 h-full">
              <div className="bg-white p-4 rounded-lg shadow-md w-full h-full">
                <h2 className="text-lg font-semibold mb-3">
                  Add Fields To Form
                </h2>
                <div className="flex justify-evenly flex-wrap w-full h-12">
                  {keywords.map((val, indx) => {
                    return (
                      <div
                        key={indx}
                        onClick={(e) => {
                          addFormField(val);
                        }}
                        className=" text-center h-6 px-2 rounded-md border-b-2 border-[black] hover:border-[#302e2f] font-semibold bg-transparent text-[black] hover:text-[#302e2f] w-fit"
                      >
                        {val.fieldName}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around items-center mt-3 w-full h-14">
                  <div className="flex flex-col h-14 w-48">
                    <label className="text-[black] my-2">
                      Field Label :{" "}
                    </label>
                    <Input
                      type="Select"
                      onChange={(e) => {
                        setField(e.target.value);
                      }}
                      className="bg-transparent text-[black] placeholder:text-[black] focus:bg-transparent hover:bg-transparent"
                      placeholder="Enter Here"
                    />
                  </div>
                  <div className="flex flex-col h-14 w-48">
                    <label className="text-[black] my-2">Field Type : </label>
                    <Select
                      className="bg-transparent text-[black] placeholder:text-[black] focus:bg-transparent hover:bg-transparent"
                      onChange={(e) => {
                        setFieldDataType(e);
                      }}
                    >
                      <Select.Option value="text">Text</Select.Option>
                      <Select.Option value="number">Number</Select.Option>
                      <Select.Option value="password">Password</Select.Option>
                      <Select.Option value="checkbox">Checkbox</Select.Option>
                      <Select.Option value="button">Button</Select.Option>
                      <Select.Option value="email">Email</Select.Option>
                      <Select.Option value="radio">Radio</Select.Option>
                    </Select>
                  </div>
                  <Button
                    onClick={() => {
                      if (fieldName && fieldDataType) {
                        // setFieldsDatatype((prev) => {
                        //   return [...prev, { fieldName, fieldType }];
                        // });
                        setFieldsDatatype((prev) => {
                          const exists = prev.some(
                            (item) =>
                              JSON.stringify(item) ===
                              JSON.stringify({ fieldName, fieldDataType })
                          );
                          return exists
                            ? prev
                            : [...prev, { fieldName, fieldDataType }];
                        });
                      }
                    }}
                    className="relative top-7 border border-[black] hover:border-[#302e2f] font-normal bg-transparent text-[black] hover:text-[#302e2f]"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <AddSelectField setFieldsDatatype={setFieldsDatatype} />
            </div>
          </div>

          <div className="flex w-full items-center mt-7">
            <ServiceForm fields={fields} formId={service_id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisitorFormCreate;

const AddSelectField = ({ setFieldsDatatype }) => {
  const [fieldName, setFieldName] = useState("");
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  //value will be shown
  //key will be hidden

  const addOption = () => {
    if (optionInput && valueInput) {
      setOptions([...options, { option : optionInput, value : valueInput }]);
      setOptionInput("");
      setValueInput("");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <h2 className="text-lg font-semibold mb-3">Single Select Form</h2>
        <div className="space-y-3">
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Field Name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required
          />

          <div className="flex space-x-2">
            <input
              type="text"
              className="border p-2 flex-1 rounded"
              placeholder="Option"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
            />
            <input
              type="text"
              className="border p-2 flex-1 rounded"
              placeholder="Value"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addOption}
              className="bg-green-500 text-white px-3 rounded"
            >
              +
            </button>
          </div>

          <select
            className="border p-2 w-full rounded"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select...</option>
            {options.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.option}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (fieldName) {
                setFieldsDatatype((prev) => {
                  return [
                    ...prev,
                    { fieldName, fieldDataType: "select", options: options },
                  ];
                });
                setOptions([]);
                setFieldName("");
                setOptionInput("");
                setValueInput("");
                setSelectedValue("");
              }
            }}
            className="bg-blue-600 text-white w-full p-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
