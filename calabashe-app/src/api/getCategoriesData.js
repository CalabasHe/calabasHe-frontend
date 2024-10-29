import axios from "axios";

const api = 'https://calabashe-api.onrender.com/api'

export const fetchDoctors = async (page=1) => {
  try {
    const response = await axios.get(`${api}/doctors/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchDoctorBySpecialties = async (slug) => {
  try {
    const response = await axios.get(`${api}/specialties/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchSpecialties = async () => {
  try {
    const response = await axios.get(`${api}/specialties`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchDoctorsBySubSpecialties = async (slug) => {
  try {
    const response = await axios.get(`${api}/specialties/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};



export const fetchFacilities = async (page=1) => {
  try {
    const response = await axios.get(`${api}/facilities/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching facilities:', error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${api}/services/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching services:', error);
  }
};

export const fetchReviewCount = async () => {
  try {
    const response = await axios.get(`${api}/reviews/combined-reviews/`);
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching reviewCount:', error);
  }
};

export const fetchCurrentReviews = async () => {
  try {
    const response = await axios.get(`${api}/reviews/combined-reviews/`);
    return response.data.results.reviews;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchServiceCategories = async (category = '/categories') => {
  try{
    const response = await axios.get(`${api}/services${category}`);
    (response.data)
    return response.data
  }catch (error) {
    throw new Error('Error fetching categories:', error);
  }
}

fetchServiceCategories()