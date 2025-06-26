import React from 'react'

const VisitorDataTable = ({visitorData}) => {
  return (
    <>
            <div className=' w-full overflow-x-auto  h-[80%]   mx-auto rounded-lg'>
                <table className='text-black text-sm sm:text-lg  text-center rounded-lg table-fixed  min-w-max'>
                    <thead className='border-b border-b-[#ACACAC] bg-[#F2F3F9] sticky top-0'>
                        <tr>
                            
                            {
                            visitorData.length >0?
                            Object.keys(visitorData[0] ).map((heading, i)=>(

                                <th key={i} className='w-[150px] sm:w-[250px] py-4 px-2'>{heading}</th>
                            )
                            ):
                            (<p className='w-full text-center font-semibold text-4xl my-40'>No Visitor Data</p>)
                        }

                            <th className=' w-[250px] py-4 px-2'>Name</th>
                            <th className=' w-[250px] py-4 px-2'>Email</th>
                            <th className=' w-[250px] py-4 px-2'>College</th>
                            <th className=' w-[250px] py-4 px-2'>Branch</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            visitorData.map((obj, i)=>(
                                <tr key={i} className='border-b border-b-[#ACACAC] '>
                                    {Object.keys(obj).map((heading,i)=>(
                                        <td key={i} className='w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal'>{obj[heading]}</td>
                                    ))}
                                </tr>
                            ))
                        }

                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                    
                        </tr>
                        
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[250px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                    
                        </tr>
                        
                        
                    </tbody>
                </table>
                </div>
    </>
  )
}

export default VisitorDataTable