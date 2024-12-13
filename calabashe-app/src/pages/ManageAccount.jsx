import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner_image from '../assets/icons/Lady-With-Laptop.svg'
import { useNavigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword.jsx";
import { useEffect, useState } from "react";
import ManageAccountCalender from "../components/manageAccountCalender.jsx";
import { addMinutes, parse, format, startOfToday } from 'date-fns';
import { toast } from "sonner";
import { createTimeSlot } from "../api/bookings.js";

function generateTimeIntervals(initial = '09:00', timeInterval = 30, end = '17:00') {
    const startTime = parse(initial, 'HH:mm', new Date());
    const endTime = parse(end, 'HH:mm', new Date());
    const intervals = [];

    let currentTime = startTime;
    while (currentTime <= endTime) {
        intervals.push(format(currentTime, 'HH:mm'));
        currentTime = addMinutes(currentTime, timeInterval);
    }

    return intervals;
}

const SelectableTimes = ({ handleSelectedTime, timeInterval, startTime, endTime}) => {
    const [timeRanges, setTimeRange] = useState(generateTimeIntervals(startTime, timeInterval));

    useEffect(() => {
        setTimeRange(generateTimeIntervals(startTime, timeInterval, endTime));
    }, [startTime, timeInterval, endTime]);

    const [isSelected, setIsSelected] = useState(null);
    return (
        <div className="h-[300px] w-full mx-auto grid grid-cols-5 items-center place-content-center gap-10">
            {timeRanges.map(time => {
                return (
                    <button
                        key={time}
                        onClick={() => {
                            handleSelectedTime(time);
                            setIsSelected(time);
                        }}
                        className={`border border-black text-center ${isSelected === time ? 'bg-green-600' : ''}`}>
                        {time}
                    </button>
                )
            })}
        </div>
    )
}

const ManageAccount = () => {
    const { logout, userProfile } = useAuth();
    const [showPopUp, setShowPopUp] = useState(false);
    const lastName = localStorage.getItem("lastName");
    const today = startOfToday();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDay, setSelectedDay] = useState(today);

    const [selectedInterval, setSelectedInterval] = useState(30);
    const [startTime, setStartTime] = useState(generateTimeIntervals('06:00', selectedInterval));
    const [selectedStartTime, setSelectedStartTime] = useState('09:00');
    const [selectedEndTime, setSelectedEndTime] = useState('17:00');
    const selectableIntervals = ["30", "60", "90", "120"];
    
    const handleSelectedTime = (time) => {
        setSelectedTime(time);
    }
    const handlePopUp = (value) => {
        setShowPopUp(value);
    };
    const reviews = localStorage.getItem("myReviewsCount");

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    }
    const handleDaySelected = (day) => {
        setSelectedDay(day);
    }

    const handleMarkAvailable = async () => {
        if (!selectedTime) {
            toast.error("Please select a time")
        }
        const doctor_email = localStorage.getItem("email");
        const month = parseInt(format(selectedDay, 'L'), 10);
        const year = parseInt(format(selectedDay, 'yyyy'), 10);
        const day_of_month = parseInt(format(selectedDay, 'd'), 10);
        const tempTime = parse(selectedTime, 'HH:mm', new Date());
        const endTime = format(addMinutes(tempTime, selectedInterval), 'HH:mm');

        try {
            await createTimeSlot({month, year, day_of_month, doctor_email, start_time: selectedTime, end_time:endTime, is_available: true});
            toast.success("Slot created");
        } catch (err) {
            console.log(err);
            toast.error("An error occurred")
        }
    }
    return (
        <div className="z-50 bg-red-50  overflow-hidden relative w-full max-h-none min-h-screen flex flex-col flex-1 items-center justify-center pt-16">
            <Header />
            <div className="w-full flex flex-1 flex-col items-center justify-center">
                <ResetPassword showPopUp={showPopUp} handlePopUp={handlePopUp} />
                <main className="flex items-center md:items-start flex-col md:flex-row w-[80%]  my-8  container  max-h-[500px] rounded-lg border border-black p-5 pl-8">
                    <div className="w-full md:w-1/3 md:ml-16">
                        <div className="max-h-[300px] w-[85%] md:w-[95%] mx-auto aspect-square">
                            <img
                                src={userProfile || banner_image}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mx-auto w-[85%] md:w-[90%] mt-4">
                            <h2 className="text-2xl md:text-4xl font-bold mb-1">Dr {lastName}</h2>
                            <p>Reviews {reviews}</p>
                        </div>
                    </div>
                    <div className=" w-[85%] md:w-[45%] md:mx-auto md:px-10 py-2">
                        <div className="flex  flex-row items-center md:items-start md:flex-col border-b-2 border-gray-300 md:pb-3 gap-3 text-start" >
                            <p className="text-base md:text-xl font-semibold mb-1 ">Password</p>
                            <button onClick={() => setShowPopUp(true)} className=" text-xs md:text-sm text-gray-500 cursor-pointer"> Change Password</button>
                        </div>
                        <button onClick={handleLogout} className="mt-3 text-base md:text-xl">Sign Out</button>
                    </div>
                </main>
                <div className="w-[80%] md:w-full lg:w-[80%] mx-auto border border-black min-h-[400px] mb-5 rounded-lg flex items-center flex-col md:flex-row">
                    <div className="w-[80%]  mx-auto md:w-[45%] p-3 flex flex-col gap-4">
                        <ManageAccountCalender handleDaySelected={handleDaySelected} />
                        <button className="bg-custom-yellow font-extrabold  text-center p-2 rounded-lg w-[85%] mx-auto"
                            onClick={handleMarkAvailable}
                        >Mark available</button>
                    </div>
                    <div className="w-[80%] mt-4 mb:mt-0 md:w-1/2 ">
                        <div className="flex w-full gap-4">
                            <div className="w-[30%] scrollbar-thin  flex flex-col justify-between">
                                <label htmlFor="start-select" className="block text-base font-semibold text-gray-700 mb-2">
                                    Starting time
                                </label>
                                <select
                                    id="start-select"
                                    value={selectedStartTime}
                                    onChange={(e) => setSelectedStartTime(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    {startTime.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/**End time */}
                            <div className="w-[30%] scrollbar-thin flex flex-col justify-between">
                                <label htmlFor="end-select" className="block text-base font-semibold text-gray-700 mb-2">
                                    Ending time
                                </label>
                                <select
                                    id="end-select"
                                    value={selectedEndTime}
                                    onChange={(e) => setSelectedEndTime(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    
                                    {startTime.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/** Intervals */}
                            <div className="w-[30%] scrollbar-thin flex flex-col justify-between">
                                <label htmlFor="interval-select" className="block text-base font-semibold text-gray-700 mb-2">
                                    Interval
                                </label>
                                <select
                                    id="interval-select"
                                    value={selectedInterval}
                                    onChange={(e) => setSelectedInterval(e.target.value)}
                                    className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                   
                                    {selectableIntervals.map((interval) => (
                                        <option key={interval} value={interval}>
                                            {interval} mins
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <SelectableTimes handleSelectedTime={handleSelectedTime} timeInterval={selectedInterval} startTime={selectedStartTime} endTime={selectedEndTime}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManageAccount;