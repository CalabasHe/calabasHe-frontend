import { CgClose } from "react-icons/cg";
import consultation from '../assets/images/consult.png'
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getAvailableDoctors } from "../api/bookings";

const AvailableDoctors = ({ showPopUp, handlePopUp }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getAvailableOnes = async () => {
            setResults(await getAvailableDoctors());
        }
        getAvailableOnes();
    }, [showPopUp]);

    // useEffect(() => {
    //     console.log(results)
    // }, [results]);
    return (
        <AnimatePresence>
            {showPopUp && (
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black bg-opacity-20 z-20 flex items-center justify-center">
                    <div className="w-[95%] md:w-[50%] lg:w-[45%] h-max bg-white p-5 rounded-md">
                        <button onClick={handlePopUp}>
                            <CgClose size={30} />
                        </button>
                        <h2 className="text-xl font-semibold ml-5">Available Doctors</h2>
                        {results.length > 0 ? (
                            <div>
                                <div className="flex border-b-[0.5px] border-gray-400 py-3">
                                    <div className="w-[30%] rounded-lg">
                                        <svg
                                            className="size-16 lg:size-24 fill-gray-700"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl font-semibold">Dr Jessica</h3>
                                        <div className="text-gray-600 flex items-center gap-2">
                                            <p>Reviews 23</p>
                                            <span className="w-2.5 h-2.5 bg-gray-600 rounded-full"></span>
                                        </div>
                                        <p className="text-gray-600 text-sm">Surgeon</p>
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <p className="text-sm">I’m available from :</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-xl text-gray-600 mt-4">
                                No Doctors Available
                            </div>
                        )}
                    </div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}

export default AvailableDoctors;