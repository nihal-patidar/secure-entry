import { createContext, useState } from "react";
import api from "../../axiosConfig";

import { toast } from "react-toastify";
const UserContext= createContext();

const UserContextProvider= (props)=>{
    var [userData,setUserData]= useState(null);
    var [showLoading,setShowLoading]= useState(false);
    var [token,setToken]= useState(null);
    var [image,setImage]= useState(null);
    var [sendImage,setSendImage]= useState(null);
    var [openTab,setOpenTab]= useState(false);

    const sendEmailForVerification= async (email)=>{
       
        await api.post("/api/mail-verification",{
            email:email
        }).then((response)=>{
            //console.log("mail send succefully");
            toast.success("Verification Mail Send Succefully!");
        }).catch((error)=>{
            toast.warning(error.response.data.msg);
        })
    }

    const sendEmailForForgetPassword= async (email)=>{
       
        await api.post("/api/forget-password",{
            email:email
        }).then((response)=>{
            //console.log("mail send succefully");
            toast.success("Reset password mail succefully send");
        }).catch((error)=>{
            toast.warning(error.response.data.msg);
        })
    }

    var contextvalue={
        userData,
        setUserData,
        setShowLoading,
        showLoading,
        setToken,
        token,
        sendEmailForVerification,
        sendEmailForForgetPassword,
        image,
        setImage,
        sendImage,
        setSendImage,
        openTab,
        setOpenTab,
        
    }

    return(<UserContext.Provider value={contextvalue}>
        {props.children}
    </UserContext.Provider>)
}

export {UserContext,UserContextProvider};