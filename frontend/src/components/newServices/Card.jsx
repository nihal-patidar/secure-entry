"use client";
import { IMAGE_URL_CARD } from "../constants/Links";

export function Card(props) {
  const { eventName, location, time, date } = props;
  const IMAGE_ID = "200";

  return (
      <div className="max-w-xs w-full group/card ">
        <div className="relative h-[420px] rounded-2xl shadow-xl bg-white overflow-hidden p-4 flex flex-col justify-between">
          {/* Image Section */}
          <div
              className="bg-cover bg-center rounded-2xl h-[180px] mb-3"
              style={{
                backgroundImage: `url(${IMAGE_URL_CARD}/${IMAGE_ID})`,
              }}
          ></div>

          {/* Event Info */}
          <div className="flex flex-col gap-2 px-1">
            <h1 className="font-bold text-lg text-[#2D2D2D]">{eventName}</h1>

            {/* Date & Time */}
            <div className="flex items-center text-sm text-[#7E7E7E] gap-2">
              <svg
                  className="w-4 h-4 text-gray-400"
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
              <span>{date} – {time}</span>
            </div>

            {/* Location */}
            <div className="flex items-center text-[13px] text-[#7E7E7E] gap-2">
              <svg
                  className="w-4 h-4 text-gray-400"
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
              <span className="font-bold ">{location}</span>
            </div>
          </div>

          {/* Progress Bar & Price */}
          <div className="flex items-center justify-between mt-4">
            {/* Progress */}
            <div className="flex w-4/5">
              <div className=" w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[55%]"></div>
              </div>
              <h3 className="text-sm text-black mt-[-4px] font-bold">55%</h3>
            </div>

            {/* Price */}
            <div className="text-[#8B5CF6] font-bold text-lg ml-2">$20</div>
          </div>
        </div>
      </div>
  );
}
