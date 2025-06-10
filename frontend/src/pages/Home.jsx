import "../index.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faCog,
  faEnvelope,
  faSignOutAlt,
  faSuitcase,
  faServer,
  faAdd,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import Logo from "../components/small/Logo";
import { ServiceContext } from "../context/ServiceContext";
import { dataContext } from "../context/DataState";
import MadeWithLove from "../components/small/Signature";
import MadeWithLoveM from "../components/small/SignatureMobile";
import MainBody from '../components/newServices/MainBody'

const Home = () => {
  // const [showSidebar, setShowSidebar] = useState(true);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   // Update state based on screen size
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768); // Mobile threshold
  //   };

  //   handleResize(); // Check initial screen size
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

//   return (
//     <div className="flex w-full h-screen">
//       <div></div>
//       <button
//         className="sm:hidden absolute top-5 left-6 z-[100] text-white h-fit w-fit p-2 rounded-full shadow-lg focus:outline-none transition-transform duration-300"
//         onClick={() => setShowSidebar(!showSidebar)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>

//       {showSidebar && (
//         <div
//           onMouseLeave={() => {
//             if (isMobile) {
//               setShowSidebar(!showSidebar);
//             }
//           }}
//           className={`absolute z-50 sm:static w-52 sm:w-60 theme-4 sidebar ${
//             showSidebar ? "open" : "closed"
//           }`}
//         >
//           <Sidebar />
//         </div>
//       )}
//       <div className={`flex flex-col w-full h-full`}>
//         <Navbar />
//         <Outlet />
//       </div>
//       <div className="sm:hidden flex justify-center items-center h-2 absolute bottom-0 w-full z-50 ">
//         <div>
//           <MadeWithLoveM></MadeWithLoveM>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const navigate = useNavigate();
//   const { setUserData } = useContext(UserContext);
//   const { setServices } = useContext(ServiceContext);
//   const { setAllValidator } = useContext(dataContext);

//   const logout = () => {
//     localStorage.removeItem("userData");
//     setUserData(null);
//     setServices([]);
//     setAllValidator([]);
//     navigate("/");
//   };

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

//   const handleItemClick = (id) => {
//     setActiveIndex(id);
//   };

//   return (
//     <div className="flex flex-col h-full w-full text-base sm:text-base text-white p-4">
//       <div className="hidden sm:block h-16">
//         <Logo />
//       </div>
//       <ul className="flex-grow mt-16 sm:mt-1">
//         {sidebarItems.map((item) => (
//           <li key={item.id} className="theme-6" onClick={item.click}>
//             <Link
//               to={item.path}
//               className={`flex items-center px-4 py-2 transition-colors w-full duration-300 rounded-md 
//                 ${
//                   activeIndex === item.id
//                     ? "bg-[#D91656] text-[#FFEB55] font-semibold"
//                     : "hover:bg-[#FFEB55] hover:text-[#640D5F]"
//                 }`}
//               onClick={() => handleItemClick(item.id)}
//               aria-current={activeIndex === item.id ? "page" : undefined}
//             >
//               <FontAwesomeIcon icon={item.icon} className="mr-2" />
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <ProfileCard></ProfileCard>
//     </div>
//   );
// };

// const Navbar = () => {
//   let { userData } = useContext(UserContext);

//   //logout
//   let navigate = useNavigate();
//   const logout = () => {
//     localStorage.removeItem("userData");
//     navigate("/");
//   };
//   return (
//     <div className="nav px-8 sm:pl-64 py-5 flex items-center justify-center sm:justify-end theme-1 h-16 w-full z-[90]">
//       <div className="sm:hidden ">
//         <Logo />
//       </div>
//       <MadeWithLove />
//     </div>
//   );
// };

// const ProfileCard = () => {
//   const { userData } = useContext(UserContext);
//   return (
//     <div className="mt-auto p-4 w-full max-w-xs border-2 bg-transparent  rounded-lg shadow-2xl text-center transform transition-transform duration-300 ease-in-out border-[#FFEB55]">
//       {/* Profile Picture with Glow Effect */}
//       <div className="relative w-20 h-20 mx-auto mb-2 overflow-hidden rounded-full border-2 border-[#FFEB55] shadow-lg hover:transition-transform duration-300 ease-in-out">
//         <img
//           src={userData?.image} // Replace with your actual image URL
//           alt="Profile"
//           className="w-full h-full object-cover"
//         />
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60" />
//       </div>

//       {/* User Name and ID */}
//       {/* <h3 className="text-lg font-bold text-gray-100">{userData.name}</h3> */}
//       <p className="text-xs theme-3 mt-1 font-semibold">{userData?.email}</p>

//       {/* View Profile Button with Gradient */}
//       <div className="flex justify-center mt-2">
//         <Link to="/home/profile">
//           <button className="px-4 py-1 text-xs text-white rounded-full border border-[#FFEB55] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
//             View Profile
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };
return(
  <>
  <MainBody/>
  </>
)
}
export default Home;
