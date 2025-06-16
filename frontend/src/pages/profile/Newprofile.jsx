import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const defaultObject = {
    name: null,
    email: null,
    designation: null,
    phone: null,
    address: null,
    adhaar: null,
    image: null,
};

export default function ProfileCard() {
    const { userData, image } = useContext(UserContext);

    const mergedData = {
        ...defaultObject,
        ...userData,
        image: image || userData?.image || defaultObject.image,
    };

    return (
        <div className="container rounded-2xl mx-auto px-6 py-4 mt-4 w-full border border-[#EAEAEA]">
            <div className="bg-white min-h-screen w-full max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#4B4B4B]">My Profile</h1>

                {/* Profile Top Section */}
                <div className="bg-white rounded-xl border border-[#DADADA] shadow p-6 flex items-center gap-4 mb-6">
                    <div className="relative hover:border-2 rounded-full border-blue-100">
                        <img
                            src={mergedData.image}
                            alt={mergedData.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-black">{mergedData.name}</h2>
                        <p className="text-gray-500">{mergedData.email}</p>
                    </div>
                </div>

                {/* Routed children from App.jsx */}
                <div className="bg-white border border-[#DADADA] rounded-xl w-full shadow p-8 min-h-[400px] w-full">
                    <Outlet context={{ object: mergedData }} />
                </div>
            </div>
        </div>
    );
}
