import { useState } from "react";
import { getTimeSlots } from "../api/bookings.js";
import { addDays, addMonths, format, startOfDay, isWithinInterval, isFuture } from "date-fns";

const TimeSlots = ({ results, daySelected, handleBookingSelected }) => {
  const byMonth = {};

  const [timeRange, setTimeRange] = useState(2);
  const [show, setShow] = useState(true);
  if (!results) {
    return null;
  }

  results.map(result => {
    const startDate = new Date(`${result.year}-${result.month}-${result.day_of_month}T${result.start_time}`);
    // const endDate = new Date(`${result.year}-${result.month}-${result.day_of_month}T${result.end_time}`);
    const idx = format(startDate, 'd');

    const startDateStart = startOfDay(startDate);
    const daySelectedStart = startOfDay(daySelected);

    const isInInterval = isWithinInterval(startDateStart, {
      start: daySelectedStart,
      end: addDays(daySelectedStart, timeRange)
    });

    if (isInInterval) {
      if (byMonth.hasOwnProperty(idx.toString())) {
        byMonth[idx.toString()].push(startDate);
      } else {
        byMonth[idx.toString()] = [startDate];
      }
    }
  });


  return (
    <div>
      {Object.keys(byMonth).map((key, idx) => {
        const date = format(byMonth[key][0], 'E, d MMM');
        return (
          <div key={idx} className="">
            <h1 className="font-semibold text-sm mb-2">{date}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3 w-max" key={idx}>
              {byMonth[key].map((day, index) => {
                return (
                  <div className="bg-green-400 w-max hover:bg-green-600" key={index}>
                    <button className="w-max p-1" onClick={() => { handleBookingSelected(day) }}>
                      {format(day, 'HH:mm b')}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <button className={`border w-full text-center border-black mt-2 ${show? 'block': 'hidden'}`}
        onClick={() => {
          setTimeRange(7)
          setShow(false);
        }}>
        Show More Availability
      </button>
      <p className={`w-full text-center text-gray-500 mt-2 ${show? 'hidden': 'block'}`}>No More Availability</p>
    </div>
  )
}

export default TimeSlots;