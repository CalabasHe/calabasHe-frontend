// Initialize caches from localStorage if available
let conditionsCache = JSON.parse(localStorage.getItem('conditionsCache')) || {};
let specialtiesCache = JSON.parse(localStorage.getItem('specialtiesCache')) || {};
let locationsCache = JSON.parse(localStorage.getItem('locationsCache')) || {};
let conditionsNextPage = localStorage.getItem('conditionsNextPage') || 'https://calabashe-api.onrender.com/api/conditions/';
let specialtiesFetched = Boolean(Object.keys(specialtiesCache).length); // Track if specialties are already loaded
let facilityServicePage = JSON.parse(localStorage.getItem('facilityNextPage')) || 'https://calabashe-api.onrender.com/api/facilities';

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
