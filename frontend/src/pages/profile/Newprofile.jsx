import React, { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { Pencil } from 'lucide-react';
import api from '../../../axiosConfig';

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
    const { userData, image: contextImage, setUserData } = useContext(UserContext);
    const [previewImage, setPreviewImage] = useState(null);

    // Merged data for form display
    const mergedData = {
        ...defaultObject,
        ...userData,
        image: previewImage || contextImage || userData?.image || defaultObject.image,
    };

    useEffect(() => {
        setPreviewImage(contextImage || userData?.image || null);
    }, [contextImage, userData?.image]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Show immediate local preview
            setPreviewImage(URL.createObjectURL(file));

            try {
                const token = localStorage.getItem("userData");
                const data = new FormData();

                // Append all required fields
                data.append("name", userData.name || "");
                data.append("email", userData.email || "");
                data.append("designation", userData.designation || "");
                data.append("phone", userData.phone || "");
                data.append("address", userData.address || "");
                data.append("adhaar", userData.adhaar || "");
                data.append("image", file);

                // Submit to backend
                const res = await api.post("/api/update-profile", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Update global context with new image + bust cache
                const updatedUser = {
                    ...res.data.userData,
                    image: res.data.userData.image + `?t=${Date.now()}`
                };
                setUserData(updatedUser);
                setPreviewImage(updatedUser.image);
            } catch (err) {
                console.error(err);
                alert(err?.response?.data?.msg || "Failed to update image.");
            }
        }
    };

    return (
        <div className="container rounded-2xl mx-auto px-6 py-4 mt-4 w-full border border-[#EAEAEA]">
            <div className="bg-white min-h-screen w-full max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#4B4B4B]">My Profile</h1>

                {/* Profile Top Section */}
                <div className="bg-white rounded-xl border border-[#DADADA] shadow p-6 flex items-center gap-4 mb-6">
                    <div className="relative w-24 h-24 group">
                        {/* Profile Image */}
                        <img
                            src={mergedData.image}
                            alt={mergedData.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-200 shadow-md"
                        />

                        {/* Pencil button triggers hidden input */}
                        <label
                            htmlFor="imageUpload"
                            className="absolute bottom-0 right-0 bg-purple-500 p-1 rounded-full text-white shadow-lg hover:bg-purple-600 cursor-pointer transition duration-200"
                            title="Change profile picture"
                        >
                            <Pencil className="w-5 h-5" />
                        </label>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="imageUpload"
                            name="image"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-black">{mergedData.name}</h2>
                        <p className="text-gray-500">{mergedData.email}</p>
                    </div>
                </div>

                {/* Outlet for child components like Profileedit */}
                <div className="bg-white border border-[#DADADA] rounded-xl w-full shadow p-8 min-h-[400px]">
                    <Outlet context={{ object: mergedData }} />
                </div>
            </div>
        </div>
    );
}
