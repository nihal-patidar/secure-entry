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
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                    >
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.39a.5.5 0 0 0 .12-.65l-2-3.46a.5.5 0 0 0-.61-.21l-2.49 1a7.07 7.07 0 0 0-1.69-.98l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.63.25-1.2.57-1.69.98l-2.49-1a.5.5 0 0 0-.61.21l-2 3.46a.5.5 0 0 0 .12.65l2.11 1.39c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.39a.5.5 0 0 0-.12.65l2 3.46c.14.23.41.3.61.21l2.49-1c.49.41 1.06.74 1.69.98l.38 2.65A.5.5 0 0 0 10 22h4c.25 0 .46-.18.5-.42l.38-2.65c.63-.25 1.2-.57 1.69-.98l2.49 1c.2.09.47.02.61-.21l2-3.46a.5.5 0 0 0-.12-.65l-2.11-1.39zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
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
