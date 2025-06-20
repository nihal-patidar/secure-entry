import React from 'react'



import InfoForm from './InfoForm';
import Overview from './Overview';





const ServiceDetails = (element, index) => {
    return(
    <>


    <div key={index} className='flex  h-[720px] mx-10 gap-10 '>
        <div className="w-[82%]  bg-[#F2F3F9]  rounded-3xl   pt-6 border border-[#EAEAEA]" >
            <div className='flex justify-between align-middle items-center  mb-8 mx-14'>

                <h3 className='text-[#5621FF] text-2xl font-medium '>Codekumbh</h3>
                <button className='button-primary '>Update</button>
               
            </div>

            <div className='w-full h-[85%] overflow-y-scroll px-14 flex-col  '>
                <InfoForm index={index} element= {element} />
                <Overview index={index} element= {element}/>
            </div>

        </div>

        <div className="w-[18%]  bg-[#F2F3F9] border border-[#EAEAEA] rounded-3xl ">

        </div>

    </div>

    </>
  )
}








export default ServiceDetails