import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StarRating from "./rating";
import { fetchFacilities } from "../api/getCategoriesData";

const FacilityCard = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from URL params or default to 1
  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());


  const go = useNavigate();
  const handleProfileClick = (type, slug) => {
    go(`/facilities/${type}/${slug}`);
  };

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        setIsLoading(true);
        const facilityData = await fetchFacilities();
        setHasPreviousPage(!!facilityData.previous);
        setHasNextPage(!!facilityData.next);
        if (
          Array.isArray(facilityData.results) &&
          facilityData.results.length > 0
        ) {
          const facilityDetails = facilityData.results.map((facility) => ({
            id: facility.id,
            name: facility.name,
            type: facility.facility_type.name,
            rating: facility.average_rating,
            slug: facility.slug,
            reviews: facility.reviews,
          }));
          // console.log('Processed doctor details:', doctorDetails);
          // console.log(docData)
          // setIsLoading(false);
          // console.log(docData)
          // console.log(docData.patientsTellUs)
          setFacilities(facilityDetails);
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

    fetchFacilityData();
    navigate(`?page=${pagination}`, { replace: true });
    const intervalId = setInterval(fetchFacilityData, 120000);

    return () => clearInterval(intervalId);
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
      <div className="h-[50vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="h-[50vh] md:h-[40vh] w-full flex items-center justify-center">
        {error.split(":")[0]}
      </div>
    );

  return (
    <>
      {facilities.map((facility) => (
        <div
          key={facility.id}
          className="cursor-pointer lg:hover:scale-[1.02] duration-300 mt-4 border border-black shadow-md h-44 sm:h-36 md:h-44 lg:h-52 rounded-lg md:rounded-xl lg:rounded-2xl w-[98%] max-w-[380px] md:w-[85%] md:max-w-[800px] sm:max-w-[600px] p-1 lg:px-4 flex gap-4 md:gap-6 min-[400px]:gap-6"
        >
          {/* Profile image comes here */}
          <div className="h-full lg:self-center lg:h-[80%] w-[35%] sm:max-w-[150px] md:max-w-[180px] flex items-center justify-center border rounded-lg">
            <svg
              className="w-16 sm:w-18 md:w-20 fill-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </div>

          {/* Profile Data */}
          <section className="lg:self-center grow flex flex-col sm:flex-row justify-between py-1">
            <div className="px-1 mb-auto overflow-hidden">
              <h2 className="text-sm  md:text-base font-[900]  overflow-hidden text-wrap line-clamp-1">
                {facility.name}
              </h2>
              <p className="text-[10px] text-xs font-[400] whitespace-nowrap overflow-hidden text-ellipsis">
                {facility.type}
              </p>

              <div className="mt-2">
                <StarRating rating={facility.rating} />
              </div>
              <div className="text-xs font-bold mt-1">
                {facility.reviews > 0 ?
                  <>
                    Patients tell us:
                    {facility.reviews.slice(0, 2).map((titles) => (
                      <p key={titles.id} className="font-normal text-xs ">
                        &#8226;{" "}
                        {titles.title.charAt(0).toUpperCase() +
                          titles.title.slice(1).toLowerCase()}
                      </p>
                    ))}
                  </>
                : <span>No reviews yet</span>
              }
              </div>
            </div>
            <div className="mt-auto sm:hidden">
              {/* <Link to={`/facility/${facility.slug}`} className="block w-full">
              <button className="w-full h-6 text-center bg-[#D3D3B1] rounded-md text-sm sm:text-base font-bold">
                View Profile
              </button>
            </Link> */}

              {/* View Profile button */}
              <Link
                to={`/facilities/${facility.type.toLowerCase()}s/${
                  facility.slug
                }`}
                className="block w-full"
              >
                <button className="w-full h-[inherit] p-1 text-center bg-[#D3D3B1] rounded-md text-sm sm:text-base font-bold">
                  View Profile
                </button>
              </Link>
            </div>

            <div className="h-full w-[150px] lg:w-[200px] p-2 rounded-lg md:rounded-xl hidden sm:flex flex-col justify-between gap-2 bg-[#E9E9D8]">
              <svg
                className=" p-2 "
                width="45"
                height="43"
                viewBox="0 0 45 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4998 9.90832L5.42714 25.6856C5.30058 25.8052 5.13886 25.8608 4.9998 25.9599V41.1011C4.9998 41.4485 5.1315 41.7817 5.36592 42.0273C5.60034 42.273 5.91828 42.411 6.2498 42.411H38.7498C39.0813 42.411 39.3993 42.273 39.6337 42.0273C39.8681 41.7817 39.9998 41.4485 39.9998 41.1011V25.9632C39.867 25.8682 39.7092 25.8142 39.5889 25.7012L22.4998 9.90832ZM29.9998 31.2766C29.9998 31.4503 29.934 31.6169 29.8167 31.7397C29.6995 31.8625 29.5406 31.9315 29.3748 31.9315H24.9998V36.5163C24.9998 36.69 24.934 36.8566 24.8167 36.9794C24.6995 37.1023 24.5406 37.1713 24.3748 37.1713H20.6248C20.459 37.1713 20.3001 37.1023 20.1829 36.9794C20.0656 36.8566 19.9998 36.69 19.9998 36.5163V31.9315H15.6248C15.459 31.9315 15.3001 31.8625 15.1829 31.7397C15.0656 31.6169 14.9998 31.4503 14.9998 31.2766V27.3468C14.9998 27.1731 15.0656 27.0065 15.1829 26.8836C15.3001 26.7608 15.459 26.6918 15.6248 26.6918H19.9998V22.1071C19.9998 21.9333 20.0656 21.7668 20.1829 21.6439C20.3001 21.5211 20.459 21.4521 20.6248 21.4521H24.3748C24.5406 21.4521 24.6995 21.5211 24.8167 21.6439C24.934 21.7668 24.9998 21.9333 24.9998 22.1071V26.6918H29.3748C29.5406 26.6918 29.6995 26.7608 29.8167 26.8836C29.934 27.0065 29.9998 27.1731 29.9998 27.3468V31.2766ZM44.585 19.8376L24.5896 1.33482C24.0173 0.792588 23.2733 0.492371 22.5018 0.492371C21.7302 0.492371 20.9862 0.792588 20.4139 1.33482L0.413863 19.8376C0.291692 19.9526 0.192332 20.0916 0.121459 20.2468C0.0505865 20.4021 0.00958981 20.5704 0.000811231 20.7422C-0.00796735 20.914 0.0156442 21.086 0.0702969 21.2483C0.12495 21.4105 0.209573 21.5599 0.319332 21.6879L1.99199 23.638C2.10169 23.7661 2.23439 23.8702 2.38251 23.9445C2.53063 24.0187 2.69125 24.0617 2.85522 24.0709C3.01918 24.0801 3.18327 24.0553 3.3381 23.9981C3.49294 23.9408 3.63549 23.8521 3.75761 23.7371L21.6732 7.17629C21.9016 6.96517 22.1957 6.84866 22.5002 6.84866C22.8047 6.84866 23.0988 6.96517 23.3271 7.17629L41.2428 23.7363C41.3649 23.8513 41.5074 23.94 41.6623 23.9973C41.8171 24.0545 41.9812 24.0793 42.1452 24.0701C42.3091 24.0609 42.4698 24.0179 42.6179 23.9436C42.766 23.8694 42.8987 23.7652 43.0084 23.6372L44.6803 21.6871C44.9016 21.4285 45.0159 21.0885 44.998 20.7416C44.9801 20.3948 44.8316 20.0696 44.585 19.8376Z"
                  fill="black"
                />
              </svg>

              {/* <p className="text-center font-semibold text-sm lg:text-base">Want to know more about <span className="font-bold"> Dr. {facility.firstName.split(' ')[0]}?</span></p> */}
              <p className=" p-2 font-regular text-sm lg:text-base">
                Do you want to read the {facility.type.toLowerCase()}&apos;s
                reviews?
              </p>
              <div className="block w-full ">
                <button
                  className="w-full h-[inherit] p-1 text-center bg-[#B6B67C] rounded-md text-sm sm:text-base font-bold"
                  onClick={() =>
                    handleProfileClick(
                      facility.type.toLowerCase() + "s",
                      facility.slug
                    )
                  }
                >
                  View Profile
                </button>
              </div>
            </div>
          </section>
        </div>
      ))}

      <div className="flex border-r-2 border-black mt-4 md:mt-8">
        <button onClick={handlePreviousPage} className={`${ hasPreviousPage ? 'flex border-r-0' : !hasNextPage ? 'border-r-2': 'hidden'} md:text-lg border-2 border-black px-4 md:px-8 font-semibold`}> &lt;&lt; Previous</button>
        <button onClick={handleNextPage} className={`${hasNextPage ? 'flex border-r-0' : 'hidden'} md:text-lg border-2 border-black md:px-8 px-4 font-semibold text-[#0066FF]`}>Next Page &gt;&gt;</button>
      </div>
    </>
  );
};

export default FacilityCard;