import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFacilities } from "../api/getCategoriesData";
import FacilityCardSm from "./facilityCardSm";
import FacilityCardMd from "./facilityCardMd";

const FacilityCard = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());

  useEffect(() => {
    const fetchFacilityData = async (page) => {
      try {
        setIsLoading(true);
        const facilityData = await fetchFacilities(page);
        // console.log(facilityData)
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
            reviews: facility.reviews,
            location: facility.location,
            logo: facility.logo,
            region: facility.region?.name,
            reviewCount: facility.total_reviews,
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

    fetchFacilityData(pagination);
    navigate(`?page=${pagination}`, { replace: true });
  }, [pagination, navigate]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPagination(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPagination(prev => prev - 1);
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
      <div className="max-[819px]:hidden w-full  max-w-[1100px] flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
        {facilities.map((facility) => (
          <div key={facility.id}  className="w-full flex flex-col items-center pt-6 ">
            <FacilityCardMd facility={facility} />
          </div>
        ))}
      </div>

      <div className="min-[820px]:hidden w-full flex flex-col gap-8 items-center divide-y divide-[#D9D9D9]">
        {facilities.map((facility) => (
            <div key={facility.id}  className="w-full flex flex-col items-center pt-5 ">
              <FacilityCardSm facility={facility} />
            </div>
        ))}
      </div>

      <div className="flex border-r border-black my-8 md:my-12">
        <button onClick={handlePreviousPage} className={`${hasPreviousPage ? 'flex border-r-0' : !hasNextPage ? 'border-r': 'hidden'} text-xs md:text-sm border border-black py-1 lg:py-2 px-8 md:px-12 font-semibold`}>Previous</button>
        <button onClick={handleNextPage} className={`${hasNextPage ? 'flex border-r-0' : 'hidden'} text-xs md:text-sm border border-black px-8 md:px-12 py-1 lg:py-2 font-semibold text-[#0066FF]`}>Next Page</button>
      </div>
    </>
  );
};

export default FacilityCard;