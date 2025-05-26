// eslint-disable-next-line react/prop-types
import { CgClose } from "react-icons/cg";
import StarRating from "./ratingStars.jsx";
import { useEffect } from "react";

import TimeSlots from "./TimeSlots.jsx";
import { bookDoctor } from "../api/bookings.js";
import { format } from "date-fns";
import { toast } from "sonner";




// eslint-disable-next-line react/prop-types
const ConfirmBooking = ({ results, showPopUp, handlePopUp, popUpDetails, daySelected, handleConfirm }) => {

  const handleBookingSelected = async (day, booking_type) => {
    try {
      toast.loading("Booking")
      await bookDoctor({ doctor: popUpDetails.id, booking_date: format(day, 'yyy-M-d'), booking_time: format(day, 'HH:mm'), booking_type});
      handlePopUp(false);
      toast.success("Appointment has been booked");

    } catch (err) {
      if (err.status === 401) {
        toast.error("Please login to book");
      } else {
        toast.error("An error occurred while booking");
      }
    }
    finally {
      toast.dismiss();
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
        <h3 className="font-bold text-xl mx-5 my-4 text-center">Confirm your appointment</h3>
        <div className="flex justify-center gap-16 w-full md:w-[90%] mx-auto pb-4 border-b-2 border-stone-400">
          <button className="boarder bg-green-500 rounded-lg px-5 py-2" onClick={() =>{
             handlePopUp(false)
             handleConfirm()
          }}>Yes</button>
          <button onClick={() => handlePopUp(false)} className="boarder bg-green-500 rounded-lg px-5 py-2">Cancel</button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmBooking;