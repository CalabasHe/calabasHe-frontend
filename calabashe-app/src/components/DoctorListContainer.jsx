import { useState } from 'react';
import Specialty from './specialties';
import AllDoctorList from './allDoctorList';
import SpecialtyDoctorList from './specialtyDoctorList';
import { SpecialtyContext } from '../context/specialtyContext';

const DoctorListContainer = () => {
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);

  const toggleSpecialtyModal = () => {
    setShowSpecialtyModal(!showSpecialtyModal);
  };

  return (
    <div className="relative w-full flex flex-col max-lg:items-center lg:flex-row lg:justify-between lg:h-[calc(100vh-64px)] lg:overflow-hidden">
      {/* Desktop specialty selector */}
      <div className="min-w-[30%] max-w-[40%] lg:block hidden lg:sticky lg:top-0 lg:h-full lg:overflow-y-auto">
        <div className="lg:pr-4">
          <Specialty start={true} />
        </div>
      </div>

      {/* Mobile trigger button */}
      <div className='w-full max-w-[400px] md:w-[85%] md:max-w-[800px] sm:max-w-[600px] lg:hidden bg-white/70 pt-3 pb-2 px-3 sticky top-[45px] z-30'>
        <button 
          onClick={toggleSpecialtyModal}  
          id='specialty' 
          className='w-full bg-[#205CD4] py-2 flex items-center justify-center rounded-3xl'
        >
          <p className='text-white'>Choose a specialty</p>
        </button>
      </div>

      {/* Mobile specialty modal */}
      {showSpecialtyModal && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-center bg-black/50">
          <div className="w-full max-w-md mt-12 mx-4 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Select Specialty</h2>
                <button 
                  onClick={toggleSpecialtyModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Specialty 
                start={true}
                onClose={toggleSpecialtyModal}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Doctor list section */}
      <div className="w-full lg:w-3/4 lg:h-full lg:overflow-y-auto lg:pb-24 scrollbar-thin">
        <div className="lg:pl-4">
          <SpecialtyContext.Consumer>
            {({ selectedSpecialty }) => (
              selectedSpecialty === 'all' ? (
                <div className='w-full flex flex-col items-center'>
                  <AllDoctorList />
                </div>
              ) : (
                <div className='w-full flex flex-col items-center'>
                  <SpecialtyDoctorList />
                </div>
              )
            )}
          </SpecialtyContext.Consumer>
        </div>
      </div>
    </div>
  );
};

export default DoctorListContainer;