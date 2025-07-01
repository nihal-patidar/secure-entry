import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../public/Assets/images/QrGuy.jpg";
import { forgotPasswordHandle } from "../../Api/operations/authAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const handleSendOtp = (e) => {
    e.preventDefault();
    setEmailError("");


    if (!email.trim()) {
      setEmailError("Email cannot be empty.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    forgotPasswordHandle({
      email,
      setShowLoading,
      navigate,
    });
    console.log("Sending OTP to:", email);

    navigate("/verify-otp-forgot-password");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          <img
            src={image}
            alt="Illustration for Forgot Password"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center md:text-left">
            Forgot Password?
          </h2>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            We'll send you OTP on your email
          </p>

          <form className="space-y-6" onSubmit={handleSendOtp}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-white text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {showLoading ? "Sending OTP ... " : "Send OTP"}
            </button>
          </form>

          <p className="text-sm font-medium mt-8 text-center text-gray-600">
            Remembered the password?{" "}
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

export default ForgotPassword;

