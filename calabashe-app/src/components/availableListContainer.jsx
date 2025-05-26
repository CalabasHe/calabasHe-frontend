import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DoctorSearchBar from "./DoctorSearchBar";
import { toast } from 'sonner';
import { bookDoctor, getAvailableDoctors } from "../api/bookings";
import AvailableDoctorsMd from "./availableDoctorMD";
import AvailableDoctorSm from "./availableDoctorSm";
import { fetchDoctorBySlug } from "../api/getProfileData";
import ConfirmBooking from "./bookappointment_popUp";
import { getCookie } from "../utils/cookies";

const AvailableDoctorsContainer = () => {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);//not ideal
    const [showPopUp, setShowPopUP] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [isConfirmed, setIsConfirmed] = useState(false);
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
            const docData = (await getAvailableDoctors(page)).slice(0, 10);
            // console.log(docData)
            setHasPreviousPage(!!docData.previous);
            setHasNextPage(!!docData.next);
            if (Array.isArray(docData) && docData.length > 0) {
                //sorry about this, was the only way
                const doctorDetails = await Promise.all(
                    docData.map(async (doc) => {
                        const result = await fetchDoctorBySlug(doc.name.toLowerCase().replace(" ", "-").trim());
                        // console.log(result);
                        const details = {
                            id: doc.id,
                            first_name: result.first_name,
                            last_name: result.last_name,
                            name: doc.name,
                            rating: result.average_rating,
                            specialty: result.specialty?.name,
                            specialtyTag: result.specialty_tag,
                            image: doc.image,
                            reviews: result.reviews,
                            reviewCount: result.total_reviews,
                            verified: result.is_verified ?? true, // use ?? not || if you want default only when undefined/null
                            availableTimes: doc.availableTimes,
                            slug: doc.name.toLowerCase().replace(" ", "-").trim(),
                            region: result.region_name,
                            conditions_and_treatments: result.conditions_and_treatments
                        };
                        return details;
                    })
                );
                // console.log(doctorDetails)
                setDoctors(doctorDetails);
            } else {
                setIsAvailable(false)
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

    const handleReset = async () => {
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
            await fetchDocData(1);
            navigate("/available-doctors?page=1", { replace: true });
        }
    };


    const handleSearchSubmit = async (search_query, specialty, location, isNewSearch = true) => {
        setFiltering(true);

        const filteredDoctors = doctors.filter((doctor) => {
            const matchesQuery = search_query
                ? doctor.name.toLowerCase().includes(search_query.toLowerCase())
                : true;

            const matchesSpecialty = specialty
                ? doctor.specialty.toLowerCase() === specialty.toLowerCase()
                : true;

            const matchesLocation = location
                ? doctor.location.toLowerCase().includes(location.toLowerCase())
                : true;

            return matchesQuery && matchesSpecialty && matchesLocation;
        });

        // Reset pagination if it's a new search
        if (isNewSearch) {
            setSearchPagination(1);
        }

        setDoctors(filteredDoctors);
        setSearchCriteria({
            search_query: search_query.trim(),
            specialty: specialty.trim(),
            location: location.trim(),
            page: 1,
        });
        // console.log(filteredDoctors)
        setFiltering(false);
    };

    const BookAppointment = async () => {
        try {
            console.log(appointmentDetails)
            await bookDoctor(appointmentDetails);

            toast.loading("Booking")
            toast.success("Appointment has been booked");
            fetchDocData();
        } catch (err) {
            console.log(err)
            if (err.status === 401) {
                toast.error("Please login to book");
            } else {
                toast.error("An error occurred while booking");
            }
        }
        finally {
            toast.dismiss();
            setIsConfirmed(false);
        }

    }

    useEffect(() => {
        if (isConfirmed) {
            BookAppointment()
        }
    }, [showPopUp]);

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
                An unexpected Error occurred, Please try again later
            </div>
        );


    return (
        <div className="w-full flex flex-col items-center">
            <DoctorSearchBar submitFunc={handleSearchSubmit} resetFunc={handleReset} />
            <ConfirmBooking showPopUp={showPopUp} handlePopUp={() => { setShowPopUP(!showPopUp) }} handleConfirm={() => setIsConfirmed(true)} />
            {doctors.length === 0 ?
                (<div className="h-[50vh] md:h-[40vh] w-full flex flex-col items-center justify-center">
                    No Doctor is available
                    <Link to={"/doctors"} className="bold underline text-green-700">Doctors page</Link>
                </div>) :
                (<>
                    <div className="max-[819px]:hidden w-full  max-w-[1100px] flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="w-full flex flex-col items-center pt-6 ">
                                <AvailableDoctorsMd doctor={doctor} handleBooking={BookAppointment} handleAppointmentDetails={(details) => {
                                    setShowPopUP(true);
                                    setAppointmentDetails(details)
                                }} />
                            </div>
                        ))}
                    </div>

                    <div className="min-[820px]:hidden w-full flex flex-col gap-6 items-center divide-y divide-[#D9D9D9]">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="w-full flex flex-col items-center pt-4 ">
                                <AvailableDoctorSm doctor={doctor} handleAppointmentDetails={(details) => {
                                    setShowPopUP(true);
                                    setAppointmentDetails(details)
                                }} />
                            </div>
                        ))}
                    </div></>)
            }

        </div>
    );
};

export default AvailableDoctorsContainer;