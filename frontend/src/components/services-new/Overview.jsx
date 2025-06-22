import React, { useState, useEffect } from 'react'
import totalRegistered from '../../assets/images/totalRegistered.svg'
import visited from '../../assets/images/Visited.svg'
import notVisited from '../../assets/images/Not Visited.svg'
import errors from '../../assets/images/Errors.svg'
import { useNavigate } from 'react-router-dom'
import api from '../../../axiosConfig'
import { toast } from "react-toastify";

const Overview = ({serviceId, visitors}) => {


  // console.log("Visitor data overview: ",visitors)
  const navigate = useNavigate()

  

    const handleVisitorData= ()=>{
      navigate(`/home/services/${serviceId}/visitors`,
        {
          state: {serviceId:serviceId , visitorData:visitors?.visitorData}
        }
      )
    }

  return (
    <>
      <div className=" w-full h-[300px] bg-white border border-[#EAEAEA] rounded-xl  mx-auto  mb-14 px-12 py-8 ">
        <h3 className='text-[#4b4b4b] text-2xl font-semibold mb-7 text-center'>Overview</h3>
        <div className='flex gap-12 justify-center h-[35%] mb-9'>
            <div className='relative   '  >
                <img src={totalRegistered} className=' h-full' alt="total registered"  />
                <p className='absolute top-2 left-8 text-white'>Registered</p>
                <p className='absolute top-8 left-8 text-3xl font-semibold tracking-wider text-white'>{visitors?.total}</p>
            </div>
            <div className='relative   '  >
                <img src={visited} className=' h-full' alt="total registered"  />
                <p className='absolute top-2 left-8 text-white'>Visited</p>
                <p className='absolute top-8 left-8 text-3xl font-semibold tracking-wider text-white'>{visitors?.visited}</p>
            </div>
            <div className='relative   '  >
                <img src={notVisited} className=' h-full' alt="total registered"  />
                <p className='absolute top-2 left-8 text-white'>Not Visited</p>
                <p className='absolute top-8 left-8 text-3xl font-semibold tracking-wider text-white'>{visitors?.notvisited}</p>
            </div>
            <div className='relative   '  >
                <img src={errors} className=' h-full' alt="total registered"  />
                <p className='absolute top-2 left-8 text-white'>Errors</p>
                <p className='absolute top-8 left-8 text-3xl font-semibold tracking-wider text-white'>0</p>
            </div>
            
        </div>
        
        <div className='flex items-center justify-center '>
          <button
          onClick={()=>{handleVisitorData()}}
          className='button-secondary font-medium text-xl  h-14 w-60'>All Visitors</button>
          </div>
      </div>
    </>
  )
}

export default Overview
