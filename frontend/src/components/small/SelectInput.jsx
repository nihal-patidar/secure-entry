import React, { useContext } from 'react';
import { forwardRef } from 'react';
const SelectInput = React.forwardRef(({options=[],label,...props},ref) => {
    return (
        <div className="w-full">
        {label &&<label className="inline-block mb-1 pl-1" htmlFor="dis">{label}</label>}
        <select
        ref={ref}
        {...props}
        placeholder="Ticket Validity"
        className={`px-3 py-2 rounded-lg text-black bg-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full focus:ring-2 ring-blue-400 dis`}
        >
            {
                options.map((ele,index)=>{
                    return(
                        <option key={index} value={ele}>{ele}</option>
                    )
                })
            }
        </select>
        </div>
    );
})

export default SelectInput;
