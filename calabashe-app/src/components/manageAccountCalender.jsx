import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isPast, isSameDay, isSameMonth, isToday, parse, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import { createTimeSlot, getTimeSlots } from "../api/bookings.js";

const ManageAccountCalender = ({ handleDaySelected }) => {
    const today = startOfToday();

    const [selectedDay, setSelectedDay] = useState(today);


    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());


    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth)
    })

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const prevMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ').toString();
    }

    return (
        <div className='w-full rounded-xl mx-auto p-5'>
            <h2 className="text-start font-bold text-2xl mb-2">Availability</h2>
            <h3 className="text-start font-semibold text-xl mb-2">Select time and date</h3>
            {/* Calender start */}
            <div className="mt-5 w-full">
                <div className="flex justify-between w-[93%]">
                    <h2 className="text-start font-bold">{format(firstDayCurrentMonth, 'MMMM yyy')}</h2>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={prevMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500  hover:border border-green-500 rounded-full"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500  hover:border border-green-500 rounded-full"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 items-center justify-center text-start text-xs md:text-sm ml-0 w-full font-semibold mt-3 md:gap-0">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div className="mr-2 md:mr-0">Wed</div>
                    <div className="ml-1 md:ml-0">Thrs</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="grid grid-cols-7 text-sm ml-0 text-start w-full font-semibold mt-3">
                    {days.map((day, idx) => {
                        const past = isPast(day) && !isToday(day);
                        return <div
                            key={day.toString()}
                            className={(idx === 0 && colStartClasses[getDay(day)]).toString()}
                        >
                            
                            <button type="button" disabled={past}
                                onClick={() => {
                                    handleDaySelected(day);
                                    setSelectedDay(day);
                                }
                                
                                }
                                className={
                                    classNames(
                                        isEqual(day, selectedDay) && 'bg-green-800',
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'text-red-500',
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-green-300',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold text-red-500',
                                        isEqual(day, selectedDay) && 'text-white',
                                        "grid grid-cols-7 items-center justify-center text-center w-8 h-8 text-sm font-semibold mt-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    )
                                }>
                                <time dateTime={format(day, 'yyyy-MM-dd')} className="w-8 mx-auto">
                                    {format(day, 'd')}
                                </time>
                            </button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ManageAccountCalender;

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]