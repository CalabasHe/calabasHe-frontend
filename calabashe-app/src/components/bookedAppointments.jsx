import { useEffect, useState } from "react";
import { getDoctorBookings } from "../api/bookings";
import { ClipLoader } from "react-spinners";
import { format, addHours } from 'date-fns'
import { IoIosVideocam } from "react-icons/io";

import { Icon } from "@iconify/react/dist/iconify.js";
const BookedAppointments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem("email");
    const [bookingData, setBookingData] = useState();
    const mapIcons = {
        video: "mdi:video-outline",
        in_person: "ic:outline-people",
        voice: "ic:outline-phone"
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await getDoctorBookings(email);
                setBookingData(results);
                setIsLoading(false);
            } catch (error) {
                setError("Bookings could not be fetched");
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        isLoading && !bookingData ? (
            <div className=" w-max mx-auto">
                <ClipLoader />
            </div>
        ) : (
            error ?
                (<div className="text-red-500 text-xl w-max mx-auto">
                    {error}
                </div>) :
                (
                    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-100 bg-white shadow-sm relative">
                        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-4 items-center bg-gray-50 p-4 sticky top-0">
                            <div className="w-5" />
                            <div className="font-semibold text-gray-900">Patient name</div>
                            <div className="font-semibold text-gray-900">Starting time</div>
                            <div className="font-semibold text-gray-900">Ending time</div>
                            <div className="font-semibold text-gray-900">Meeting type</div>
                        </div>

                        {/* Appointment Rows */}
                        {bookingData.map((data, index) => {
                            const startTime = new Date(`${data.booking_date}T${data.booking_time}`)
                            const endTime = new Date(`${data.booking_date}T${data.end_time}`)
                            return (
                                <div key={index} className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-4 items-center p-4 border-t border-gray-100">
                                    <div className="flex items-center justify-center">
                                        <span className="w-5 h-5 text-white border rounded-full" />
                                    </div>
                                    <div className="text-gray-700 ml-5">{data.patient_name}</div>
                                    <div className="text-gray-700">{format(startTime, 'd MMM, yy HH:mm E')}</div>
                                    <div className="text-gray-700">{format(endTime, 'd MMM, yy HH:mm E')}</div>
                                    <div className="flex items-center text-gray-700 gap-2">
                                        <span className="capitalize ml-5">{data.booking_type}</span>
                                        <Icon icon={mapIcons[data.booking_type]} height={24} style={{ color: "black" }} className='' />
                                    </div>
                                </div>
                            )
                        })}

                        {bookingData.length === 0 && (
                            <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-4 items-center p-4 border-t border-gray-100">
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 text-white rounded-full" />
                                </div>
                                <div className="text-gray-500">--</div>
                                <div className="text-gray-500">--</div>
                                <div className="text-gray-500">--</div>
                                <div className="text-gray-500">--</div>
                            </div>
                        )}
                    </div>
                )

        )
    );
}

/**
 *             <div className="w-[90%] mx-auto p-10 rounded-xl">
                <div className="grid grid-cols-4 gap-4 font-semibold text-center mb-4">
                    <div>Patient Name</div>
                    <div>Booking Date</div>
                    <div>Starting Time</div>
                    <div>Meeting Type</div>
                </div>
                {bookingData.map((data, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-4 text-center">
                        <div className="p-5">{data.patient_name}</div>
                        <div className="p-5">{format(new Date(data.booking_date), 'MMM d, yyyy')}</div>
                        <div className="p-5">{format(new Date(`2024-01-01T${data.booking_time}`), 'h:mm a')}</div>
                        <div className="p-5 flex items-center justify-center gap-2">
                            <span className="capitalize">{data.booking_type}</span>
                        </div>
                    </div>
                ))}
            </div>
 */

export default BookedAppointments;