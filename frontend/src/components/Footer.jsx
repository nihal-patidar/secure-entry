import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
//npm i react-icons

export default function Footer() {
  const liClass = "text-sm text-[#797979]  hover:text-white cursor-pointer";

  return (
    <div className="font-sans">
      <footer className="bg-black text-white py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full md:w-[300px]">
            <h2 className="text-2xl font-bold">
              Secure <br /> Entry
            </h2>
            <p className="text-sm text-[#797979] mt-4">
              Secure entry should be effortless. Start with Secure Entry today.
            </p>
            <div className="flex gap-4 bottom-0 mt-10 text-lg text-[#797979]">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaLinkedinIn className="hover:text-white cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
              <FaEnvelope className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10" id="prods">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li className={liClass}>Dashboard</li>
                <li className={liClass}>Analytics</li>
                <li className={liClass}>Reports</li>
                <li className={liClass}>Alerts</li>
                <li className={liClass}>Monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li className={liClass}>Security</li>
                <li className={liClass}>Access Logs</li>
                <li className={liClass}>Device Control</li>
                <li className={liClass}>Policy Manager</li>
                <li className={liClass}>Authentication</li>
                <li className={liClass}>Authentication</li>
                <li className={liClass}>Authentication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li className={liClass}>API Access</li>
                <li className={liClass}>Integrations</li>
                <li className={liClass}>Webhooks</li>
                <li className={liClass}>SDK</li>
                <li className={liClass}>Docs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li className={liClass}>Pricing</li>
                <li className={liClass}>Support</li>
                <li className={liClass}>FAQ</li>
                <li className={liClass}>Blog</li>
                <li className={liClass}>Careers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-[#797979] mt-10">
          {" "}
          <p>
            © {new Date().getFullYear()} E-Validation . All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
