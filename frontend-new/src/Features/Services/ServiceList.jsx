import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import  Card  from "./Card.jsx";
import { ServiceContext } from "../../context/ServiceContext.jsx";
import api from "../../../axiosConfig.js";
import { toast } from "react-toastify";
import BouncingDotsLoader from "../../components/small/BouncingDotsLoader.jsx";


const ServiceList = () => {
    const { services, setServices  } = useContext(ServiceContext);

    

    const [countVisitors, setCountVisitors] = useState({ total: 0, visited: 0, notvisited: 0});
    const setCountVisitorsHandler = useCallback(
  (data) => setCountVisitors(data),
  []
);


    const token = useMemo(() => localStorage.getItem("userData"), []);
    const navigate = useNavigate();

    

   
    
    const [error, seterror] = useState(null)
    


    

    useEffect(() => {
        if (!services.length) {
        fetchServices();
        }
        if (services && services.length === 0) {
        fetchServices();
        }
    }, [services,token]);

    const fetchServices = async () => {
        try {
            const response = await api.get("/service/getServices", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.data.services.length >0 )
            setServices(response.data.services ) 
        else {setServices([-1])
            toast.warning("No Services Available");
        }
            
            
            console.log("Services fetched")
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to fetch services");
            seterror(err)
        }
        
    };

    const handleAddService = () => {
        // navigate("/home/create-service"); // Navigate to add service page
        navigate("/home/services/addservice")
    };
    // console.log(services);
    return (
        <>
        
            <div className="flex-1 absolute right-7 left-12 px-4 pb-12 h-[90%] bg-[#F2F3F9] border border-[#EAEAEA] rounded-3xl mt-8 ml-16 lg:ml-16 ">
                {/* Section Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between mt-6 mb-5 px-2 sm:px-6 py-3  ">
                    <h1 className="text-[#4B4B4B]  text-xl md:text-2xl font-medium ">Services</h1>
                    <button
                        onClick={handleAddService}
                        className="button-primary scale-75 md:scale-100"
                    >
                        Add Services
                    </button>
                </div>
                <div className="max-h-[90%] px-2 w-full relative  z-30 ">
                    {(!services || ((services && services.length === 0))) && (
                    <div className="z-10 absolute left-[50%] top-[80%] flex justify-center items-center h-[300px] ">
                        <BouncingDotsLoader/>
                    </div>
                    )}

                    {services && error && (
                    <p className="text-center text-red-500 text-3xl">{error?.message || 'Something went wrong'}</p>
                    )}

                    {services && !error && (services[0] == -1) && (
                    <p className="text-center text-gray-500 text-3xl">No services available.</p>
                    )}


                <section
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-auto max-h-[65vh] hide-scrollbar px-2"
                >

                    

                    {services && !error && services.length > 0 && !(services[0] == -1) &&
                        services.map((service) =>
                             
                            (
                                
                            <Card
                                image = {service.service_image_url}
                                id={service._id }
                                key={service._id }
                                eventName={service.service_name}
                                location={service.service_address}
                                time={service.time}
                                date={service.date}
                                price={service.ticket_price}
                                countVisitors={countVisitors}
                                setCountVisitors={setCountVisitorsHandler}
                            />

                        )
                    
                    )
                     }
                </section>
                </div>
            </div>
        </>
    );
};

export default ServiceList;


