import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { Icons } from '../../utils/icons';
import { UserContext } from '../../context//UserContext.jsx'; // adjust paths as needed
import { ServiceContext } from '../../context/ServiceContext.jsx';
import { dataContext } from '../../context/DataState.jsx';

export const SideBar = (props) => {
    const [activeId, setActiveId] = useState('divA');
    const navigate = useNavigate();

    const { setUserData } = useContext(UserContext);
    const { setServices } = useContext(ServiceContext);
    const { setAllValidator } = useContext(dataContext);

    const logout = () => {
        localStorage.removeItem("userData");
        setUserData(null);
        setServices([]);
        setAllValidator([]);
        navigate("/");
    };

    const sidebarItems = [
        { id: 'divA', label: 'Dashboard', icon: Icons.dashboard, path: '/home' },
        { id: 'divB', label: 'Services', icon: Icons.services, path: '/home/services' },
        { id: 'divC', label: 'Add Services', icon: Icons.addServices, path: '/home/services/add-service' },
        { id: 'divD', label: 'scanner', icon: Icons.validator, path: '/home/validators' },
        { id: 'divE', label: 'Contact us', icon: Icons.addValidator, path: '/home/create-validator-form' },
        { id: 'logout', label: 'Logout', icon: <CiLogout />, click: logout },
    ];

    const handleClick = (item) => {
        if (item.click) {
            item.click();
        }else if(item.path == '/home/validators'){
            window.location.href = "https://pass-scanner.vercel.app/";
        }
        else if (item.path) {
            setActiveId(item.id);
            navigate(item.path);
        }
    };

    return (
        <div className={`fixed flex flex-col items-center pt-16 px-4 mx-0 gap-6 left-0 w-72 h-full bg-[#E2E6FF] border border-[#D8D8D8] text-black ${props.className || ''}`}>
            <h1 className="font-bold text-3xl text-[#4D4D4D] p-2 mb-6">
                Secure Entry
            </h1>

            {sidebarItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                        ${activeId === item.id ? 'bg-[#2C3ED3] text-white' : 'bg-[#E2E6FF] text-[#2D2D2D] hover:bg-[#CBD3FF]'}`}
                >
                    <span>{item.icon}</span>
                    <h2 className="text-lg font-medium">{item.label}</h2>
                </div>
            ))}
        </div>
    );
};
