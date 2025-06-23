import React, { useState, useEffect, useContext, useMemo, memo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from "../../axiosConfig.js";


import InfoForm from '../components/services-new/InfoForm';
import Overview from '../components/services-new/Overview';
import { toast } from "react-toastify";
import BouncingDotsLoader from '../components/small/BouncingDotsLoader.jsx';
import { ServiceContext } from '../context/ServiceContext.jsx';






const ServiceDetails = () => {
     const token = useMemo(() => localStorage.getItem("userData"), []);
    const navigate = useNavigate()
    

    const location = useLocation()
    const {visitors}= location.state || {}
    const {serviceId}= useParams()

    const {service, setService} = useContext(ServiceContext)
    
    const [error, seterror] = useState(null)
    

    //"/getThisService/:id"
    useEffect(() => {
        if(!service || (service && Object.keys(service).length === 0) || !(serviceId in service))
            fetchService();
        }, [service]);
    
        const fetchService = async () => {
            try {
                
                const response = await api.get(`/service/getThisService/${serviceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                ((Object.keys(response.data.service_data)).length>0)?
               setService((prev)=>({...prev, [serviceId]:response.data.service_data})):setService((prev)=>({...prev, [serviceId]:-1})) 
               

            
               console.log("Service details fetched")
            } catch (err) {
                toast.warning(<CustomToast message={err.response?.data?.msg || "Failed to fetch service"} />);
                seterror(err)
            }
        };


        const handleUpdateService = ()=>{
            navigate(`/home/services/${serviceId}/update`)
        }
        
      
    return(
    
    <>
    
    {service && service[serviceId] && Object.keys(service[serviceId]).length >0 && !error && !(service[serviceId]== -1) &&(
    <div className='flex absolute right-7 left-12 h-[90%] ml-16  gap-8 mt-8 '>
        <div className="w-full bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]" >
            <div className='flex justify-between align-middle items-center  mb-8 lg:mx-14 mx-7'>

                <h3 className='text-[#5621FF] text-xl md:text-2xl font-medium '>{service[serviceId].service_name}</h3>
                <button
                onClick={()=>{handleUpdateService()}}
                className='button-primary scale-90 md:scale-100'>Update</button>
               
            </div>

            <div className='w-full h-[85%] overflow-y-scroll lg:px-14 px-3 flex-col  '>
                <InfoForm serviceId={serviceId} service= {service[serviceId]} />
                <Overview serviceId={serviceId} visitors={visitors}/>
            </div>

        </div>

        {/* <div className="w-[14%]  bg-[#F2F3F9] border border-[#EAEAEA] rounded-3xl ">

        </div> */}

    </div>
    )}
    
    {((!service || (service && Object.keys(service).length === 0) || !(serviceId in service))) && (
        <div className='flex align-middle justify-center absolute right-7 left-12  h-[90%] ml-16 mt-8 bg-[#F2F3F9]  rounded-3xl border border-[#EAEAEA]'>
        <div className="z-10 absolute left-[50%] top-[50%] flex justify-center items-center ">
                        <BouncingDotsLoader/>
        </div>
        </div>
    )}

    {
      service && service[serviceId] && error && (
            <div className='flex align-middle justify-center absolute right-7 left-12  h-[90%] ml-16 mt-8 bg-[#F2F3F9]  rounded-3xl border border-[#EAEAEA]'>
                <p className="text-center text-red-500 text-3xl">{error?.message || 'Something went wrong'}</p>
            </div>
        )
    }

    {
        service && service[serviceId] && !error && (service[serviceId]== -1) &&  (
            <div className='flex align-middle justify-center absolute right-7 left-12  h-[90%] ml-16 mt-8 bg-[#F2F3F9]  rounded-3xl border border-[#EAEAEA]'>
                <p className="text-center text-gray-500 text-3xl">No service details available.</p>
            </div>
        )
    }

    </>

  )


}








export default memo(ServiceDetails)