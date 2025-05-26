import { useState } from "react";
import { addDays, format, startOfDay, isWithinInterval } from "date-fns";
import { Icon } from '@iconify/react';

const TimeSlots = ({ results, daySelected, handleBookingSelected }) => {
  const byMonth = {};
  const mapIcons = {
    video: "mdi:video-outline",
    in_person: "ic:outline-people",
    voice: "ic:outline-phone"
  };

  const [timeRange, setTimeRange] = useState(2);
  const [show, setShow] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  if (!results) {
    return null;
  }

  results.map(result => {
    const startDate = new Date(`${result.year}-${result.month.toString().padStart(2, '0')}-${result.day_of_month.toString().padStart(2, '0')}T${result.start_time}`);
    const idx = format(startDate, 'd');
    const startDateStart = startOfDay(startDate);
    const daySelectedStart = startOfDay(daySelected);
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

  const handleTimeClick = (time, availableTypes) => {
    setSelectedTime(time);
    setSelectedTypes(availableTypes);
    setShowPopup(true);
  };

  const handleTypeSelect = (type) => {
   
    handleBookingSelected(selectedTime, type);
    setShowPopup(false);
    setSelectedTime(null);
    setSelectedTypes([]);
  };

  return (
    <div className="relative">
      {Object.keys(byMonth).length === 0 ? (
        <div className="text-center text-gray-500 my-4">
          No booking slots available
        </div>
      ) : (
        Object.keys(byMonth).map((key, idx) => {
          const times = byMonth[key]["bookings"];
          if (times.length === 0) {
            return null;
          }
          const date = format(times[0].time, 'E, d MMM');
          return (
            <div key={idx}>
              <h1>{date}</h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 w-max">
                {times.map((day, index) => (
                  <div className="bg-green-400 w-max hover:bg-green-600" key={index}>
                    <button 
                      className="w-max p-1 flex" 
                      onClick={() => handleTimeClick(day.time, day.bookingtype)}
                    >
                      <div className="relative group">
                        {format(day.time, 'HH:mm b')}
                        <div className="absolute mt-2 hidden group-hover:flex gap-2 items-center justify-center w-full bg-slate-300 z-10 rounded-md">
                          {day.bookingtype.map((type, idx) => (
                            <Icon 
                              icon={mapIcons[type]} 
                              height={24} 
                              style={{ color: "black" }} 
                              key={idx} 
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Select Meeting Type for {format(selectedTime, 'HH:mm b')}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => handleTypeSelect(type)}
                  className="flex items-center justify-center gap-3 p-3 border rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Icon icon={mapIcons[type]} height={24} />
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button 
        className={`border w-full text-center border-black mt-2 ${show ? 'block' : 'hidden'}`}
        onClick={() => {
          setTimeRange(7);
          setShow(false);
        }}
      >
        Show More Availability
      </button>
      <p className={`w-full text-center text-gray-500 mt-2 ${show ? 'hidden' : 'block'}`}>
        No More Availability
      </p>
    </div>
  );
};

export default TimeSlots;