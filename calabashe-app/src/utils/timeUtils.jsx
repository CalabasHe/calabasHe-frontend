import { format, parse , addMinutes, isPast, isSameMinute, parseISO, isWithinInterval, isAfter, isBefore} from "date-fns";
import { getDoctorBookings, getTimeSlots } from "../api/bookings";

export function generateFutureTimeIntervals(initial = '09:00', timeInterval = 30, end = '17:00', day = new Date()) {
    let startTime = parse(initial, 'HH:mm', day);
    const endTime = parse(end, 'HH:mm', day);
    const intervals = [];

    
    while (startTime <= endTime) {
        if (!isPast(startTime)) {
            intervals.push(format(startTime, 'HH:mm'))
        }
       
        startTime = addMinutes(startTime, timeInterval);
    }
    return intervals;
}

export async function getAllBookings() {
    const email = localStorage.getItem('email');
     try {
        const meetings = await getDoctorBookings(email);
        const meetingDates = [];
        meetings.map(meeting => {
            const dateString = `${meeting.booking_date}${meeting.booking_time}`;
            const tempDate = parse(dateString, 'yyyy-M-dHH:mm:ss', new Date())
            meetingDates.push(tempDate)
        })
        return meetingDates;
     } catch (err) {
        throw err;
     }
}


export async function parseTimeSlots(day) {
    const email = localStorage.getItem("email")
    try {
        const meetings =await getTimeSlots(email);
 
        const endTimes = [];
        const meetingDates = [];
        meetings.map(meeting => {
                const dateString = `${meeting.year}-${meeting.month}-${meeting.day_of_month}${meeting.start_time}`;
                const endDateString = `${meeting.year}-${meeting.month}-${meeting.day_of_month}${meeting.end_time}`;
                const tempDate = parse(dateString, 'yyyy-M-dHH:mm:ss', day)
                const endTempDate = parse(endDateString, 'yyyy-M-dHH:mm:ss', day)
                meetingDates.push(tempDate);
                endTimes.push(endTempDate);
        })
        return {meetingDates, endTimes};
     } catch (err) {
        throw err;
     }
}

export async function getAvailableTimeSlots(initial = '09:00', timeInterval = 30, end = '17:00', day = new Date()) {
    let startTime = parse(initial, 'HH:mm', day);
    const endTime = parse(end, 'HH:mm', day);
    const availableIntervals = [];

    const {meetingDates, endTimes} = await parseTimeSlots(day);
    while (startTime <= endTime) {
        const isBooked = meetingDates.some((meetingDate, index) => 
            isSameMinute(startTime, meetingDate) || 
            (isAfter(startTime, meetingDate) && isBefore(startTime, endTimes[index]))
        );
        if (!isPast(startTime) && !isBooked) {
            availableIntervals.push(format(startTime, 'HH:mm'));
        }
        startTime = addMinutes(startTime, timeInterval);
    }
    return availableIntervals;
}

