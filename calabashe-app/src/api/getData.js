import axios from "axios";

export const fetchDoctors = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/doctors/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};