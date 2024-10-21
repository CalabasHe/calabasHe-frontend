import { useEffect, useState } from "react";
import { fetchSpecialties } from "../api/getCategoriesData";
import SubSpecialties from "./subSpecialties";

const Specialty = ({ selectedSpecialty, onSpecialtyChange, start = false }) => {
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSpecialtyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSpecialties();
        setParents(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (start) {
      getSpecialtyData();
    }
  }, [start]);

  if (isLoading) {
    return '';
  }

  return (
    <section className="sticky top-[80px] w-full flex flex-col gap-3 max-lg:hidden rounded-lg">
      <div className="bg-white py-8 rounded-[inherit] pl-8 pr-2 space-y-6 border w-full h-fit max-h-[65vh] scrollbar-thin overflow-y-scroll">
        <div className="">
          <h2 className="font-semibold text-lg">Specialties</h2>
          <p className="text-sm text-slate-500 italic">Choose a specialty</p>
        </div>
        <ul className="flex gap-2 text-xs flex-wrap">
          <li
            className={`border flex items-center p-1 px-3 rounded-2xl cursor-pointer ${
              selectedSpecialty === 'all' ? 'bg-[#04da8d] text-white' : ''
            }`}
            onClick={() => onSpecialtyChange('all')}
          >
            <span>All</span>
          </li>
          {parents &&
            parents.map((parent) => (
              <li
                key={parent.id}
                className={`border flex gap-1 items-center font-medium p-1 px-2 pr-1 rounded-[9999px] cursor-pointer ${
                  selectedSpecialty === parent.slug ? 'bg-[#04da8d] text-white' : ''
                }`}
                onClick={() => onSpecialtyChange(parent.slug)}
              >
                <span>{parent.name}</span>
                <span id="count" className="bg-gray-500 py-0.5 font-medium text-white px-2 rounded-full">
                  {parent.total_doctor_count}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <SubSpecialties/>
    </section>
  );
};

export default Specialty;