import React, { useState } from 'react';
export default function DropDown({ options, name, lable, discription, align }) {

    const [selectedOption, setSelectedOption] = useState('select');
    return (
        <div className={`relative ${align == 'horizontal' ? 'flex' : ""} inline-block text-left`} style={{width: "200px", marginLeft:"0px", marginTop:"20px", paddingLeft:"20px"}}>
            <div style={{minWidth: "200px", width: "100%", paddingBottom:"10px", height:"100%"}}>
                <h1 style={{color:"#000",paddingLeft:"10px", marginBottom:"7px", marginTop:"18px"}}>{lable}</h1>
                <p style={{fontSize:"14px", paddingLeft:"10px", marginBottom:"6px"}}>{discription}</p>
            </div>
            <div>
            <div style={{alignContent:"start"}}>
                <button
                type="button"
                className="inline-flex justify-between w-full rounded-md w-64 border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                >
                {selectedOption || "Select an option"}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => {
                        document.querySelector(`.dropDown-${name}`).classList.toggle('hidden');
                    }}
                >
                    <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </button>
            </div>
            <div
                className={`dropDown-${name} origin-top-right   mt-4 pl-3 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                <div className="py-1" role="none">
                {options.map((option) => (
                    <button
                    key={option}
                    onClick={() =>
                        {
                            setSelectedOption(option);
                        }
                    }
                    className={`${
                        selectedOption === option ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left`}
                    role="menuitem"
                    style={{color: "#212121", backgroundColor: "white"}}
                    >
                    {option}
                    </button>
                ))}
                </div>
            </div>
        </div>
        </div>
    );
}