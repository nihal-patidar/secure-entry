"use client";

import { useState, useContext, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../context/ServiceContext";
import api from '../../../axiosConfig'
import { toast } from "react-toastify";

 function Card(props) {
  const {image, id, eventName, location, time, date , price, countVisitors,setCountVisitors } = props;

  const token = useMemo(() => localStorage.getItem("userData"), []);
  const [visitors, setVisitors] = useState({ total: 0, visited: 0, notvisited: 0, visitorData: {"default":"no visitor data"} });
  

  
/* Example visitor data */
  const visitordata = [
    {
      Name:"Asad",
      Email:"Asad@gmail.com",
      Branch:"CSE",
      Skill:"Web",
      Address: "Dhar",
      School:"Random",
      Rank:"1",
      Payment: "Done",
      Hobby: "Driving"
    },
    {
      Name:"Nikhil",
      Email:"Nikhil@gmail.com",
      Branch:"it",
      Skill:"app",
      Address: "Badvani",
      School:"Random",
      Rank:"2",
      Payment: "Done",
      Hobby: "Blank"

    },
    {
      Name:"Nagesh",
      Email:"Nagesh@gmail.com",
      Branch:"ee",
      Skill:"blockchain",
      Address: "Chhatarpur",
      School:"Random",
      Rank:"3",
      Payment: "Done",
      Hobby: "Blank"
    },
    {
      Name:"Virendra",
      Email:"Virendra@gmail.com",
      Branch:"ee",
      Skill:"blockchain",
      Address: "Chhatarpur",
      School:"Random",
      Rank:"3",
      Payment: "Done",
      Hobby: "Blank"
    },
    {
      Name:"Tanay",
      Email:"Tanay@gmail.com",
      Branch:"ee",
      Skill:"blockchain",
      Address: "Chhatarpur",
      School:"Random",
      Rank:"3",
      Payment: "Done",
      Hobby: "Blank"
    },
    {
      Name:"Aman",
      Email:"Aman@gmail.com",
      Branch:"ee",
      Skill:"blockchain",
      Address: "Chhatarpur",
      School:"Random",
      Rank:"3",
      Payment: "Done",
      Hobby: "Blank"
    }
    
  ]



     useEffect(() => {
        api
          .get(`/visitor/get-visitors/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const visitors = res.data?.visitorList;
  
            // console.log("Visitors data from fetch: ", visitors)
  
            let total = visitors.length;
            let visited = visitors.filter((visitor) => {
              return visitor.validation_status;
            }).length;
            let notvisited = visitors.filter((visitor) => {
              return !visitor.validation_status;
            }).length;
    
            setVisitors({ total: total, visited: visited, notvisited: notvisited, visitorData:visitors });
            
            setCountVisitors({total:total, visited:visited, notvisited:notvisited})
            
          })
          .catch((err) => {
            //console.log(err);
             toast.warning(err.response?.data?.msg || "Failed to fetch visitor data");
          });
      }, [id]);
  
      
  
  
// console.log("Count visitors: ",countVisitors)

  const navigate = useNavigate()
  let visitPercent= Number;
  countVisitors.total?(
  visitPercent = parseFloat((countVisitors.visited*100)/countVisitors.total).toFixed(2)): (visitPercent=0)
  

  return (
      <div className="max-w-xs w-full group/card "
      onClick={()=>{
        navigate(`/home/services/${id}`
         ,{state: {visitors:visitors}}
        )
      }}
      >
        <div className="relative h-[420px] rounded-2xl  bg-white overflow-hidden p-4 flex flex-col justify-between border border-gray-200">
          {/* Image Section */}
          <div>

          <img  className="bg-cover bg-center rounded-2xl h-[180px] mb-3  mx-auto object-cover w-full "
              alt= "image not found"
              src={image}/>
          </div>

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
            <div className="flex-col justify-start items-center w-3/5">
              <h3 className="ml-2 text-sm text-black mt-[-4px] font-bold">{visitPercent}%</h3>
              <div className=" w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-purple-500 w-[${visitPercent}%]`}></div>
              </div>
            </div>

            {/* Price */}
            <div className="text-[#8B5CF6] font-bold text-lg ml-2">Rs{price}/-</div>
          </div>
        </div>
      </div>
  );
}

export default memo(Card)
