import React, { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import Loading from '../components/small/Loading';
import greenImage from "../assets/images/green.jpg";
import "../index.css"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Input from '../components/small/Input';
import { Button } from "@material-tailwind/react";
import api from '../../axiosConfig';
const LoginPage = () => {
    var {userData,showLoading}= useContext(UserContext);
    return (
        <>
        <div className="frame h-screen flex items-center justify-center w-full">
        {(!userData && showLoading) && <Loading/>}
          <FormFrame/>
        </div>
        </>
    );
}

const FormFrame = () => {
  return (
      <div className='flex flex-col justify-center sm:flex-row items-center rounded-md h-[100vh] theme-login-bg w-full'>
          <div className='h-full hidden sm:block'>
              <img src={greenImage} alt="image" className='h-full rounded-r-xl' />
          </div>
          <div className="form flex items-center justify-center w-full sm:w-[60%] x1-login-box">
              <Login/> 
          </div>
      </div>
  );
}

const Login = () => {

  const { register, handleSubmit } = useForm();
  var { setUserData, setShowLoading } = useContext(UserContext);
  var navigate = useNavigate();

  function setSessionItemWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl // Expiry time in milliseconds
    };
    sessionStorage.setItem(key, JSON.stringify(item));
}

  const LonginHandle = async (data) => {
      //console.log("i am logining working");
      setShowLoading((prev) => !prev);
      await api.post("/api/login", {
          email: data.email,
          password: data.password
      }).then((response) => {
          //console.log("data", response.data);
          setUserData(response.data);
          navigate("/home");
          localStorage.setItem("userData", response.data.token);
        // setSessionItemWithExpiry("userData",response.data.token,60*60*1000);
          api.get('/api/profile',{
              headers:{
                  Authorization:`Bearer ${response.data.token}`
              }
          }).then((response)=>{
              setUserData(response.data.userData);
              //console.log("userdata: ",response.data.userData);
              toast.success("User Data Fetched");
          }).catch((err)=>{
              nevigate('/login');
          })
          toast.success("Login Successfully!");
      }).catch((error) => {
          setShowLoading((prev) => !prev);
          //console.log("error data", error.response.data);
          toast.warning(error.response.data.msg);
      })
  }
  return (
      <>
          <form onSubmit={handleSubmit(LonginHandle)} className="flex flex-col items-center justify-center py-3 px-8 border border-[#FFEB55] w-[85%] sm:w-[20rem] rounded-xl shadow-md gap-3">
              <div className="top text-center">
                  <h2 className="text-2xl font-bold" >Login</h2>
                  <p>Don't have account, please <Link to="/register" className=" text-blue-500 underline">register</Link></p>
              </div>
              <div className="buttom flex flex-col items-start mt-3 gap-3 w-full">

                  <Input label="Email" name="email" type="email" placeholder="Email"
                      {...register("email", { required: true })}
                  ></Input>
                  <Input label="Password" placeholder="Password
              "
                      name="password"
                      type="password"
                      {...register("password", { required: true })}>
                  </Input>

                  <div className="buttons flex items-center justify-around w-full mt-4 gap-2">
                      <Button  type="reset" className='bg-red-500'>Reset</Button>
                      
                      <Button className='bg-green-500' type="submit">Submit</Button>
                  </div>
              </div>
              <Link to="/forget-password" className='text-white underline text-sm'>forget password</Link>

          </form>
      </>
  );
}

export default LoginPage;
