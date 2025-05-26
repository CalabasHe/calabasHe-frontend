/* eslint-disable no-useless-catch */
import axios from "axios";
import { getCookie } from "../utils/cookies";
import { getUserId } from "../utils/getUserId";
import { parseAvailableTimes } from "../utils/timeUtils";

export function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let baseToken = '';
    
    for (let i = 0; i < 100; i++) {
        baseToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const chunks = baseToken.match(/.{1,4}/g); // Split into chunks of 4 characters
    const formattedToken = chunks.join('-');
    
    return formattedToken;
}

//Accessible by doctors only
const MAIN_URL = 'https://api.calabashe.com/api/bookings'
export const createTimeSlot = async ({ month, year, day_of_month, doctor_email, start_time, end_time, is_available, booking_type }) => {

    const createUrl = MAIN_URL + '/timeslots/';
    const doctor_id = getUserId();
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(createUrl, { doctor_id, month, year, day_of_month, doctor_email, start_time, end_time, is_available, booking_type, token: generateToken()});
        return response;
    } catch (err) {
        // console.log(err);
        throw err;
    }
}

export const getTimeSlots = async (email, id = getUserId()) => {
    const getUrl = `${MAIN_URL}/timeslots/doctor-timeslots/`;
    try {
        const response = await axios.post(getUrl, {
            doctor_email: email,
            doctor_id: id,
            token: generateToken()
        });
        return response.data
    } catch (err) {
        // console.log(err);
        throw err;
    }
}

export const bookDoctor = async ({ doctor, booking_type, booking_date, booking_time }) => {
    const bookUrl = `${MAIN_URL}/`;
    const access = getCookie("accessToken");
    try {
        const response = await axios.post(bookUrl,
            { doctor, booking_type, booking_date, booking_time, },
            {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            }
        );
        return response;
    } catch (err) {
        throw err;
    }
}

export const getDoctorBookings = async (doctor_email) => {
    const bookUrl = `${MAIN_URL}/doctor-bookings/`;
    const id = getUserId();
    try {
        const response = await axios.post(bookUrl,{ doctor_email: doctor_email, doctor_id: id, token: generateToken()});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAvailableDoctors = async () => {
    const url = MAIN_URL + '/available-doctors';
    try {
        const response = await axios.get(url);
        // console.log(response);
        return parseAvailableTimes(response.data);
    } catch (err) {
        throw err;
    }
}