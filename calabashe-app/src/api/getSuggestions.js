// Initialize caches from localStorage if available
let conditionsCache = JSON.parse(localStorage.getItem('conditionsCache')) || {};
let specialtiesCache = JSON.parse(localStorage.getItem('specialtiesCache')) || {};
let locationsCache = JSON.parse(localStorage.getItem('locationsCache')) || {};
let facilitiesCache = JSON.parse(localStorage.getItem('facilitiesCache')) || {};
let servicesCache = JSON.parse(localStorage.getItem('servicesCache')) || {};

let conditionsNextPage = localStorage.getItem('conditionsNextPage') || 'https://calabashe-api.onrender.com/api/conditions/';
let facilityNextPage = localStorage.getItem('facilityNextPage') || 'https://calabashe-api.onrender.com/api/facilities';
let servicesNextPage = localStorage.getItem('servicesNextPage') || 'https://calabashe-api.onrender.com/api/services';

//not paginated
let specialtiesFetched = Boolean(Object.keys(specialtiesCache).length);


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


// Helper function to fetch paginated data and update cache and localStorage
const fetchPaginatedFacilities = async () => {
    if (!facilityNextPage) return; // Stop if there’s no next page

    const response = await fetch(facilityNextPage);
    const data = await response.json();

    // Update cache and localStorage with new conditions
    data.results.forEach(facility => facilitiesCache[facility.name.toLowerCase()] = facility.name);
    localStorage.setItem('facilitiesCache', JSON.stringify(facilitiesCache));

    // Update next page in state and localStorage
    facilityNextPage = data.next;
    localStorage.setItem('facilityNextPage', data.next || '');
};

// Helper function to fetch paginated data and update cache and localStorage
export const fetchPaginatedServices = async () => {
    if (!servicesNextPage) return; // Stop if there’s no next page

    const response = await fetch(servicesNextPage);
    const data = await response.json();
    
    // Update cache and localStorage with new conditions
    data.results.forEach(service => {
        servicesCache[service.name.toLowerCase()] = service.name
    });
    localStorage.setItem('servicesCache', JSON.stringify({}));

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

    return Object.values(conditionsCache).filter(condition => condition.toLowerCase().startsWith(lowercaseValue));
};

// Function to get specialties, only fetched once
export const getSpecialties = async (value) => {
    await fetchSpecialties();
    const lowercaseValue = value.toLowerCase();

    return Object.values(specialtiesCache).filter(specialty => specialty.toLowerCase().startsWith(lowercaseValue));
};

// Function to get facilites, with pagination if needed
export const getFacilities = async (value) => {
    const lowercaseValue = value.toLowerCase();

    // Check if cache has items starting with the same letter as input
    while (
        facilityNextPage &&
        !Object.keys(facilitiesCache).some(facility => facility.startsWith(lowercaseValue[0]))
    ) {
        await fetchPaginatedFacilities();
    }
    return Object.values(facilitiesCache).filter(facility => facility.toLowerCase().startsWith(lowercaseValue));
};

export const getServices = async (value) => {
    const lowercaseValue = value.toLowerCase();

    // Check if cache has items starting with the same letter as input
        await fetchPaginatedServices();
    // console.log(servicesCache)
    return Object.values(servicesCache).filter(service => service.toLowerCase().startsWith(lowercaseValue));
};