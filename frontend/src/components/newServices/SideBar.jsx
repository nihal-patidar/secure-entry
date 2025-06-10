import React from 'react'
import { useState } from 'react'
import {Icons} from '../../utils/icons'

export const SideBar = (props) => {
  
  const[colorTrue, setColorTrue] = useState(null)

  const sidebarItems = [
  { id: 'divA', label: 'Dashboard', icon: Icons.dashboard },
  { id: 'divB', label: 'Services', icon: Icons.services },
  { id: 'divC', label: 'Add Services', icon: Icons.addServices },
  { id: 'divD', label: 'Validator', icon: Icons.validator },
  { id: 'divE', label: 'Add Validator', icon: Icons.addValidator },
];
  return (
    <div className={`fixed flex flex-col items-center pt-20 p-4 gap-8 left-0 w-[12%] h-full bg-[#E2E6FF] text-black  ${props.className || ''} `}>

       <h1 className='font-bold relative flex top-2 text-3xl text-black z-20 p-2 '>
        Secure Entry 
      </h1>

      {sidebarItems.map((item) => (
        <div key={item.id} className={`sidebar-icon cursor-pointer text-xl font-medium flex  ${props.className || ''} ${colorTrue === item.id ? 'bg-blue-500 text-black' : 'bg-[#E2E6FF]'}`}onClick={() => {setColorTrue(item.id)}}>
         {item.icon}
          <h2> {item.label} </h2>
        </div>
        
        



      ))}
      <div className={`sidebar-icon cursor-pointer text-xl font-medium flex ${colorTrue === true ? '' : 'bg-[#E2E6FF]'}`}>
        Logout
      </div>
    </div>
  )
}
