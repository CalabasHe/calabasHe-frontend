import { fetchConditions, fetchServices, fetchSpecialties } from "../secondaryFormData"

export const getConditions = async () => {
  try {
    const conditions = await fetchConditions();
    return conditions.results;
  } catch (error) {
    console.error(error);
    return []; 
  }
};


export const getSpecialties = async () => {
  try {
    const specialties = await fetchSpecialties();
    return specialties.results;
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export const getServices = async () => {
  try {
    const services = await fetchServices();
    return services.results;
  } catch (error) {
    console.error(error);
    return []; 
  }
};

