import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/newServices/Card.jsx";
import { ServiceContext } from "../context/ServiceContext.jsx";
import api from "../../axiosConfig.js";
import { toast } from "react-toastify";
import BouncingDotsLoader from "../components/small/BouncingDotsLoader.jsx";

const ServiceList = () => {
    const { services, setServices } = useContext(ServiceContext);

    const [countVisitors, setCountVisitors] = useState({ total: 0, visited: 0, notvisited: 0});

    const token = localStorage.getItem("userData");
    const navigate = useNavigate();

    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(null)

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/service/getServices", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(response.data.services);
        } catch (err) {
            toast.warning(err.response?.data?.msg || "Failed to fetch services");
            seterror(err)
        }
        finally{
            setloading(false)
        }
    };

    const handleAddService = () => {
        // navigate("/home/create-service"); // Navigate to add service page
        navigate("/home/services/addservice")
    };
    // console.log(services);
    return (
        <>
            <div className="flex-1 px-4 pb-12 min-h-[720px] bg-[#F2F3F9] border-2 border-[#EAEAEA] rounded-3xl mt-8 ml-24 lg:ml-16 mr-6">
                {/* Section Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between mt-6 mb-5 px-6 py-3  ">
                    <h1 className="text-[#4B4B4B] text-2xl font-semibold">Services</h1>
                    <button
                        onClick={handleAddService}
                        className="button-primary"
                    >
                        Add Services
                    </button>
                </div>
                <div className="max-h-[70vh] px-2 w-full relative  z-30 ">
                    {loading && (
                    <div className="z-10 absolute left-[50%] top-[80%] flex justify-center items-center h-[300px] ">
                        <BouncingDotsLoader/>
                    </div>
                    )}

                    {!loading && error && (
                    <p className="text-center text-red-500">{error?.message || 'Something went wrong'}</p>
                    )}

                    {!loading && !error && services.length === 0 && (
                    <p className="text-center text-gray-500">No services available.</p>
                    )}


                <section
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh] hide-scrollbar px-2"
                >

                    

                    {!loading && !error && services.length > 0 && 
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
                                setCountVisitors={setCountVisitors}
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


