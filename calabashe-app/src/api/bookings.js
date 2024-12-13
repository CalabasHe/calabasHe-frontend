import axios from "axios";
import { conforms } from "lodash";
import { getCookie } from "../utils/cookies";

//Accessible by doctors only
const MAIN_URL = 'https://calabashe-api.onrender.com/api/bookings/'
export const createTimeSlot = async ({month, year, day_of_month, doctor_email, start_time, end_time, is_available}) => {
    const createUrl = MAIN_URL + 'timeslots/';
    console.log({month, year, day_of_month, doctor_email, start_time, end_time, is_available});
    try {
        const response = await axios.post(createUrl, {month, year, day_of_month, doctor_email, start_time, end_time, is_available});
        return response;
    } catch (err) {
        // console.log(err);
        throw err;
    }
}

export const getTimeSlots = async (email) => {
    const getUrl = MAIN_URL + `timeslots?doctor_email=${email}`;
    try {
        const response = await axios.get(getUrl);
        return response.data
    } catch (err) {
        // console.log(err);
        throw err;
    }
}

export const bookDoctor = async({doctor, booking_type="video", booking_date, booking_time}) => {
    const bookUrl = MAIN_URL;
    console.log({doctor, booking_type, booking_date, booking_time});
    const access = getCookie("accessToken");
    try {
        const response = await axios.post(bookUrl, 
            {doctor, booking_type, booking_date, booking_time},
            {headers: {
                Authorization: `Bearer ${access}`
            }}
        );
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}