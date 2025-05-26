/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import StarRating from './ratingStars';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { IoIosVideocam } from "react-icons/io";


const AvailableDoctorSm = ({ doctor, handleAppointmentDetails }) => {
    const go = useNavigate();
    const [availableDates, setAvailableDates] = useState([]);
    const [showPopUp, setShowPopup] = useState(false);

    const toProfile = (slug) => {
        go(`/doctors/${slug}`);
    };

    const groupByDate = (dates) => {
        return dates.reduce((acc, curr) => {
            const dateKey = format(curr.start, 'yyyy-MM-dd');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(curr);
            return acc;
        }, {});
    };

    useEffect(() => {
        if (!doctor?.availableTimes) return;

        const dates = doctor.availableTimes.map((timeslot) => {
            const start = new Date(timeslot.start);
            const end = new Date(timeslot.end);
            return { start, end };
        });

        setAvailableDates(dates);
    }, [doctor]);

    const grouped = groupByDate(availableDates);

    return (
        <div className="min-[820px]:hidden mt-4 border bg-white shadow-md rounded-lg w-full overflow-hidden">
            {/* Doctor Info Section */}
            <div className="px-4 py-5">
                <section className="w-full flex gap-4">
                    {/* Doctor Image */}
                    <div className='relative'>
                        <div className="min-w-28 lg:min-w-36 size-28 lg:size-36 flex items-center justify-center bg-gray-300 rounded-full">
                            {doctor.image ? (
                                <img
                                    className="object-cover w-full h-full rounded-[inherit]"
                                    src={doctor.image}
                                    alt="Doctor profile"
                                />
                            ) : (
                                <svg
                                    className="justify-self-center w-12 md:w-14 lg:w-16 fill-gray-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                </svg>
                            )}
                        </div>
                        <div className="absolute -bottom-2 left-14 transform -translate-x-1/2">
                            <div className="bg-green-500 rounded-full p-2 shadow-lg border-2 border-white">
                                <IoIosVideocam size={10} />
                            </div>
                        </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                            Dr. {doctor.name}
                        </h3>
                        <p className="text-sm font-medium mb-3">
                            {doctor.specialtyTag}
                        </p>

                        {/* Available Times */}
                        <div className="space-y-3">
                            {Object.entries(grouped).slice(0, 2).map(([dateKey, slots]) => (
                                <div key={dateKey}>
                                    <p className="text-xs font-medium text-gray-700 mb-2">
                                        {format(new Date(dateKey), 'E, MMM d')}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {slots.slice(0, 3).map((slot, index) => (
                                            <button
                                                key={index}
                                                className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm hover:bg-blue-700 transition"
                                                onClick={() => {
                                                    handleAppointmentDetails({
                                                        doctor: doctor.id,
                                                        booking_date: format(slot.start, 'yyyy-M-d'),
                                                        booking_time: format(slot.start, 'HH:mm'),
                                                        booking_type: "video"
                                                    })
                                                }}
                                            >
                                                {format(slot.start, 'h:mm a')}
                                            </button>
                                        ))}
                                        {slots.length > 3 && (
                                            <span className="text-xs text-gray-500 px-2 py-1">
                                                +{slots.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="px-4 pb-4">
                <button
                    onClick={() => toProfile(doctor.slug)}
                    className="w-full bg-[#205CD4] text-white font-medium text-base py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default AvailableDoctorSm;