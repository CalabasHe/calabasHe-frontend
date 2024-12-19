import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBannerVisibility } from "../context/BannerVisibilityContext";
import "../stylesheets/headerSearch.css";
import StarRating from "./ratingStars";
import SearchData from "../api/search"; 
import debounce from "lodash/debounce";
import { useAuth } from "../hooks/useAuth";

const SearchBarMd = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { isBannerHidden } = useBannerVisibility();
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      !event.target.closest("#headerSearchBar")
    ) {
      setShowResults(false);
      setSearchParam("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchParam(value);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchParam);
    return () => debouncedSetSearch.cancel();
  }, [searchParam, debouncedSetSearch]);

  const performSearch = useCallback(async (searchParam) => {
    if (!searchParam) return [];
    try {
      const data = await SearchData(searchParam);
      if (Array.isArray(data) && data.length > 0) {
        const resultDetails = data.map((result) => ({
          id: result.id,
          firstName: result.first_name,
          lastName: result.last_name,
          image: result.profile_image,
          logo:result.logo,
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
        }));
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
  }, []);

  useEffect(() => {
    (async () => {
      const results = await performSearch(debouncedSearchParam);
      setResults(results);
      setShowResults(results.length > 0);
    })();
  }, [debouncedSearchParam, performSearch]);

  const handleLinkClick = (result) => {
    setShowResults(false);
    const path = result.type
      ? `/facilities/${result.typeSlug}s/${result.slug}`
      : result.specialty
      ? `/doctors/${result.slug}`
      : `/services/${result.categorySlug}/${result.slug}`;
    navigate(path);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowResults(false);
      const searchResults = await performSearch(searchParam);
      navigate("/results", { state: { searchParam, results: searchResults } });
    }
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (!searchParam) return;
    setShowResults(false);
    const searchResults = await performSearch(searchParam);
    navigate("/results", { state: { searchParam, results: searchResults } });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleShowResults = (e) => {
    e.preventDefault();
    navigate("/results", { state: { searchParam, results } });
  };

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
      <button onClick={handleSearchClick}>
        <svg
          id="headerSearchIcon"
          className={`${
            isFocused ? "focused" : "stroke-[#828282]"
          } w-5 lg:w-6 h-5 lg:h-6`}
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
      </button>

      {showResults && (
        <div
          ref={searchRef}
          className="absolute z-50 rounded-b-3xl bg-white w-full left-0 top-full flex flex-col"
          style={{ maxHeight: '85vh' }}
        >
          <div className="overflow-y-auto scrollbar-thin flex-1">
            <div className="pt-4 flex flex-col divide-y divide-emerald-400 space-y-6">
              {results.length > 0 && (
                <>
                  {results.filter((result) => result.category).length > 0 && (
                    <div className="space-y-2 pb-4 text-black">
                      <p className="px-4 text-lg text-slate-600 font-medium">Services</p>
                      {results
                        .filter((result) => result.category)
                        .slice(0,4)
                        .map((result) => (
                          <div
                            onClick={() => handleLinkClick(result)}
                            key={result.id}
                            className="hover:bg-blue-100 text-black cursor-pointer pt-3 px-4"
                          >
                            <p className="font-bold text-sm lg:text-base truncate">
                              {result.name}
                            </p>
                            <div className="text-xs text-gray-500">
                              <p>{result.category}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {results.filter((result) => result.specialty).length > 0 && (
                    <div className="space-y-2 py-4 text-black">
                      <p className="px-4 text-lg text-slate-600 font-medium">Doctors</p>
                      {results
                        .filter((result) => result.specialty)
                        .slice(0, 4)
                        .map((result) => (
                          <div
                            onClick={() => handleLinkClick(result)}
                            key={result.id}
                            className="hover:bg-blue-100 text-black cursor-pointer pt-3 px-4"
                          >
                            <div className="flex gap-2 justify-between">
                              <p className="font-bold text-sm lg:text-base truncate">
                                {"Dr. " + result.firstName + " " + result.lastName}
                              </p>
                              <div className="flex gap-1 text-gray-500 items-center">
                                <p className="text-xs">{result.rating}</p>
                                {result.reviewCount > 0 && (
                                  <StarRating rating={result.rating} search={true} />
                                )}
                              </div>
                            </div>
                            <div className="text-xs flex justify-between text-gray-500">
                              <p>{result.specialtyTag}</p>
                              {result.reviewCount > 0 ? (
                                <p>
                                  {result.reviewCount ? result.reviewCount : "0"}{" "}
                                  {result.reviewCount === 1 ? "review" : "reviews"}
                                </p>
                              ) : (
                                <p className="font-semibold italic text-gray-600">No reviews</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {results.filter((result) => !result.specialty && result.type).length > 0 && (
                    <div className="space-y-2 pt-4 text-black">
                      <p className="px-4 text-lg text-slate-600 font-medium">Facilities</p>
                      {results
                        .filter((result) => !result.specialty && result.type)
                        .slice(0, 4)
                        .map((result) => (
                          <div
                            onClick={() => handleLinkClick(result)}
                            key={result.id}
                            className="hover:bg-blue-100 text-black cursor-pointer py-3 px-4"
                          >
                            <div className="flex gap-2 justify-between">
                              <p className="font-bold text-sm lg:text-base truncate">
                                {result.name}
                              </p>
                              <div className="flex gap-1 text-gray-500 items-center">
                                <p className="text-xs">{result.rating}</p>
                                {result.reviewCount > 0 && (
                                  <StarRating rating={result.rating} search={true} />
                                )}
                              </div>
                            </div>
                            <div className="text-xs flex justify-between text-gray-500">
                              <p>{result.type}</p>
                              {result.reviewCount > 0 ? (
                                <p>
                                  {result.reviewCount ? result.reviewCount : "0"}{" "}
                                  {result.reviewCount === 1 ? "review" : "reviews"}
                                </p>
                              ) : (
                                <p className="font-semibold italic text-gray-600">No reviews</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {results.length > 4 && (
            <div className="sticky bottom-0 w-full">
              <div 
                onClick={handleShowResults}
                className="w-full cursor-pointer py-3 text-white text-center bg-[#0070FF] rounded-b-3xl"
              >
                Show all results <span className="ml-2">&rarr;</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarMd;