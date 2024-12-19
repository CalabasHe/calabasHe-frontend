import axios from "axios";

export const fetchDoctorBySlug = async (slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/doctors/${slug}/`);
;    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Error fetching doctor data');
  }
  };

export const fetchFacilityBySlug = async (slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities/${slug}/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Error fetching doctor data');
  }
};
