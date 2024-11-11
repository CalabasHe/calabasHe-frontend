import { useRef, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import SearchData from "../api/search";
import StarRating from "./ratingStars";
import { data } from "autoprefixer";

// eslint-disable-next-line react/prop-types
const SearchBarSm = ({ display, setDisplay, isVisible, onClose }) => {
  const [searchParam, setSearchParam] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const searchRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isComponentVisible = useRef(false);

  const isShown = display === "block" || isVisible;
  const navigate = useNavigate()
  useEffect(() => {
    if (isShown) {
      if (searchRef.current) {
        searchRef.current.focus();
      }
      isComponentVisible.current = true;
    } else {
      isComponentVisible.current = false;
      resetSearchState();
    }
  }, [isShown]);

  const handleInputChange = (e) => {
    setSearchParam(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClose = () => {
    if (setDisplay) {
      setDisplay("hidden");
    }
    if (onClose) {
      onClose();
    }
    resetSearchState();
  };

  const mapResultDetails = (result) => ({
    id: result.id,
    firstName: result.first_name,
    lastName: result.last_name,
    rating: result.average_rating && result.average_rating.toFixed(1),
    specialty: result.specialty?.name,
    specialtyTag: result.specialty?.tag,
    type: result.facility_type_name,
    typeSlug: result.facility_type_name?.toLowerCase(),
    name: result.name,
    slug: result.slug,
    category: result.category_name,
    categorySlug: result.category_slug,
    reviews: result.reviews,
    reviewCount: result.total_reviews,
  });

  const performSearch = async (searchParam) => {
    if (!searchParam) return [];
    try {
      const data = await SearchData(searchParam);
      if (Array.isArray(data) && data.length > 0) {
        const resultDetails = data.map((result) => mapResultDetails(result));
        return resultDetails;
      } else {
        setError("No results found");
        return [];
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while searching");
      return [];
    }
  };

  const resetSearchState = () => {
    setSearchParam("");
    setFacilities([]);
    setDoctors([]);
    setServices([]);
    setError("");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const searchSomething = async (term) => {
    if (!term || !isComponentVisible.current) {
      setFacilities([]);
      setDoctors([]);
      setServices([]);
      setError("");
      return;
    }

    try {
      const data = await SearchData(term, abortControllerRef.current.signal);
      // console.log(data);
      if (isComponentVisible.current) {
        if (Array.isArray(data) && data.length > 0) {
          const facilitiesResults = [];
          const doctorsResults = [];
          const servicesResults = [];

          data.forEach((result) => {
            const resultDetails = mapResultDetails(result)
            if (result.facility_type) {
              facilitiesResults.push(resultDetails);
            } else if (result.specialty) {
              doctorsResults.push(resultDetails);
            } else if (result.category) {
              servicesResults.push(resultDetails);
            }
          });

          setFacilities(facilitiesResults);
          setDoctors(doctorsResults);
          setServices(servicesResults);
          setError("");
        } else {
          setFacilities([]);
          setDoctors([]);
          setServices([]);
          setError("No results found");
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError' && isComponentVisible.current) {
        console.error(error);
        setError("An error occurred while searching");
      }
    }
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      searchSomething(term);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleLinkClick = () => {
    setTimeout(() => {
      handleClose();
    }, 0);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchParam) return;
    const searchResults = await performSearch(searchParam);
    handleClose();
    navigate("/results", { state: { searchParam, results: searchResults } });
  };

  const renderResults = (results, type) => (
    results.length > 0 && (
      <div key={type}>
        <h2 className="text-lg text-slate-700 font-bold mt-4 mb-2">{type}</h2>
        {results.slice(0, 6).map((result) => (
          <Link
            onClick={handleLinkClick}
            to={
              type === 'Facilities'
                ? `/facilities/${result.typeSlug}s/${result.slug}`
                : type === 'Doctors'
                  ? `/doctors/${result.slug}`
                  : `/services/${result.categorySlug}/${result.slug}`
            }
            key={result.id}
            className=""
          >
            <div className="bg-white shadow-md border p-2 px-2 text-sm truncate text-black rounded-md mb-2">
              <h3 className="leading-snug font-bold truncate">
                {result.name
                  ? result.name
                  : `Dr. ${result.firstName} ${result.lastName}`}
              </h3>
              <p className="leading-none font-[300] text-[12px] ">
                {type === 'Services' ? result.categoryName : (result.type || result.specialtyTag)}
              </p>
              {type !== 'Services' && (
                <div className="mt-3">
                  <p className={`${result.reviews.length === 0 && 'text-xs text-gray-500 italic'} font-semibold`}>
                    {result.reviews.length > 0 ? result.reviews.length : 'No'} {result.reviews.length < 2 ? 'review' : 'reviews'}
                  </p>
                  {
                    result.rating ? (
                      <div className="flex gap-1 items-end ">
                        <StarRating rating={result.rating} />
                        <p className="text-xs font-semibold">
                          {typeof result.rating === "number" && result.rating > 0 ? result.rating.toFixed(1) : ""}
                        </p>

                      </div>
                    ) : ''
                  }
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    )
  );

  return (
    <>
      <div
        className={`min-h-screen flex flex-col fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${isShown ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`w-full bg-white px-3 py-4 pb-1 flex items-center gap-2 min-h-[60px] h-[60px] transform transition-transform duration-300 ease-in-out ${isShown ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <form className="w-full flex justify-between" onSubmit={handleSearchSubmit}>
            <button
              className="focus:outline-none focus:border-none mr-1"
            >
              <svg
                aria-label="Search Button"
                className="w-[18px] h-[18px]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                  stroke="#205CD4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <input
              value={searchParam}
              onChange={handleInputChange}
              ref={searchRef}
              id="sm-search"
              className=" rounded-3xl appearance-none flex w-[90%] placeholder:text-xs text-base text-black px-3 py-1 outline-none border-none"
              type="text"
              placeholder="Search for Doctors, Hospitals or Services"
              spellCheck="false"
            />
            <button
              className="self-end h-[fit-content] pt-1"
              onClick={handleClose}
              aria-label="Close search bar"
            >
              <span className="text-[#205CD4] text-4xl">&times;</span>
            </button>
          </form>
        </div>
        <div
          id="resultsCard"
          className={`w-full ${(facilities.length || doctors.length || services.length) > 0 ? 'pb-[80px] h-screen' : ''} flex flex-col bg-white text-black gap-2 px-2 overflow-y-scroll`}
        >
          {renderResults(services, 'Services')}
          {renderResults(doctors, 'Doctors')}
          {renderResults(facilities, 'Facilities')}
        </div>
        {error && (
          <div className="flex flex-col flex-grow bg-white tracking-wide text-xl items-center overflow-y-hidden font-bold text-center">
            <p className="mt-28 w-[fit-content] text-slate-500 h-[fit-content] p-4 rounded-md">
              {error}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBarSm;