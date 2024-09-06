import axios from 'axios';

const SIGNUP_URL = 'https://calabashe-api.onrender.com/api/auth/signup/';
const VERIFY_URL = 'https://calabashe-api.onrender.com/api/auth/verify-code/';
const LOGIN_URL = 'https://calabashe-api.onrender.com/api/auth/login/';
const GOOGLE_LOGIN_URL = 'https://calabashe-api.onrender.com/api/auth/google/';


export const signUp = async ({ email, username, password, password2 }) => {
  try {
    const response = await axios.post(SIGNUP_URL, {
      email,
      username,
      password,
      password2,
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const logIn = async ({ email, password }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(LOGIN_URL, {
      email,
      password,
    });
    return response.data;
  }catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

};

export const verifyCode = async ({ email, verification_code }) => {
  try {
    const response = await axios.post(VERIFY_URL, {
      email,
      verification_code,
    });
    return response.data;
  }catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};




export const authenticateUser = async (accessToken) => {
  try {
    const res = await axios.post(GOOGLE_LOGIN_URL, {
      access_token: accessToken,
    });
    // console.log("User authenticated", res.data);
    return res.data;
  } catch (error) {
    console.error("Authentication failed", error);
    throw error;
  }
};

