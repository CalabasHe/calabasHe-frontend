import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFacilities, getLocations, getServices } from '../api/getSuggestions';
import { Suggestions } from './suggestions';
import { motion } from 'framer-motion';

const FacilitySearchBar = ({ submitFunc }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const facilityContainerRef = useRef(null);
    const serviceContainerRef = useRef(null);
    const locationContainerRef = useRef(null);

    // Extract initial values from URL
    const searchParams = new URLSearchParams(location.search);
    const initialFacility = (searchParams.get("facility") || "").trim();
    const initialService = (searchParams.get("service") || "").trim();
    const initialLocation = (searchParams.get("location") || "").trim();

    const [facility, setFacility] = useState(initialFacility);
    const [service, setService] = useState(initialService);
    const [locationInput, setLocationInput] = useState(initialLocation);
    const [activeInput, setActiveInput] = useState(null);

    const [suggestions, setSuggestions] = useState({
        allFacilities: [],
        allServices: [],
        allLocations: []
    });

    const handleFacilityChange = async (e) => {
        const value = e.target.value;
        setFacility(value);
        if (value.trim()) {
            const facilityResults = await getFacilities(value);
            setSuggestions(prev => ({ ...prev, allFacilities: facilityResults }));
        } else {
            setSuggestions(prev => ({ ...prev, allFacilities: [] }));
        }
    };

    const handleServiceChange = async (e) => {
        const value = e.target.value;
        setService(value);
        if (value.trim()) {
            const serviceResults = await getServices(value);
            setSuggestions(prev => ({ ...prev, allServices: serviceResults }));
        } else {
            setSuggestions(prev => ({ ...prev, allServices: [] }));
        }
    };

    const handleLocation = (e) => {
        const value = e.target.value;
        setLocationInput(value);
        if (value.trim()) {
            const locationResults = getLocations(value);
            setSuggestions(prev => ({ ...prev, allLocations: locationResults }));
        } else {
            setSuggestions(prev => ({ ...prev, allLocations: [] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (facility.trim() || service.trim() || locationInput.trim()) {
            const params = new URLSearchParams(location.search);
            params.set("facility", facility);
            params.set("service", service);
            params.set("location", locationInput);
            setSuggestions({
                allFacilities: [],
                allServices: [],
                allLocations: []
            });
            submitFunc(facility, service, locationInput);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const clearFacility = (e) => {
        e.preventDefault();
        setFacility('');
        setSuggestions(prev => ({ ...prev, allFacilities: [] }));
    };

    const clearService = (e) => {
        e.preventDefault();
        setService('');
        setSuggestions(prev => ({ ...prev, allServices: [] }));
    };

    const clearLocation = (e) => {
        e.preventDefault();
        setLocationInput('');
        setSuggestions(prev => ({ ...prev, allLocations: [] }));
    };

    const onFacilitySelected = (suggestion) => {
        setFacility(suggestion);
        setSuggestions(prev => ({ ...prev, allFacilities: [] }));
    };

    const onServiceSelected = (suggestion) => {
        setService(suggestion);
        setSuggestions(prev => ({ ...prev, allServices: [] }));
    };

    const onLocationSelected = (suggestion) => {
        setLocationInput(suggestion);
        setSuggestions(prev => ({ ...prev, allLocations: [] }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (facilityContainerRef.current && !facilityContainerRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allFacilities: [] }));
            }
            if (serviceContainerRef.current && !serviceContainerRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allServices: [] }));
            }
            if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allLocations: [] }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (facility && !service) {
            setActiveInput('facility');
        } else if (!facility && service) {
            setActiveInput('service');
        } else {
            setActiveInput(null);
        }
    }, [facility, service]);

    return (
        <div className="max-w-[1100px] mx-auto block w-full pb-4">
            <form className="duration-300 border-2 bg-white max-w-[1100px] rounded-md w-[98%] md:w-[97%] mx-auto flex flex-col gap-2 md:flex-row text-black py-6 px-2 md:p-0 border-black" onSubmit={handleSubmit}>
                <div className="w-full md:w-[70%] flex flex-col md:flex-row">
                    {/* Facility Input */}
                    <motion.div
                        animate={{
                            width: activeInput === 'service' ? '0%' : '100%',
                            opacity: activeInput === 'service' ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-full md:w-[60%] ${activeInput === 'service' ? 'hidden' : 'block'}`}
                    >
                        <div ref={facilityContainerRef} className="w-full flex flex-col relative">
                            <div className="flex items-center pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                                <Icon icon="icon-park-solid:hospital-three" height={24} style={{ color: "black" }} className='md:mr-1 ml-2 md:ml-8'/>
                                <input
                                    type="text"
                                    value={facility}
                                    onChange={handleFacilityChange}
                                    placeholder="Facility"
                                    className="w-full px-2 md:pl-1 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                                    onKeyDown={handleKeyDown}
                                />
                                {facility && (
                                    <button onClick={clearFacility} className="absolute md:left-[92%] left-[90%]">
                                        <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                                    </button>
                                )}
                            </div>
                            <Suggestions suggests={suggestions.allFacilities} onSelect={onFacilitySelected} suggestionName={"Facility"}/>
                        </div>
                    </motion.div>

                    {/* Service Input */}
                    <motion.div
                        animate={{
                            width: activeInput === 'facility' ? '0%' : '100%',
                            opacity: activeInput === 'facility' ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-full md:w-[40%] ${activeInput === 'facility' ? 'hidden' : 'block'}`}
                    >
                        <div ref={serviceContainerRef} className="w-full flex flex-col relative">
                            <div className="flex items-center pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                                <Icon icon="ri:service-fill" style={{ color: "black" }} height={24} className='ml-2'/>
                                <input
                                    type="text"
                                    placeholder="Service"
                                    value={service}
                                    onChange={handleServiceChange}
                                    className="w-full px-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                                    onKeyDown={handleKeyDown}
                                />
                                {service && (
                                    <button onClick={clearService} className="absolute md:left-[92%] left-[90%]">
                                        <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                                    </button>
                                )}
                            </div>
                            <Suggestions suggests={suggestions.allServices} onSelect={onServiceSelected} suggestionName={"services"}/>
                        </div>
                    </motion.div>
                </div>

                {/* Location Input */}
                <div ref={locationContainerRef} className="flex items-center pb-1 pt-2 w-full md:w-[30%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0 relative">
                    <div className="flex w-full items-center">
                        <Icon icon="gridicons:location" style={{ color: "black" }} height={24} className='ml-2' />
                        <input
                            type="text"
                            value={locationInput}
                            onChange={handleLocation}
                            placeholder="Location, region"
                            className="w-full px-2 border-r-0 border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                            onKeyDown={handleKeyDown}
                        />
                        {locationInput && (
                            <button onClick={clearLocation} className="absolute md:left-[92%] left-[90%]">
                                <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                            </button>
                        )}
                    </div>
                    <Suggestions suggests={suggestions.allLocations} onSelect={onLocationSelected} suggestionName={"Location"} />
                </div>

                {/* Search Button */}
                <div className="mt-3 md:mt-0 flex items-center px-3 py-2 w-full md:w-[8%] lg:w-[4%] bg-custom-yellow hover:bg-yellow-400 md:rounded-l-none rounded-md">
                    <button type="submit" size="icon" className="w-full text-center">
                        <span className="hidden md:block"><Icon icon="circum:search" style={{ color: "black" }} height={24} /></span>
                        <span className="md:hidden font-bold">Find a facility</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FacilitySearchBar;