import axios from "axios";

const api = 'https://calabashe-api.onrender.com/api'

export const fetchConditions = async () => {
  try {
    const response = await axios.get(`${api}/conditions`);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      throw error;
    }
    console.error('Error fetching conditions:', error);
    throw new Error('Error fetching conditions');
  }
};