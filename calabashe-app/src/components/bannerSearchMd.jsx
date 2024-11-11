import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import SearchData from "../api/search";
import { useBannerVisibility } from "../context/BannerVisibilityContext";
import StarRating from "./ratingStars";

const BannerSearch = () => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const bannerRef = useRef(null);
  const resultsRef = useRef(null);
  const searchBarRef = useRef(null);
  const { updateBannerVisibility } = useBannerVisibility();

  const navigate = useNavigate();

  const handleClickOutside = useCallback((event) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target) &&
      !searchBarRef.current.contains(event.target)
    ) {
      setShowResults(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleMouseEnter = useCallback(() => {
    if (results.length > 0 && searchParam !== "") {
      setShowResults(true);
    }
  }, [results, searchParam]);

  const handleMouseLeave = useCallback(() => {
    setShowResults(false);
  }, []);

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
      // console.log(data)
      if (Array.isArray(data) && data.length > 0) {
        const resultDetails = data.map((result) => ({
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
        }));
        setError('')
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
      if (debouncedSearchParam) {
        const results = await performSearch(debouncedSearchParam);
        setResults(results);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
        setError("");
      }
    })();
  }, [debouncedSearchParam, performSearch]);

  const handleLinkClick = useCallback((result) => {
    navigate(
      result.type
        ? `/facilities/${result.typeSlug}s/${result.slug}`
        : result.specialty
        ? `/doctors/${result.slug}`
        : `/services/${result.categorySlug}/${result.slug}`
    );
  }, [navigate]);

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowResults(false);
      const searchResults = await performSearch(searchParam);
      navigate("/results", { state: { searchParam, results: searchResults } });
    }
  }, [navigate, performSearch, searchParam]);

  const handleSearchClick = useCallback(async (e) => {
    e.preventDefault();
    if (!searchParam) return;
    setShowResults(false);
    const searchResults = await performSearch(searchParam);
    navigate("/results", { state: { searchParam, results: searchResults } });
  }, [navigate, performSearch, searchParam]);
  
  const handleShowResults = useCallback((e) => {
    e.preventDefault();
    navigate("/results", { state: { searchParam, results } });
  }, [navigate, searchParam, results]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isFullyVisible =
          entry.isIntersecting && entry.intersectionRatio === 1;
        updateBannerVisibility(!isFullyVisible);
      },
      {
        threshold: [0, 1],
        rootMargin: "0px",
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [updateBannerVisibility]);

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative z-30"
      ref={bannerRef}
    >
      <form onSubmit={handleSearchClick}
        className={`relative hidden md:flex cursor-auto w-full items-center justify-between  bg-white max-w-[100%] ${
          showResults
            ? "rounded-b-none border-b border-gray-200 rounded-t-3xl"
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
          value={searchParam}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
        <button
          id="banner_search_button"
          onClick={handleSearchClick}
          className="relative z-30 items-center w-[30%] lg:w-[25%] h-8 md:h-[40px] lg:h-[60px] text-white text-base lg:text-lg font-bold p-2 lg:p-1 bg-[#0070FF] rounded-3xl lg:rounded-[999999px]"
        >
          Search
        </button>
      </form>

      {showResults && (
        <div
          ref={resultsRef}
          className={`absolute z-50 rounded-b-3xl py-4 flex flex-col divide-y divide-emerald-400 space-y-2 shadow-lg bg-white w-full`}
        >
          {error && (
            <div className="px-4 py-2 text-center text-gray-500">{error}</div>
          )}
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
                        className="hover:bg-blue-100 text-black cursor-pointer py-3 px-4"
                      >
                          <p className=" font-bold text-sm lg:text-base truncate">
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
                <div className="space-y-2 py-2">
                  <p className="px-4 text-lg text-slate-600 font-medium">Doctors</p>
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
                            {result.reviewCount > 0 && (
                                  <StarRating rating={result.rating} search={true} />
                            )}
                          </div>
                        </div>
                        <div className="text-xs flex justify-between text-gray-500">
                          <p>{result.specialtyTag}</p>
                          <p className={`${result.reviewCount < 1 && 'italic'}`}>
                            {result.reviewCount ? result.reviewCount : "No"}{" "}
                            {result.reviewCount === 1 ? "review" : "reviews"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {results.filter((result) => !result.specialty).length > 0 && (
                <div className="space-y-2 pt-4">
                  <p className="px-4 text-lg text-slate-600 font-medium">Facilities</p>
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
                            {result.reviewCount > 0 && (
                                  <StarRating rating={result.rating} search={true} />
                            )}
                          </div>
                        </div>
                        <div className="text-xs flex justify-between text-gray-500">
                          <p>{result.type}</p>
                          <p className={`${result.reviewCount < 1 && 'italic'}`}>
                            {result.reviewCount ? result.reviewCount : "No"}{" "}
                            {result.reviewCount === 1 ? "review" : "reviews"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {results.length > 4 && (
            <div onClick={handleShowResults} className="w-[full] cursor-pointer mx-4 py-3 rounded-xl text-white text-center bg-[#0070FF]">
              Show all results <span className="ml-2">&rarr;</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BannerSearch;