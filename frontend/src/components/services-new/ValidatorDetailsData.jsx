import React, { useEffect, useState, useContext } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlinePeople } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../../api/apiconnector";
import { validatorEndpoints } from "../../api/apis";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const ValidatorDetailsData = () => {
  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState(userData);
  const [showPasswords, setShowPasswords] = useState({});
  const { serviceId } = useParams(); // get :serviceId from URL
  const token = localStorage.getItem("userData"); // already a string

  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const res = await apiConnector(
          "GET",
          validatorEndpoints.GET_VALIDATORS(serviceId),
          null,
          headers
        );

        if (res?.data?.validators) {
          setUsers(res.data.validators);
        } else {
          toast.warning("No validators found.");
        }
      } catch (error) {
        console.error("Error fetching validators:", error);
        toast.error("Failed to fetch validator list.");
      }
    };

    fetchValidators();
  }, [serviceId, token]);

  const handleDelete = (indexToDelete) => {
    const updatedUsers = users.filter((_, index) => index !== indexToDelete);
    setUsers(updatedUsers);
    const updatedShowPasswords = { ...showPasswords };
    delete updatedShowPasswords[indexToDelete];
    setShowPasswords(updatedShowPasswords);
  };

  const togglePasswordVisibility = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const visitorHandler = () => {
    alert("Visitor handling logic goes here.");
  };

  return (
  <div className="w-full h-fit bg-white border border-[#EAEAEA] rounded-xl mx-auto mb-14 px-12 py-8">
    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Validators</h2>

    <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-72 overflow-y-auto">
      <table className="min-w-full text-sm text-left text-black">
        <thead className="bg-gray-100 sticky top-0 z-10 text-sm font-semibold">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Password</th>
            <th className="px-4 py-3">Visitors</th>
            <th className="px-4 py-3">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <span className="break-all tracking-wide">
                      {showPasswords[index]
                        ? user.password
                        : "*".repeat(user.password?.length || 8)}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(index)}
                      className="ml-2 text-black hover:text-gray-600 cursor-pointer"
                      aria-label={`Toggle password visibility for ${user.name}`}
                    >
                      {showPasswords[index] ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={visitorHandler}
                    className="border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition px-4 py-1 rounded-full flex items-center gap-1"
                  >
                    <MdOutlinePeople className="w-4 h-4" />
                    Visitor
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No validators available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="text-center mt-6">
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium px-6 py-2 transition"
        onClick={() => navigate(`/home/services/${serviceId}/add-validator`)}
      >
        Add Validator
      </button>
    </div>
  </div>
);

};

export default ValidatorDetailsData;
