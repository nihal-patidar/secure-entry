import Input from "../components/small/Input";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import api from "../../axiosConfig";
const Profile = () => {
  const { register, handleSubmit } = useForm();
  var { setShowLoading, userData, image, setImage, setUserData } =
    useContext(UserContext);
  var [sendImage, setSendImage] = useState(null);
  var [editable, setEditable] = useState(false);
  var [username, setUsername] = useState(userData?.name);
  var [email, setEmail] = useState(userData?.email);

  useEffect(() => {
    setSendImage(userData.image);
  }, []);

  const onSubmitHandler = async (data) => {
    setShowLoading((prev) => !prev);
    let token = localStorage.getItem("userData");
    //console.log(token);
    await api
      .post(
        "/api/update-profile",
        {
          name: username,
          email: email,
          image: sendImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setShowLoading(false);
        //console.log("data", response.data);
        setUserData(response.data.userData);
        setEditable(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        setShowLoading(false);
        //console.log("error data", error.response.data);
        toast(error.response.data.msg);
      });
  };

  const previewImage = (e) => {
    let value = e.target.files[0];
    setImage(URL.createObjectURL(value));
    setSendImage(value);
  };

  const makeEditable = () => {
    setEditable(true);
  };

  const updateName = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        action=""
        className="flex flex-col mx-auto items-center justify-center border h-[450px] w-[400px] px-5 rounded-md theme-form-bg shadow-md"
      >
        <div className="top text-center">
          <h2 className="text-xl font-bold mb-2">Profile</h2>
          {!sendImage ? (
            <img
              src={userData.image}
              alt="Profile"
              loading="eager"
              className="w-[120px] h-[120px] rounded-full object-cover opacity-85 mb-2 border-2 border-gray-500"
            />
          ) : (
            <img
              src={image}
              alt="Profile Preview"
              className="w-[120px] h-[120px] rounded-full object-cover mb-2 border-2 border-gray-500"
            />
          )}

        </div>
        <div className="bottom flex flex-col items-start h-1/2 justify-between mt-3 w-full">
          <Input
            name="image"
            type="file"
            preview={previewImage}
            className=""
            {...register("image")}
          ></Input>

          <Input
            label="Name"
            placeholder="Name"
            name="name"
            type="text"
            updateName={updateName}
            value={username}
            className=" border-gray-500 w-full mb-4 p-2 rounded-md focus:outline-none focus:border-blue-500"
            {...register("name", { required: true })}
          ></Input>

          <Input
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            updateEmail={updateEmail}
            value={email}
            className="theme-input border-gray-500 w-full mb-4 p-2 rounded-md focus:outline-none focus:border-blue-500"
            {...register("email", { required: true })}
          ></Input>

          <div className="w-20">
            <button
              type="submit"
              className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
