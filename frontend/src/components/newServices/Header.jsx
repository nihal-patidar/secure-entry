import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const { userData , image } = useContext(UserContext);
    const { name } = userData || {};
    const navigate = useNavigate()

    const segments = location.pathname.split("/").filter(Boolean);

  const isMongoId = (str) => /^[a-f0-9]{24}$/i.test(str);

  let label = "Home";

  if (segments.length === 0) {
    label = "Home";
  } else {
    const last = segments[segments.length - 1];
    const secondLast = segments[segments.length - 2];

    if (isMongoId(last)) {
      // Ends with an ID — show "Service"
      label = "Service";
    } else if (isMongoId(secondLast)) {
      // Ends with /:id/visitors or /:id/edit — show that last segment
      label = last;
    } else {
      label = last;
    }
  }

    return (
        <header className="fixed top-4 md:left-80 left-28 right-6 z-40 p-4 rounded-3xl bg-[#F2F3F9] border-2 border-[#EAEAEA] flex justify-between items-center">
            {/* Left section: Path + Title */}
            <div className="flex flex-col gap-1">
        <span className="lg:text-xs text-[8px]">
          <span className="text-[#2C3ED3] font-medium">Location</span>:{" "}
            {location.pathname}
        </span>

                <div className="flex items-center gap-2">
                    <button
                    onClick={()=>{
                        navigate(-1)
                    }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#2C3ED3] hover:scale-105 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                    </button>

                    <h1 className="sm:text-xl xl:text-2xl  font-semibold text-[#2C3ED3] leading-tight">
                        {
                        label
                        }
                    </h1>
                </div>
            </div>

            {/* Right section: User */}
            <div className="flex items-center gap-[6px] lg:gap-[10px] xl:gap-[24px] ">
                <button>
                    <svg
                        className="bg-[#2C3ED3] p-1 rounded-full xl:h-12 xl:w-12 h-8 w-8"
                        
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M31.8335 25.1875L28.876..."
                            fill="white"
                        />
                    </svg>
                </button>

                <img
                    src={image || userData?.image}
                    alt="Profile"
                    className="xl:h-12 xl:w-12 h-8 w-8 rounded-full object-cover"
                />

                <Link to="/home/profile">
                    <div className="hidden sm:block  sm:text-[12px] lg:text-[14px] xl:text-[18px]">
                        <h2 className="text-[#494949] font-semibold hidden sm:block  sm:text-[12px] lg:text-[14px] xl:text-[18px]">
                            {name || "Loading..."}
                        </h2>
                        <div className="text-sm text-[#7E7E7E]">admin</div>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
