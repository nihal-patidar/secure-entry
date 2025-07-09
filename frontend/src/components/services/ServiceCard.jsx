import React, { useEffect, useContext, useState, Suspense } from "react";
import { memo } from "react";
import ServiceTabs from "./ServiceTabs";
import { ServiceContext } from "../../context/ServiceContext";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";
import "../../index.css";

const Services = () => {

  let { services, setServices } = useContext(ServiceContext);
  let token = localStorage.getItem("userData");
  useEffect(() => {
    serviceFormHandler();
  }, []);

  useEffect(() => {
    //console.log("Service Component Called!!");
  }, []);
  const serviceFormHandler = async () => {
    await api
      .get("/service/getServices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("services Data -- ", response.data.services);
        //console.log("services fetched request");
        setServices(response.data.services);
        //console.log(response.data.services);
      })
      .catch((err) => {
        //console.log(err.response.data);
        toast.warning(err.response.data.msg);
      });
  };
  
  return (
    <div className="flex flex-col gap-2 w-full h-full theme-5 rounded-lg overflow-y-scroll scroller justify-start items-center my-2">
      {services.length !== 0 ? (
        services.map((ele, index) => {
          //console.log("service no.", index, " -> ", ele);

          return <Service ele={ele} index={index} />;
        })
      ) : (
        <>
          <h1 className="mx-auto mt-48 w-fit text-4xl sm:text-6xl theme-31">No Services Added</h1>
        </>
      )}
    </div>
  );
};

const Service = ({ ele, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col sm:flex-row w-[95%] sm:h-64 service-card-theme shadow-lg rounded-lg"
    >
      <div className="flex justify-around w-full sm:w-[48%] ">
        <div className="flex flex-col justify-around center my-3 sm:h-52 sm:my-8">
          <img
            className="h-24 w-24 sm:w-32 sm:h-32 object-cover bg-slate-200"
            src={ele?.service_image_url}
            alt="Profile Photo"
            loading="lazy"
          />
          <h2 className="text-sm sm:text-xl font-bold mb-2 theme-label text-wrap">{ele.service_name}</h2>
        </div>
        <div className="mr-6 mt-2 sm:mt-6 text-sm sm:text-lg">
          <p className="theme-value mb-2 service_fields">
            <span className="font-semibold theme-label"> Validators : </span>
            <span className="">{ele.validater_list.length}</span>
          </p>
          <p className="theme-value mb-2 service_fields">
            <span className="font-semibold theme-label">Ticket Price: </span>
            <span className="">{ele.ticket_price} Rs</span>
          </p>
          <p className="theme-value mb-2 service_fields">
            <span className="font-semibold theme-label">Validity : </span>
            <span className="">{ele.ticket_validity} Hours</span>
          </p>
          <p className="theme-value mb-2 service_fields">
            <span className="font-semibold theme-label">Address : </span>
            <br />
            <span className="">{ele.service_address}</span>
          </p>
        </div>
      </div>
      <div className="w-full sm:w-[48%]">
        <ServiceTabs
          formData={ele.formData}
          formUrl={ele.service_url}
          formQr={ele.service_qr}
          formId={ele._id}
          service_id={ele._id}
          service_data={{venue : ele.service_address , service_name : ele.service_name , validity : ele.ticket_validity , price : ele.ticket_price}}
        ></ServiceTabs>
      </div>
    </div>
  );
};

export default memo(Services);
