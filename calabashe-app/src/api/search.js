import axios from "axios";

const SearchData = async (searchParameters) =>{
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/searches/?search_query=${searchParameters}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export const DoctorsSearch = async ({search_query, specialty, location, page}) => {
  // console.log(page);
  const url = `https://calabashe-api.onrender.com/api/doctors?search_query=${search_query}&region=${location}&specialty=${specialty}&page=${page}`;
  try {
    const response = await axios.get(`${url}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}
export const FacilitySearch = async ({facility, service, location, page}) => {
  // console.log(page);
  const url = `https://calabashe-api.onrender.com/api/facilities?facility=${facility}&location=${location}&service=${service}&page=${page}`;
  try {
    const response = await axios.get(`${url}`)
    // console.log(response.data);
    return response.data
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export default SearchData;