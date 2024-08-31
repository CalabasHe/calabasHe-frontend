import axios from "axios";

export const fetchDoctorBySlug = async (slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/doctors/${slug}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchFacilityBySlug = async (type, slug) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities/${type.toLowerCase()}/${slug}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Refresh page`);
  }
};
// export const fetchHospitalBySlug = async (slug) => {
//   try {
//     const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities/diagnostics/${slug}/`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching doctors:', error);
//   }
// };
// export const fetchBySlug = async (slug) => {
//   try {
//     const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities//${slug}/`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching doctors:', error);
//   }
// };