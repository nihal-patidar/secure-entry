import React, { useState } from 'react';
import { TrashIcon, EnvelopeIcon, PencilSquareIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Button from '@mui/material/Button';


const VisitorDataTable = ({ visitorData }) => {
    const [selected, setSelected] = useState([]);
    const [blocked, setBlocked] = useState([]);
    // Inside the component, before return:
    console.log(visitorData)
    const keys = Object.keys(visitorData[0] || {});

    let orderedKeys = keys;

    if (keys.includes("Full Name")) {
        orderedKeys = ["Full Name"];

        if (keys.includes("Email")) {
            orderedKeys.push("Email");
        }

        // Add all other keys except 'Full Name' and 'Email'
        orderedKeys = orderedKeys.concat(
            keys.filter(key => key !== "Full Name" && key !== "Email")
        );
    }


    // const [serial, setSerial] = useState(1);
    const handleSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(eachId => eachId !== id));
        } else {
            setSelected(prev => [...prev, id]);
        }
    };

    const handleSelectAll = () => {
        if (selected.length === visitorData.length) {
            setSelected([]);
        } else {
            setSelected(visitorData.map((_, index) => index));
        }
    };

    return (
        <>
            {selected.length > 0 && (
                <div className='absolute top-11 right-10 z-50'>
                    <SelectOperations selected={selected} setBlocked={setBlocked} blocked={blocked} visitorData={visitorData} />
                </div>
            )}

            {visitorData.length === 0 ? (
                <div className='text-center font-semibold text-4xl my-40'>No Visitor Data</div>
            ) : (
                <div className='overflow-x-auto absolute top-28 bottom-10 right-7 left-7 mx-auto rounded-lg'>
                    <table className='text-black text-sm sm:text-lg text-center rounded-lg table-fixed min-w-max'>
                        <thead className='border-b border-b-[#ACACAC] bg-[#F2F3F9] sticky top-0 z-40'>
                        <tr>
                            <th className='w-[5px] sm:w-[10px] py-4 pl-8'>
                                <input
                                    type="checkbox"
                                    checked={selected.length === visitorData.length}
                                    onChange={handleSelectAll}
                                    className="w-5 h-5"
                                />
                            </th>
                            <th key={"serial id"} className='w-[150px] sm:w-[250px] py-4 px-2 capitalize'>S no.</th>

                            {orderedKeys.map((heading) => (
                                <th key={heading} className='w-[150px] sm:w-[250px] py-4 px-2 capitalize'>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {visitorData.map((obj, i) => (
                            <tr
                                key={i}
                                className={`${selected.includes(i) ? "bg-[#E2E6FF]" : ""} ${blocked.includes(i) ? "bg-red-200" : ""} border-b border-b-[#ACACAC] transition-all duration-150`}
                            >
                                <td className='w-[5px] sm:w-[10px] py-4 pl-8'>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(i)}
                                        onChange={() => handleSelect(i)}
                                        className="w-5 h-5"
                                    />
                                </td>
                                <td key={"serial id"} className="w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal">
                                    {i + 1}
                                </td>
                                {orderedKeys.map((heading) => (
                                    <td key={heading} className="w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal">
                                        {obj[heading]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
            )}
        </>
    );
};

export default VisitorDataTable;

// ---------------------

export const SelectOperations = ({ selected, setBlocked, blocked, visitorData }) => {
    const [isBlockHovered, setIsBlockHovered] = useState(false)
    const [isEmailHovered, setIsEmailHovered] = useState(false)
    

    const handleBlock = () => {
        // alert(`Delete rows: ${selected.join(', ')}`);
        if(blocked.some(id=> selected.includes(id))){
            let filterMatching= blocked.filter(id=> !blocked.includes(id))
            setBlocked(prev=>prev.filter(id=>!selected.includes(id)))
        } else{
            setBlocked(prev=>[...prev, ...selected])
        }
    };

    const handleEmail = () => {
  if (!selected || selected.length === 0) {
    alert("No visitors selected!");
    return;
  }

  const emails = selected
    .map((id) => {
      const visitor = visitorData[id];
      return visitor?.Email || visitor?.email || visitor?.EMAIL || null;
    })
    .filter((email) => !!email);

  if (emails.length === 0) {
    console.warn("No valid email field found in selected visitors!");
    return;
  }

  const subject = encodeURIComponent("Event Notification");
  const body = encodeURIComponent("Hello, here are the event details...");

  // Gmail compose URL
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emails.join(
    ","
  )}&su=${subject}&body=${body}`;

  // Open Gmail in new tab
  window.open(gmailLink, "_blank");
};



    const handleEdit = () => {
        alert(`Edit row: ${selected[0]}`);
    };

    return (
        <div className='flex gap-3 z-50 mr-5'>
            <div className="relative inline-block">
            <Button
                variant=""
                color="primary"
                onMouseEnter={() => setIsBlockHovered(true)}
                onMouseLeave={() => setIsBlockHovered(false)}
                onClick={handleBlock}
                sx={{
                borderRadius: 10,
                "&:active": { backgroundColor: "#E2E6FF" },
                "&:hover": { backgroundColor: "#B1FFFF" },
                }}
            >
                <NoSymbolIcon className="w-6 text-black" />
            </Button>

            {isBlockHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2">
                {/* Tooltip Box */}
                <div className="relative bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg">
                    Block Visitors
                    {/* Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
                </div>
            )}
            </div>

            <div className="relative inline-block">
            <Button
                variant=''
                color="primary"
                onClick={handleEmail}
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
                sx={{
                    borderRadius: 10,
                    '&:active': { backgroundColor: '#E2E6FF' },
                    '&:hover': { backgroundColor: '#B1FFFF' },
                }}
            >
                <EnvelopeIcon className="w-6 text-black" />
            </Button>

                {isEmailHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2">
                {/* Tooltip Box */}
                <div className="relative bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg">
                    Message Visitors
                    {/* Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
                </div>
            )}
            </div>
            
            {/* <div className="relative inline-block">
            <Button
                variant=''
                color="primary"
                onClick={handleEdit}
                disabled={selected.length !== 1}
                sx={{
                    borderRadius: 10,
                    '&:active': { backgroundColor: '#E2E6FF' },
                    '&:hover': { backgroundColor: '#B1FFFF' },
                }}
            >
                <PencilSquareIcon className="w-6 text-black" />
            </Button>

            {isEmailHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2">
               
                <div className="relative bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg">
                    Block Visitors
                    
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
                </div>
            )}
            </div> */}
        </div>
    );
};
