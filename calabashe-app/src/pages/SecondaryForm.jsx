import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";

const SecondaryForms = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState("");
  const [hasSpecialty, setHasSpecialty] = useState('No')

  const[formData, setFormData] = useState({
    firstName : "",
    lastName: "",
    userHasSpecialty : hasSpecialty,
    certificationYear: null,
    digitalConsultation: "",
    hasAward: "",
    internationalExperience: "",
    inPersonConsultation: "",
    resarchPublicationExperience: "",
    medicalAssociationAffiliation: "",
  })
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="2xl:container mx-auto">
      <Header />
      <main className="my-[10vh] lg:my-[15vh] w-full  px-2 md:px-8 lg:px-16 space-y-8">
        <h2 className="font-semibold lg:text-lg underline select-none">
          Fill the following forms to get your profile set up <span className="hidden md:flex"><br/></span> on Calabashe
        </h2>

        <form className="flex flex-col w-full md:w-[80vw] md:max-w-[800px] gap-6 lg:gap-5 select-none">

          <section className="">

          </section>

          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              3. When did you begin practicing?
            </label>
            <div className="relative flex justify-between" ref={dropdownRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-inherit py-2 px-4 max-lg:text-xs w-full text-left border border-black focus:outline-none"
                aria-haspopup="listbox"
                role="button"
              >
                {selectedYear || "Choose a year"}
              </div>
              {isOpen && (
                <div
                  className="absolute mt-2 max-h-[200px] w-full overflow-y-auto bg-white border border-gray-300 divide-y-2 rounded-md shadow-md scrollbar-thin"
                  role="listbox"
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      role="option"
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col gap-1 max-h-[300px]">
            <label htmlFor="chooseSpecialty" className="text-sm md:text-base cursor-default">
              4.  Do you have any specialties or sub-specialties?
            </label>
            <div className="md:flex md:gap-3  max-md:space-y-3">
              <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="hasSpecialty" id="userHasSpecialty" onClick={(e) => setHasSpecialty(e.target.value)} value={'Yes'} />
                  <label htmlFor="userHasSpecialty">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="hasSpecialty" id="userHasNoSpecialty" onClick={(e) => setHasSpecialty(e.target.value)} value={'No'} />
                  <label htmlFor="userHasNoSpecialty">No</label>
                </span>
              </div>

              <div className={`${hasSpecialty === 'No' && 'hidden'} max-lg:text-xs px-4 py-2.5 w-full border border-black`}>
                  Specify here
              </div>
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              5. Select treatments and procedures you provide.
            </label>
            <div className="">
              
            </div>
          </section>
          <div className="flex flex-col lg:flex-row lg:gap-3 gap-4 ">
            <section className="flex flex-col gap-1 max-h-[300px]">
              <label className="text-sm md:text-base cursor-default">
                6. Where do you currently practice?
              </label>
              <div className="">
                
              </div>
            </section>
            <section className="flex flex-col gap-1 max-h-[300px]">
              <label className="text-sm md:text-base cursor-default">
              7. What is the location of your current clinic?
              </label>
              <div className="">
                
              </div>
            </section>

          </div>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              8. Would you be open to consulting digitally on Calabashe?
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="digitalConsultation" id="consultationYes" onClick={(e) =>  setFormData((prev) => ({...prev, digitalConsultation: e.target.value}))} value={'Yes'} />
                  <label htmlFor="consultationYes">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="digitalConsultation" id="consultationNo" onClick={(e) =>  setFormData((prev) => ({...prev, digitalConsultation: e.target.value}))} value={'No'} />
                  <label htmlFor="consultationNo">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              9. Upload a professional photo for your Calabashe profile?
            </label>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              10. What languages do you speak?
            </label>
            
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              11. Are you affiliated with any professional medical associations?
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="medicalAffiliation" id="userHasMedicalAffiliation" onClick={(e) => setFormData((prev) => ({...prev, medicalAssociationAffiliation: e.target.value}))} value={'Yes'} />
                  <label htmlFor="userHasMedicalAffiliation">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="medicalAffiliation" id="userHasNoMedicalAffiliation" onClick={(e) =>  setFormData((prev) => ({...prev, medicalAssociationAffiliation: e.target.value}))} value={'No'} />
                  <label htmlFor="userHasNoMedicalAffiliation">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              12. What is your highest level of medical education?
            </label>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              13. Have you received any special awards or recognitions in your field?
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="hasAward" id="userHasAward" onClick={(e) =>  setFormData((prev) => ({...prev, hasAward: e.target.value}))} value={'Yes'} />
                  <label htmlFor="userHasAward">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="hasAward" id="userHasNoAward" onClick={(e) =>  setFormData((prev) => ({...prev, hasAward: e.target.value}))} value={'No'} />
                  <label htmlFor="userHasNoAward">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              14. What is your consultation fee range?
            </label>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              15. Do you offer any special services or programs (e.g., wellness programs, preventive care)?
            </label>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              16. Do you have experience with international patients or expatriates?
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="internationalExperience" id="userHasInternationalExperience" onClick={(e) =>  setFormData((prev) => ({...prev, internationalExperience: e.target.value}))} value={'Yes'} />
                  <label htmlFor="userHasInternationalExperience">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="internationalExperience" id="userHasNoInternationalExperience" onClick={(e) =>  setFormData((prev) => ({...prev, internationalExperience: e.target.value}))} value={'No'} />
                  <label htmlFor="userHasNoInternationalExperience">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              17. What are your typical working hours and available days?
            </label>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              18. Are you able to consult in-person outside of your clinic (e.g., home visits)??
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="inPersonConsultation" id="inPersonConsultation" onClick={(e) =>  setFormData((prev) => ({...prev, inPersonConsultation: e.target.value}))} value={'Yes'} />
                  <label htmlFor="inPersonConsultation">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="inPersonConsultation" id="noInPersonConsultation" onClick={(e) =>  setFormData((prev) => ({...prev, inPersonConsultation: e.target.value}))} value={'No'} />
                  <label htmlFor="noInPersonConsultation">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
          <section className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              19. Do you have any publications or research experience?
            </label>
            <div id="chooseSpecialty" className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
                <span className="flex items-center gap-2">
                  <input type="radio" className="w-2" name="hasPublication" id="userHasPublication" onClick={(e) =>  setFormData((prev) => ({...prev, resarchPublicationExperience: e.target.value}))} value={'Yes'} />
                  <label htmlFor="userHasPublication">Yes</label>
                </span>
                <span className="flex items-center gap-2 pl-5 md:pl-5">
                  <input type="radio" className="w-2" name="hasPublication" id="userHasNoPublication" onClick={(e) =>  setFormData((prev) => ({...prev, medicalAssociationAffiliation: e.target.value}))} value={'No'} />
                  <label htmlFor="userHasNoPublication">No</label>
                </span>
              </div>
            <div className="">
              
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default SecondaryForms;
