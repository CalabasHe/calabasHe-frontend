import axios from "axios"

const baseUrl = "https://calabashe-api.onrender.com/doctors/"

export async function loginDoctor({ email, password }) {
    const url = baseUrl + `/login/`
    try {
        const result = await axios.post(url, { email, password });
        return result;
    } catch (err) {
        throw err;
    }
}

export async function changePassword({old_password, new_password, confirm_password}){
    const url = baseUrl + `/change-password`;
    try {
        const result = axios.post(url, {old_password, new_password, confirm_password});
        return result;
    } catch(err) {
        throw err;
    }
}

export async function  forgotPassword({email}) {
    const url= baseUrl + '/forgot-password';
    try {
        const result = axios.post(url, {email})
    } catch(err) {
        throw err;
    }
}

export async function resetPassword ({token, code, password}) {
    const url = baseUrl + '/reset-password';

    try {
       const result = axios.post(url, {token, code, password});
       return result;
    } catch (err) {
        throw err;
    }
}