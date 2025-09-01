import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VisitorDataTable from "../components/services-new/VisitorDataTable";
import api from "../../axiosConfig";

const ServiceVisitorsData = () => {
  const { serviceId } = useParams();
  const [visitorList, setVisitorList] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showVisited, setShowVisited] = useState(false);
  const [showNotVisited, setShowNotVisited] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userData");

    api
        .get(`/visitor/get-visitors/${serviceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
            const visitors = res.data?.visitorList;
            if (visitors && Array.isArray(visitors)) {
                const cleaned = visitors.map((v) => v);
                setVisitorList(cleaned);
                // console.log(visitors);
            }
        })

        .catch((err) => {
          console.error("Failed to fetch visitors", err);
        });
  }, [serviceId]);

  // Filter based on tab
  const filteredVisitors = showAll
      ? visitorList
      : showVisited
          ? visitorList.filter((v) => {
             // console.log(v["validation_status"])
              return v["validation_status"];
          })
          : showNotVisited
              ? visitorList.filter((v) => !v["validation_status"])
              : [];
// console.log("finaldata:", filteredVisitors)
  return (
      <div className="absolute right-7 left-12 bottom-10 top-10 bg-[#F2F3F9] rounded-3xl border border-[#EAEAEA] ml-16 p-2 mt-8">
        <div className="bg-white border border-[#EAEAEA] h-full w-full px-0 lg:px-5 rounded-3xl">
          <div className="flex gap-1 lg:gap-3 text-black px-0 lg:px-6 text-sm sm:text-lg font-medium h-12 mt-8 mb-4">
            <button
                className="px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white"
                onClick={() => {
                  setShowAll(true);
                  setShowVisited(false);
                  setShowNotVisited(false);
                }}
            >
              All
            </button>

            <button
                className="px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white"
                onClick={() => {
                  setShowAll(false);
                  setShowVisited(true);
                  setShowNotVisited(false);
                }}
            >
              Visited
            </button>

            <button
                className="px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white"
                onClick={() => {
                  setShowAll(false);
                  setShowVisited(false);
                  setShowNotVisited(true);
                }}
            >
              Not Visited
            </button>

            <button
                className="px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white"
                onClick={() => {
                  alert("Excel export coming soon!");
                }}
            >
              Excel
            </button>
          </div>

          {/* Render Table */}
          {filteredVisitors.length > 0 ? (
              <VisitorDataTable visitorData={filteredVisitors.map((v) => v.visitor_data)} />
          ) : (
              <p className="w-full text-center font-semibold text-4xl my-40">
                No Visitor Data
              </p>
          )}
        </div>
      </div>
  );
};

export default ServiceVisitorsData;
