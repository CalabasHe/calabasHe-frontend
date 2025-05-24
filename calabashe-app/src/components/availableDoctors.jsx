import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { bookDoctor, getAvailableDoctors } from "../api/bookings";
import { format } from "date-fns";
import { toast } from "sonner";
import { getCookie } from "../utils/cookies";

// eslint-disable-next-line react/prop-types
const AvailableDoctors = ({ showPopUp, handlePopUp }) => {
    const [results, setResults] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const getAvailableOnes = async () => {
            setResults(await getAvailableDoctors());
        }
        getAvailableOnes();
    }, [showPopUp]);
    const handleNext = () => {
        if (currentIndex < results.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const handlePrev = () => {
        if (currentIndex >= 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleBooking = async (id, booking_type, booking_date) => {
        const access = getCookie("accessToken");
        if (!access) {
            toast.error("Please login to book")
            return
        }
        try {
            toast.loading("Booking appointment");
            setDisabled(true)
            await bookDoctor({ doctor: id, booking_type: "video", booking_date: format(booking_date, "yyyy-MM-dd"), booking_time: format(booking_date, 'HH:mm') });
            toast.success("Appointment created")
        } catch (error) {
            toast.error("An error occurred, please try again later")
        } finally {
            toast.dismiss()
        }
    }
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
                    <div className="w-[95%] md:w-[50%] lg:w-[40%] h-max max-h-[700px] overflow-y-scroll scrollbar-thin bg-white p-5 rounded-md">
                        <button onClick={handlePopUp}>
                            <CgClose size={30} />
                        </button>
                        <h2 className="text-xl font-semibold ml-5">Available Doctors</h2>
                        {results.length > 0 ? (
                            <div className="space-y-6">
                                <div key={results[currentIndex].id}>
                                    <div className="flex border-b-[0.5px] w-[90%] border-gray-400 py-3 mx-auto gap-7">
                                        <div className="w-max rounded-lg flex items-center justify-center">
                                            {results[currentIndex].image ? (
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        src={results[currentIndex].image}
                                                        alt={results[currentIndex].name}
                                                        className="size-16 lg:size-20 rounded-lg object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <svg
                                                        className="size-16 lg:size-20 fill-gray-700"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                    >
                                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-xl font-semibold">Dr. {results[currentIndex].name}</h3>
                                            <div className="text-gray-600 flex items-center gap-2 md:text-sm">
                                                <p>Reviews {results[currentIndex].total_reviews}</p>
                                                <span className="w-2.5 h-2.5 mb-0.5 bg-gray-600 rounded-full"></span>
                                            </div>
                                            <p className="text-gray-600 text-sm md:text-xs">{results[currentIndex].specialty}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 w-[90%] mx-auto">
                                        <p className="text-sm">I'm available from :</p>
                                        <div className="flex justify-between items-end">
                                            {results[currentIndex].availableTimes.map((time, index) => (

                                                <div key={index} className="flex justify-between items-center w-full">
                                                    <div className="flex gap-4 h-max mt-1" key={index}>
                                                        <p className="text-sm bg-green-500 px-2 py-1">{format(time.start, 'HH:mm')}</p>
                                                        <p className="text-sm bg-green-500 px-2 py-1">
                                                            {format(time.end, 'HH:mm')}
                                                        </p>

                                                    </div>
                                                    <button
                                                        disabled={disabled}
                                                        className="text-xs font-semibold border shadow-md rounded-lg p-2 md:px-3 md:py-3 self-start"
                                                        onClick={() => {
                                                            handleBooking(results[currentIndex].id, "video", time.start);
                                                        }}
                                                    >Book Now <span className="hidden md:inline">Service</span></button></div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full gap-4 justify-center items-center">
                                    <button  disabled={currentIndex <= 0}   onClick={handlePrev} className="border bg-slate-400 px-2 disabled:cursor-not-allowed">Prev</button>
                                    <button  disabled={currentIndex >= results.length - 1}  onClick={handleNext} className="border bg-slate-400 px-2 disabled:cursor-not-allowed">Next</button>
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