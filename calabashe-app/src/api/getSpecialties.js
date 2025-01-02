import axios from "axios";
import { result } from "lodash";

export const getSpecialties = async (slug) => {
    try {
        const url = `https://api.calabashe.com/api/specialties/${slug}/`;
        const response =  await axios.get(url);

        return response.data.results.doctors
    } catch (err) {
        throw err
    }
}