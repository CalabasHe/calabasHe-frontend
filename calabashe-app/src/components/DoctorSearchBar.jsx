import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getConditions, getDoctorsNames, getLocations, getSpecialties } from '../api/getSuggestions';
import { Suggestions, QuerySuggestions } from './suggestions';
import { motion } from 'framer-motion';
import Alert from './alert';

const DoctorSearchBar = ({ submitFunc, resetFunc}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchContainerRef = useRef(null);
    const specialtyContainerRef = useRef(null);
    const locationInputRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get("search_query") || "");
    const [specialty, setSpecialty] = useState(new URLSearchParams(location.search).get("specialty") || "");
    const [locationInput, setLocationInput] = useState(new URLSearchParams(location.search).get("location") || "");
    const [suggestions, setSuggestions] = useState({
        allConditions: [],
        allDoctorsNames: [],
        allSpecialties: [],
        allLocations: []
    });
    const [activeInput, setActiveInput] = useState(null);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSearchQuery(searchParams.get("search_query") || "");
        setSpecialty(searchParams.get("specialty") || "");
        setLocationInput(searchParams.get("location") || "");

    }, [location.search]);



    const handleSearchQuery = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() !== '') {
            const allConditions = await getConditions(value);
            const allDoctorsNames = await getDoctorsNames(value);
            setSuggestions(prev => ({ ...prev, allConditions, allDoctorsNames }));
        } else {
            setSuggestions(prev => ({ 
                ...prev, 
                allConditions: [], 
                allDoctorsNames: [] 
            }));
        }
    };

    const handleSpecialty = async (e) => {
        const value = e.target.value;
        setSpecialty(value);
        if (value.trim()) {
            const allSpecialties = await getSpecialties(value);
            setSuggestions(prev => ({ ...prev, allSpecialties }));
        } else {
            setSuggestions(prev => ({ ...prev, allSpecialties: [] }));
        }
    };

    const handleLocation = (e) => {
        const value = e.target.value;
        setLocationInput(value);

        if (value.trim()) {
            const allLocations = getLocations(value);
            setSuggestions(prev => ({ ...prev, allLocations }));
        } else {
            setSuggestions(prev => ({ ...prev, allLocations: [] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((locationInput.length !== 0 || specialty.length) !== 0 || searchQuery.length !== 0) {
            setAlert(false)
            const params = new URLSearchParams(location.search);
            params.set("location", locationInput);
            params.set("specialty", specialty);
            params.set("search_query", searchQuery);
            setSuggestions({ allConditions: [], allSpecialties: [] });
            submitFunc(searchQuery, specialty, locationInput);
        }
        else {
            setAlert(true)
        }
    };

    
    const handleReset = (e) => {
        e.preventDefault();
        resetFunc();
        // setAlert(!alert)
    }

    //user presses enter key, submit
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };


    const onSpecialtySelected = (suggestion) => {
        setSpecialty(suggestion);
        setSuggestions(prev => ({ ...prev, allSpecialties: [] }));
    };

    const onConditionSelected = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions(prev => ({ ...prev, allConditions: [] }));
        setSuggestions(prev => ({ ...prev, allDoctorsNames: [] }));
    };

    const onLocationSelected = (suggestions) => {
        setLocationInput(suggestions);
        setSuggestions(prev => ({ ...prev, allLocations: [] }))
    }

    const clearSearchQuery = (e) => {
        e.preventDefault();
        setSearchQuery('');
        setSuggestions(prev => ({ ...prev, allConditions: [], allDoctorsNames: [] }));
    };

    const clearSpecialty = (e) => {
        e.preventDefault();
        setSpecialty('');
        setSuggestions(prev => ({ ...prev, allSpecialties: [] }));
    };

    const clearLocation = (e) => {
        e.preventDefault();
        setLocationInput('');
        setSuggestions(prev => ({ ...prev, allLocations: [] }));
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allConditions: [] }));
                setSuggestions(prev => ({ ...prev, allDoctorsNames: [] }));
            }
            if (specialtyContainerRef.current && !specialtyContainerRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allSpecialties: [] }));
            }
            if (locationInputRef.current && !locationInputRef.current.contains(event.target)) {
                setSuggestions(prev => ({ ...prev, allLocations: [] }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchQuery && !specialty) {
            setActiveInput('search');
        } else if (!searchQuery && specialty) {
            setActiveInput('specialty');
        } else {
            setActiveInput(null);
        }
    }, [searchQuery, specialty]);

    return (
        <div className="max-w-[1100px] mx-auto block w-full pb-4">
            <div className='md:w-[40%] mx-auto'>
                <Alert message={"Enter a Doctor, Condition, or Location to search"} show={alert}/>
            </div>
            <form className="duration-300 border-2 bg-white max-w-[1100px] rounded-md w-[98%] md:w-[97%] mx-auto flex flex-col gap-2 md:flex-row text-black py-6 px-2 md:p-0 border-black" onSubmit={handleSubmit} >
                <div className='w-full md:w-[70%] flex flex-col md:flex-row'>
                    <motion.div
                        animate={{
                            width: activeInput === 'specialty' ? '0%' : '100%',
                            opacity: activeInput === 'specialty' ? 0 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-full md:w-[45%]  ${activeInput === 'specialty' ? 'hidden' : 'block'}`}
                    >
                        <div ref={searchContainerRef} className='w-full flex flex-col relative'>
                            <div className="flex items-center w-full pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0" >
                                <Icon icon="material-symbols-light:ecg-heart-sharp" height={24} style={{ color: "black" }} className='ml-2 md:ml-8' />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchQuery}
                                    placeholder="Doctor, condition, treatment..."
                                    className="w-full pl-1 pr-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                                    onKeyDown={handleKeyDown}
                                />
                                {searchQuery && (
                                    <button onClick={clearSearchQuery} className="absolute md:left-[95%] left-[90%]">
                                        <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                                    </button>
                                )}
                            </div>
                            <QuerySuggestions docSuggests={suggestions.allDoctorsNames} conditionSuggests={suggestions.allConditions} onSelect={onConditionSelected} />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            width: activeInput === 'search' ? '0%' : '100%',
                            opacity: activeInput === 'search' ? 0 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-full md:w-[45%]  ${activeInput === 'search' ? 'hidden' : 'block'}`}
                    >
                        <div ref={specialtyContainerRef} className='w-full flex flex-col relative'>
                            <div className="flex items-center pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                                <Icon icon="material-symbols:person" style={{ color: "black" }} height={24} className='ml-2' />
                                <input
                                    type="text"
                                    placeholder="Specialty"
                                    value={specialty}
                                    onChange={handleSpecialty}
                                    className="w-full px-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                                    onKeyDown={handleKeyDown}
                                />
                                {specialty && (
                                    <button onClick={clearSpecialty} className="absolute md:left-[92%] left-[90%]">
                                        <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                                    </button>
                                )}
                            </div>
                            <Suggestions suggests={suggestions.allSpecialties} onSelect={onSpecialtySelected} suggestionName={"Specialties"} />
                        </div>
                    </motion.div>
                </div>

                <div ref={locationInputRef} className="flex items-center pb-1 pt-2 w-full md:w-[30%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0 relative">
                    <div className='flex w-full items-center'>
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
                            (
                                <button onClick={clearLocation} className="absolute md:left-[92%] left-[90%] pb-1">
                                    <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                                </button>
                            )
                        )}
                    </div>
                    <Suggestions suggests={suggestions.allLocations} onSelect={onLocationSelected} suggestionName={"Location"} />
                </div>

                <div className='flex items-center flex-col md:flex-row md:w-[15%] lg:w-[12%] gap-1 py-1 md:py-0'>
                    <div className='bg-custom-yellow hover:bg-yellow-400 rounded-md md:border-0 md:bg-white md:hover:bg-white w-full py-2'>
                        <button size="icon" className="w-full text-center" onClick={handleReset}>
                            <span className='font-semibold md:font-normal'>Reset</span>
                        </button>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center justify-center px-3 py-2 w-full md:w-[85%]  bg-custom-yellow hover:bg-yellow-400 md:rounded-l-none rounded-md">
                        <button type="submit" size="icon" className="w-full text-center mx-auto items-center">
                            <span className="hidden md:block"><Icon icon="circum:search" style={{ color: "black" }} height={24} className='mx-auto'/></span>
                            <span className="md:hidden font-bold">Find a doctor</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DoctorSearchBar;