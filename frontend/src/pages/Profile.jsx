// import Input from "../components/small/Input";
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { UserContext } from "../context/UserContext";
// import api from "../../axiosConfig";
// const Profile = () => {
//   const { register, handleSubmit } = useForm();
//   var { setShowLoading, userData, image, setImage, setUserData } =
//     useContext(UserContext);
//   var [sendImage, setSendImage] = useState(null);
//   var [editable, setEditable] = useState(false);
//   var [username, setUsername] = useState(userData?.name);
//   var [email, setEmail] = useState(userData?.email);
//
//   useEffect(() => {
//     setSendImage(userData.image);
//   }, []);
//
//   const onSubmitHandler = async (data) => {
//     setShowLoading((prev) => !prev);
//     let token = localStorage.getItem("userData");
//     //console.log(token);
//     await api
//       .post(
//         "/api/update-profile",
//         {
//           name: username,
//           email: email,
//           image: sendImage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       )
//       .then((response) => {
//         setShowLoading(false);
//         //console.log("data", response.data);
//         setUserData(response.data.userData);
//         setEditable(false);
//         toast.success("Profile updated successfully!");
//       })
//       .catch((error) => {
//         setShowLoading(false);
//         //console.log("error data", error.response.data);
//         toast(error.response.data.msg);
//       });
//   };
//
//   const previewImage = (e) => {
//     let value = e.target.files[0];
//     setImage(URL.createObjectURL(value));
//     setSendImage(value);
//   };
//
//   const makeEditable = () => {
//     setEditable(true);
//   };
//
//   const updateName = (e) => {
//     setUsername(e.target.value);
//   };
//
//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };
//
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmitHandler)}
//         action=""
//         className="flex flex-col mx-auto items-center justify-center border h-[450px] w-[400px] px-5 rounded-md theme-form-bg shadow-md"
//       >
//         <div className="top text-center">
//           <h2 className="text-xl font-bold mb-2">Profile</h2>
//           {!sendImage ? (
//             <img
//               src={userData.image}
//               alt="Profile"
//               loading="eager"
//               className="w-[120px] h-[120px] rounded-full object-cover opacity-85 mb-2 border-2 border-gray-500"
//             />
//           ) : (
//             <img
//               src={image}
//               alt="Profile Preview"
//               className="w-[120px] h-[120px] rounded-full object-cover mb-2 border-2 border-gray-500"
//             />
//           )}
//
//         </div>
//         <div className="bottom flex flex-col items-start h-1/2 justify-between mt-3 w-full">
//           <Input
//             name="image"
//             type="file"
//             preview={previewImage}
//             className=""
//             {...register("image")}
//           ></Input>
//
//           <Input
//             label="Name"
//             placeholder="Name"
//             name="name"
//             type="text"
//             updateName={updateName}
//             value={username}
//             className=" border-gray-500 w-full mb-4 p-2 rounded-md focus:outline-none focus:border-blue-500"
//             {...register("name", { required: true })}
//           ></Input>
//
//           <Input
//             label="Email"
//             placeholder="Email"
//             name="email"
//             type="email"
//             updateEmail={updateEmail}
//             value={email}
//             className="theme-input border-gray-500 w-full mb-4 p-2 rounded-md focus:outline-none focus:border-blue-500"
//             {...register("email", { required: true })}
//           ></Input>
//
//           <div className="w-20">
//             <button
//               type="submit"
//               className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };
//
// export default Profile;


// NEW CODE STARTS FROM HERE ABOVE COMMENTED CODE IS OLD ONE


import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext'; // adjust path as needed
import api from "../../axiosConfig"; // adjust path as needed

const defaultObject = {
  name: null,
  email: null,
  designation: null,
  phone: null,
  address: null,
  adhaar: null,
  image: null,
};

const ProfileCard = () => {
  const { userData, image, setUserData } = useContext(UserContext);

  const mergedData = {
    ...defaultObject,
    ...userData,
    image: image || userData?.image || defaultObject.image,
  };

  return (
      <div className="container rounded-2xl mx-auto px-6 py-4 mt-4 border border-[#EAEAEA]">
        <div className="bg-white min-h-screen w-full max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-[#4B4B4B]">My Profile</h1>

          {/* Profile Top Section */}
          <div className="bg-white rounded-xl border border-[#DADADA] shadow p-6 flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                  src={mergedData.image}
                  alt={mergedData.name}
                  className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{mergedData.name}</h2>
              <p className="text-gray-500">{mergedData.email}</p>
            </div>
          </div>

          {/* Routed Section */}
          <div className="bg-white border border-[#DADADA] rounded-xl shadow p-8 min-h-[400px] w-full">
            <Routes>
              <Route path="/" element={<Profileview object={mergedData} />} />
              <Route path="/edit" element={<Profileedit object={mergedData} setUserData={setUserData} />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};

const Profileview = ({ object }) => {
  const navigate = useNavigate();
  const { name, email, designation, phone, address, adhaar } = object;

  return (
      <>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">Profile Info</span>
          <button
              onClick={() => navigate('/edit')}
              className="flex items-center gap-2 px-4 py-2 border-2 text-sm border-violet-500 text-violet-600 font-medium rounded-md transition-all duration-300 hover:bg-violet-500 hover:text-white hover:shadow-md group"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-12 text-gray-700 space-y-6">
          <div><p className="font-medium">Full Name</p><p>{name || '—'}</p></div>
          <div><p className="font-medium">Designation</p><p>{designation || '—'}</p></div>
          <div><p className="font-medium">Email</p><p>{email || '—'}</p></div>
          <div><p className="font-medium">Phone Number</p><p>{phone || '—'}</p></div>
          <div><p className="font-medium">Address</p><p>{address || '—'}</p></div>
          <div><p className="font-medium">Adhaar No.</p><p>{adhaar || '—'}</p></div>
        </div>
      </>
  );
};

const Profileedit = ({ object, setUserData }) => {
  const [formData, setFormData] = useState({ ...object });
  const [sendImage, setSendImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setSendImage(object.image);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSendImage(file);
    }
  };

  const handleReset = () => {
    setFormData({ ...object });
    setSendImage(object.image);
  };

  const onSubmitHandler = async () => {
    const token = localStorage.getItem("userData");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (sendImage && sendImage instanceof File) {
      data.append("image", sendImage);
    }

    try {
      const res = await api.post("/api/update-profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUserData(res.data.userData);
      alert("Profile updated successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
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
                      value={formData[field] || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-violet-200"
                  />
                </div>
            ))}

            <div>
              <label className="font-medium block mb-1">Profile Image</label>
              <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
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
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </form>
  );
};

export default function Profile() {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<ProfileCard />} />
        </Routes>
      </Router>
  );
}

