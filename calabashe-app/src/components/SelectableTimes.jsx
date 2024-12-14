import { generateFutureTimeIntervals, generateTimeIntervals } from "../utils/timeUtils";
import { format, subMinutes, parse } from "date-fns";
import { useState, useEffect } from "react";


export const SelectableTimes = ({
  handleSelectedTime,
  timeInterval,
  startTime,
  endTime,
  selectedDay
}) => {
  const endtimeDate = subMinutes(parse(endTime, 'HH:mm', new Date()), timeInterval);
  const [timeRanges, setTimeRange] = useState(generateTimeIntervals(startTime, timeInterval,format(endtimeDate, 'HH:mm') ));
  const [isSelected, setIsSelected] = useState(null);

  useEffect(() => {
    const times = generateTimeIntervals(startTime, timeInterval, format(endtimeDate, 'HH:mm'));
    setTimeRange(times);
  }, [startTime, timeInterval, endTime]);

 
  return <div className="h-max max-h-[300px] mt-4 w-[94%]  mx-auto grid grid-cols-3 md:grid-cols-5 items-center place-content-center gap-7">
    {timeRanges.map(time => {
      return <button key={time} onClick={() => {
        handleSelectedTime(time);
        setIsSelected(time);
      }} className={`border border-black text-center ${isSelected === time ? 'bg-green-600' : ''}`}>
        {time}
      </button>;
    })}
  </div>;
};

export default SelectableTimes;