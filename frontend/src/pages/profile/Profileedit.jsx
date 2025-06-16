import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../../axiosConfig.js";
import { UserContext } from "../../context/UserContext";

export default function Profileedit() {
    const { object } = useOutletContext(); // profile data from ProfileCard
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
        const token = localStorage.getItem("userData");

        const data = {
            name: formData.name,
            email: formData.email,
            designation: formData.designation || "",
            phone: formData.phone || "",
            address: formData.address || "",
            adhaar: formData.adhaar || "",
        };

        try {
            const res = await api.post("/api/update-profile", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setUserData(res.data.userData);
            alert("Profile updated successfully!");
            navigate("/home/profile");
        } catch (err) {
            console.error("Profile update error:", err);
            alert(err?.response?.data?.msg || "Something went wrong.");
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
                                required={field === "name" || field === "email"} // validation for name & email
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
