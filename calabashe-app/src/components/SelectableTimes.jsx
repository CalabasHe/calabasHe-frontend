import { generateFutureTimeIntervals, getAvailableTimeSlots } from "../utils/timeUtils";
import { format, subMinutes, parse } from "date-fns";
import { useState, useEffect } from "react";
import {SyncLoader} from "react-spinners";


export const SelectableTimes = ({
  handleSelectedTime,
  timeInterval,
  startTime,
  endTime,
  selectedDay,
  slotEvent
}) => {
  const endtimeDate = subMinutes(parse(endTime, 'HH:mm', new Date()), timeInterval);
  const [timeRanges, setTimeRange] = useState(generateFutureTimeIntervals(startTime, timeInterval,format(endtimeDate, 'HH:mm'), selectedDay));
  const [isSelected, setIsSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setIsLoading(true);
      const times = await getAvailableTimeSlots(startTime, timeInterval, format(endtimeDate, 'HH:mm'), selectedDay);
      setTimeRange(times);
      setIsLoading(false);
    };
    fetchAvailableTimes();
  }, [startTime, timeInterval, endTime, selectedDay,slotEvent]);

  if (isLoading) {
    return (
      <div className="mx-auto w-max mt-10">
        <SyncLoader color="#66e01c" />
      </div>
    )
  }
 
  return <div className="h-max mt-4 w-[94%]  mx-auto grid grid-cols-3 md:grid-cols-5 items-center place-content-center gap-7 overflow-y-scroll scrollbar-thin">
    {timeRanges.map(time => {
      return <button key={time} onClick={() => {
        setIsSelected(time);
        handleSelectedTime(time);
      }} className={`border border-black text-center ${isSelected === time ? 'bg-green-600' : ''}`}>
        {time}
      </button>;
    })}
  </div>;
};




export default SelectableTimes;