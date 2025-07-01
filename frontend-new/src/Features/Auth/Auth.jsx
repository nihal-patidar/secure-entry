import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../axiosConfig';
const Auth = (props) => {
    let nevigate= useNavigate();
    let {setToken,userData,setUserData}= useContext(UserContext);
    let tokenold;
    useEffect(()=>{
        if(userData == null){
        tokenold= localStorage.getItem("userData");
        if(tokenold == undefined){
            nevigate("/login");
            toast.warning("Please Login!");
            return;
        }
        setToken(tokenold);
       api.get('/api/profile',{
            headers:{
                Authorization:`Bearer ${tokenold}`
            }
        }).then((response)=>{
            setUserData(response.data.userData);
            //console.log("userdata: ",response.data.userData);
            toast.success("User Data Fetched");
        }).catch((err)=>{
            nevigate('/login');
        })
        }
    },[])
    return (
        <>
        {props.children}
        </>
    );
}

export default Auth;
