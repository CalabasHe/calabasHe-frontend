import { Icon } from '@iconify/react';
import { useState } from 'react';
const DoctorSearchBar = ({submitFunc}) => {

    const [doctorFacilityTreatment, setdoctorFacilityTreatment] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [location, setLocation] = useState('');

    /** Handlers for values */
    const handleDoctorFacilityTreatment = (e) => {
        setdoctorFacilityTreatment(e.target.value);
        //maybe debounce later
    }

    const handleSpecialty  = (e) =>{
        setSpecialty(e.target.value)
    }
    
    const handleLocation = (e) => {
        setLocation(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitFunc(doctorFacilityTreatment, specialty, location)
    }

    return (
        <div className="max-w-[1100px] mx-auto block w-full pb-10">
            <form className="duration-300 border-2 bg-white max-w-[1100px] rounded-md w-[98%] md:w-[97%] mx-auto flex flex-col gap-2 md:flex-row text-black py-6 px-2 md:p-0 border-black" onSubmit={handleSubmit}>
                {/**Doctor filter conditions */}
                <div className="flex items-center  pb-1 pt-2 w-full md:w-[45%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                <Icon icon="material-symbols-light:ecg-heart-outline" height={24} style={{color: "black"}} className='md:ml-8'/>
                    <input
                        type="text"
                        value={doctorFacilityTreatment}
                        onChange={handleDoctorFacilityTreatment}
                        placeholder="Doctor, condition, treatment..."
                        className="w-full  pl-1 pr-2 md:border-r-[0.5px] border-gray-300  placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>
                {/** Specialty */}
                <div className="flex items-center  pb-1 pt-2 w-full md:w-[28%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                <Icon icon="stash:person-light"  style={{color: "black"}} height={24} className='ml-2'/>
                    <input
                        type="text"
                        placeholder="Specialty"
                        value={specialty}
                        onChange={handleSpecialty}
                        className="w-full px-2 md:border-r-[0.5px] border-gray-300  placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>

                {/**Location, region */}
                <div className="flex items-center  pb-1 pt-2 w-full md:w-[22%] border-0 border-b-[0.5px] md:border-0 border-gray-300 md:border-r-0">
                <Icon icon="gridicons:location"  style={{color: "black"}} height={24} className='ml-2' />
                    <input
                        type="text"
                        value={location}
                        onChange={handleLocation}
                        placeholder="Location, region"
                        className="w-full px-2 border-r-0 border-gray-300  placeholder-zinc-600 font-[400] outline-none border-0"
                    />
                </div>

                {/** button */}
                <div className="mt-3 md:mt-0 flex items-center px-3 py-2 w-full md:w-[8%] lg:w-[4%] bg-custom-yellow hover:bg-yellow-400 md:rounded-l-none rounded-md">
                <button type="submit" size="icon" className="w-full text-center">
                    <span className="hidden md:block"><Icon icon="circum:search"  style={{color: "black"}} height={24} /></span>
                    <span className="md:hidden font-bold">Find a doctor</span>
                </button>
                </div>
            </form>
        </div>
    );
}

export default DoctorSearchBar;