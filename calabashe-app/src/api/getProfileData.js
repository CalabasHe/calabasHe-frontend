import axios from "axios";

export const fetchDoctorBySlug = async (slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/doctors/${slug}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchFacilityBySlug = async (slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities/${slug}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Refresh page`);
  }
};
