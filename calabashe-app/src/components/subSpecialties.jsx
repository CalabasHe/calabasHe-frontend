import { useContext } from "react";
import { SpecialtyContext } from "../context/specialtyContext";

const SubSpecialties = () => {
  const { subSpecialties, selectedSubSpecialty, updateSelectedSubSpecialty } =
    useContext(SpecialtyContext);

  const handleSubSpecialtyClick = (slug) => {
    updateSelectedSubSpecialty(slug);
  };

  return (
    <div className="bg-white py-8 rounded-[inherit] pl-8 pr-2 space-y-6 border w-full h-fit max-h-[35vh] scrollbar-thin overflow-y-scroll">
      <div className="">
        <h2 className="font-semibold text-lg">Sub-Specialties</h2>
        <p className="text-sm text-slate-500 italic">Choose a sub-specialty</p>
      </div>
      <ul className="flex gap-2 text-xs flex-wrap">
        <li
          className={`border flex items-center p-1 px-3 rounded-2xl cursor-pointer ${
            selectedSubSpecialty === "all" ? "bg-[#c26174] text-white" : ""
          }`}
          onClick={() => handleSubSpecialtyClick("all")}
        >
          <span>All</span>
        </li>
        {subSpecialties &&
          subSpecialties.length > 0 &&
          subSpecialties.map((subspecialty) => (
            <li
              key={subspecialty.id}
              className={`border flex gap-1 items-center font-medium p-1 px-3 rounded-[9999px] cursor-pointer ${
                selectedSubSpecialty === subspecialty.slug
                  ? "bg-[#c26174] text-white"
                  : ""
              }`}
              onClick={() => handleSubSpecialtyClick(subspecialty.slug)}
            >
              <span>{subspecialty.name}</span>
              {/* <span>{subspecialty.doctors_count}</span> */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SubSpecialties;
