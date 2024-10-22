import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorCard from "./doctorCard";
import { fetchDoctorBySpecialties } from "../api/getCategoriesData";
import { SpecialtyContext } from "../context/specialtyContext";

const SpecialtyDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { 
    selectedSpecialty,
    selectedSubSpecialty,
    updateSubSpecialties 
  } = useContext(SpecialtyContext);

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page") || "1", 10);
  };

  const [pagination, setPagination] = useState(getCurrentPage());

  useEffect(() => {
    setPagination(1);
  }, [selectedSpecialty, selectedSubSpecialty]);

  const fetchDocData = async () => {
    try {
      setIsLoading(true);
      setError(null);


      const specialtyToFetch = selectedSubSpecialty === "all" ? 
        selectedSpecialty : 
        selectedSubSpecialty;

      if (!specialtyToFetch || specialtyToFetch === "undefined") {
        throw new Error("No specialty selected");
      }

      const docData = await fetchDoctorBySpecialties(specialtyToFetch);

      setHasPreviousPage(!!docData.previous);
      setHasNextPage(!!docData.next);

      if (docData.results?.doctors && Array.isArray(docData.results.doctors)) {
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
        setDoctors([]);
      }


      if (
        selectedSubSpecialty === "all" && 
        docData.results?.children && 
        Array.isArray(docData.results.children)
      ) {
        updateSubSpecialties(docData.results.children);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigate(`?page=${pagination}`, { replace: true });
  }, [pagination, navigate]);

  useEffect(() => {
    if (selectedSpecialty !== "all") {
      fetchDocData();
    }
  }, [pagination, selectedSpecialty, selectedSubSpecialty]);

  if (isLoading) {
    return (
      <div className="h-[50vh] lg:h-[30vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[50vh] md:h-[40vh] w-full flex items-center justify-center">
        <p className="text-red-500">Error loading doctors. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mb-3">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <div className="text-center py-8">
          No doctors found for this specialty.
        </div>
      )}
    </div>
  );
};

export default SpecialtyDoctorList;