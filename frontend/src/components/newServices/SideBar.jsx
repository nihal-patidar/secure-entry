import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import { CiLogout } from "react-icons/ci";


export const SideBar = (props) => {
    const [colorTrue, setColorTrue] = useState(null);

    const sidebarItems = [
        { id: 'divA', label: 'Dashboard', icon: Icons.dashboard },
        { id: 'divB', label: 'Services', icon: Icons.services },
        { id: 'divC', label: 'Add Services', icon: Icons.addServices },
        { id: 'divD', label: 'Validator', icon: Icons.validator },
        { id: 'divE', label: 'Add Validator', icon: Icons.addValidator },
        { id: 'logout', label: 'Logout', icon: CiLogout }, // optional icon
    ];

    return (
        <div className={`fixed flex flex-col items-center pt-16 px-4 mx-0 gap-6 left-0 w-72 h-full bg-[#E2E6FF] border border-[#D8D8D8] text-black ${props.className || ''}`}>
            <h1 className="font-bold text-3xl text-[#4D4D4D] p-2 mb-6">
                Secure Entry
            </h1>

            {sidebarItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => setColorTrue(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
            ${colorTrue === item.id ? 'bg-[#2C3ED3] text-white' : 'bg-[#E2E6FF] text-[#2D2D2D] hover:bg-[#CBD3FF]'}`}
                >

                        <span>{item.icon}</span>
                    <h2 className="text-lg font-medium">{item.label}</h2>
                </div>
            ))}
        </div>
    );
};
