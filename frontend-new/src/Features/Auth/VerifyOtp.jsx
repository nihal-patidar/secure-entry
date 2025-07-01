import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";  

const OTP_DIGITS = 6;

const VerifyOTP = ({ imageSrc }) => { 
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGITS).fill(""));

  const refArr = useRef([]);
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }

    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    newValue && refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const navigate = useNavigate();
  const handleVerifyOtp = () => {
    const otp = inputArr.join(''); 
    console.log("Verifying OTP:", otp);

    navigate("/login"); 
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="flex flex-col lg:flex-row items-center gap-14">
        <div className="w-[564px] h-[564px]">
          <img
            src={imageSrc}  
            alt="OTP Illustration"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="bg-white w-[518px] p-[51px] rounded-[9px] shadow-[0px_0px_43.6px_-2px_rgba(0,0,0,0.14)]">
          <h2 className="text-[22px] font-semibold text-black mb-2 font-sans">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-600 mb-8 font-sans">
            Enter the OTP sent to your email
          </p>

          <div className="flex justify-between gap-[19px] mb-8">
            {inputArr.map((input, index) => {
              return (
                <input
                  className="w-12 h-12 text-center text-black text-lg border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  key={index}
                  type="text"
                  maxLength="1"  
                  value={inputArr[index]}
                  ref={(input) => {
                    refArr.current[index] = input;
                  }}
                  onChange={(e) => handleOnChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              );
            })}
          </div>

          <button 
            onClick={handleVerifyOtp}  
            className="w-[398px] h-[43px] bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out font-sans text-white">
            Verify OTP & Proceed
          </button>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7850FA] hover:text-[#5031a3] font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;