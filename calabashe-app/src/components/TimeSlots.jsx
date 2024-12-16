import { useState } from "react";
import { addDays, format, startOfDay, isWithinInterval } from "date-fns";
import { Icon } from '@iconify/react';

const TimeSlots = ({ results, daySelected, handleBookingSelected }) => {
  const byMonth = {};
  const mapIcons = {
    video: "mdi:video-outline",
    in_person: "ic:outline-people",
    voice: "ic:outline-phone"
  }


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
    const bookingType = result.booking_type;
    const isInInterval = isWithinInterval(startDateStart, {
      start: daySelectedStart,
      end: addDays(daySelectedStart, timeRange)
    });

    if (isInInterval && result.is_available) {
      byMonth[idx.toString()] = byMonth[idx.toString()] || { bookings: [] };
      byMonth[idx.toString()].bookings.push({
        time: startDate,
        bookingtype: result.booking_type
      });
    }
  });

  return (
    <div>
      {Object.keys(byMonth).length === 0 ? (
        <div className="text-center text-gray-500 my-4">
          No booking slots available
        </div>
      ) : (
        Object.keys(byMonth).map((key, idx) => {
          const times = byMonth[key]["bookings"];

          if (times.length === 0) {
            return null; // Skip months with no bookings
          }

          const date = format(times[0].time, 'E, d MMM')
          return (
            <div key={idx}>
              <h1>{date}</h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 w-max" key={idx}>
                {times.map((day, index) => {
                  return (
                    <div className="bg-green-400 w-max hover:bg-green-600" key={index}>
                      <button className="w-max p-1 flex" onClick={() => { handleBookingSelected(day.time) }}>
                        <div className="relative group">
                          {format(day.time, 'HH:mm b')}
                          <div className="absolute mt-2 hidden group-hover:flex gap-2 items-center justify-center w-full bg-slate-300 z-10 rounded-md">
                            {
                              day.bookingtype.map((type, idx) => {
                                return (
                                  <Icon icon={mapIcons[type]} height={24} style={{ color: "black" }} className='' key={idx} />
                                )
                              })
                            }
                          </div>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      )}

      <button className={`border w-full text-center border-black mt-2 ${show ? 'block' : 'hidden'}`}
        onClick={() => {
          setTimeRange(7)
          setShow(false);
        }}>
        Show More Availability
      </button>
      <p className={`w-full text-center text-gray-500 mt-2 ${show ? 'hidden' : 'block'}`}>No More Availability</p>
    </div>
  )
}

export default TimeSlots;