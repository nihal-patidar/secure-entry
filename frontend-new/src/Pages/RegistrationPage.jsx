import React, { useContext , useState } from 'react';
import { UserContext } from "../context/UserContext";
import Loading from '../components/small/Loading';
import registration from "../../public/Assets/images/registration.jpg";
import "../index.css"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Input from '../components/small/Input';
import api from '../../axiosConfig.js';
import { Button } from '@material-tailwind/react';
import EmailOtpForm from '../components/small/EmailVerification';
const RegistrationPage = () => {
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
              <img src={registration} alt="image" className='h-full rounded-r-xl' />
          </div>
          <div className="form flex items-center justify-center w-full sm:w-[60%] x1-login-box">
              <Registration/> 
          </div>
      </div>
  );
}

const Registration= ()=>{
    const {register,handleSubmit}= useForm();
    var[email,setEmail]= useState(null);
    var[password,setPassword]=useState(null);
    var[confirmPassword,setConfirmPassword]= useState(null);
    var{userData,setUserData,setShowLoading}= useContext(UserContext);
    var navigate= useNavigate();
    const [enable,setEnable]= useState(false);
    const onSubmitHandler= async (data)=>{
        // console.log("data",data);
        setShowLoading((prev)=>!prev);
        let check= true;
        if(data.password.length < 8){
            setPassword("Enter 8 Chareacter password");
            check=true;
        setShowLoading(false);
        }else{
            setPassword(null);
            check=false;
        }
        if(data.password != data.c_password){
            setConfirmPassword("password is not match");
            check=true;
            setShowLoading(false);
        }else{
            check=false;
            setConfirmPassword(null);
        }
    if(!check){
       await api.post("/api/register",{
            name:data.name,
            email:data.email,
            password:data.password
        }).then((response)=>{
            //console.log("data",response.data);
            setUserData(response.data);
            navigate("/login");
        }).catch((error)=>{
            setShowLoading(false);
            //console.log("error data",error.response.data);
            toast(error.response.data.msg);
        })
     }
    }
    return(
        <>
        <form onSubmit={handleSubmit(onSubmitHandler)} action="" className="flex flex-col items-center justify-center py-3 px-3 border border-[#FFEB55] w-[85%] sm:w-[20rem] rounded-xl shadow-md gap-3">
            <div className="top text-center">
                <h2 className="text-2xl font-bold">Registration</h2>
                <p>Have an account , please login <Link to="/login" className=" text-blue-500 underline" >login</Link></p>
            </div>
            <div className="buttom flex flex-col items-start mt-3 gap-3">

            <Input label="Full Name" name="name" placeholder="Full Name"
            {...register("name",{required:true})}
            ></Input>

            {/* <Input label="Email" name="email" type="email" placeholder="Email"
            {...register("email",{required:true})}
            ></Input> */}
            <EmailOtpForm register={register} setEnable={setEnable}/>
                
                {enable ?
                   <>
                      <Input label="Password" placeholder="Password
                      "
                      name="password"
                      type="password"
                      error={password}
                      {...register("password",{required:true})}></Input>
      
                      <Input label="Confirm Password" placeholder="Confirm Password"
                      name="c_password"
                      error={confirmPassword}
                      type="password"
                      {...register("c_password",{required:true})}></Input>
                    </>
                
                :null}

                <div className="buttons flex items-center justify-between w-full mt-4 gap-3">
                <Button
                type="reset"
                bgcolor=""
                className="cursor-pointer bg-red-500"
                >Reset</Button>

                {enable ?
                <Button
                type="submit"
                className="cursor-pointer bg-green-500"
                bgcolor=""
                >Submit</Button>
                
                :null}
                </div>
            </div>
            
        </form>
        </>
    )
}


export default RegistrationPage;
