import React from "react";
import image from "../../assets/images/QrGuy.jpg";  
import googlesvg from "../../assets/images/google-color.svg";  
import { Link } from "react-router-dom"; 

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="flex flex-col md:flex-row  rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          <img
            src={image}
            alt="QR Code Illustration"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center md:text-left">
            Sign in to your account
          </h2>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="mt-1 block text-black w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password" 
                  className="text-sm text-[#7850FA] hover:text-[#5031a3] font-medium"
                >
                  forgot password ?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <img src={googlesvg} alt="Google Icon" className="mr-2 h-5 w-5" /> 
            Sign in with Google
          </button>

          <p className="text-sm font-medium mt-8 text-center text-gray-600">
            New to Secure Entry ?{" "}
            <Link
              to="/create-account" 
              className="text-[#7850FA] hover:text-[#5031a3] font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;