"use client"; // This is important for client-side behavior in App Router

import React, { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext<any>(UserContext);
  const { setUserData, setServiceId } = context;
  const router = useRouter(); // Correct hook for App Router

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", data);
      if (!response.data.success) return;
      console.log("response", response.data);
      setUserData(response.data.user);
      sessionStorage.setItem("authToken", response.data.token);
      setServiceId(response.data.user.service_id);
      router.push("/home"); // Navigate to dashboard after login
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit(handleLogin)}
    //     className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    //   >
    //     <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

    //     <div className="mb-4">
    //       <label
    //         htmlFor="email"
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
    //           errors.email ? "border-red-500" : ""
    //         }`}
    //         {...register("email", { required: "Email is required" })}
    //         placeholder="Enter your email"
    //       />
    //       {errors.email && (
    //         <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
    //       )}
    //     </div>

    //     <div className="mb-4">
    //       <label
    //         htmlFor="password"
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
    //           errors.password ? "border-red-500" : ""
    //         }`}
    //         {...register("password", { required: "Password is required" })}
    //         placeholder="Enter your password"
    //       />
    //       {errors.password && (
    //         <p className="text-red-500 text-sm mt-1">
    //           {errors.password.message}
    //         </p>
    //       )}
    //     </div>

    //     <button
    //       type="submit"
    //       disabled={loading}
    //       className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    //     >
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
    //     <div className="mt-4 text-center">
    //       <a href="/forgot-password" className="text-blue-500 hover:underline">
    //         Forgot Password?
    //       </a>
    //     </div>
    //   </form>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Secure Entry
          </CardTitle>
          <p className="text-slate-600">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  className={`pl-10 border-slate-200 bg-white/50 backdrop-blur-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`pl-10 pr-10 border-slate-200 bg-white/50 backdrop-blur-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg py-6 text-lg font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
