export const validateFormData = (formData) => {
    const errors = {};
  
    const addError = (field, message) => {
      if (!errors[field]) {
        errors[field] = message;
      }
    };
  
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const hasItems = (field) => {
      if (field instanceof Set) {
        return field.size > 0;
      }
      if (Array.isArray(field)) {
        return field.length > 0;
      }
      return false;
    };
  
    // Name validations
    if (!formData.firstName?.trim()) {
      addError('firstName', 'First name is required');
    } else if (formData.firstName.length < 2) {
      addError('firstName', 'First name must be at least 2 characters long');
    }
  
    if (!formData.lastName?.trim()) {
      addError('lastName', 'Last name is required');
    } else if (formData.lastName.length < 2) {
      addError('lastName', 'Last name must be at least 2 characters long');
    }
  
    // Email validation
    if (!formData.email?.trim()) {
      addError('email', 'Email is required');
    } else if (!isValidEmail(formData.email)) {
      addError('email', 'Please enter a valid email address');
    }
  
    // Year validation
    if (!formData.certificationYear) {
      addError('certificationYear', 'Year of certification is required');
    } else {
      const year = parseInt(formData.certificationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1950 || year > currentYear) {
        addError('certificationYear', 'Please enter a valid certification year between 1950 and current year');
      }
    }
  
    // Specialty validation

    if (formData.userHasSpecialty === "Yes" && !formData.specialties) {
      addError('userHasSpecialty', 'Please indicate if you have any specialties');
    }
  
    // Treatments validation
    if (!hasItems(formData.treatments)) {
      addError('treatments', 'Please select at least one treatment or procedure');
    }
  
    // Practice location validations
    if (!formData.currentPractice?.trim()) {
      addError('currentPractice', 'Current practice location is required');
    }
  
    if (!formData.clinicLocation?.trim()) {
      addError('clinicLocation', 'Clinic location is required');
    }
  
    // Digital consultation validation
    if (!formData.digitalConsultation) {
      addError('digitalConsultation', 'Please indicate if you would consult digitally');
    }
  
    // Languages validation
    if (!hasItems(formData.languages)) {
      addError('languages', 'Please select at least one language');
    }
  
    // Medical association validation
    if (!formData.medicalAssociationAffiliation) {
      addError('medicalAssociationAffiliation', 'Please indicate if you have any medical affiliations');
    }
  
    // Education validation
    if (!formData.education?.trim()) {
      addError('education', 'Education/degree is required');
    }
  
    // Awards validation
    if (!formData.hasAward) {
      addError('hasAward', 'Please indicate if you have received any awards');
    }
  
    // Consultation fee validation
    if (!formData.consultationFee?.trim()) {
      addError('consultationFee', 'Please select your consultation fee range');
    }
  
    // Services validation
    if (!hasItems(formData.services)) {
      addError('services', 'Please select at least one service');
    }
  
    // International experience validation
    if (!formData.internationalExperience) {
      addError('internationalExperience', 'Please indicate if you have international experience');
    }
  
    // Working hours validation
    if (!hasItems(formData.workingHours)) {
      addError('workingHours', 'Please select your working hours');
    }
  
    // Working days validation
    if (!hasItems(formData.workingDays)) {
      addError('workingDays', 'Please select your working days');
    }
  
    // In-person consultation validation
    if (!formData.inPersonConsultation) {
      addError('inPersonConsultation', 'Please indicate if you provide in-person consultations');
    }
  
    // Research/publications validation
    if (!formData.researchPublicationExperience) {
      addError('researchPublicationExperience', 'Please indicate if you have research or publication experience');
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };