import React, { useState, useContext, useEffect } from "react";
import api from "../../axiosConfig";
import { Controller, useForm } from "react-hook-form";
import { dataContext } from "../context/DataState";
import { toast } from "react-toastify";
import { Select } from "antd";
import "../index.css";
import Input from "../components/small/Input";
import { UserContext } from "../context/UserContext";
import { ServiceContext } from "../context/ServiceContext";
import { useNavigate } from "react-router-dom";

const CreateValidatorForm = () => {
  const { closePopup, setAllValidator } = useContext(dataContext);
  const { userData } = useContext(UserContext);
  let { services, setServices } = useContext(ServiceContext);
  const [validatorImage, setValidatorImage] = React.useState(null);
  const navigate = useNavigate();
  let { register, handleSubmit, reset , control} = useForm();

  const options = services?.map((service) => ({
    label: service.service_name,
    value: service._id,
  }));


  let token = localStorage.getItem("userData");

  

  const validatorFormHandler = async (data) => {
    //console.log("heloo hi" , data);
    await api
      .put(
        `/validator/addValidator/${data.service_id}`,
        {
          validatorData: data,
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
        //console.log(response);
        setAllValidator((prev) => [...prev, response.data.validator]);
        toast.success("validator added successfully!");
        navigate(-1);
        reset();
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
  };

  const previewImage = (e) => {
    let value = e.target.files[0];
    setValidatorImage(value);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(validatorFormHandler)(event);
        }}
        action=""
        className="theme-form-bg flex flex-col justify-evenly items-center w-full sm:w-2/3 h-full"
      >
        <div className="flex sm:flex-row flex-col justify-evenly items-center w-full">
          <div className="w-60 gap-4 flex flex-col justify-between pt-5">
            <Input
              label="Photo"
              name="image"
              type="file"
              preview={previewImage}
              {...register("image", { required: true })}
            ></Input>
            <Input
              label="Name"
              placeholder="Validator Name"
              {...register("validator_name", { required: true })}
            ></Input>
            <Input
              label="Email"
              type="text"
              placeholder="Email"
              {...register("validator_email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="w-60 gap-4 flex flex-col justify-between pt-5">
          <Controller
            name="service_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                placeholder="Select Service"
                className="w-full"
              />
            )}
          />
            <Input
              label="Mobile"
              {...register("mobile_number", { required: true })}
            />
            <Input
              label="Address"
              {...register("validator_address", { required: true })}
            />
            <Input
              label="AadhaarNo"
              {...register("aadhar_number", { required: true })}
            />
          </div>
        </div>

        <div className="flex justify-around mx-auto w-80 mt-10">
          
          <button
            className="theme-button h-10 w-fit hover:bg-[#D91656] hover:border-2 border-[#FFEB55] px-2  rounded-md"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>

          <button
            className="theme-button h-10 w-fit hover:bg-[#D91656] hover:border-2 border-[#FFEB55] px-2 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateValidatorForm;
