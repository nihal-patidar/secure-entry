import React, { useState } from 'react'
import { Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import VisitorDataTable from '../components/services-new/VisitorDataTable';



const ServiceVisitorsData = () => {
    // const {serviceId} = useParams()
    const location = useLocation()
    const { serviceId, visitorData } = location.state || {};

    const [showAll, setShowAll] = useState(true);
    const [showVisited, setShowVisited] = useState(false);
    const [showNotVisited, setShowNotVisited] = useState(false);

    // console.log("Visitor Data: ", visitorData)   //array of objects
    // console.log(Object.keys(visitorData[0] ))
    
  return (
    <>
        <div className='h-[720px] w-[95%] bg-[#F2F3F9]  rounded-3xl border border-[#EAEAEA] ml-16 p-2 mt-8 mr-6'>
            <div className='bg-white border border-[#EAEAEA] h-full w-full px-10 rounded-3xl '>
                <div className='flex gap-5 text-black px-10 text-lg font-medium h-12 mt-8 mb-8'>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(true)
                    setShowVisited(false)
                    setShowNotVisited(false)
                    }}
                    >All</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(false)
                    setShowVisited(true)
                    setShowNotVisited(false)
                    }}
                    >Visited</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(false)
                    setShowVisited(false)
                    setShowNotVisited(true)
                    }}
                    >Not Visited</button>
                    
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>Excel</button>
                    
                </div>
                
                {(visitorData.length >0) ?(
                showAll ? 
                ( 
                <AllVisitors visitorData={visitorData} />
                )
                :
                showVisited ?
                ( 
                <VisitedVisitors visitorData={visitorData} />
                )
                :
                showNotVisited ?
                ( 
                <RemainingVisitors visitorData={visitorData} />
                ):null)
                :
                (<p className='w-full text-center font-semibold text-4xl my-40'>No Visitor Data</p>)
                }

                

            </div>
        </div>
    </>
  )
}


const AllVisitors = ({ visitorData }) => {
    let visitorList = []
    

     visitorData.map((visitorData) => {
        return visitorList.push(visitorData)
      })
      console.log("Visitor Data All from map: ", visitorList)
  return (
    <>
    
      
      {visitorList.length>0?
      (<VisitorDataTable visitorData={visitorList} color=""/>):
      (<p className='w-full text-center font-semibold text-4xl my-40'>No Visitor Data</p>)
}
    </>
  );
};

const VisitedVisitors = ({ visitorData }) => {
    let visitorList = []

    visitorData?.map((visitorData) => {
        return visitorData.validation_status ? visitorList.push(visitorData) : null;
      })
  return (
    <>
      {visitorList.length>0?
      (<VisitorDataTable visitorData={visitorList} color=""/>):
      (<p className='w-full text-center font-semibold text-4xl my-40'>No Visited Visitors</p>)
}
    </>
  );
};


const RemainingVisitors = ({ visitorData }) => {

    let visitorList = []

    visitorData?.map((visitorData) => {
        return visitorData.validation_status ? null : visitorList.push(visitorData);
      })

  return (
    <>
       {visitorList.length>0?
      (<VisitorDataTable visitorData={visitorList} color=""/>):
      (<p className='w-full text-center font-semibold text-4xl my-40'>No "Not Visited" Visitors</p>)
}
    </>
  );
};




export default ServiceVisitorsData