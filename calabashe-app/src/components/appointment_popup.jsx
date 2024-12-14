// eslint-disable-next-line react/prop-types
import { CgClose } from "react-icons/cg";
import StarRating from "./ratingStars.jsx";
import { useEffect, useState } from "react";

import TimeSlots from "./TimeSlots.jsx";
import { bookDoctor } from "../api/bookings.js";
import { format } from "date-fns";
import { toast } from "sonner";




// eslint-disable-next-line react/prop-types
const Appointment_popup = ({ results, showPopUp, handlePopUp, popUpDetails, daySelected }) => {

  const handleBookingSelected = async (day) => {
    try {
      await bookDoctor({ doctor: popUpDetails.id, booking_date: format(day, 'yyy-M-d'), booking_time: format(day, 'HH:mm') });
      handlePopUp(false);
    } catch (err) {
      if (err.status === 401) {
        toast.error("Please login to book");
      } else {
        toast.error("An error occurred while booking");
      }
    }
  }

  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopUp]);

  return (
    showPopUp &&
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white w-[93%] md:w-[60%] lg:w-[40%] h-max max-h-[500px] overflow-y-scroll scrollbar-thin shadow-md rounded-md z-30 px-2 py-3 relative flex flex-col">
        <button onClick={() => handlePopUp(false)} >
          <CgClose size={20} className="mx-5 text-xl cursor-pointer opacity-50 hover:opacity-100" />
        </button>
        <h3 className="font-bold text-xl mx-5 my-4">Book an appointment</h3>
        <div className="flex w-full md:w-[90%] mx-auto pb-4 border-b-2 border-stone-400">
          <div className="w-1/2 flex items-center justify-center mr-2 mb:mr-0">
            <div className="w-[125px] h-[125px] md:w-[150px] md:h-[150px] flex items-center justify-center rounded-full border overflow-hidden ml-4">
              {popUpDetails.image ? (
                <img
                  className="object-cover w-full h-full rounded-[inherit]"
                  src={popUpDetails.image}
                  alt={`image of doctor ${popUpDetails.name}`}
                />
              ) : (
                <svg
                  className="size-16 lg:size-24 fill-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col h-full mt-2 gap-3 items-start md:justify-center w-1/2">
            <h4 className='text-base md:text-2xl font-semibold'>{popUpDetails.name}</h4>
            <h4 className='text-base font-light text-stone-400'>Reviews {popUpDetails.totalReviews}</h4>
            <div className='flex flex-col md:flex-row gap-2 text-2xl items-center'>
              <StarRating rating={popUpDetails.totalReviews} />
              <p className='hidden md:block text-xs md:text-base text-stone-400'>{popUpDetails.totalReviews}</p>
            </div>
          </div>
        </div>
        <div className="flex w-[90%] flex-col mx-auto mt-5 gap-1 h-max">
          <h3 className="font-semibold">Available appointments</h3>
          <p className="text-sm text-stone-500">Click to book for free</p>
          <div className="">
            <TimeSlots results={results} daySelected={daySelected} handleBookingSelected={handleBookingSelected} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Appointment_popup