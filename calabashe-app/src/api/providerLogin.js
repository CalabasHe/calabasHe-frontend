import axios from "axios"

const baseUrl = "https://calabashe-api.onrender.com/api/doctors"

export async function loginDoctor({ email, password }) {
    const url = baseUrl + `/login/`
    try {
        console.log({ email: email, password: password })
        const result = await axios.post(url, { email, password });

        return result;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

export async function changeDoctorPassword({ old_password, new_password, confirm_password }) {
    const url = baseUrl + `/change-password/`;
    try {
        const result = await axios.post(url, { old_password, new_password, confirm_password });
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function forgotDoctorPassword({ email }) {
    console.log("doctor forgot password")
    const url = baseUrl + '/forgot-password/'
    try {
        const response = await axios.post(url, { email })
        return response.data
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function resetDoctorPassword({ token, code, password }) {
    const url = baseUrl + '/reset-password/';
    console.log({ token, code, password })
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