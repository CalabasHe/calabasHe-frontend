import axios from "axios";

export const fetchDoctors = async (page=1) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/doctors/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchFacilities = async (page=1) => {
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/facilities/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching facilities:', error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/services/');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching services:', error);
  }
};

export const fetchReviewCount = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/reviews/combined-reviews/');
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching reviewCount:', error);
  }
};

export const fetchCurrentReviews = async () => {
  try {
    const response = await axios.get('https://calabashe-api.onrender.com/api/reviews/combined-reviews/');
    return response.data.results.reviews;
  } catch (error) {
    throw new Error('Error fetching doctors:', error);
  }
};

export const fetchServiceCategories = async (category = '/categories') => {
  try{
    const response = await axios.get(`https://calabashe-api.onrender.com/api/services${category}`);
    (response.data)
    return response.data
  }catch (error) {
    throw new Error('Error fetching categories:', error);
  }
}

fetchServiceCategories()