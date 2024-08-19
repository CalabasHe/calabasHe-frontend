import axios from "axios";

export const fetchDoctorsCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/doctors/');
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchFacilitiesCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/facilities/');
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchServicesCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/services/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const fetchReviewCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/reviews/combined/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};