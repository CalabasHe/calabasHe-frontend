// Initialize caches from localStorage if available
import Fuse from "fuse.js";
import FuzzySort from "fuzzysort"
let conditionsCache = JSON.parse(localStorage.getItem('conditionsCache')) || {};
let specialtiesCache = JSON.parse(localStorage.getItem('specialtiesCache')) || {};
let locationsCache = JSON.parse(localStorage.getItem('locationsCache')) || {};
let facilitiesCache = JSON.parse(localStorage.getItem('facilitiesCache')) || {};
let servicesCache = JSON.parse(localStorage.getItem('servicesCache')) || {};
let doctorsNamesCache = JSON.parse(localStorage.getItem('doctorsNamesCache')) || {};

let conditionsNextPage = localStorage.getItem('conditionsNextPage') || 'https://calabashe-api.onrender.com/api/conditions/';
let facilityNextPage = localStorage.getItem('facilityNextPage') || 'https://calabashe-api.onrender.com/api/facilities';
let servicesNextPage = localStorage.getItem('servicesNextPage') || 'https://calabashe-api.onrender.com/api/services';
let doctorsNamesNextPage = localStorage.getItem('doctorsNamesNextPage') || 'https://calabashe-api.onrender.com/api/doctors/names';

//not paginated
let specialtiesFetched = Boolean(Object.keys(specialtiesCache).length);



const ghanaRegions = [
    "Greater Accra", "Ashanti", "Central", "Western", 
    "Eastern", "Northern", "Upper East", "Upper West", 
    "Volta", "Bono", "Bono East", "Ahafo", "Savannah", 
    "North East", "Western North", "Oti"
];


if (!Object.keys(locationsCache).length) {
    ghanaRegions.forEach(region => locationsCache[region.toLowerCase()] = region);
    localStorage.setItem('locationsCache', JSON.stringify(locationsCache));
}

// for one word values
const fuseSearch = (objArr, searchString) => {
    const options = {
        threshold: 0.3, // Lower values = stricter matches
        isCaseSensitive: false,
      };
    const arr = Object.keys(objArr);
    const fuse = new Fuse(arr, options);
    const results = fuse.search(searchString);
    return results.map(result => objArr[result.item]);
}

// for spaced values
const fuzzySort = (objArr, searchString) => {
    const arr = Object.keys(objArr);
    const results = FuzzySort.go(searchString, arr, {threshold: -10000});
    return results.map(result => objArr[result.target]);
}


export const getLocations = (value) => {
    return fuseSearch(locationsCache, value);
};


const fetchPaginatedConditions = async () => {
    if (!conditionsNextPage) return;

    try {
        const response = await fetch(conditionsNextPage);
        const data = await response.json();
    
        const newConditions = data.results.map(item => {
            const bracketIndex = item.name.indexOf('(');
            return bracketIndex !== -1 ? item.name.slice(0, bracketIndex) : item.name;
        });
    
    
        newConditions.forEach(condition => conditionsCache[condition.toLowerCase()] = condition);
        localStorage.setItem('conditionsCache', JSON.stringify(conditionsCache));
    
    
        conditionsNextPage = data.next;
        localStorage.setItem('conditionsNextPage', data.next || '');
    } catch (error) {
        throw error
    }
};

const fetchPaginatedDoctorsNames = async () => {
    if (!doctorsNamesNextPage) return;

    try {
        const response = await fetch(doctorsNamesNextPage);
        const data = await response.json();
    
        const fullNames = data.results.map(item => {
            const fullName = item.first_name + " " + item.last_name;
            return fullName;
        });
        fullNames.forEach(name => doctorsNamesCache[name.toLowerCase()] = name);
        localStorage.setItem('doctorsNamesCache', JSON.stringify(doctorsNamesCache));
    
    
        doctorsNamesNextPage = data.next;
        localStorage.setItem('doctorsNamesNextPage', data.next || '');
    } catch (err) {
        throw err;
    }
};


const fetchPaginatedFacilities = async () => {
    if (!facilityNextPage) return; 

    try {
        const response = await fetch(facilityNextPage);
        const data = await response.json();
    
    
        data.results.forEach(facility => facilitiesCache[facility.name.toLowerCase()] = facility.name);
        localStorage.setItem('facilitiesCache', JSON.stringify(facilitiesCache));
    
        facilityNextPage = data.next;
        localStorage.setItem('facilityNextPage', data.next || '');
    } catch (err) {
        throw err
    }
};

export const fetchPaginatedServices = async () => {
    if (!servicesNextPage) return;
    try {
        const response = await fetch(servicesNextPage);
        const data = await response.json();
        
    
        data.results.forEach(service => {
            servicesCache[service.name.toLowerCase()] = service.name
        });
        localStorage.setItem('servicesCache', JSON.stringify(servicesCache))
    } catch(err) {
        throw err;
    }
};

const fetchSpecialties = async () => {
    if (specialtiesFetched) return;

    try {
        const response = await fetch('https://calabashe-api.onrender.com/api/specialties/');
        const data = await response.json();
    
        data.results.forEach(item => {
            const bracketIndex = item.name.indexOf('(');
            const specialty = bracketIndex !== -1 ? item.name.slice(0, bracketIndex) : item.name;
            specialtiesCache[specialty.toLowerCase()] = specialty;
        });
    
        localStorage.setItem('specialtiesCache', JSON.stringify(specialtiesCache));
        specialtiesFetched = true;
    } catch (err) {
        throw err;
    }
};

export const getConditions = async (value) => {
    const lowercaseValue = value.toLowerCase();
    
    if (Object.keys(conditionsCache).some(condition => condition.startsWith(lowercaseValue[0]))) {
        return Object.values(conditionsCache).filter(condition => condition.toLowerCase().startsWith(lowercaseValue));
    }

    while (
        conditionsNextPage &&
        !Object.keys(conditionsCache).some(condition => condition.startsWith(lowercaseValue[0]))
    ) {
        await fetchPaginatedConditions();
    }

    return fuseSearch(conditionsCache, value);
};

export const getSpecialties = async (value) => {
    await fetchSpecialties();
    return fuseSearch(specialtiesCache, value)
};

export const getFacilities = async (value) => {
    const lowercaseValue = value.toLowerCase();
    while (
        facilityNextPage &&
        !Object.keys(facilitiesCache).some(facility => facility.startsWith(lowercaseValue[0]))
    ) {
        await fetchPaginatedFacilities();
    }
    return fuseSearch(facilitiesCache, value);
};

export const getServices = async (value) => {
    // const lowercaseValue = value.toLowerCase();
        await fetchPaginatedServices();
    // console.log(servicesCache)
    return fuseSearch(servicesCache, value);
};

export const getDoctorsNames = async (value) => {
    const lowercaseValue = value.toLowerCase();

    while (
        doctorsNamesNextPage &&
        !Object.keys(doctorsNamesCache).some(name => name.startsWith(lowercaseValue[0]))
    ) {
        await fetchPaginatedDoctorsNames();
    }
    
    return fuzzySort(doctorsNamesCache, value);
};