import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getConditions, getSpecialties } from '../api/getSuggestions';
import { SearchQuery, SpecialtySuggestions } from './suggestions';

const DoctorSearchBar = ({ submitFunc }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = (searchParams.get("search_query") || "").trim();
    const initialSpecialty = (searchParams.get("specialty") || "").trim();
    const initialLocation = (searchParams.get("location") || "").trim();

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [specialty, setSpecialty] = useState(initialSpecialty);
    const [locationInput, setLocationInput] = useState(initialLocation);
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchQuery = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const allConditions = await getConditions(value);
        setSuggestions(prev => ({ ...prev, allConditions }));
    };

    const handleSpecialty = async (e) => {
        const value = e.target.value;
        setSpecialty(value);
        const allSpecialties = await getSpecialties(value);
        setSuggestions(prev => ({ ...prev, allSpecialties }));
    };

    const handleLocation = (e) => {
        const value = e.target.value;
        setLocationInput(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);
        params.set("location", locationInput);
        params.set("specialty", specialty);
        params.set("search_query", searchQuery);
        setSuggestions([]);
        submitFunc(searchQuery, specialty, locationInput);
    };

    const onSpecialtySelected = (suggestion) => {
        setSpecialty(suggestion);
        setSuggestions([]);
    };

    const onConditionSelected = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
    };

    const clearSearchQuery = (e) => {
        e.preventDefault();
        // setSearchQuery('')
        setSuggestions([]);
    };

    const clearSpecialty = (e) => {
        e.preventDefault();
        // setSpecialty('')
        setSuggestions([]);
    };

    return (
        <div className="max-w-[1100px] mx-auto block w-full pb-4">
            <form className="duration-300 border-2 bg-white max-w-[1100px] rounded-md w-[98%] md:w-[97%] mx-auto flex flex-col gap-2 md:flex-row text-black py-6 px-2 md:p-0 border-black" onSubmit={handleSubmit}>

                {/* Search Query Input */}
                <div className='w-full md:w-[45%] flex flex-col relative'>
                    <div className="flex items-center pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                        <Icon icon="material-symbols-light:ecg-heart-sharp" height={24} style={{ color: "black" }} className='ml-2 md:ml-8' />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            placeholder="Doctor, condition, treatment..."
                            className="w-full pl-1 pr-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                        />
                        {searchQuery && (
                            <button onClick={clearSearchQuery} className="absolute md:left-[95%] left-[90%]">
                                <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                            </button>
                        )}
                    </div>
                    <SearchQuery conditionSuggestions={suggestions.allConditions} onSelect={onConditionSelected} />
                </div>

                {/* Specialty Input */}
                <div className='w-full md:w-[30%] flex flex-col relative'>
                    <div className="flex items-center pb-1 pt-2 border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                        <Icon icon="material-symbols:person" style={{ color: "black" }} height={24} className='ml-2' />
                        <input
                            type="text"
                            placeholder="Specialty"
                            value={specialty}
                            onChange={handleSpecialty}
                            className="w-full px-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                        />
                        {specialty && (
                            <button onClick={clearSpecialty} className="absolute md:left-[92%] left-[90%]">
                                <Icon icon="ic:baseline-close" style={{ color: "gray" }} height={20} />
                            </button>
                        )}
                    </div>
                    <SpecialtySuggestions specialtySuggests={suggestions.allSpecialties} onSelect={onSpecialtySelected} />
                </div>

                {/* Location input and submit button remain unchanged */}
                <div className="flex items-center pb-1 pt-2 w-full md:w-[22%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                    <Icon icon="gridicons:location" style={{ color: "black" }} height={24} className='ml-2' />
                    <input
                        type="text"
                        value={locationInput}
                        onChange={handleLocation}
                        placeholder="Location, region"
                        className="w-full px-2 border-r-0 border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>

                <div className="mt-3 md:mt-0 flex items-center px-3 py-2 w-full md:w-[8%] lg:w-[4%] bg-custom-yellow hover:bg-yellow-400 md:rounded-l-none rounded-md">
                    <button type="submit" size="icon" className="w-full text-center">
                        <span className="hidden md:block"><Icon icon="circum:search" style={{ color: "black" }} height={24} /></span>
                        <span className="md:hidden font-bold">Find a doctor</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorSearchBar;
