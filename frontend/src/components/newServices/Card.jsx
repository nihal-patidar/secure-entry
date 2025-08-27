import { useState, useContext, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../axiosConfig";

function Card(props) {
  const {
    image,
    id,
    eventName,
    location,
    time,
    date,
    price,
    countVisitors,
    setCountVisitors,
  } = props;

  const token = useMemo(() => localStorage.getItem("userData"), []);
  const [visitors, setVisitors] = useState({
    total: 0,
    visited: 0,
    notvisited: 0,
    visitorData: { default: "no visitor data" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false); // for double-click menu
  const [showModal, setShowModal] = useState(false); // for delete modal

  const navigate = useNavigate();

  // Fetch visitors data
  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/visitor/get-visitors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const visitors = res.data?.visitorList || [];
        let total = visitors.length;
        let visited = visitors.filter((v) => v.validation_status).length;
        let notvisited = visitors.filter((v) => !v.validation_status).length;

        setVisitors({ total, visited, notvisited, visitorData: visitors });
        setCountVisitors({ total, visited, notvisited });
      })
      .catch((err) => {
        toast.warning(err.response?.data?.msg || "Failed to fetch visitor data");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  let visitPercent = countVisitors.total
    ? ((countVisitors.visited * 100) / countVisitors.total).toFixed(2)
    : 0;

  // Handle double click
  const handleDoubleClick = (serviceId) => {
    setShowMenu(true);
  };

  const handleUpdateService = () => {
    toast.info(`Update service ${id}`);
    // navigate to update page if needed
  };

  const handleDeleteService = () => {
    setShowModal(true);
  };

  return (
    <div
      className="w-full max-w-xs cursor-pointer group relative"
      onClick={() => {
        navigate(`/home/services/${id}`, { state: { visitors: visitors } });
      }}
      onDoubleClick={() => handleDoubleClick(id)}
    >
      <div className="relative h-[410px] rounded-2xl bg-white overflow-hidden p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col">
        {/* Image Section */}
        <div className="relative mb-4">
          {isLoading ? (
            <div className="h-[200px] w-full rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <img
              className="h-[200px] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
              alt="Event image"
              src={image}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA3NEg2M0M2MS4zNDMxIDc0IDYwIDc1LjM0MzEgNjAgNzdWMTIzQzYwIDEyNC42NTcgNjEuMzQzMSAxMjYgNjMgMTI2SDg3Qzg4LjY1NjkgMTI2IDkwIDEyNC42NTcgOTAgMTIzVjc3QzkwIDc1LjM0MzEgODguNjU2OSA3NCA4NyA3NFoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTEzNyA3NEgxMTNDMTExLjM0MyA3NCAxMTAgNzUuMzQzMSAxMTAgNzdWMTIzQzExMCAxMjQuNjU3IDExMS4zNDMgMTI2IDExMyAxMjZIMTM3QzEzOC42NTcgMTI2IDE0MCAxMjQuNjU3IDE0MCAxMjNWNzdDMTQwIDc1LjM0MzEgMTM4LjY1NyA3NCAxMzcgNzRaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==";
              }}
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Event Info */}
        <div className="flex flex-col gap-3 flex-grow">
          <h1 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-300">
            {eventName}
          </h1>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 2.994v2.25m10.5-2.25v2.25M3.75 9h16.5m-15 11.25h13.5a2.25 2.25 0 0 0 2.25-2.25V7.5a2.25 2.25 0 0 0-2.25-2.25H4.5A2.25 2.25 0 0 0 2.25 7.5v10.5a2.25 2.25 0 0 0 2.25 2.25z"
              />
            </svg>
            <span className="font-medium">
              {date}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="font-semibold text-gray-700 truncate">{location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt- pt-3 border-t border-gray-100">
          <div className="flex-1 mr-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">Attendance</span>
              <span className="text-xs font-bold text-purple-600">{visitPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${visitPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{countVisitors.visited} visited</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-medium">Price</span>
            <span className="text-lg font-bold text-purple-600 leading-tight">₹{price}</span>
          </div>
        </div>

        {/* Double-click menu */}
        {showMenu && (
          <div className="absolute right-0 top-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <button
              onClick={() => {
                setShowMenu(false);
                handleUpdateService();
              }}
              className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
            >
              Update
            </button>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={() => {
                setShowMenu(false);
                handleDeleteService();
              }}
              className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Card);
