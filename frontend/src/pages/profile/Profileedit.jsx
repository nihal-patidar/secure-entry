import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../../axiosConfig.js";
import { UserContext } from "../../context/UserContext";
import {toast} from "react-toastify";

export default function Profileedit() {
    const { object } = useOutletContext();
    const { setUserData } = useContext(UserContext);
    const [formData, setFormData] = useState({ ...object });
    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData({ ...object });
    };

    const onSubmitHandler = async () => {
        // setShowLoading(true); // Optional: if you have a loader

        const token = localStorage.getItem("userData");
        const formDataToSend = new FormData();

        if (formData.name) formDataToSend.append("name", formData.name);
        if (formData.email) formDataToSend.append("email", formData.email);

        const optionalFields = ["designation", "phone", "address", "adhaar"];
        optionalFields.forEach((key) => {
            if (formData[key] && formData[key] !== object[key]) {
                formDataToSend.append(key, formData[key]);
            }
        });

        // Log for debugging
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        console.info(token);
        try {
            const response = await api.post("/api/update-profile", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserData(response.data.userData);

            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast(error?.response?.data?.msg || "Profile update failed.");
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <span className="text-lg font-semibold text-gray-700 mb-6 block">Edit Profile</span>

            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-gray-700">
                    {["name", "designation", "email", "phone", "address", "adhaar"].map((field) => (
                        <div key={field}>
                            <label className="font-medium block mb-1 capitalize">
                                {field.replace("_", " ")}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field] || ""}
                                onChange={handleChange}
                                required={field === "name" || field === "email"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-200"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 transition"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold bg-purple-500 text-white rounded-md hover:bg-violet-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
