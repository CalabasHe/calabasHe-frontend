import { fetchConditions } from "../secondaryFormData"

export const getConditions = async () => {
  try {
    const conditions = await fetchConditions();
    return conditions.results;
  } catch (error) {
    console.error(error);
    return []; // Fallback to an empty array if there's an error
  }
};