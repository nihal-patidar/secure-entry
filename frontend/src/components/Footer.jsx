import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const liClass = "text-sm text-[#797979] hover:text-white cursor-pointer";
  const navigate = useNavigate();

  // Helper function to go to "/" then scroll
  const goToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay for page render
  };

  return (
    <div className="font-sans">
      <footer className="bg-black text-white py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left side - Logo & Socials */}
          <div className="w-full md:w-[300px]">
            <h2 className="text-2xl font-bold">
              Secure <br /> Entry
            </h2>
            <p className="text-sm text-[#797979] mt-4">
              Secure entry should be effortless. Start with Secure Entry today.
            </p>
            <div className="flex gap-4 mt-10 text-lg text-[#797979]">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaLinkedinIn className="hover:text-white cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
              <FaEnvelope className="hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Right side - Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="prods">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li onClick={() => navigate("/home")} className={liClass}>
                  Home
                </li>
                <li onClick={() => goToSection("creator")} className={liClass}>
                  Features
                </li>
                <li onClick={() => goToSection("services")} className={liClass}>
                  How it Works
                </li>
                <li className={liClass}>Demo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li onClick={() => navigate("/teams")} className={liClass}>
                  Careers
                </li>
                <li
                  onClick={() => goToSection("contact")}
                  className={liClass}
                >
                  Support
                </li>
                <li
                  onClick={() => goToSection("contact")}
                  className={liClass}
                >
                  Contact
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center text-xs text-[#797979] mt-10">
          <p>© {new Date().getFullYear()} E-Validation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
