import { useEffect, useState } from 'react'

import {SelectOperations} from '../services-new/VisitorDataTable'


const AttendanceSheet = () => {

    
        const [month, setMonth] = useState("");

        const months = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
        
const visitorData = [
    {
        name: "Asad",
        rollno: "0201CS231016",
        branch: "cse",
        class: "CS1",
    },
    {
        name: "Nikhil",
        rollno: "0201CS231017",
        branch: "cse",
        class: "CS3",
    },
    {
        name: "Tanay",
        rollno: "0201CS231018",
        branch: "cse",
        class: "CS3",
    },
    {
        name: "Virendra",
        rollno: "0201CS231019",
        branch: "ai",
        class: "ai3",
    }
]

  return (
    <>
      <div className=' absolute right-7 left-12 bottom-10 top-10  bg-[#F2F3F9]   rounded-3xl border border-[#EAEAEA] ml-16 p-2 mt-8 '>
            <div className='bg-white border border-[#EAEAEA] h-full w-full px-0 lg:px-5 rounded-3xl '>
                <div className='flex gap-1 lg:gap-3  text-black px-0 lg:px-6 text-sm  sm:text-lg font-medium h-12 mt-8 mb-4'>
                    
                    <button className=' px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:border-b-blue-900 sm:active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(true)
                    setShowVisited(false)
                    setShowNotVisited(false)
                    }}
                    >All</button>
                    <button className='px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:border-b-blue-900 sm:active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(false)
                    setShowVisited(true)
                    setShowNotVisited(false)
                    }}
                    >Present</button>
                    <button className='px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:border-b-blue-900 sm:active:bg-blue-900'
                    onClick={()=>{
                    setShowAll(false)
                    setShowVisited(false)
                    setShowNotVisited(true)
                    }}
                    >Absent</button>
                    
                    <button className='px-3 sm:px-8 py-1 sm:py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:border-b-blue-900 sm:active:bg-blue-900'
                    
                    >Excel</button>

                    <select name="month" id="month" className='bg-[#2C3ED3] text-white outline-none'
                    value={month}
                    onChange={(e)=>setMonth(e.target.value)}
                    >
                        {
                            months.map((month, i)=>
                                <option key={i} value={month}>{month}</option>
                            )
                        }
                        
                        
                    </select>
                    
                </div>
                
                {(visitorData.length >0) ?
                
                ( 
                <AttendanceTable visitorData={visitorData} month={month}  />
                )
                :
                (<p className='w-full  absolute bottom-0 sm:bottom-[5%]   text-center font-semibold text-4xl my-40'>No Visitor Data</p>)
                }

                

            </div>
        </div>
    </>
  )
}

export default AttendanceSheet

const DetailPopup = ({obj})=>{
let obj1={
    name: "Asad",
    rollno: "o201",
    branch: "CSE",
    class: "CS1"
}
    return (
        <>
         <div className=' z-40 absolute top-8 left-44 w-fit h-fit bg-white border border-[#ACACAC]  text-start rounded-lg '>
            <table>
            <tbody>
            {
                Object.keys(obj).map((field, i)=>(
                    <tr key={i} className='  text-black'>
                        <td className='font-semibold border border-b border-b-[#ACACAC] p-3 border-r-[#ACACAC]' >{field}</td>
                        <td className='border-b border-b-[#ACACAC] p-3' >{obj[field]}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
         </div>
        </>
    )
}

export const AttendanceTable = ({visitorData, month}) => {

    const [selected, setSelected] = useState([])
    const [dates, setDates] = useState([])
    const [nameClicked, setNameClicked] = useState("")
    
        const handleSelect = (id)=>{
            if(selected.includes(id)){
                setSelected((prev)=>prev.filter(eachid=> eachid!==id))
            }
            else{
                setSelected((prev)=>[...prev, id])
            }
        }

    const monthDays = (month)=>{
        let numberofDays
        
        switch (month){
            case "January":
            case "March":
            case "May":
            case "July":
            case "August":
            case "October":
            case "December":
                numberofDays = 31;
                break;

            case "April":
            case "June":
            case "September":
            case "November":
                numberofDays = 30;
                break;

            case ("February"):
                numberofDays = 28
                break;

            default:
                numberofDays= 30
                break
        }

        
        let daysarray = []
        for(let i=1; i<=numberofDays; i++){
            daysarray.push(i)
        }
        
        return daysarray
        
    }

    console.log(month)
    useEffect(() => {
        const daysarray = monthDays(month)
        setDates(daysarray)
    }, [month])
    

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
                            <th className='w-[150px] sm:w-[250px] py-4 px-2'>Name</th>
                            {(visitorData.length>0 &&
                            dates.length >0)?
                            dates.map((date, i)=>(
                                
                                
                                <th key={i} className='w-[50px] sm:w-[80px] py-4 px-2 border-b border-b-[#ACACAC]'>{date}</th>
                                 
                            )
                            ):
                            (<th className='w-full text-center font-semibold text-4xl my-40'>No Visitor Data</th>)
                        }

                        </tr>
                    </thead>

                    <tbody>

                        {   
                            visitorData.map((obj, i)=>(
                                
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
                                    {/* {Object.keys(obj).map((heading,i)=>(
                                        <td key={i} className=" w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal">{obj[heading]}</td>
                                    ))} */}
                                    {<td  onMouseDown={()=>{
                                        (nameClicked== obj.rollno)? setNameClicked(null): setNameClicked(obj.rollno)
                                    }} className=" cursor-pointer relative w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal ">{obj.name}
                                        {nameClicked==obj.rollno && <DetailPopup obj={obj} />}
                                        </td>}
                                    

                                    {
                                        dates.map((date, i)=>(
                                            <td key={i} className='border border-b-[#ACACAC]'>
                                                
                                            </td>
                                        ))
                                    }
                                </tr>
                                
                            ))
                        }

                    </tbody>
                </table>
                
                </div>
    </>
  )
}




