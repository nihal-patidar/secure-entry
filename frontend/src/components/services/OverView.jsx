import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import api from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

const OverViewStrip = ({ service_id }) => {
  const [visitors, setVisitors] = useState({ a: 0, b: 0, c: 0 });
  let token = localStorage.getItem("userData");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/visitor/get-visitors/${service_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log("get-visitor", res.data.visitorList);
        // setVisitors(res.data.visitorList);
        const visitors = res.data.visitorList;

        let a = visitors.length;
        let b = visitors.filter((visitor) => {
          return visitor.validation_status;
        }).length;
        let c = visitors.filter((visitor) => {
          return !visitor.validation_status;
        }).length;

        setVisitors({ a: a, b: b, c: c });
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);
  return (
    <div className="w-full flex flex-col items-center h-28">
      <div className="flex space-x-4 items-center sm:p-2 bg-transparent rounded-lg w-full">
        <div className="flex-1 text-center px-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md cursor-pointer hover:opacity-90">
          <div>All</div>
          <div className="text:lg sm:text-xl font-bold">{visitors.a}</div>
        </div>

        <div className="flex-1 text-center px-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow-md cursor-pointer hover:opacity-90">
          <div>Visited</div>
          <div className="text:lg sm:text-xl font-bold">{visitors.b}</div>
        </div>

        <div className="flex-1 text-center px-2 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-md cursor-pointer hover:opacity-90">
          <div>Not Yet</div>
          <div className="text:lg sm:text-xl font-bold">{visitors.c}</div>
        </div>
      </div>
      <Button
        className="theme-button h-10 w-24 hover:bg-[#D91656] mt-2"
        onClick={() => {
          navigate("/home/visitors", { state: { id: service_id } });
        }}
      >
        Visitors
      </Button>
    </div>
  );
};

export default OverViewStrip;
