import "../index.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/newServices/SideBar.jsx";
import { TabletMenu } from "../components/newServices/TabletMenu.jsx";
import Header from "../components/newServices/Header.jsx";

const SIDEBAR_WIDTH = 180;
const TABLET_MENU_WIDTH = 64;
const HEADER_HEIGHT = 60;

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="fixed top-0 left-80  right-0 h-[60px] bg-white z-30 shadow-sm px-4 flex items-center">
        <Header />
      </div>

      {/* Sidebar */}
      {!isMobile && (
        <div className="fixed top-0 left-0 w-[180px] h-[calc(100vh-60px)] bg-black text-white z-20 border-r border-gray-300 overflow-y-auto">
          <SideBar />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div className="fixed top-0 left-0 h-full w-16 z-30 bg-white border-r border-gray-300">
          <TabletMenu />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`absolute top-[60px] ${
          isMobile ? "left-[0px]" : "left-[210px]"
        } right-0 bottom-0 bg-gray-50 overflow-hidden`}
      >
        {/* Inner content wrapper to prevent unwanted scrolling */}
        <div className="h-full w-full overflow-hidden p-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// const ProfileCard = () => {
//   const { userData } = useContext(UserContext);
//   return (
//     <div className="flex  h-full w-[160px]    rounded-lg  text-center transform transition-transform duration-300 ease-in-out ">
//       {/* Profile Picture with Glow Effect */}
//       <div className="relative w-10 h-10 mx-auto mb-2 overflow-hidden rounded-full border-2 border-white  hover:transition-transform duration-300 ease-in-out">
//         <img
//           src={userData?.image} // Replace with your actual image URL
//           alt="Profile"
//           className="w-full h-full object-cover"
//         />
       
//       </div>

//       {/* User Name and ID */}
//       <div>
//       <h3 className="text-[16px] font-semibold text-[#494949]">{userData?.name}Asad Qureshi</h3>
//       <p className="text-[10px]   font-medium text-[#7E7E7E]">{userData?.email}asqu8888@gmail.com</p>
//       </div>

//       {/* View Profile Button with Gradient */}
//       {/* <div className="flex justify-center mt-2">
//         <Link to="/home/profile">
//           <button className="px-4 py-1 text-xs text-white rounded-full border border-[#FFEB55] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
//             View Profile
//           </button>
//         </Link>
//       </div> */}
//     </div>
//   );
// };


export default Home;


// const Sidebar = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const navigate = useNavigate();
//   const { setUserData } = useContext(UserContext);
//   const { setServices } = useContext(ServiceContext);
//   const { setAllValidator } = useContext(dataContext);
//
//   const logout = () => {
//     localStorage.removeItem("userData");
//     setUserData(null);
//     setServices([]);
//     setAllValidator([]);
//     navigate("/");
//   };
//
//   const sidebarItems = [
//     { id: 0, name: "Dashboard", path: "/home", icon: faTachometerAlt },
//     { id: 1, name: "Services", path: "/home/services", icon: faServer },
//     { id: 3, name: "Add Service", path: "/home/create-service", icon: faAdd },
//     { id: 2, name: "Validator", path: "/home/validators", icon: faTicket },
//     {
//       id: 4,
//       name: "Add Validator",
//       path: "/home/create-validator-form",
//       icon: faAdd,
//     },
//     { id: 5, name: "Logout", path: "/", icon: faSignOutAlt, click: logout },
//   ];
//
//   const handleItemClick = (id) => {
//     setActiveIndex(id);
//   };
//
//   return (
//       <div className="flex flex-col h-full w-full text-base sm:text-base text-white p-4">
//         <div className="hidden sm:block h-16">
//           <Logo />
//         </div>
//         <ul className="flex-grow mt-16 sm:mt-1">
//           {sidebarItems.map((item) => (
//               <li key={item.id} className="theme-6" onClick={item.click}>
//                 <Link
//                     to={item.path}
//                     className={`flex items-center px-4 py-2 transition-colors w-full duration-300 rounded-md
//                 ${
//                         activeIndex === item.id
//                             ? "bg-[#D91656] text-[#FFEB55] font-semibold"
//                             : "hover:bg-[#FFEB55] hover:text-[#640D5F]"
//                     }`}
//                     onClick={() => handleItemClick(item.id)}
//                     aria-current={activeIndex === item.id ? "page" : undefined}
//                 >
//                   <FontAwesomeIcon icon={item.icon} className="mr-2" />
//                   {item.name}
//                 </Link>
//               </li>
//           ))}
//         </ul>
//       </div>
//   );
// };

// const Navbar = () => {
//   let { userData } = useContext(UserContext);
//
//   //logout
//   let navigate = useNavigate();
//   const logout = () => {
//     localStorage.removeItem("userData");
//     navigate("/");
//   };
//   return (
//       <div className="nav px-8 sm:pl-64 py-5 flex items-center justify-center sm:justify-end theme-1 h-16 w-full z-[90]">
//         <div className="sm:hidden ">
//           <Logo />
//         </div>
//         <MadeWithLove />
//       </div>
//   );
// };

// const ProfileCard = () => {
//   const { userData } = useContext(UserContext);
//   return (
//       <div className="mt-auto p-4 w-full max-w-xs border-2 bg-transparent  rounded-lg shadow-2xl text-center transform transition-transform duration-300 ease-in-out border-[#FFEB55]">
//         {/* Profile Picture with Glow Effect */}
//         <div className="relative w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full border-2 border-[#FFEB55] shadow-lg hover:transition-transform duration-300 ease-in-out">
//           <img
//               src={userData?.image} // Replace with your actual image URL
//               alt="Profile"
//               className="w-full h-full object-cover"
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60" />
//         </div>
//
//         {/* User Name and ID */}
//         {/* <h3 className="text-lg font-bold text-gray-100">{userData.name}</h3> */}
//         <p className="text-xs theme-3 mt-1 font-semibold">{userData?.email}</p>
//
//         {/* View Profile Button with Gradient */}
//         <div className="flex justify-center mt-2">
//           <Link to="/home/profile">
//             <button className="px-4 py-1 text-xs text-white rounded-full border border-[#FFEB55] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
//               View Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//   );
// };

