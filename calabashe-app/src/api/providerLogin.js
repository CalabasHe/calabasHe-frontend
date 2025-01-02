import axios from "axios"
import {generateToken} from "./bookings.js";
import {getUserId} from "../utils/getUserId.jsx";

const baseUrl = "https://api.calabashe.com/api/doctors"

export async function loginDoctor({ email, password }) {
    const url = baseUrl + `/login/`
    try {
        const result = await axios.post(url, { email, password });
        return result;
    } catch (error) {
        if (error.response && error.response.data) {
            if (error.status === 400) {
                throw new Error("Invalid Login Credentials")
            } else {
                throw new Error("An error occurred.Try again later");
            }
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function changeDoctorPassword({ email, old_password, new_password, confirm_password }) {
    
    const url = baseUrl + `/change-password/`;
    // eslint-disable-next-line no-useless-catch
    try {
        const token = generateToken();
        const doctor_id = getUserId();
        const result = await axios.post(url, { email, old_password, new_password, confirm_password, token, doctor_id });
        return result.data;
    } catch (error) {
        if (error.response && error.response.data && error.status !== 500) {
            const first = Object.keys(error.response.data)[0];
            throw error.response.data[first][0];
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function forgotDoctorPassword({ email }) {
    const url = baseUrl + '/forgot-password/';
    try {
        const response = await axios.post(url, { email })
        return response.data
    } catch (error) {
        // console.log(error)
        if (axios.isAxiosError(error)) {
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function resetDoctorPassword({ token, code, password }) {
    const url = baseUrl + '/reset-password/';
    try {
        const result = await axios.post(url, { token, code, password });
        return result.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response;
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}