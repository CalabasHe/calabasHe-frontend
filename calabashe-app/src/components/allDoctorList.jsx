import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDoctors } from "../api/getCategoriesData";
import DoctorCard from "./doctorCardsm";
import DoctorCardMd from "./doctorCardmd";
import DoctorSearchBar from "./DoctorSearchBar";
import { DoctorsSearch } from "../api/search";

const AllDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    search_query: "",
    specialty: "",
    location: ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page") || "1", 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());
  const [searchPagination, setSearchPagination] = useState(1);

  const fetchDocData = async (page) => {
    try {
      setFiltering(false);
      setIsLoading(true);
      const docData = await fetchDoctors(page);
      // console.log(docData)
      setHasPreviousPage(!!docData.previous);
      setHasNextPage(!!docData.next);
      if (Array.isArray(docData.results) && docData.results.length > 0) {
        const doctorDetails = docData.results.map((doc) => ({
          id: doc.id,
          firstName: doc.first_name,
          lastName: doc.last_name,
          rating: doc.average_rating,
          specialty: doc.specialty?.name,
          specialtyTag: doc.specialty?.tag,
          image: doc.profile_image,
          slug: doc.slug,
          reviews: doc.reviews,
          reviewCount: doc.reviews_count,
          verified: doc.is_verified,
          region: doc.region_name,
          recommendedFor: doc.specialty?.conditions_and_treatments,
          experience: doc.years_of_experience
        }));
        setDoctors(doctorDetails);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filtering) {
      handleSearchSubmit(
        searchCriteria.search_query,
        searchCriteria.specialty,
        searchCriteria.location,
        false
      );
    } else {
      fetchDocData(pagination);
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
      handlePageChange(pagination+1)
    }
  };

  const handlePreviousPage = () => {
    if (filtering && hasPreviousPage) {
      setSearchPagination(searchPagination - 1);
    } else if (!filtering && hasPreviousPage) {
      handlePageChange(pagination-1);
    }
  };



  const handleSearchSubmit = async (search_query, specialty, location, isNewSearch = true) => {
    try {
      if (isNewSearch) {
        setPagination(1);
        setSearchPagination(1);
      }

      const page = isNewSearch ? 1 : searchPagination;
      setIsLoading(true);
      setFiltering(true);
      setPagination(1);
      setSearchCriteria({ search_query, specialty, location });
      const docData = await DoctorsSearch({ search_query, specialty, location, page });

      // Check for pagination availability
      setHasPreviousPage(!!docData.previous);
      setHasNextPage(!!docData.next);

      // Validate and process doctor data
      if (Array.isArray(docData?.results) && docData.results.length > 0) {
        const doctorDetails = docData.results.map((doc) => ({
          id: doc.id,
          firstName: doc.first_name,
          lastName: doc.last_name,
          rating: doc.average_rating,
          specialty: doc.specialty?.name || "N/A",
          specialtyTag: doc.specialty?.tag || "N/A",
          slug: doc.slug,
          reviews: doc.reviews || [],
          reviewCount: doc.reviews_count || 0,
          verified: doc.is_verified,
          region: doc.region_name || "N/A",
          recommendedFor: doc.specialty?.conditions_and_treatments || [],
          experience: doc.years_of_experience || 0,
        }));
        setDoctors(doctorDetails);

        // Update URL to reflect the search filters
        const searchParams = new URLSearchParams();
        if (search_query) searchParams.set("search_query", search_query);
        if (specialty) searchParams.set("specialty", specialty);
        if (location) searchParams.set("location", location);
        // searchParams.set("page", "1");
        navigate(`?${searchParams.toString()}&page=${page}`, { replace: true });
      } else {
        setDoctors([]); // Clear previous doctor data if no results are found
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-[50vh] w-full flex items-center justify-center">
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
    <div className="w-full flex flex-col items-center">
      {/* {doctors.slice(0,1).map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))
      } */}
      <DoctorSearchBar submitFunc={handleSearchSubmit} />
      <div className="max-[819px]:hidden w-full  max-w-[1100px] flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="w-full flex flex-col items-center pt-6 ">
            <DoctorCardMd doctor={doctor} />
          </div>
        ))}
      </div>

      <div className="min-[820px]:hidden w-full flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="w-full flex flex-col items-center pt-4 ">
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center my-8 md:my-12">
        {filtering && doctors.length === 0 ? (
          <p>No results found</p>
        ) : (
          <>
            {/* Previous Button */}
            {hasPreviousPage && doctors.length > 0 && (
              <button
                onClick={handlePreviousPage}
                className="text-base lg:text-lg border border-black py-1 lg:py-2 px-8 md:px-12 font-semibold"
              >
                Previous
              </button>
            )}

            {/* Next Page Button */}
            {hasNextPage && doctors.length > 0 && (
              <button
                onClick={handleNextPage}
                className="text-base lg:text-lg border border-black px-8 md:px-12 py-1 lg:py-2 font-semibold text-[#0066FF]"
              >
                Next Page
              </button>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default AllDoctorList;