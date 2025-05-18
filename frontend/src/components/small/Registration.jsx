import Input from "./Input";
// import Button from "./Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {useForm} from "react-hook-form"
import axios from "axios";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../context/DataState";
const Registration= ()=>{
    const {register,handleSubmit}= useForm();
    const {closePopup} = useState(dataContext);
    var[email,setEmail]= useState(null);
    var[password,setPassword]=useState(null);
    var[confirmPassword,setConfirmPassword]= useState(null);
    var{userData,setUserData,setShowLoading}= useContext(UserContext);
    var navigate= useNavigate();
    const onSubmitHandler= async (data)=>{
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
        <form onSubmit={handleSubmit(onSubmitHandler)} action="" className="flex flex-col items-center justify-center border p-3 rounded-md shadow-md gap-3">
            <div className="top text-center">
                <h2 className="text-2xl font-bold">Registration</h2>
                <p>If you have account please login <Link to="/login" className=" text-blue-500" onClick={()=>{closePopup("registration")}}>Login</Link></p>
            </div>
            <div className="buttom flex flex-col items-start mt-3 gap-3">

            <Input label="Full Name" name="name" placeholder="Full Name"
            {...register("name",{required:true})}
            ></Input>

            <Input label="Email" name="email" type="email" placeholder="Email"
            {...register("email",{required:true})}
            ></Input>
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

                <div className="buttons flex items-center justify-between w-full mt-4 gap-3">
                <Input
                type="reset"
                bgcolor="bg-red-500"
                className="cursor-pointer"
                value="Reset"
                ></Input>

                <Input
                type="submit"
                className="cursor-pointer"
                bgcolor="bg-green-500"
                value="Submit"
                ></Input>
                </div>
            </div>
            
        </form>
        </>
    )
}

export default Registration;