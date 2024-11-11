import { useEffect, useRef, useState } from "react";
import { getConditions } from "../api/functions/secondaryform";

const SecondaryFormCard = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [hasSpecialty, setHasSpecialty] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userHasSpecialty: "",
    certificationYear: "",
    digitalConsultation: "",
    hasAward: "",
    internationalExperience: "",
    inPersonConsultation: "",
    researchPublicationExperience: "",
    medicalAssociationAffiliation: "",
    treatments: "",
    currentPractice: "",
    clinicLocation: "",
    profilePhoto: "",
    languages: "",
    education: "",
    consultationFee: "",
    specialServices: "",
    workingHours: "",
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => 1950 + i
  );

  // useEffect(() => {
  //   const wei = async () => {
  //     const weiPartTwo = await getConditions()
  //     console.log(weiPartTwo)
  //   }
  // }, [])

  const dropdownOptions = {
    certificationYear: years,
    // treatments: getConditions(),
    currentPractice: ["Location 1", "Location 2", "Location 3"],
    clinicLocation: ["Clinic 1", "Clinic 2", "Clinic 3"],
    profilePhoto: ["Upload Photo"],
    languages: ["English", "Spanish", "French"],
    education: ["MD", "DO", "MBBS"],
    consultationFee: ["$50-100", "$100-150", "$150-200"],
    specialServices: ["Service 1", "Service 2", "Service 3"],
    workingHours: ["9AM-5PM", "10AM-6PM", "8AM-4PM"],
  };

  const handleDropdownSelect = (dropdownName, value) => {
    setFormData((prev) => ({
      ...prev,
      [dropdownName]: value,
    }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const renderDropdown = (name, label) => {
    const dropdownId = `${name}-dropdown`;

    return (
      <section className="flex flex-col gap-1 max-h-[300px]">
        <label
          htmlFor={dropdownId}
          className="text-sm lg:text-nowrap md:text-base cursor-default"
        >
          {label}
        </label>
        <div
          className="relative"
          ref={(el) => (dropdownRefs.current[name] = el)}
        >
          <div
            id={dropdownId}
            onClick={() => toggleDropdown(name)}
            className="bg-inherit py-2 px-4 max-lg:text-xs w-full text-left border border-black focus:outline-none"
            role="button"
            aria-haspopup="listbox"
            aria-labelledby={dropdownId}
          >
            {formData[name] || "Select an option"}
          </div>
          {openDropdown === name && (
            <div
              className="absolute z-10 mt-2 max-h-[200px] w-full overflow-y-auto bg-white border border-gray-300 divide-y-2 rounded-md shadow-md scrollbar-thin"
              role="listbox"
              aria-labelledby={dropdownId}
            >
              {dropdownOptions[name].map((option, index) => (
                <div
                  key={option}
                  id={`${dropdownId}-option-${index}`}
                  onClick={() => handleDropdownSelect(name, option)}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  role="option"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <h2 className="font-semibold lg:text-lg underline select-none">
        Fill the following forms to get your profile set up <br /> on Calabashe
      </h2>

      <form className="flex flex-col w-full md:w-[80vw] md:max-w-[800px] gap-6 lg:gap-5 select-none">
        
        <section className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-sm md:text-base cursor-default">
            1. Enter your full name
            <div id="fullName" className="lg:flex max-lg:space-y-3 gap-4 ">
              <input id="firstName" type="text" required className="bg-inherit px-4 py-1 focus:outline-none" placeholder="enter first name" />
              <input id="lastName" type="text" required className="bg-inherit px-4 py-1 focus:outline-none" placeholder="enter last name" />
            </div>
          </label>
          <div>

          </div>
        </section>
        
        {renderDropdown(
          "certificationYear",
          "3. When did you begin practicing?"
        )}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            4. Do you have any specialties or sub-specialties?
          </label>
          <div className="md:flex md:gap-3 max-md:space-y-3">
            <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  className="w-2"
                  name="hasSpecialty"
                  id="specialty-yes"
                  required
                  onChange={(e) => setHasSpecialty(e.target.value)}
                  value="Yes"
                />
                <label htmlFor="specialty-yes">Yes</label>
              </span>
              <span className="flex items-center gap-2 pl-5 md:pl-5">
                <input
                  type="radio"
                  className="w-2"
                  name="hasSpecialty"
                  id="specialty-no"
                  required
                  onChange={(e) => setHasSpecialty(e.target.value)}
                  value="No"
                />
                <label htmlFor="specialty-no">No</label>
              </span>
            </div>
            <div
              className={`${
                hasSpecialty === "No" && "hidden"
              } max-lg:text-xs px-4 py-2.5 w-full border border-black`}
            >
              Specify here
            </div>
          </div>
        </section>

        {renderDropdown(
          "treatments",
          "5. Select treatments and procedures you provide."
        )}

        <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
          {renderDropdown(
            "currentPractice",
            "6. Where do you currently practice?"
          )}
          <div className="space-y-1">
            <label htmlFor="clinicLocation">
              7. What is the location of your current clinic?
            </label>
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  clinicLocation: e.target.value,
                }))
              }
              value={formData.clinicLocation || ""}
              id="clinicLocation"
              type="text"
              required
              placeholder="enter clinic location"
              className="focus:outline-none bg-inherit px-4 py-2"
            />
          </div>
        </div>

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            8. Would you be open to consulting digitally on Calabashe?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="digitalConsultation"
                id="digital-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    digitalConsultation: e.target.value,
                  }))
                }
                value="Yes"
              />
              <label htmlFor="digital-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="digitalConsultation"
                id="digital-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    digitalConsultation: e.target.value,
                  }))
                }
                value="No"
              />
              <label htmlFor="digital-no">No</label>
            </span>
          </div>
        </section>

        {renderDropdown(
          "profilePhoto",
          "9. Upload a professional photo for your Calabashe profile?"
        )}
        {renderDropdown("languages", "10. What languages do you speak?")}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            11. Are you affiliated with any professional medical associations?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="medicalAffiliation"
                id="affiliation-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    medicalAssociationAffiliation: e.target.value,
                  }))
                }
                value="Yes"
              />
              <label htmlFor="affiliation-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="medicalAffiliation"
                id="affiliation-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    medicalAssociationAffiliation: e.target.value,
                  }))
                }
                value="No"
              />
              <label htmlFor="affiliation-no">No</label>
            </span>
          </div>
        </section>

        {renderDropdown(
          "education",
          "12. What is your highest level of medical education?"
        )}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            13. Have you received any special awards or recognitions in your
            field?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="hasAward"
                id="award-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, hasAward: e.target.value }))
                }
                value="Yes"
              />
              <label htmlFor="award-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="hasAward"
                id="award-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, hasAward: e.target.value }))
                }
                value="No"
              />
              <label htmlFor="award-no">No</label>
            </span>
          </div>
        </section>

        {renderDropdown(
          "consultationFee",
          "14. What is your consultation fee range?"
        )}
        {renderDropdown(
          "specialServices",
          "15. Do you offer any special services or programs (e.g., wellness programs, preventive care)?"
        )}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            16. Do you have experience with international patients or
            expatriates?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="internationalExperience"
                id="international-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    internationalExperience: e.target.value,
                  }))
                }
                value="Yes"
              />
              <label htmlFor="international-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="internationalExperience"
                id="international-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    internationalExperience: e.target.value,
                  }))
                }
                value="No"
              />
              <label htmlFor="international-no">No</label>
            </span>
          </div>
        </section>

        {renderDropdown(
          "workingHours",
          "17. What are your typical working hours and available days?"
        )}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            18. Are you able to consult in-person outside of your clinic (e.g.,
            home visits)?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="inPersonConsultation"
                id="in-person-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inPersonConsultation: e.target.value,
                  }))
                }
                value="Yes"
              />
              <label htmlFor="in-person-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="inPersonConsultation"
                id="in-person-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inPersonConsultation: e.target.value,
                  }))
                }
                value="No"
              />
              <label htmlFor="in-person-no">No</label>
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            19. Do you have any publications or research experience?
          </label>
          <div className="w-full text-xs border flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                className="w-2"
                name="hasPublication"
                id="publication-yes"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    researchPublicationExperience: e.target.value,
                  }))
                }
                value="Yes"
              />
              <label htmlFor="publication-yes">Yes</label>
            </span>
            <span className="flex items-center gap-2 pl-5 md:pl-5">
              <input
                type="radio"
                className="w-2"
                name="hasPublication"
                id="publication-no"
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    researchPublicationExperience: e.target.value,
                  }))
                }
                value="No"
              />
              <label htmlFor="publication-no">No</label>
            </span>
          </div>
        </section>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondaryFormCard;
