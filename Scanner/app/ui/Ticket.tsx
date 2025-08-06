"use-client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

interface TicketProps {
  data: {
    visitor_data: Record<string, string>;
  };
  onClose: () => void;
  isOpen: boolean;
}

const Ticket: React.FC<TicketProps> = ({ data, onClose, isOpen }) => {
  const [Element, setElement] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      playSound();
      plotTicket();
    }
  }, [isOpen]);

  const playSound = () => {
    const sound = document.getElementById("verification-sound") as HTMLAudioElement;
    sound?.play();
  };

  const plotTicket = () => {
    const elements = Object.keys(data.visitor_data).map((key, indx) => (
      <tr key={indx}>
        <td className="p-2 border border-gray-300">{key}</td>
        <td className="p-2 border border-gray-300">{data.visitor_data[key]}</td>
      </tr>
    ));
    setElement(elements);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg bg-white rounded-t-2xl shadow-xl p-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col items-center w-full text-black">
              <div className="flex flex-col w-full">
                <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                  <thead>
                    <tr>
                      <th className="p-2 border border-gray-300">Fields</th>
                      <th className="p-2 border border-gray-300">Values</th>
                    </tr>
                  </thead>
                  <tbody>{Element}</tbody>
                </table>
              </div>
              <div className="flex flex-col w-full items-center mt-6">
                {/* <div className="w-[150px] h-[150px] mt-4 bg-transparent">
                  <img
                    className="rounded-full mx-auto"
                    // src={verifyGIF}
                    width="100"
                    height="100"
                    alt="Verification GIF"
                  />
                </div> */}
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 mt-5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    <FontAwesomeIcon icon="check-circle" />
                  </span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Verified
                  </span>
                </h1>
                <div className="flex flex-col text-center text-gray-600">
                  {/* <p>Ticket Service</p> */}
                  {/* <p>Provided By :</p> */}
                  <p className="font-bold">Provided By : ** SolutionHeap **</p>
                  {/* <p className="mt-2">Contact Us :</p> */}
                  <p>Contact : asksolutionheap@gmail.com</p>
                </div>
              </div>
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                onClick={onClose}
              >
                Close Ticket
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Ticket;
