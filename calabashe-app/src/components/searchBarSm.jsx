import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import debounce from "lodash/debounce";
import SearchData from "../api/search";
import StarRating from "./rating";

// eslint-disable-next-line react/prop-types
const SearchBarSm = ({ display, setDisplay }) => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const searchRef = useRef(null);
  const searchBarRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchParam(e.target.value);
  };

  const handleClose = () => {
    setDisplay("hidden");
    setSearchParam("");
    setResults([]);
    setError("");
  };

  useEffect(() => {
    if (display === "block" && searchRef.current) {
      searchRef.current.focus();
    }
  }, [display]);

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
            rating: result.average_rating,
            specialty: result.specialty?.name,
            type: result.facility_type?.name,
            name: result.name,
            slug: result.slug,
            reviews: result.reviews,
          }));
          setResults(resultDetails);
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

  const handleLinkClick = () => {
    setTimeout(() => {
      handleClose();
    }, 0);
  };

  return (
    <>
      <div
        className={`min-h-screen flex flex-col gap-2 fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          display === "block" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={searchBarRef}
          className={`w-full bg-white px-3 py-4 pb-1 flex items-center gap-2 min-h-[60px] h-[60px] transform transition-transform duration-300 ease-in-out ${
            display === "block" ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <button>
            <svg
              tabIndex="0"
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
            autoFocus
            id="sm-search"
            className="flex grow placeholder:text-xs text-base text-black px-3 py-1 outline-none border-none"
            type="text"
            placeholder="Search for Doctors, Hospitals or Services"
            spellCheck="false"
          />
          <button className="w-[fit-content]" onClick={handleClose}>
            <FaTimes
              size={20}
              className="text-[#205CD4]"
            />
          </button>
        </div>
        <div
          id="resultsCard"
          className="w-full pb-4 flex flex-col gap-2 px-2 overflow-y-auto"
        >
          {results.slice(0, 20).map((result) => (
            <Link
              onClick={handleLinkClick}
              to={
                result.type
                  ? `/facilities/${result.type}s/${result.slug}`
                  : `/doctors/${result.slug}`
              }
              key={result.id}
              className=""
            >
              <div className="bg-white p-2 px-2 text-sm truncate text-black rounded-md">
                <h3 className="leading-snug font-bold">
                  {result.name
                    ? result.name
                    : "Dr. " + result.firstName + " " + result.lastName}
                </h3>
                <p className="leading-none font-[300] text-[12px] ">
                  {result.type ? result.type : result.specialty}
                </p>
                <div className="mt-3">
                  <p className="text-0 font-semibold">
                    {result.reviews.length} reviews
                  </p>
                  <div className="flex gap-1 items-end ">
                    <StarRating rating={result.rating} />
                    <p className="text-xs font-semibold">
                      {result.rating > 0 ? result.rating : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {error && (
          <div className="flex translate-y-6 tracking-wide text-xl justify-center font-bold text-center">
            <p className="w-[fit-content] bg-red-600 text-white h-[fit-content] p-4 rounded-md">
              {error}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBarSm;
