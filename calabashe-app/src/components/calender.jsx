import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, startOfToday } from "date-fns";
import { useState } from "react";

const Calender = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())


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
        return classes.filter(Boolean).join(' ').toString()
    }

    return (
        <div className='w-full rounded-xl bg-white mx-auto p-5 border'>
            <h2 className="text-start font-bold text-2xl mb-5">Available Appointments</h2>
            <div className="flex gap-2 items-center">
                <span className="h-3 w-3 rounded-full bg-green-600"></span>
                <p className="text-sm">Available for appointments</p>
            </div>
            <div className="flex gap-2 items-center">
                <span className="h-3 w-3 rounded-full bg-gray-400"></span>
                <p className="text-sm">Unavailable for appointments</p>
            </div>
            {/* Calender start */}
            <div className="mt-5">
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
                <div className="grid grid-cols-7 items-center justify-center text-start text-sm ml-0 w-full font-semibold mt-3">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thurs</div>
                    <div className="pl-2">Fri</div>
                    <div>Sat</div>
                </div>
                <div className="grid grid-cols-7 text-sm ml-0 text-start w-full font-semibold mt-3">
                    {days.map((day, idx) => {
                        return <div
                            key={day.toString()}
                            className={idx === 0 && colStartClasses[getDay(day)]}
                        >
                            <button type="button" className={
                                classNames(
                                    isEqual(day, selectedDay) && 'text-white bg-green-500',
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
                                    'font-semibold',
                                    "grid grid-cols-7 items-center justify-center text-center w-8 h-8 text-sm font-semibold mt-3"
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

export default Calender;

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]