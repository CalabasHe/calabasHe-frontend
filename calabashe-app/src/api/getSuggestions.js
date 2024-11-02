// Initialize caches from localStorage if available
let conditionsCache = JSON.parse(localStorage.getItem('conditionsCache')) || {};
let specialtiesCache = JSON.parse(localStorage.getItem('specialtiesCache')) || {};
let locationsCache = JSON.parse(localStorage.getItem('locationsCache')) || {};
let conditionsNextPage = localStorage.getItem('conditionsNextPage') || 'https://calabashe-api.onrender.com/api/conditions/';
let specialtiesFetched = Boolean(Object.keys(specialtiesCache).length); // Track if specialties are already loaded
let facilitiesCache = JSON.parse(localStorage.getItem('facilitiesCache')) || {};
let servicesCache = JSON.parse(localStorage.getItem('servicesCache')) || {};
let facilityNextPage = localStorage.getItem('facilityNextPage') || 'https://calabashe-api.onrender.com/api/facilities';

// Ghana regions for location cache
const ghanaRegions = [
    "Greater Accra", "Ashanti", "Central", "Western", 
    "Eastern", "Northern", "Upper East", "Upper West", 
    "Volta", "Bono", "Bono East", "Ahafo", "Savannah", 
    "North East", "Western North", "Oti"
];

// Store regions in localStorage if not already cached
if (!Object.keys(locationsCache).length) {
    ghanaRegions.forEach(region => locationsCache[region.toLowerCase()] = region);
    localStorage.setItem('locationsCache', JSON.stringify(locationsCache));
}

// Function to get locations from cache based on input
export const getLocations = (value) => {
    const lowercaseValue = value.toLowerCase();
    return Object.values(locationsCache).filter(location => location.toLowerCase().includes(lowercaseValue));
};

// Helper function to fetch paginated data and update cache and localStorage
const fetchPaginatedConditions = async () => {
    if (!conditionsNextPage) return; // Stop if there’s no next page

    const response = await fetch(conditionsNextPage);
    const data = await response.json();

    const newConditions = data.results.map(item => {
        const bracketIndex = item.name.indexOf('(');
        return bracketIndex !== -1 ? item.name.slice(0, bracketIndex) : item.name;
    });

    // Update cache and localStorage with new conditions
    newConditions.forEach(condition => conditionsCache[condition.toLowerCase()] = condition);
    localStorage.setItem('conditionsCache', JSON.stringify(conditionsCache));

    // Update next page in state and localStorage
    conditionsNextPage = data.next;
    localStorage.setItem('conditionsNextPage', data.next || '');
};

// Function to fetch facilities and their services
const fetchFacilities = async () => {
    if (!facilityNextPage) return;

    const response = await fetch(facilityNextPage);
    const data = await response.json();

    data.results.forEach(facility => {
        // Store facility name
        facilitiesCache[facility.name.toLowerCase()] = facility.name;
        // Store services
        servicesCache[facility.name.toLowerCase()] = facility.services.map(service => service.name);
    });

    localStorage.setItem('facilitiesCache', JSON.stringify(facilitiesCache));
    localStorage.setItem('servicesCache', JSON.stringify(servicesCache));
    
    // Update the next page
    facilityNextPage = data.next;
    localStorage.setItem('facilityNextPage', data.next || '');
};

// Fetch specialties once and cache them
const fetchSpecialties = async () => {
    if (specialtiesFetched) return;

    const response = await fetch('https://calabashe-api.onrender.com/api/specialties/');
    const data = await response.json();

    data.results.forEach(item => {
        const bracketIndex = item.name.indexOf('(');
        const specialty = bracketIndex !== -1 ? item.name.slice(0, bracketIndex) : item.name;
        specialtiesCache[specialty.toLowerCase()] = specialty;
    });

    localStorage.setItem('specialtiesCache', JSON.stringify(specialtiesCache));
    specialtiesFetched = true;
};

// Function to get conditions, with pagination if needed
export const getConditions = async (value) => {
    const lowercaseValue = value.toLowerCase();

    // Check if cache has items starting with the same letter as input
    while (
        conditionsNextPage &&
        !Object.keys(conditionsCache).some(condition => condition.startsWith(lowercaseValue[0]))
    ) {
        await fetchPaginatedConditions();
    }

    return Object.values(conditionsCache).filter(condition => condition.toLowerCase().includes(lowercaseValue));
};

// Function to get specialties, only fetched once
export const getSpecialties = async (value) => {
    await fetchSpecialties();
    const lowercaseValue = value.toLowerCase();

    return Object.values(specialtiesCache).filter(specialty => specialty.toLowerCase().includes(lowercaseValue));
};

// Function to get facilities based on input
export const getFacilities = async (value) => {
    await fetchFacilities(); // Fetch facilities if not cached
    const lowercaseValue = value.toLowerCase();

    return Object.values(facilitiesCache).filter(facility => 
        facility.toLowerCase().includes(lowercaseValue)
    );
};

// Function to get services based on facility name
export const getServices = async (facilityName, value) => {
    await fetchFacilities(); // Ensure facilities and services are fetched

    const lowercaseFacilityName = facilityName.toLowerCase();
    const lowercaseValue = value.toLowerCase();

    // Get services for the specified facility
    const services = servicesCache[lowercaseFacilityName] || [];

    // Filter services based on the input value
    return services.filter(service => 
        service.toLowerCase().includes(lowercaseValue)
    );
};
