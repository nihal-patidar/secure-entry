import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlinePeople } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../axiosConfig";

const ValidatorDetailsData = () => {
  const [validators, setValidators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});
  const { serviceId } = useParams();
  const token = localStorage.getItem("userData")?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidators = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/validator/getValidators/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Validators: ", res.data.validators);

        if (Array.isArray(res?.data?.validators)) {
          setValidators(res.data.validators);
        } else {
          setValidators([]);
          toast.warning("No validators found.");
        }
      } catch (error) {
        console.error("Error fetching validators:", error);
        toast.error("Failed to fetch validator list.");
      } finally {
        setLoading(false);
      }
    };

    fetchValidators();
  }, [serviceId, token]);

  const handleDelete = (indexToDelete) => {
    const updatedValidators = validators.filter((_, index) => index !== indexToDelete);
    setValidators(updatedValidators);
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
    <div className="w-full h-fit bg-white border border-[#EAEAEA] rounded-xl mx-auto mb-14 px-6 md:px-12 py-8">
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
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : validators.length > 0 ? (
              validators.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.validator_name}</td>
                  <td className="px-4 py-2">{user.validator_email}</td>
                  <td className="px-4 py-2 flex items-center gap-2 text-gray-500">
                    {showPasswords[index] ? user.validator_password : "••••••••"}
                    <button onClick={() => togglePasswordVisibility(index)}>
                      {showPasswords[index] ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
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
