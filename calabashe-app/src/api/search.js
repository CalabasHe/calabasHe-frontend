export default const searchData = async = (searchParameters) =>{
  try {
    const response = await axios.get(`https://calabashe-api.onrender.com/api/searches/?${searchParameters}`);
    return response.data.results;
    console.log(response.data.results) 
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}