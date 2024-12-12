import axios from "axios";
import { result } from "lodash";

export const getSpecialties = async (slug) => {
    try {
        const url = `https://calabashe-api.onrender.com/api/specialties/${slug}/`;
        const response =  await axios.get(url);
        console.log(response.data.results.doctors);
        return response.data.results.doctors
    } catch (err) {
        throw err
    }
}