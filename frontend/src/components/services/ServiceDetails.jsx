import React, { useContext } from "react";
import Input from "../small/Input";
import SelectInput from "../small/SelectInput";
const ServiceDetails = ({ register, setServiceImage }) => {
  let options = [
    { option: "3 hours", value: 3 },
    { option: "12 hours", value: 12 },
    { option: "1 Days", value: 24 },
    { option: "7 Days", value: 24 * 7 },
    { option: "15 Days", value: 24 * 15 },
    { option: "31 Days", value: 24 * 31 },
  ];

  const serviceTypeOptions = [
    { option: "Ticket", value: "Ticket" },
    { option: "Badge", value: "Badge" },
    { option: "Pass", value: "Pass" },
  ];

  const previewImage = (e) => {
    let value = e.target.files[0];
    setServiceImage(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full justify-center items-center">
        <Input
          label="Service Image"
          name="image"
          type="file"
          preview={previewImage}
          {...register("image", { required: true })}
        ></Input>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          label="Service Name"
          type="text"
          placeholder="Service Name"
          {...register("service_name", { required: true })}
        ></Input>

        

        <Input
          label="Service Address"
          type="text"
          placeholder="Service Address"
          {...register("service_address", { required: true })}
        ></Input>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          label="Ticket Price"
          type="number"
          min="0"
          placeholder="Ticket Price"
          name="Ticket Price"
          {...register("ticket_price", { required: true })}
        ></Input>
        <Input
          label="Valid Scans"
          type="number"
          min="1"
          placeholder="Valid Scans"
          name="Valid Scans"
          {...register("valid_scans", { required: true })}
        ></Input>
        {/* <SelectInput
          options={options}
          label="Ticket Validaty"
          {...register("ticket_validity", { require: true })}
        /> */}

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            // className="border p-2 rounded-md"
            className="mt-1 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
            {...register("service_type", { require: true })}
          >
            {/* <option value="" disabled>
                      -- Select an option --
                    </option> */}
            {serviceTypeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Ticket Validaty
          </label>
          <select
            // className="border p-2 rounded-md"
            className="mt-1 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
            {...register("ticket_validity", { require: true })}
          >
            {/* <option value="" disabled>
                      -- Select an option --
                    </option> */}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <div className="w-full">
        <label className="inline-block mb-1 pl-1" htmlFor="dis">
          Discription
        </label>
        <textarea
          placeholder="Service Discription"
          {...register("service_discription", { required: true })}
          className={`px-3 py-2 rounded-lg text-black bg-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full focus:ring-2 ring-blue-400 dis h-[10rem]`}
        />
      </div> */}
    </div>
  );
};

export default ServiceDetails;
