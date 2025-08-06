import React, { useState, useContext } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../../axiosConfig";
import "../../index.css"

import { dataContext } from "../../context/DataState";
import { toast } from "react-toastify";
import { devLog } from "../../../devLog";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { UserContext } from "../../context/UserContext";
import { ServiceContext } from "../../context/ServiceContext";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const CreateValidatorForm = () => {
  const { closePopup, setAllValidator } = useContext(dataContext);
  const { userData } = useContext(UserContext);
  let { services, setServices } = useContext(ServiceContext);
  const [validatorImage, setValidatorImage] = React.useState(null);
  const navigate = useNavigate();

  const [componentDisabled, setComponentDisabled] = useState(false);
  const [validatorData, setValidatorData] = useState({
    validator_name: "",
    validator_email: "",
    password: "",
    mobile_number: "",
    validator_address: "",
    aadhar_number: "",
    gender: "",
    position: "",
    salary: "",
    time_shift: "",
    service_id: "",
    work_time: "",
  });

  const SubmitData = (label, data) => {
    //devLog.log(label, ":", data);
    setValidatorData((prev) => {
      return { ...prev, [label]: data };
    });
  };
  let token = localStorage.getItem("userData");

  const AddValidator = async (service_id) => {
    //devLog.log("heloo hi", validatorData);
    await api
      .put(
        `/validator/addValidator/${service_id}`,
        {
          validatorData: validatorData,
          image: validatorImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        //devLog.log(response);
        setAllValidator((prev) => [...prev, response.data.validator]);
        toast.success("validator added successfully!");
        navigate("/home/validators");
        reset();
      })
      .catch((err) => {
        //devLog.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
  };

  const previewImage = (e) => {
    let value = e.target.files[0];
    setValidatorImage(value);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          height: "100%",
          backgroundColor: "whitesmoke",
          padding: "50px",
        }}
      >
        <div className="w-full flex flex-col sm:flex-row h-[90%] overflow-y-scroll scroller">
          <div className="flex flex-col w-full sm:w-1/2 ">
            <Form.Item
              label="Upload Photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Input
                name="image"
                type="file"
                preview={previewImage}
                onChange={(e) => {
                  setValidatorImage(e.target.files[0]);
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Name">
              <Input
                onChange={(e) => {
                  SubmitData("validator_name", e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                onChange={(e) => {
                  SubmitData("validator_email", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                onChange={(e) => {
                  SubmitData("password", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Service">
              <Select
                onChange={(e) => {
                  SubmitData("service_id", e);
                }}
              >
                {services &&
                  services.map((service, index) => {
                    return (
                      <Select.Option value={service._id}>
                        {service.service_name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-col w-full sm:w-1/2">
            <Form.Item label="Mobile">
              <Input
                onChange={(e) => {
                  SubmitData("mobile_number", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                onChange={(e) => {
                  SubmitData("validator_address", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="AadhaarNo">
              <Input
                onChange={(e) => {
                  SubmitData("aadhar_number", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Radio.Group
                onChange={(e) => {
                  SubmitData("gender", e.target.value);
                }}
              >
                <Radio value="Male"> Male </Radio>
                <Radio value="Female"> Female </Radio>
                <Radio value="Other"> Other </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Salary">
              <Input
                onChange={(e) => {
                  SubmitData("salary", e.target.value);
                }}
                type="Number"
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-around mx-auto w-80 mt-10">
          <Button
            style={{
              backgroundColor: "#292c28d9",
              color: "white",
              fontWeight: "bolder",
            }}
            onClick={() => {
              navigate("/home/validators");
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#292c28d9",
              color: "white",
              fontWeight: "bolder",
            }}
            onClick={() => {
              AddValidator(validatorData.service_id);
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateValidatorForm;
