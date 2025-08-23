import { useNavigate, useOutletContext } from "react-router-dom";
import React from "react";

export default function Profileview() {
    const navigate = useNavigate();
    const { object } = useOutletContext(); // Get profile data from parent

    const { name, email, designation, phone, address, adhaar } = object;

    return (
        <>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-700">Profile Info</span>
                    <button
                        onClick={() => navigate('edit')}
                        className="flex items-center gap-2 px-4 py-2 border-2 text-sm  font-medium rounded-md transition-all duration-300 hover:bg-indigo-700-500 hover: hover:shadow-md group"
                    >
                        Edit
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-12 text-gray-700 space-y-6">
                    <div><p className="font-medium">Full Name</p><p>{name}</p></div>
                    <div><p className="font-medium">Designation</p><p>{designation}</p></div>
                    <div><p className="font-medium">Email</p><p>{email}</p></div>
                    <div><p className="font-medium">Phone Number</p><p>{phone}</p></div>
                    <div><p className="font-medium">Address</p><p>{address}</p></div>
                    <div><p className="font-medium">Adhaar No.</p><p>{adhaar}</p></div>
                </div>

        </>
    );
}
