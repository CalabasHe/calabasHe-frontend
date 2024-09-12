/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import SearchData from "../api/search";


const BannerSearch = () => {
  const [searchParam, setSearchParam] = useState('')
  const [debouncedSearchParam, setDebouncedSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [bottomRadius, setBottomRadius] = useState( )

   // eslint-disable-next-line react-hooks/exhaustive-deps
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
            rating: (result.average_rating && result.average_rating.toFixed(1)),
            specialty: result.specialty?.name,
            type: result.facility_type?.name,
            name: result.name,
            slug: result.slug,
            reviews: result.reviews,
          }));
          // setBottomRadius('flex')
          // console.log(bottomRadius)
          setResults(resultDetails);
          console.log(resultDetails)
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

  return ( 
    <div className="relative z-30 ">
      <div className={`hidden md:flex cursor-auto w-full items-center justify-between  bg-white relative max-w-[100%] rounded-3xl lg:rounded-[999999px] font-medium border-black p-1`}>
        <input
          // value={searchParams}
          id="search_field"
          type="text"
          spellCheck='false'
          className="relative z-30 h-[40px] lg:h-[60px] w-[71%] lg:w-[75%] border-none rounded-3xl lg:rounded-[999999px]  text-base lg:text-xl font-semibold placeholder:text-[#5E5E5E] placeholder:text-base lg:placeholder:text-lg caret-[#34c759] outline-none px-4 lg:pl-6"
          placeholder="Search for doctors, clinics or services"
          onChange={(e => setSearchParam(e.target.value))}
        />
        <button className="relative z-30 items-center w-[30%] lg:w-[25%] h-8 md:h-[40px] lg:h-[60px] text-white text-base lg:text-lg font-bold p-2 lg:p-1 bg-[#0070FF] rounded-3xl lg:rounded-[999999px]">
          Search
        </button>
      </div>

      {/* {results.slice(0, 20).map((result) => (
          <div
            className={`absolute z-10 w-full bg-white ${bottomRadius ? 'md:flex' : ''} flex-col -bottom-[40px] p-2 rounded-b-[inherit]`}
            key={result.id}
          >
            {result.name}
          </div>
        ))} */}

    </div>
   );
}
 
export default BannerSearch;