import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import '../../index.css';

const Validator_Strip = (props) => {
  const {
    validator_name,
    mobile_number,
    service_id,
    validator_image_url,
  } = props.validator;
  const navigate = useNavigate();

  return (
    <div className="flex justify-between py-2 pr-1 items-center w-full my-1 rounded-lg theme-4 text-white font-semibold shadow-md cursor-pointer hover:opacity-90">
      <div className="flex items-center w-[280px] overflow-hidden">
        <img
          class="h-8 w-8 object-cover rounded-full bg-slate-200 mx-2 "
          src={validator_image_url}
          alt="Profile Photo"
          loading="lazy"
        />
        <p class="text-sm font-bold mx-2 ">{validator_name}</p>

        <p class="text-sm font-bold mx-2 ">{mobile_number}</p>
      </div>

      <Button
        type="primary"
        size="small"
        icon={<UserOutlined />}
        style={{
          backgroundColor: "blue",
        }}
        onClick={() => {
          navigate("/home/visitors", { state: { id: service_id } });
        }}
      >
        Visitors
      </Button>
    </div>
  );
};

export default Validator_Strip;
