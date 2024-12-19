import { useState } from "react";
import { SyncLoader } from "react-spinners";
export const SelectableTimes = ({
  handleSelectedTime,
  availableTimes,
  isLoading
}) => {
  const [isSelected, setIsSelected] = useState(null);

  if (isLoading) {
      return (
          <div className="mx-auto w-max mt-10">
              <SyncLoader color="#66e01c" />
          </div>
      );
  }

  return (
      <div className="h-max mt-4 w-[94%] mx-auto grid grid-cols-3 md:grid-cols-5 items-center place-content-center gap-7 overflow-y-scroll scrollbar-thin">
          {availableTimes.map(time => {
              return (
                  <button 
                      key={time} 
                      onClick={() => {
                          setIsSelected(time);
                          handleSelectedTime(time);
                      }} 
                      className={`border border-black text-center ${isSelected === time ? 'bg-green-600' : ''}`}
                  >
                      {time}
                  </button>
              );
          })}
      </div>
  );
};

export default SelectableTimes;