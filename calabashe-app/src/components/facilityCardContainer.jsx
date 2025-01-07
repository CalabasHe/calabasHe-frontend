import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFacilities } from "../api/getCategoriesData";
import FacilityCardSm from "./facilityCardSm";
import FacilityCardMd from "./facilityCardMd";
import FacilitySearchBar from "./FacilitySearchBar";
import { FacilitySearch } from "../api/search";

const FacilityCard = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filtering, setFiltering] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [searchCriteria, setSearchCriteria] = useState({
    search_query: (searchParams.get("facility") || "").trim(),
    service: (searchParams.get("service") || "").trim(),
    location: (searchParams.get("location") || "").trim(),
    page: parseInt((searchParams.get("page") || "1").trim(), 10)
  });



  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());
  const [searchPagination, setSearchPagination] = useState(1);


  const fetchFacilityData = async (page) => {
    try {
      setIsLoading(true);
      const facilityData = await fetchFacilities(page);
      setHasPreviousPage(!!facilityData.previous);
      setHasNextPage(!!facilityData.next);
      
      if (Array.isArray(facilityData.results) && facilityData.results.length > 0) {
        const facilityDetails = facilityData.results.map((facility) => ({
          id: facility.id,
          name: facility.name,
          email: facility.email,
          type: facility.facility_type_name,
          rating: facility.average_rating,
          slug: facility.slug,
          reviews: facility.review,
          location: facility.location,
          logo: facility.logo,
          region: facility.region_name,
          reviewCount: facility.reviews_count,
          services: facility.services,
          isVerified: facility.is_verified,
        }));
        setFacilities(facilityDetails);
      } else {
        setError("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {  
    const hasSearchCriteria = 
      searchCriteria.search_query !== '' || 
      searchCriteria.location !== '' || 
      searchCriteria.service !== '';
    if (hasSearchCriteria || filtering) {
      handleSearchSubmit(
        searchCriteria.search_query,
        searchCriteria.service,
        searchCriteria.location,
        false
      );
    } else {
      fetchFacilityData(pagination);
      navigate(`?page=${pagination}`, { replace: true });
    }
  }, [pagination, searchPagination, filtering]);
  

  const handlePageChange = (newPage) => {
    setPagination(newPage);
    navigate(`?page=${newPage}`, { replace: true });
  };

  const handleNextPage = () => {
    if (filtering && hasNextPage) {
      setSearchPagination(searchPagination + 1);
    } else if (!filtering && hasNextPage) {
      handlePageChange(pagination + 1);
    }
  };

  const handlePreviousPage = () => {
    if (filtering && hasPreviousPage) {
      setSearchPagination(searchPagination - 1);
    } else if (!filtering && hasPreviousPage) {
      handlePageChange(pagination - 1);
    }
  };

  const handleReset = () => {
    if (filtering) {
      setFiltering(false);
      setSearchCriteria({
        search_query: "",
        service: "",
        location: "",
        page: 1,
      });
      setPagination(1);
      setSearchPagination(1);
      fetchFacilityData(1);

      navigate("/facilities?page=1", { replace: true });
    }
  };

  const handleSearchSubmit = async (facility, service, location, isNewSearch = true) => {
    // console.log(facility, service, location)
    facility = facility.trim();
    service = service.trim();
    location = location.trim();
    const search_query = facility;
    try {
      if (isNewSearch) {
        setPagination(1);
        setSearchPagination(1);
      }
      const page = isNewSearch ? 1 : searchPagination;
      setIsLoading(true);
      setFiltering(true);
      setSearchCriteria({ search_query, service, location });
      const facilityData = await FacilitySearch({ facility, service, location, page });

      setHasPreviousPage(!!facilityData.previous);
      setHasNextPage(!!facilityData.next);

      if (Array.isArray(facilityData.results) && facilityData.results.length > 0) {
        const facilityDetails = facilityData.results.map((facility) => ({
          id: facility.id,
          name: facility.name,
          email: facility.email,
          type: facility.facility_type_name,
          rating: facility.average_rating,
          slug: facility.slug,
          reviews: facility.review,
          location: facility.location,
          logo: facility.logo,
          region: facility.region_name,
          reviewCount: facility.reviews_count,
          services: facility.services,
          isVerified: facility.is_verified,
        }));
        setFacilities(facilityDetails);

        const searchParams = new URLSearchParams();
        if (facility) searchParams.set("facility", facility);
        if (service) searchParams.set("service", service);
        if (location) searchParams.set("location", location);
        const queryString = searchParams.toString();
        navigate(`?${queryString}${queryString ? `&page=${page}` : `page=${page}`}`, { replace: true });

        navigate(`?${searchParams.toString()}&page=${page}`, { replace: true });
      } else {
        setFacilities([]);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-[50vh] lg:h-[30vh] xl:h-[40vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="h-[50vh] md:h-[40vh] w-full flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <>
      <FacilitySearchBar submitFunc={handleSearchSubmit} resetFunc={handleReset}/>
      <div className="max-[819px]:hidden w-full max-w-[1100px] flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
        {facilities.map((facility) => (
          <div key={facility.id} className="w-full flex flex-col items-center pt-6">
            <FacilityCardMd facility={facility} />
          </div>
        ))}
      </div>

      <div className="min-[820px]:hidden w-full flex flex-col gap-8 items-center divide-y divide-[#D9D9D9]">
        {facilities.map((facility) => (
          <div key={facility.id} className="w-full flex flex-col items-center pt-5">
            <FacilityCardSm facility={facility} />
          </div>
        ))}
      </div>

      <div className='my-8 md:my-12'>
        {filtering && facilities.length === 0 ?
          (<p>No results found</p>)
          : (
            <div className="flex border-r border-black">
              <button onClick={handlePreviousPage} className={`${hasPreviousPage ? 'flex' : 'hidden'} text-xs md:text-sm border border-black py-1 lg:py-2 px-8 md:px-12 font-semibold`}>
                Previous
              </button>
              <button onClick={handleNextPage} className={`${hasNextPage ? 'flex' : 'hidden'} text-xs md:text-sm border border-black px-8 md:px-12 py-1 lg:py-2 font-semibold text-[#0066FF]`}>
                Next Page
              </button></div>
          )}
      </div>
    </>
  );
};

export default FacilityCard;
