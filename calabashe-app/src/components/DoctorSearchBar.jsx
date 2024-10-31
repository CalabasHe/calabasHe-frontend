import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorSearchBar = ({ submitFunc }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract initial values from URL and trim any leading/trailing spaces
    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = (searchParams.get("search_query") || "").trim();
    const initialSpecialty = (searchParams.get("specialty") || "").trim();
    const initialLocation = (searchParams.get("location") || "").trim();

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [specialty, setSpecialty] = useState(initialSpecialty);
    const [locationInput, setLocationInput] = useState(initialLocation);

    /** Helper function to trim and replace multiple spaces with a single space */
    const sanitizeInput = (value) => value.trim().replace(/\s+/g, " ");

    /** Update URL params when input changes */
    const handleSearchQuery = (e) => {
        const value = sanitizeInput(e.target.value);
        setSearchQuery(value);

        const params = new URLSearchParams(location.search);
        params.set("search_query", value); // Update to use search_query
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleSpecialty = (e) => {
        const value = sanitizeInput(e.target.value);
        setSpecialty(value);

        const params = new URLSearchParams(location.search);
        params.set("specialty", value);
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleLocation = (e) => {
        const value = sanitizeInput(e.target.value);
        setLocationInput(value);

        const params = new URLSearchParams(location.search);
        params.set("location", value);
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFunc(searchQuery, specialty, locationInput);
    };

    return (
        <div className="max-w-[1100px] mx-auto block w-full pb-4 md:sticky md:top-[15%] z-30">
            <form className="duration-300 border-2 bg-white max-w-[1100px] rounded-md w-[98%] md:w-[97%] mx-auto flex flex-col gap-2 md:flex-row text-black py-6 px-2 md:p-0 border-black" onSubmit={handleSubmit}>
                
                {/* Doctor filter conditions */}
                <div className="flex items-center pb-1 pt-2 w-full md:w-[45%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                    <Icon icon="material-symbols-light:ecg-heart-sharp" height={24} style={{ color: "black" }} className='ml-2 md:ml-8' />
                    <input
                        type="text"
                        value={searchQuery} // Use searchQuery state
                        onChange={handleSearchQuery} // Use handleSearchQuery function
                        placeholder="Doctor, condition, treatment..."
                        className="w-full pl-1 pr-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>

                {/* Specialty */}
                <div className="flex items-center pb-1 pt-2 w-full md:w-[28%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                    <Icon icon="material-symbols:person" style={{ color: "black" }} height={24} className='ml-2' />
                    <input
                        type="text"
                        placeholder="Specialty"
                        value={specialty}
                        onChange={handleSpecialty}
                        className="w-full px-2 md:border-r-[0.5px] border-gray-300 placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>

                {/* Location, region */}
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

                {/* Button */}
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