import { useEffect, useState, useContext } from "react";
import { fetchDoctorBySpecialties, fetchSpecialties } from "../api/getCategoriesData";
import SubSpecialties from "./subSpecialties";
import { SpecialtyContext } from "../context/specialtyContext";

const Specialty = ({ start = false, onClose }) => {
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { 
    selectedSpecialty,
    updateSelectedSpecialty,
    selectedSubSpecialty,
    updateSelectedSubSpecialty,
    updateSubSpecialties
  } = useContext(SpecialtyContext);

  useEffect(() => {
    const getSpecialtyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSpecialties();
        setParents(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (start) {
      getSpecialtyData();
    }
  }, [start]);

  const handleSpecialtyClick = async (specialtySlug) => {
    updateSelectedSpecialty(specialtySlug);
    updateSelectedSubSpecialty("all");
    
    if (specialtySlug !== "all") {
      try {
        const data = await fetchDoctorBySpecialties(specialtySlug);
        if (data.results?.children) {
          updateSubSpecialties(data.results.children);
        }
      } catch (err) {
        console.error("Error fetching subspecialties:", err);
        updateSubSpecialties([]);
      }
    } else {
      updateSubSpecialties([]);
    }

    if (onClose) {
      onClose();
    }
  };

  if (isLoading) return null;

  return (
    <section className="sticky top-[80px] mb-3 w-full flex flex-col gap-3 rounded-lg">
      <div className="bg-white py-8 rounded-[inherit] pl-8 pr-2 space-y-6 border w-full h-fit max-h-[38vh] scrollbar-thin overflow-y-scroll">
        <div className="">
          <h2 className="font-semibold text-lg">Specialties</h2>
          <p className="text-sm text-slate-500 italic">Choose a specialty</p>
        </div>
        <ul className="flex gap-2 text-xs flex-wrap">
          <li
            className={`border flex items-center p-1 px-3 rounded-2xl cursor-pointer ${
              selectedSpecialty === "all" ? "bg-[#04da8d] text-white" : ""
            }`}
            onClick={() => handleSpecialtyClick("all")}
          >
            <span>All</span>
          </li>
          {parents?.map((parent) => (
            <li
              key={parent.id}
              className={`border flex gap-1 items-center font-medium p-1 px-2 pr-1 rounded-[9999px] cursor-pointer ${
                selectedSpecialty === parent.slug
                  ? "bg-[#04da8d] text-white"
                  : ""
              }`}
              onClick={() => handleSpecialtyClick(parent.slug)}
            >
              <span>{parent.name}</span>
              <span
                id="count"
                className="bg-gray-500 py-0.5 font-medium text-white px-2 rounded-full"
              >
                {parent.total_doctor_count}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {selectedSpecialty !== "all" && <SubSpecialties />}
    </section>
  );
};

export default Specialty;