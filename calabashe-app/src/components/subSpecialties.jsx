import { useState } from "react";

const SubSpecialties = (mainSpecialty = 'all') => {
  const [chosenSpecialty, setChosenSpecialty] = useState('all')

  
  return ( 
  <>
    <div className="bg-white py-8 rounded-[inherit] pl-8 pr-2 space-y-6 border w-full h-fit max-h-[65vh] scrollbar-thin overflow-y-scroll">
        <div className="">
          <h2 className="font-semibold text-lg">Specialties</h2>
          <p className="text-sm text-slate-500 italic">Choose a specialty</p>
        </div>
        <ul className="flex gap-2 text-xs flex-wrap">
          <li
            className={`border flex items-center p-1 px-3 rounded-2xl cursor-pointer ${
              chosenSpecialty === 'all' ? 'bg-[#04da8d] text-white' : ''
            }`}
            onClick={() => onSpecialtyChange('all')}
          >
            <span>All</span>
          </li>
          {subSpecialties &&
            subSpecialties.map((subspecialty) => (
              <li
                key={parent.id}
                className={`border flex gap-1 items-center font-medium p-1 px-2 pr-1 rounded-[9999px] cursor-pointer ${
                  chosenSpecialty === subspecialty.slug ? 'bg-[#04da8d] text-white' : ''
                }`}
                onClick={() => onSpecialtyChange(subspecialty.slug)}
              >
                <span>{parent.name}</span>
                <span id="count" className="bg-gray-500 py-0.5 font-medium text-white px-2 rounded-full">
                  {parent.total_doctor_count}
                </span>
              </li>
            ))}
        </ul>
      </div>
  </> 
  );
}
 
export default SubSpecialties;