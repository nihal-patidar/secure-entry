import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card.jsx";
import { ServiceContext } from "../../context/ServiceContext";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";

const Services = () => {
    const { services, setServices } = useContext(ServiceContext);
    const token = localStorage.getItem("userData");
    const navigate = useNavigate();

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
        }
    };

    const handleAddService = () => {
        navigate("/home/create-service"); // Navigate to add service page
    };
    console.log(services);
    return (
        <>
            <div className="flex-1 px-4 bg-[#F2F3F9] border-2 border-[#EAEAEA] h-[100%] rounded-3xl mt-8 ml-16 lg:ml-14 mr-6">
                {/* Section Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between mt-6 mb-5 px-6 py-3 rounded-xl shadow-sm">
                    <h1 className="text-[#4B4B4B] text-2xl font-semibold">Services</h1>
                    <button
                        onClick={handleAddService}
                        className="bg-[#2C3ED3] text-white text-base font-semibold rounded-3xl py-2 px-5 hover:bg-[#1f2fb8] transition duration-200"
                    >
                        Add Services
                    </button>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <Card
                                image = {service.service_image_url}
                                key={service._id }
                                eventName={service.service_name}
                                location={service.service_address}
                                time={service.time}
                                date={service.date}
                                price={service.ticket_price}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center text-xl py-20">
                            No services available.
                        </p>
                    )}
                </section>
            </div>
        </>
    );
};

export default Services;


