import React from "react";
import PasswordField from "./PasswordView";

const Validator = (props) => {
  const {
    validator_name,
    validator_email,
    mobile_number,
    validator_address,
    aadhar_number,
    gender,
    position,
    salary,
    time_shift,
    service_id,
    password,
    work_time,
    validator_image_url,
  } = props.validator;

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[95%] service-card-theme shadow-lg rounded-lg overflow-hidden justify-between p-4 my-1 gap-2">
      {/* Profile Section */}
      <div className="flex w-full lg:w-1/2 justify-around gap-6">
        <div className="flex flex-col items-center w-full lg:w-1/2">
          <div className="relative w-36 h-36 mx-auto overflow-hidden rounded-full border-4 border-teal-500 shadow-lg hover:shadow-teal-500/50 hover:scale-110 transition-transform duration-300 ease-in-out">
            <img
              src={validator_image_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mt-3 theme-label text-center text-wrap">
            
          </h2>
        </div>
        <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <p className="theme-value">
            <span className="font-semibold theme-label">Name:</span>
            <br />
            <span>{validator_name}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Email:</span>
            <br />
            <span>{validator_email}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Password:</span>
            <br />
            <PasswordField value={password} />
          </p>
        </div>
      </div>
      {/* Details Section */}
      <div className="flex w-full lg:w-1/2 justify-around gap-6">
        <div className="flex flex-row justify-evenly items-center sm:flex-col w-full space-y-2">
          <p className="theme-value">
            <span className="font-semibold theme-label">Address:</span>
            <br />
            <span>{validator_address}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Aadhar No:</span>
            <br />
            <span>{aadhar_number}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Mobile No:</span>
            <br />
            <span>{mobile_number}</span>
          </p>
          
        </div>

        {/* Column 3 */}
        {/* <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <p className="theme-value">
            <span className="font-semibold theme-label">Time Shift:</span>
            <br />
            <span>{time_shift}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Position:</span>
            <br />
            <span>{position}</span>
          </p>
          <p className="theme-value">
            <span className="font-semibold theme-label">Work Time:</span>
            <br />
            <span>{work_time}</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Validator;
