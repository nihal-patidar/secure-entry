import React, {useEffect, useState} from 'react';
import { TrashIcon, EnvelopeIcon, PencilSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Button from '@mui/material/Button';

const VisitorDataTable = ({ maindata }) => {
    const [selected, setSelected] = useState([]);
    const [blocked, setBlocked] = useState([]); // 🔴 blocked data
    const [visitorData, setVisitorData] = useState(maindata);
    const keys = Object.keys(visitorData[0] || {});
    let orderedKeys = keys;

    if (keys.includes("Full Name")) {
        orderedKeys = ["Full Name"];
        if (keys.includes("Email")) {
            orderedKeys.push("Email");
        }
        orderedKeys = orderedKeys.concat(
            keys.filter(key => key !== "Full Name" && key !== "Email")
        );
    }

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

    // 🔴 block handler (pushes selected into blocked array)
    const handleBlock = (rows) => {
        const newBlocked = rows.map(i => visitorData[i]);
        setBlocked(prev => [...prev, ...newBlocked]);
        setSelected([]); // clear selection
    };
    useEffect(() => {
        if (blocked.length > 0) {
        setVisitorData(blocked)
        }
    },[blocked])

    return (
        <>
            {selected.length > 0 && (
                <div className='absolute top-11 right-10 z-50'>
                    <SelectOperations
                        selected={selected}
                        onBlock={handleBlock}
                    />
                </div>
            )}

            {/* Table always rendered with visitorData (original) */}
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
                        <th className='w-[150px] sm:w-[250px] py-4 px-2 capitalize'>S no.</th>

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
                            className={`${selected.includes(i) ? "bg-[#E2E6FF]" : ""} border-b border-b-[#ACACAC] transition-all duration-150`}
                        >
                            <td className='w-[5px] sm:w-[10px] py-4 pl-8'>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(i)}
                                    onChange={() => handleSelect(i)}
                                    className="w-5 h-5"
                                />
                            </td>
                            <td className="w-[150px] sm:w-[250px] px-2 py-4 break-words whitespace-normal">
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


        </>
    );
};

export default VisitorDataTable;

// ---------------------

export const SelectOperations = ({ selected, onBlock }) => {
    const handleDelete = () => {
        alert(`Delete rows: ${selected.join(', ')}`);
    };

    const handleEmail = () => {
        alert(`Send email to rows: ${selected.join(', ')}`);
    };

    const handleEdit = () => {
        alert(`Edit row: ${selected[0]}`);
    };

    return (
        <div className='flex gap-5 z-50'>
            <Button onClick={handleDelete}><TrashIcon className="w-6 text-black" /></Button>
            <Button onClick={handleEmail}><EnvelopeIcon className="w-6 text-black" /></Button>
            <Button onClick={handleEdit} disabled={selected.length !== 1}>
                <PencilSquareIcon className="w-6 text-black" />
            </Button>

            {/* 🔴 Use existing Block Button */}
            <Button
                color="error"
                onClick={() => onBlock(selected)}
                sx={{ borderRadius: 10 }}
            >
                <LockClosedIcon className="w-6 text-black" />
            </Button>
        </div>
    );
};
