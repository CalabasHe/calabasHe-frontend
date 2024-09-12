import axios from "axios";

const SearchData = async (searchParameters) =>{
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/searches/?search_query=${searchParameters}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}

export default SearchData;