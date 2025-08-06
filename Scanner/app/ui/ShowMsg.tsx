import { motion, AnimatePresence } from "framer-motion";

export default function ShowMsg({ isMsg, message , onClose }: { isMsg: Boolean, message: String | null , onClose : ()=> void }) {
    return (
        <AnimatePresence>
            {isMsg && (
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
                        <div className="flex flex-col items-center w-full text-black h-40 justify-around">
                            <div className="flex flex-col w-full">
                                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 mt-5 w-fit mx-auto">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                        {/* <FontAwesomeIcom icon="check-circle" /> */}
                                    </span>{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-800">
                                        {message}
                                    </span>
                                </h1>
                            </div>
                            <button
                                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}