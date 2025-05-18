import React, { useState, useEffect } from "react";
import api from "../../../axiosConfig";
import { Button } from "@material-tailwind/react";
import { CheckCircle } from "lucide-react";

const EmailOtpForm = ({ register , setEnable }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableSendOtp, setDisableSendOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let timer;
    if (disableSendOtp && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setDisableSendOtp(false); // Enable button again
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [disableSendOtp, countdown]);

  useEffect(()=>{
    setEnable(false);
  },[])

  // Send OTP function
  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/otp/send", { email });
      setMessage(response.data.message);
      setOtpSent(true);
      setDisableSendOtp(true);
      setCountdown(120); // Set 10-second countdown
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to send OTP");
    }
    setLoading(false);
  };

  // Verify OTP function
  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/otp/verify", { email, otp });
      setMessage(response.data.message);
      setVerified(true); // Mark as verified
      setDisableSendOtp(false);
      setOtpSent(false);
      setEnable(true);
    } catch (error) {
      setMessage(error.response?.data?.error || "OTP verification failed");
    }
    setLoading(false);
  };

  return (
    <div className="">
      {!verified && <>


      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="flex w-full gap-2 items-center">
          {!otpSent ? (
            <input
              {...register?.("email", { required: true })} // Ensure register is used correctly
              type="email"
              value={email}
              placeholder="Enter Email"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
              onChange={(e) => setEmail(e.target.value)}
              disabled={disableSendOtp}
            />
          ) : (
            <input
              type="number"
              value={otp}
              placeholder="Enter OTP"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
              onChange={(e) => setOtp(e.target.value)}
              disabled={verified}
            />
          )}

          {!otpSent ? (
            <Button
              size="sm"
              disabled={disableSendOtp}
              className={`px-3 py-3 text-xs w-32 ${
                disableSendOtp ? "bg-gray-400" : "bg-green-500"
              }`}
              onClick={sendOtp}
            >
              {disableSendOtp ? "Resend OTP" : "Send OTP"}
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                className="px-3 py-3 bg-green-500 text-xs"
                onClick={verifyOtp}
                disabled={loading}
              >
                Verify
              </Button>
            </>
          )}
        </div>
      </div>
      

      <div className="flex items-center text-nowrap text-sm text-gray-600 mt-2">
      {message && <p className="">{message }</p>}
      {disableSendOtp && countdown > 0 && (
        <p className="text-red-400">
          | resend in {countdown}s
        </p>
      )}
      </div>
      </>

      }


      {verified && (
        <div className="flex w-full gap-2 items-center">
          <input
            type="email"
            value={email}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-100 focus:bg-white"
            disabled={true}
          />
          <CheckCircle className="h-7 w-7 text-green-500" />
        </div>
      )}
    </div>
  );
};

export default EmailOtpForm;
