import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorCard from "./doctorCard";
import { fetchDoctorBySpecialties } from "../api/getCategoriesData";
import { SpecialtyContext } from "../context/specialtyContext";

// eslint-disable-next-line react/prop-types
const SpecialtyDoctorList = ({ specialty }) => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { updateSubSpecialties, selectedSubSpecialty, subSpecialties } =
    useContext(SpecialtyContext);

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page") || "1", 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());

  useEffect(() => {
    setPagination(1);
  }, [specialty, selectedSubSpecialty]);

  const fetchDocData = async () => {
    try {
      setIsLoading(true);
      const selectedSpecialty =
        selectedSubSpecialty === "all" ? specialty : selectedSubSpecialty;
      // console.log("Fetching doctors for specialty:", selectedSpecialty);

      const docData = await fetchDoctorBySpecialties(selectedSpecialty);

      setHasPreviousPage(!!docData.previous);
      setHasNextPage(!!docData.next);

      if (
        docData.results &&
        Array.isArray(docData.results.doctors) &&
        docData.results.doctors.length > 0
      ) {
        const doctorDetails = docData.results.doctors.map((doc) => ({
          id: doc.id,
          firstName: doc.first_name,
          lastName: doc.last_name,
          rating: doc.average_rating,
          specialty: doc.specialty_name,
          slug: doc.slug,
          reviews: doc.reviews,
          verified: doc.is_verified,
        }));
        setDoctors(doctorDetails);
      } else {
        // console.log("No doctors found");
        setDoctors([]);
      }

      if (
        docData.results &&
        Array.isArray(docData.results.children) &&
        docData.results.children.length > 0 &&
        subSpecialties.length === 0
      ) {
        updateSubSpecialties(docData.results.children);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigate(`?page=${pagination}`, { replace: true });
  }, [pagination, navigate]);

  useEffect(() => {
    fetchDocData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, specialty, selectedSubSpecialty]);

  // const handleNextPage = () => {
  //   if (hasNextPage) {
  //     setPagination((prev) => prev + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (hasPreviousPage) {
  //     setPagination((prev) => prev - 1);
  //   }
  // };

  if (isLoading)
    return (
      <div className="h-[50vh] lg:h-[30vh] w-full flex items-center justify-center">
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
    <div className="w-full flex flex-col items-center mb-3">
      {doctors.length > 0 ? (
        doctors.map((doctor) =>  
        <DoctorCard key={doctor.id} doctor={doctor} />
      )
      ) : (
        <div className="text-center py-8">
          No doctors found for this specialty.
        </div>
      )}

      {/* <div className="flex justify-center border-r border-black my-8 md:my-12">
        <button
          onClick={handlePreviousPage}
          className={`${
            hasPreviousPage
              ? "flex border-r-0"
              : !hasNextPage
              ? "border-r"
              : "hidden"
          } text-xs md:text-sm border border-black py-1 lg:py-2 px-8 md:px-12 font-semibold`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`${
            hasNextPage ? "flex border-r" : "hidden"
          } text-xs md:text-sm border border-black px-8 md:px-12 py-1 lg:py-2 font-semibold text-[#0066FF]`}
        >
          Next Page
        </button>
      </div> */}
    </div>
  );
};

export default SpecialtyDoctorList;
