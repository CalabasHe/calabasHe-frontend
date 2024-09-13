import { useState } from 'react';
import '../stylesheets/headerSearch.css'

const SearchBarMd = () => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return ( 
    <>
      <div className={`searchBar hidden md:flex md:flex-grow mx-4 lg:mx-8 justify-between rounded-3xl bg-white/20 px-3 lg:px-5`}>
        <input className="w-[90%] bg-transparent border-none rounded-[inherit] text-sm lg:text-base  placeholder:text-[#828282] placeholder:font-[500] placeholder:text-xs  outline-none py-2 pl-1 " 
        id="headerSearchBar"
        type="text"
        name="searchBar"
        placeholder="Doctors, facilities, services"
        onFocus={handleFocus}
        onBlur={handleBlur}
        >
        </input>
        <svg id="headerSearchIcon" className={` ${isFocused ? 'focused' : 'stroke-[#828282]'} w-5 lg:w-6 h-5 lg:h-6 self-center `} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.75 27.5C21.7917 27.5 27.5 21.7917 27.5 14.75C27.5 7.70825 21.7917 2 14.75 2C7.70825 2 2 7.70825 2 14.75C2 21.7917 7.70825 27.5 14.75 27.5Z"  strokeWidth="3" strokeLinejoin="round"/>
          <path d="M18.9927 9.75726C18.4362 9.19928 17.7749 8.75679 17.0467 8.45522C16.3186 8.15366 15.5381 7.99895 14.75 8.00001C13.9619 7.99895 13.1814 8.15366 12.4533 8.45522C11.7251 8.75679 11.0638 9.19928 10.5072 9.75726M23.9165 23.9165L30.2802 30.2803" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
   );
}
 
export default SearchBarMd;