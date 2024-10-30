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
  console.log(page);
  const url = `https://calabashe-api.onrender.com/api/doctors?region=${encodeURIComponent(location)}&specialty=${encodeURIComponent(specialty)}&search_query=${encodeURIComponent(search_query)}&page=${page}`;
  try {
    const response = await axios.get(`${url}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export default SearchData;