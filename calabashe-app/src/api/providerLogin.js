import axios from "axios";
import { generateToken } from "./bookings.js";
import { getUserId } from "../utils/getUserId.jsx";

const API_CONFIG = {
  doctors: {
    baseUrl: "https://api.calabashe.com/api/doctors",
    idField: "doctor_id"
  },
  facilities: {
    baseUrl: "https://api.calabashe.com/api/facilities",
    idField: "facility_id"
  }
};

const handleError = (error) => {
  if (error.response?.data) {
    if (error.status === 400) {
      throw new Error("Invalid Login Credentials");
    }
    const firstError = Object.keys(error.response.data)[0];
    throw new Error(error.response.data[firstError]?.[0] || "An error occurred");
  }
  throw new Error("An unexpected error occurred");
};

export const createAuthService = (type) => {
  const config = API_CONFIG[type];
  if (!config) throw new Error("Invalid service type");

  return {
    async login({ email, password }) {
      try {
        const result = await axios.post(`${config.baseUrl}/login/`, { email, password });
        return result;
      } catch (error) {
        handleError(error);
      }
    },

    async changePassword({ email, old_password, new_password, confirm_password }) {
      try {
        const token = generateToken();
        const userId = getUserId();
        const payload = {
          email,
          old_password,
          new_password,
          confirm_password,
          token,
          [config.idField]: userId
        };
        const result = await axios.post(`${config.baseUrl}/change-password/`, payload);
        return result.data;
      } catch (error) {
        handleError(error);
      }
    },

    async forgotPassword({ email }) {
      try {
        const response = await axios.post(`${config.baseUrl}/forgot-password/`, { email });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw new Error("An unexpected error occurred");
      }
    },

    async resetPassword({ token, code, password }) {
      try {
        const result = await axios.post(`${config.baseUrl}/reset-password/`, { 
          token, 
          code, 
          password 
        });
        return result.data;
      } catch (error) {
        if (error.response?.data) throw error.response;
        throw new Error("An unexpected error occurred");
      }
    }
  };
};

export const doctorsAuth = createAuthService("doctors");
export const facilitiesAuth = createAuthService("facilities");