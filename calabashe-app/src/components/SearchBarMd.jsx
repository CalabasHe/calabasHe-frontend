import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBannerVisibility } from "../context/BannerVisibilityContext";
import "../stylesheets/headerSearch.css";
import StarRating from "./rating";
import SearchData from "../api/search";
import debounce from "lodash/debounce";

const SearchBarMd = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { isBannerHidden } = useBannerVisibility();
  const [searchParam, setSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && !event.target.closest('#headerSearchBar')) {
        setShowResults(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (!value) {
        setResults([]);
        setError("");
        return;
      }

      try {
        const data = await SearchData(value);
        if (Array.isArray(data) && data.length > 0) {
          const resultDetails = data.map((result) => ({
            id: result.id,
            firstName: result.first_name,
            lastName: result.last_name,
            rating: result.average_rating && result.average_rating.toFixed(1),
            specialty: result.specialty?.name,
            type: result.facility_type?.name,
            name: result.name,
            slug: result.slug,
            reviews: result.reviews,
            reviewCount: result.total_reviews,
          }));
          setResults(resultDetails);
          setShowResults(true);
          setError("");
        } else {
          setResults([]);
          setError("No results found");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while searching");
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchParam);
    return () => debouncedSearch.cancel();
  }, [searchParam, debouncedSearch]);

  const handleLinkClick = (result) => {
    navigate(
      result.type
        ? `/facilities/${result.type}s/${result.slug}`
        : result.specialty
        ? `/doctors/${result.slug}`
        : `/services`
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/results', { state: { searchParam, results } });
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`relative searchBar ${
        isBannerHidden ? "hidden md:flex" : "hidden"
      } md:flex-grow mx-4 lg:mx-8 justify-between ${
        showResults
          ? "rounded-b-none border-b border-gray-200 rounded-t-3xl"
          : "rounded-3xl lg:rounded-[999999px]"
      } bg-white/20 px-3 lg:px-5`}
    >
      <input
        className="w-[90%] bg-transparent border-none rounded-[inherit] text-sm lg:text-base placeholder:text-[#828282] placeholder:font-[500] placeholder:text-xs outline-none py-2 pl-1"
        id="headerSearchBar"
        type="text"
        name="searchBar"
        placeholder="Doctors, facilities, services"
        onChange={(e) => setSearchParam(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        spellCheck="false"
        autoComplete="off"
        value={searchParam}
      />
      <Link to={searchParam ? '/results' : '#'} state={{ searchParam, results }} onClick={(e) => !searchParam && e.preventDefault()}>
        <svg
          id="headerSearchIcon"
          className={`${
            isFocused ? "focused" : "stroke-[#828282]"
          } w-5 lg:w-6 h-5 lg:h-6 mt-2 `}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 27.5C21.7917 27.5 27.5 21.7917 27.5 14.75C27.5 7.70825 21.7917 2 14.75 2C7.70825 2 2 7.70825 2 14.75C2 21.7917 7.70825 27.5 14.75 27.5Z"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M18.9927 9.75726C18.4362 9.19928 17.7749 8.75679 17.0467 8.45522C16.3186 8.15366 15.5381 7.99895 14.75 8.00001C13.9619 7.99895 13.1814 8.15366 12.4533 8.45522C11.7251 8.75679 11.0638 9.19928 10.5072 9.75726M23.9165 23.9165L30.2802 30.2803"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {showResults && (
        <div
          ref={searchRef}
          className="cursor-pointer flex flex-col scrollbar-hide w-full absolute text-black max-h-[300px] overflow-x-hidden left-0 right-0 top-full mt-1 z-50 rounded-b-3xl pt-4 space-y-4 shadow-lg bg-white"
        >
          <div className="overflow-y-scroll scroll-smooth scrollbar-hide">
            {results.slice(0, 10).map((result) => (
              <div
                onClick={() => handleLinkClick(result)}
                key={result.id}
                className="hover:bg-blue-100 py-3 px-4 "
              >
                <div className="flex gap-2 justify-between">
                  <p className="font-bold text-sm lg:text-base truncate ">
                    {result.specialty
                      ? "Dr. " + result.firstName + " " + result.lastName
                      : result.name}
                  </p>
                  <div className="flex gap-1 text-gray-500 items-center">
                    <p className="text-xs">{result.rating}</p>
                    <StarRating rating={result.rating} search={true} />
                  </div>
                </div>

                <div className="text-xs flex justify-between text-gray-500">
                  <p>{result.specialty ? result.specialty : result.type}</p>
                  <p>
                    {result.reviewCount ? result.reviewCount : "0"}{" "}
                    {result.reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/results" state={{ searchParam, results }}>
            <div className="w-full py-2 text-white text-center bg-[#0070FF]">
              Show all results <span className="ml-2">&rarr;</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBarMd;