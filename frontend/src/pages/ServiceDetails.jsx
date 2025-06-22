import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from "../../axiosConfig.js";


import InfoForm from '../components/services-new/InfoForm';
import Overview from '../components/services-new/Overview';
import { toast } from "react-toastify";
import BouncingDotsLoader from '../components/small/BouncingDotsLoader.jsx';





const ServiceDetails = () => {
    const token = localStorage.getItem("userData");
    const navigate = useNavigate()
    

    const location = useLocation()
    const {visitors}= location.state || {}
    const {serviceId}= useParams()
    const [service, setService] = useState({})
    
    

    //"/getThisService/:id"
    useEffect(() => {
            fetchService();
        }, [serviceId]);
    
        const fetchService = async () => {
            try {
                
                const response = await api.get(`/service/getThisService/${serviceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
               setService(response.data.service_data);
            } catch (err) {
                toast.warning(err.response?.data?.msg || "Failed to fetch service");
            }
        };


        const handleUpdateService = ()=>{
            navigate(`/home/services/${serviceId}/update`)
        }
        
      
    return(
    
    <>
    {Object.keys(service).length >0 ?(
    <div className='flex  h-[720px] ml-16 mr-6 gap-8 mt-8 '>
        <div className="w-[86%] bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]" >
            <div className='flex justify-between align-middle items-center  mb-8 mx-14'>

                <h3 className='text-[#5621FF] text-2xl font-medium '>{service.service_name}</h3>
                <button
                onClick={()=>{handleUpdateService()}}
                className='button-primary '>Update</button>
               
            </div>

            <div className='w-full h-[85%] overflow-y-scroll px-14 flex-col  '>
                <InfoForm serviceId={serviceId} service= {service} />
                <Overview serviceId={serviceId} visitors={visitors}/>
            </div>

        </div>

        <div className="w-[14%]  bg-[#F2F3F9] border border-[#EAEAEA] rounded-3xl ">

        </div>

    </div>
    ):(
        <div className='flex  h-[720px] ml-16 mr-6 gap-8 mt-8  items-center align-middle justify-center bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]'>
        <BouncingDotsLoader/>
        </div>
    )
}
    </>

  )


}








export default ServiceDetails