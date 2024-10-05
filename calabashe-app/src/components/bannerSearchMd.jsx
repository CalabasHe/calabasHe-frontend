import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import SearchData from "../api/search";
import { useBannerVisibility } from "../context/BannerVisibilityContext";
import StarRating from "./rating";

const BannerSearch = () => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { updateBannerVisibility } = useBannerVisibility();
  const bannerRef = useRef(null);
  const resultsRef = useRef(null);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
        setSearchParam("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (results && searchParam !== "") {
      setShowResults(true);
    }
  };

  const handleMouseLeave = () => {
    setShowResults(false);
  };

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchParam(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchParam);

    return () => debouncedSetSearch.cancel();
  }, [searchParam, debouncedSetSearch]);

  useEffect(() => {
    const searchSomething = async () => {
      if (!debouncedSearchParam) return;

      try {
        const data = await SearchData(debouncedSearchParam);
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
    };

    searchSomething();
  }, [debouncedSearchParam]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (!searchParam) return;
    setShowResults(false);

    // Navigate to the results page and pass search data via state
    navigate("/results", { state: { searchParam, results } });
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative z-30"
      ref={bannerRef}
    >
      <div
        className={`relative hidden md:flex cursor-auto w-full items-center justify-between  bg-white max-w-[100%] ${
          showResults
            ? "rounded-b-none border-b border-gray-200 rounded-t-3xl py-4"
            : "rounded-3xl lg:rounded-[999999px]"
        } font-medium border-black p-1`}
      >
        <input
          ref={searchBarRef}
          id="banner_search_field"
          type="text"
          spellCheck="false"
          className="relative z-30 h-[40px] lg:h-[60px] w-[71%] lg:w-[75%] border-none rounded-3xl lg:rounded-[999999px]  text-base lg:text-xl font-semibold placeholder:text-[#5E5E5E] placeholder:text-base lg:placeholder:text-lg caret-[#34c759] outline-none px-4 lg:pl-6"
          placeholder="Search for doctors, clinics or services"
          onChange={(e) => setSearchParam(e.target.value)}
          autoComplete="off"
          value={searchParam}
        />

        <button
          //search buton
          onClick={handleSearchClick}
          // id="banner_search_button"
          className="relative z-30 items-center w-[30%] lg:w-[25%] h-8 md:h-[40px] lg:h-[60px] text-white text-base lg:text-lg font-bold p-2 lg:p-1 bg-[#0070FF] rounded-3xl lg:rounded-[999999px]"
        >
          Search
        </button>
      </div>

      {/* Results Dropdown (show on input) */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute z-50 rounded-b-3xl py-4 space-y-6 shadow-lg bg-white w-full"
        >
          {results.length > 0 && (
            <>
              {/* Show doctors */}
              {results.filter((result) => result.specialty).length > 0 && (
                <div className="space-y-2 border-b pb-4">
                  <p className="px-4 text-lg font-medium">Doctors</p>
                  {results
                    .filter((result) => result.specialty)
                    .slice(0, 4)
                    .map((result) => (
                      <div
                        onClick={() => handleLinkClick(result)}
                        key={result.id}
                        className="hover:bg-blue-100 cursor-pointer py-3 px-4"
                      >
                        <div className="flex gap-2 justify-between">
                          <p className="font-bold text-sm lg:text-base truncate">
                            {"Dr. " + result.firstName + " " + result.lastName}
                          </p>
                          <div className="flex gap-1 text-gray-500 items-center">
                            <p className="text-xs">{result.rating}</p>
                            <StarRating rating={result.rating} search={true} />
                          </div>
                        </div>
                        <div className="text-xs flex justify-between text-gray-500">
                          <p>{result.specialty}</p>
                          <p>
                            {result.reviewCount ? result.reviewCount : "0"}{" "}
                            {result.reviewCount === 1 ? "review" : "reviews"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Show facilities */}
              {results.filter((result) => !result.specialty).length > 0 && (
                <div className="space-y-2">
                  <p className="px-4 text-lg font-medium">Facilities</p>
                  {results
                    .filter((result) => !result.specialty && result.type)
                    .slice(0, 4)
                    .map((result) => (
                      <div
                        onClick={() => handleLinkClick(result)}
                        key={result.id}
                        className="hover:bg-blue-100 cursor-pointer py-3 px-4"
                      >
                        <div className="flex gap-2 justify-between">
                          <p className="font-bold text-sm lg:text-base truncate">
                            {result.name}
                          </p>
                          <div className="flex gap-1 text-gray-500 items-center">
                            <p className="text-xs">{result.rating}</p>
                            <StarRating rating={result.rating} search={true} />
                          </div>
                        </div>
                        <div className="text-xs flex justify-between text-gray-500">
                          <p>{result.type}</p>
                          <p>
                            {result.reviewCount ? result.reviewCount : "0"}{" "}
                            {result.reviewCount === 1 ? "review" : "reviews"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {/* Show all results button */}
          {results.length > 4 && (
            <div
              onClick={handleSearchClick}
              className="w-[full] cursor-pointer mx-4 py-3 rounded-xl text-white text-center bg-[#0070FF]"
            >
              Show all results <span className="ml-2">&rarr;</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BannerSearch;
