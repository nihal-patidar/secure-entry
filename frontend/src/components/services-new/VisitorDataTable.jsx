import React, { useEffect, useState } from 'react'
import { TrashIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from '@mui/material/Button';

const VisitorDataTable = ({visitorData}) => {
    const [selected, setSelected] = useState([])

    const handleSelect = (id)=>{
        if(selected.includes(id)){
            setSelected((prev)=>prev.filter(eachid=> eachid!==id))
        }
        else{
            setSelected((prev)=>[...prev, id])
        }
    }

   

  return (
    <>
            {selected.length >0 && (<div className='absolute top-11 right-10'>
            <SelectOperations  />
            </div>)}
            <div className={` overflow-x-auto  absolute top-28 bottom-10 right-7 left-7   mx-auto rounded-lg`}>
                <table className='text-black text-sm sm:text-lg  text-center rounded-lg table-fixed  min-w-max'>
                    <thead className='border-b border-b-[#ACACAC] bg-[#F2F3F9] sticky top-0 z-40'>
                        <tr>
                            <th className='w-[5px] sm:w-[10px] py-4 pl-8'></th>
                            {
                            visitorData.length >0?
                            Object.keys(visitorData[0] ).map((heading, i)=>(
                                
                                
                                <th key={i} className='w-[150px] sm:w-[250px] py-4 px-2'>{heading}</th>
                                
                            )
                            ):
                            (<p className='w-full text-center font-semibold text-4xl my-40'>No Visitor Data</p>)
                        }

                            {/* <th className=' w-[250px] py-4 px-2'>Name</th>
                            <th className=' w-[250px] py-4 px-2'>Email</th>
                            <th className=' w-[250px] py-4 px-2'>College</th>
                            <th className=' w-[250px] py-4 px-2'>Branch</th> */}
                        </tr>
                    </thead>

                    <tbody>

                        {   
                            visitorData.map((obj, i)=>(
                                
                                // <div className=''>
                                // {/* <input type="checkbox" name="select" id="select" /> */}
                                <tr key={i} className={`${selected.includes(i)? "bg-[#E2E6FF]":null} border-b border-b-[#ACACAC] transition-all duration-150 `}>
                                    <td className='w-[5px] sm:w-[10px] py-4 pl-8 '>
                                        <label className="inline-flex items-center cursor-pointer">
                                        <input
                                        type="checkbox"
                                        className="custom-checkbox w-5 h-5 appearance-none border-2 border-gray-400 checked:border-blue-600 checked:text-blue-600 focus:outline-none"
                                        checked={selected.includes(i)}
                                        onChange={()=>handleSelect(i)}
                                        />
                                        
                                    </label>
                                    </td>
                                    {Object.keys(obj).map((heading,i)=>(
                                        <td key={i} className=" w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal">{obj[heading]}</td>
                                    ))}
                                </tr>
                                // </div>
                            ))
                        }

                        {/* <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                    
                        </tr> */}
                        
                        {/* <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                    
                        </tr> */}
                        
                        
                    </tbody>
                </table>
                </div>
    </>
  )
}

export default VisitorDataTable

const SelectOperations = () => {

  return (
    <>
      <div className='flex gap-5 z-50'>
        <Button variant='' color="primary" 
        
         sx={{
            borderRadius: 10,
            '&:active': {
            backgroundColor: '#E2E6FF',
            },
            '&:hover': {
                backgroundColor: '#B1FFFF',
                },
  }}
        >
      <TrashIcon className="w-6 text-black"/>
    </Button>

    <Button variant='' color="primary" 
         sx={{
            borderRadius: 10,
            '&:active': {
            backgroundColor: '#E2E6FF',
            },
            '&:hover': {
                backgroundColor: '#B1FFFF',
                },
  }}
        >
      <EnvelopeIcon className="w-6 text-black"/>
    </Button>

    <Button variant='' color="primary" 
         sx={{
            borderRadius: 10,
            '&:active': {
            backgroundColor: '#E2E6FF',
            },
            '&:hover': {
                backgroundColor: '#B1FFFF',
                },
  }}
        >
      <PencilSquareIcon className="w-6 text-black"/>
    </Button>
      </div>
    </>
  )
}

