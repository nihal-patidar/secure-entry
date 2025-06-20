import React from 'react'
import { Button } from '@mui/material';



const VisitorTable = () => {
  return (
    <>
        <div className='h-[720px] w-[1620px] bg-[#F2F3F9]  rounded-3xl border border-[#EAEAEA] mx-10 p-4'>
            <div className='bg-white border border-[#EAEAEA] h-full w-full px-10 rounded-3xl '>
                <div className='flex gap-5 text-black px-14 text-lg font-medium h-12 my-10 '>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>All</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>Visited</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>Not Visited</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>Excel Format</button>
                    <button className='px-8 py-2 focus:rounded-md transition-all duration-300 hover:border-b-4 hover:border-b-[#2C3ED3] focus:bg-[#2C3ED3] focus:text-white active:bg-blue-900'>Excel</button>
                    
                </div>
                
                <div className=' w-full overflow-x-auto  h-[80%]   mx-auto rounded-lg'>
                <table className='text-black text-lg  text-center rounded-lg table-fixed  min-w-max'>
                    <thead className='border-b border-b-[#ACACAC] bg-[#F2F3F9] sticky top-0'>
                        <tr>
                            <th className=' w-[200px] py-4 px-2'>Name</th>
                            <th className=' w-[200px] py-4 px-2'>Email</th>
                            <th className=' w-[200px] py-4 px-2'>College</th>
                            <th className=' w-[200px] py-4 px-2'>Branch</th>
                            <th className=' w-[200px] py-4 px-2'>Skill</th>
                            <th className=' w-[200px] py-4 px-2'>Skill</th>
                            <th className=' w-[200px] py-4 px-2'>Skill</th>
                            <th className=' w-[200px] py-4 px-2'>Skill</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web Web  </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                    
                        </tr>
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web Web  </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                    
                        </tr>
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web Web  </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                    
                        </tr>
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web Web  </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                    
                        </tr>
                        <tr className='border-b border-b-[#ACACAC] '>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Asad@gmail.com Asad@gmail.com Asad@gmail.com</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>JEC</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>CSE CSE CSE </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web Web  </td>
                            <td className='w-[200px] px-2 py-4 break-words whitespace-normal'>Web</td>
                    
                        </tr>
                        
                        
                    </tbody>
                </table>
                </div>

            </div>
        </div>
    </>
  )
}

export default VisitorTable