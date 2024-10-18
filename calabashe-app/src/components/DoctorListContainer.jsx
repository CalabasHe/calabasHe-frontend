import { useState } from 'react';
import Specialty from './specialties';
import AllDoctorList from './allDoctorList';
import SpecialtyDoctorList from './specialtyDoctorList';

const DoctorListContainer = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  return (
    <div className="relative w-full flex flex-col max-lg:items-center lg:flex-row lg:justify-between gap-4">
      <div className="min-w-[30%] max-w-[40%]">
        <Specialty 
          selectedSpecialty={selectedSpecialty} 
          onSpecialtyChange={handleSpecialtyChange}
          start={true}
        />
      </div>
      <div className="w-full min-lg:w-3/4">
        {selectedSpecialty === 'all' ? (
          <AllDoctorList />
        ) : (
          <SpecialtyDoctorList specialty={selectedSpecialty} />
        )}
      </div>
    </div>
  );
};

export default DoctorListContainer;