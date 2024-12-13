import axios from "axios";

//Accessible by doctors only
const MAIN_URL = 'https://calabashe-api.onrender.com/api/bookings/'
export const createTimeSlot = async ({month, year, day_of_month, doctor_email, start_time, end_time, is_available}) => {
    const createUrl = MAIN_URL + 'timeslots/';
    try {
        const response = await axios.post(createUrl, {month, year, day_of_month, doctor_email, start_time, end_time, is_available});
        // console.log(response)
    } catch (err) {
        return err;
    }
}

export const getTimeSlots = async (email) => {
    const getUrl = MAIN_URL + `timeslots?doctor_email=${email}`;
    console.log(getUrl);
    try {
        const response = await axios.get(getUrl);
        console.log(response.data);
        return response.data
    } catch (err) {
        // console.log(err);
        return err;
    }
}

