import { getCookie } from '../utils/cookies';

const CREATE_DOCTOR_REVIEW = 'https://api.calabashe.com/api/reviews/doctor-reviews/';
const CREATE_FACILITY_REVIEW = `https://api.calabashe.com/api/reviews/facility-reviews/`;

const getAccessToken = () => {
  return getCookie('accessToken');
};

export const createDoctorReview = async ({ user, rating, title, description, doctor }) => {
  const token = getAccessToken();
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(CREATE_DOCTOR_REVIEW, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user,
        rating,
        title,
        description,
        doctor
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('Something went wrong!');
    throw error;
  }
};

export const createFacilityReview = async ({ user, rating, title, description, facility }) => {
  const token = getAccessToken();
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  });

  try {
    const response = await fetch(CREATE_FACILITY_REVIEW, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user,
        rating,
        title,
        description,
        facility
      })
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Log the full response text
      console.error('Server response:', responseText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (parseError) {
      // console.error('Error parsing JSON:', parseError);
      // console.error('Raw response:', responseText);
      throw new Error('Invalid JSON in server response');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

