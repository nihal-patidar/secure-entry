import React, { useEffect } from 'react';
import totalRegistered from '../../assets/images/totalRegistered.svg';
import visited from '../../assets/images/Visited.svg';
import notVisited from '../../assets/images/Not Visited.svg';
import errors from '../../assets/images/Errors.svg';
import { useNavigate } from 'react-router-dom';
import { devLog } from '../../../devLog';
const Overview = ({ serviceId, visitors }) => {
  const navigate = useNavigate();

  // Log on render
  useEffect(() => {
    devLog.log("📊 Overview mounted");
    devLog.log("🆔 serviceId:", serviceId);
    devLog.log("👥 Visitors object:", visitors);
  }, [serviceId, visitors]);

  const handleVisitorData = () => {
    devLog.log("🔁 Navigating to visitors page with state:", {
      serviceId: serviceId,
      visitorData: visitors?.visitorData,
    });

    navigate(`/home/services/${serviceId}/visitors`, {
      state: {
        serviceId: serviceId,
        visitorData: visitors?.visitorData,
      },
    });
  };

  return (
    <div className="w-full h-fit bg-white border border-[#EAEAEA] rounded-xl mx-auto mb-14 px-12 py-8">
      <h3 className="text-[#4b4b4b] text-2xl font-semibold mb-7 text-center">
        Overview
      </h3>

      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-12 place-items-center mx-auto mb-9">
        <div className="relative">
          <img src={totalRegistered} className="h-20" alt="total registered" />
          <p className="absolute text-sm sm:text-base top-3 sm:top-2 left-8 text-white">
            Registered
          </p>
          <p className="absolute top-8 left-8 text-2xl sm:text-3xl font-semibold tracking-wider text-white">
            {visitors?.total ?? 0}
          </p>
        </div>

        <div className="relative">
          <img src={visited} className="h-20" alt="visited" />
          <p className="absolute top-3 sm:top-2 left-8 text-sm sm:text-base text-white">
            Visited
          </p>
          <p className="absolute top-8 left-8 text-2xl sm:text-3xl font-semibold tracking-wider text-white">
            {visitors?.visited ?? 0}
          </p>
        </div>

        <div className="relative">
          <img src={notVisited} className="h-20" alt="not visited" />
          <p className="absolute top-3 sm:top-2 left-8 text-sm sm:text-base text-white">
            Not Visited
          </p>
          <p className="absolute top-8 left-8 text-2xl sm:text-3xl font-semibold tracking-wider text-white">
            {visitors?.notvisited ?? 0}
          </p>
        </div>

        <div className="relative">
          <img src={errors} className="h-20" alt="errors" />
          <p className="absolute top-3 sm:top-2 left-8 text-sm sm:text-base text-white">
            Errors
          </p>
          <p className="absolute top-8 left-8 text-2xl sm:text-3xl font-semibold tracking-wider text-white">
            0
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleVisitorData}
          className="button-secondary font-medium text-xl h-14 w-60"
        >
          All Visitors
        </button>
      </div>
    </div>
  );
};

export default Overview;
