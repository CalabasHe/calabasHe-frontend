import { } from './../components/SelectableTimes';
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookedAppointments from '../components/bookedAppointments.jsx';
import banner_image from '../assets/icons/Lady-With-Laptop.svg'
import { useNavigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword.jsx";
import { useEffect, useState } from "react";
import ManageAccountCalender from "../components/manageAccountCalender.jsx";
import { addMinutes, parse, format, startOfToday, subMinutes } from 'date-fns';
import { toast } from "sonner";
import { createTimeSlot } from "../api/bookings.js";
import SelectableTimes from './../components/SelectableTimes';
import { generateFutureTimeIntervals } from '../utils/timeUtils.jsx';
import Checkboxes from '../components/multipleCheckbox.jsx';


const ManageAccount = () => {
    const { logout, userProfile } = useAuth();
    const [showPopUp, setShowPopUp] = useState(false);
    const lastName = localStorage.getItem("lastName");
    const today = startOfToday();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDay, setSelectedDay] = useState(today);

    const [selectedInterval, setSelectedInterval] = useState(30);
    const [startTime, setStartTime] = useState(generateFutureTimeIntervals('06:00', selectedInterval, '17:00', selectedDay));
    const [selectedStartTime, setSelectedStartTime] = useState('09:00');
    const [selectedEndTime, setSelectedEndTime] = useState('00:00'); // FIXME: change this later
    const selectableIntervals = ["30", "60", "90", "120"];

    const [selectedTypes, setSelectedTypes] = useState([]);
    const options = [
        { value: "video", name: "Video" },
        { value: "voice", name: "Voice Call" },
        { value: "in_person", name: "In Person" }];



        
    useEffect(() => {
        setStartTime(generateFutureTimeIntervals('08:00', selectedInterval, '23:59', selectedDay));
    }, [selectedDay]);

    const handleSelectedTypes = (selectedOptions) => {
        setSelectedTypes(selectedOptions);
    }
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
        setSelectedDay(today); // to force a reload

        try {
            await createTimeSlot({ month, year, day_of_month, doctor_email, start_time: selectedTime, end_time: endTime, is_available: true, booking_type: selectedTypes });
            toast.success("Slot created");
        } catch (err) {
            // console.log(err);
            toast.error("An error occurred")
        }
    }
    return (
        <div className="z-50 bg-red-50 overflow-hidden relative w-full max-h-none min-h-screen flex flex-col flex-1 items-center justify-center pt-16">
            <Header />
            <main className="w-full flex flex-1 flex-col items-center justify-center">
                <ResetPassword showPopUp={showPopUp} handlePopUp={handlePopUp} />
                <div className="flex items-center md:items-start flex-col md:flex-row w-[80%] my-8 container min-h-max rounded-lg border border-black p-5 pl-8">
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
                </div>
                {/** AVAILABILITY */}
                <div className="w-[85%] md:w-full lg:w-[80%] md:mx-auto border border-black min-h-[400px] mb-5 rounded-lg flex items-center flex-col md:flex-row">
                    <div className="w-full mx-auto md:w-[45%] p-3 flex flex-col gap-4">
                        <ManageAccountCalender selectedDay={selectedDay} handleDaySelected={handleDaySelected} />
                        <button className="bg-custom-yellow font-extrabold  text-center p-2 rounded-lg w-[85%] mx-auto"
                            onClick={handleMarkAvailable}
                        >Mark available</button>
                    </div>
                    <div className="w-[85%] md:mx-auto mt-4 mb:mt-0 md:w-1/2 justify-self-start p-3">
                        <div className="flex md:items-center justify-center w-full gap-3">
                            <div className="w-[30%] scrollbar-thin flex flex-col justify-between">
                                <label htmlFor="start-select" className="block md:text-base text-sm font-semibold text-gray-700 mb-2">
                                    Starting time
                                </label>
                                <select
                                    id="start-select"
                                    value={selectedStartTime}
                                    onChange={(e) => setSelectedStartTime(e.target.value)}
                                    className="w-full text-sm md:text-base px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                <label htmlFor="end-select" className="block md:text-base text-sm font-semibold text-gray-700 mb-2">
                                    Ending time
                                </label>
                                <select
                                    id="end-select"
                                    value={selectedEndTime}
                                    onChange={(e) => setSelectedEndTime(e.target.value)}
                                    className="w-full text-sm md:text-base px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                <label htmlFor="interval-select" className="block md:text-base text-sm font-semibold text-gray-700 mb-2">
                                    Interval
                                </label>
                                <select
                                    id="interval-select"
                                    value={selectedInterval}
                                    onChange={(e) => setSelectedInterval(e.target.value)}
                                    className="w-full text-sm md:text-base px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >

                                    {selectableIntervals.map((interval) => (
                                        <option key={interval} value={interval}>
                                            {interval} mins
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <Checkboxes options={options} onChange={handleSelectedTypes} />
                        </div>
                        <SelectableTimes selectedDay={selectedDay} handleSelectedTime={handleSelectedTime} timeInterval={selectedInterval} startTime={selectedStartTime} endTime={selectedEndTime} />
                    </div>
                </div>
                <div className='w-[85%] md:w-full lg:w-[80%] mb-4 rounded-xl h-[400px] overflow-y-scroll scrollbar-thin '>
                    <h1 className='text-2xl font-semibold text-center mb-4 underline'>Your Booked Appoitments</h1>
                    <BookedAppointments/>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ManageAccount;