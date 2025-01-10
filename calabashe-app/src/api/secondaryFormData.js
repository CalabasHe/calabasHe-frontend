import axios from "axios";

const api = 'https://api.calabashe.com/api'

export const fetchConditions = async () => {
  try {
    const response = await axios.get(`${api}/conditions`);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      throw error;
    }
    console.error('Error fetching conditions:', error);
    throw new Error('Error fetching conditions');
  }
};

export const fetchSpecialties = async () => {
  try {
    const response = await axios.get(`${api}/specialties`);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      throw error;
    }
    console.error('Error fetching specialties:', error);
    throw new Error('Error fetching specialties');
  }
};

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${api}/services`);
    return response.data;
  } catch (error) {
    if (error.isAxiosError) {
      throw error;
    }
    console.error('Error fetching services:', error);
    throw new Error('Error fetching services');
  }
};



const mapFormDataToApiFormat = (formData) => {
  // Convert yes/no strings to boolean
  const convertToBoolean = (value) => value === "Yes";
  
  // Convert Set objects to arrays, handling empty sets
  const setToArray = (set) => {
    if (set instanceof Set) {
      return Array.from(set);
    }
    return [];
  };

  return {
    first_name: formData.firstName,
    last_name: formData.lastName,
    form_email: formData.email,
    year_started: parseInt(formData.certificationYear) || 0,
    specialty: formData.userHasSpecialty,
    conditions_and_treatments: setToArray(formData.treatments),
    place_of_practice: formData.currentPractice,
    location_of_facility: formData.clinicLocation,
    consulting_with_us: convertToBoolean(formData.digitalConsultation),
    languages: setToArray(formData.languages),
    affiliation: convertToBoolean(formData.medicalAssociationAffiliation),
    education: formData.education,
    degree: formData.education, // Assuming education field contains the degree
    international_expatriates: convertToBoolean(formData.internationalExperience),
    working_hours: setToArray(formData.workingHours),
    working_days: setToArray(formData.workingDays),
    in_person: convertToBoolean(formData.inPersonConsultation),
    consultation_fee_range: formData.consultationFee,
    services: setToArray(formData.services),
    recognitions_or_awards: convertToBoolean(formData.hasAward),
    publications_or_research: convertToBoolean(formData.researchPublicationExperience)
  };
};



export const handleFormSubmit = async (formData) => {
  const url = `${api}/secondary-forms/`;
  
  try {
    const response = await axios.post(url, formData);
    return response;
  } catch (err) {

    if (err.status == 400) {
      throw new Error("Secondary Form with this form email already exists.")
    } else {
      throw new Error("Form could not be submitted. Please contact support")
    }
  }
}

