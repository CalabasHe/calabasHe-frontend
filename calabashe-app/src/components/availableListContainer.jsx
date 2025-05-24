import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDoctors } from "../api/getCategoriesData";
import DoctorCard from "./doctorCardsm";
import DoctorCardMd from "./doctorCardmd";
import DoctorSearchBar from "./DoctorSearchBar";
import { DoctorsSearch } from "../api/search";
import { Toaster, toast } from 'sonner';
import { getAvailableDoctors } from "../api/bookings";
import AvailableDoctorsMd from "./availableDoctorMD";
import AvailableDoctorSm from "./availableDoctorSm";

const AvailableDoctorsContainer = () => {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [filtering, setFiltering] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    // const scrollPosition = useRef(0);


    // const saveScrollPosition = () => {
    //   scrollPosition.current = window.scrollY;
    // };

    // const restoreScrollPosition = () => {
    //   window.scrollTo(0, scrollPosition.current);
    // };

    const searchParams = new URLSearchParams(location.search);

    const [searchCriteria, setSearchCriteria] = useState({
        search_query: (searchParams.get("search_query") || "").trim(),
        specialty: (searchParams.get("specialty") || "").trim(),
        location: (searchParams.get("location") || "").trim(),
        page: parseInt((searchParams.get("page") || "1").trim(), 10)
    });

    const getCurrentPage = () => {
        const searchParams = new URLSearchParams(location.search);
        return parseInt(searchParams.get("page") || "1", 10);
    };

    const [pagination, setPagination] = useState(getCurrentPage());
    const [searchPagination, setSearchPagination] = useState(searchCriteria.page);

    const fetchDocData = async (page) => {
        try {
            setFiltering(false);
            setIsLoading(true);
            const docData = await getAvailableDoctors(page);
            // console.log(docData)
            setHasPreviousPage(!!docData.previous);
            setHasNextPage(!!docData.next);
            if (Array.isArray(docData) && docData.length > 0) {
                const doctorDetails = docData.map((doc) => ({
                    id: doc.id,
                    // firstName: doc.first_name,
                    // lastName: doc.last_name,
                    name: doc.name,
                    // rating: doc.average_rating,
                    // specialty: doc.specialty?.name,
                    specialtyTag: doc.specialty,
                    image: doc.image,
                    reviews: doc.total_reviews,
                    // reviewCount: doc.reviews_count,
                    verified: doc.is_verified || true,
                    availableTimes: doc.availableTimes
                    // region: doc.region_name,
                    // experience: doc.years_of_experience
                }));
                console.log(doctorDetails)
                setDoctors(doctorDetails);
            } else {
                // console.log();
                toast.error("No results found")
            }
        } catch (error) {
            // console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            toast.dismiss()
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchCriteria.search_query !== '' || searchCriteria.location !== '' || searchCriteria.specialty !== '') {
            handleSearchSubmit(
                searchCriteria.search_query,
                searchCriteria.specialty,
                searchCriteria.location,
                false
            );
        }
        else if (filtering) {
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

    // const handlePageChange = (newPage) => {
    //     setPagination(newPage);
    //     navigate(`?page=${newPage}`, { replace: true });
    // };

    // const handleNextPage = () => {
    //     if (filtering && hasNextPage) {
    //         setSearchPagination(searchPagination + 1);
    //     } else if (!filtering && hasNextPage) {
    //         handlePageChange(pagination + 1)
    //     }
    // };

    // const handlePreviousPage = () => {
    //     if (filtering && hasPreviousPage) {
    //         setSearchPagination(searchPagination - 1);
    //     } else if (!filtering && hasPreviousPage) {
    //         handlePageChange(pagination - 1);
    //     }
    // };

    const handleReset = () => {
        if (filtering) {
            setFiltering(false);
            setSearchCriteria({
                search_query: "",
                specialty: "",
                location: "",
                page: 1,
            });
            setPagination(1);
            setSearchPagination(1);
            fetchDocData(1);

            navigate("/doctors?page=1", { replace: true });
        }
    };

    const handleSearchSubmit = async (search_query, specialty, location, isNewSearch = true) => {
        try {
            if ((!search_query || !specialty || !location && searchPagination !== 1)) {
                navigate("/doctors")
            }
            search_query = search_query.trim()
            specialty = specialty.trim()
            location = location.trim()

            const searchParams = new URLSearchParams();
            if (search_query) searchParams.set("search_query", search_query);
            if (specialty) searchParams.set("specialty", specialty);
            if (location) searchParams.set("location", location);

            navigate(`?${searchParams.toString()}&page=${searchPagination}`, { replace: true });

            if (isNewSearch) {
                setPagination(1);
                setSearchPagination(1);
            }
            const page = isNewSearch ? 1 : searchPagination;
            setIsLoading(true);
            setFiltering(true);
            setPagination(1);
            setSearchCriteria({ search_query, specialty, location, page });
            const docData = await DoctorsSearch({ search_query, specialty, location, page });
            // console.log(docData);
            // Check for pagination availability
            // setHasPreviousPage(!!docData.previous);
            // setHasNextPage(!!docData.next);

            // Validate and process doctor data
            if (Array.isArray(docData?.results) && docData.results.length > 0) {
                // Update URL to reflect the search filters
                const doctorDetails = docData.results.map((doc) => ({
                    id: doc.id,
                    // firstName: doc.first_name,
                    // lastName: doc.last_name,
                    name: doc.name,
                    // rating: doc.average_rating,
                    // specialty: doc.specialty?.name,
                    specialtyTag: doc.specialty,
                    image: doc.image,
                    reviews: doc.total_reviews,
                    // reviewCount: doc.reviews_count,
                    verified: doc.is_verified || true,
                    availableTimes: docData.availableTimes
                    // region: doc.region_name,
                    // experience: doc.years_of_experience
                }));
                setDoctors(doctorDetails);

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
            <DoctorSearchBar submitFunc={handleSearchSubmit} resetFunc={handleReset} />
            <div className="max-[819px]:hidden w-full  max-w-[1100px] flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="w-full flex flex-col items-center pt-6 ">
                        {/* <DoctorCardMd doctor={doctor} /> */}
                        <AvailableDoctorsMd doctor={doctor}/>
                    </div>
                ))}
            </div>

            <div className="min-[820px]:hidden w-full flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="w-full flex flex-col items-center pt-4 ">
                        {/* <DoctorCard doctor={doctor} /> */}
                        <AvailableDoctorSm doctor={doctor}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableDoctorsContainer;