import { useEffect, useRef, useState } from "react";
import { getConditions, getServices, getSpecialties } from "../api/functions/secondaryform";
import { FaPaperclip } from "react-icons/fa";

const SecondaryFormCard = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [hasSpecialty, setHasSpecialty] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => 1950 + i
  );

  const [dropdownOptions, setDropdownOptions] = useState({
    certificationYear: years,
    treatments: [],
    specialties: [],
    currentPractice: ["1", "2", "3", "4+",],
    clinicLocation: ["Clinic 1", "Clinic 2", "Clinic 3"],
    languages: ["English", "Spanish", "French"],
    education: ["MD", "DO", "MBBS"],
    consultationFee: ["GHS 20-80", "GHS 81-120", "GHS 121-160", "GHS 161+"],
    services: [],
    workingHours: ["9AM-5PM", "10AM-6PM", "8AM-4PM"],
  });

  async function fetchAndSetDropdownOptions() {
    try {
      const [treatmentsData, specialtyData, serviceData] = await Promise.all([
        getConditions(),
        getSpecialties(),
        getServices()
      ]);
  
      const treatmentNames = treatmentsData.map((treatment) => treatment.name);
      const specialtyNames = specialtyData.map((specialty) => specialty.name);
      const serviceNames = serviceData.map((service) => service.name);

      setDropdownOptions((prevOptions) => ({
        ...prevOptions,
        treatments: treatmentNames,
        specialties: specialtyNames, 
        services: serviceNames,
      }));
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  }
  

  useEffect(() => {
    fetchAndSetDropdownOptions();
  }, []);

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
              className="absolute z-10 mt-2 max-h-[300px] w-full overflow-y-auto bg-white border border-gray-300 divide-y-2 rounded-md shadow-md scrollbar-thin"
              role="listbox"
              aria-labelledby={dropdownId}
            >
              {dropdownOptions[name].map((option, index) => (
                <div
                  key={option}
                  id={`${dropdownId}-option-${index}`}
                  onClick={() => handleDropdownSelect(name, option)}
                  className="py-2 px-4 text-xs lg:text-sm hover:bg-gray-100 cursor-pointer"
                  role="option"
                  required
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
        <span className="hidden md:flex">
          {" "}
          Fill the following forms to get your profile set up <br /> on
          Calabashe
        </span>
        <span className="md:hidden ">
          {" "}
          Fill the following forms to get your profile set up on Calabashe
        </span>
      </h2>

      <form className="flex flex-col w-full md:w-[80vw] md:max-w-[800px] gap-6 lg:gap-5 select-none">
        <section className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="text-sm md:text-base cursor-default"
          >
            1. Enter your full name
          </label>
          <div id="fullName" className="lg:flex max-lg:space-y-3 md:space-x-3 ">
            <input
              id="firstName"
              type="text"
              required
              className="bg-inherit px-4 py-1  max-lg:placeholder:text-xs lg:placeholder:text-sm focus:outline-none"
              placeholder="enter first name"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
            <input
              id="lastName"
              type="text"
              required
              className="bg-inherit px-4 py-1  max-lg:placeholder:text-xs lg:placeholder:text-sm focus:outline-none"
              placeholder="enter last name"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
        </section>

        <section className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="text-sm md:text-base cursor-default"
          >
            2. Enter email
          </label>
          <input
            id="email"
            type="email"
            required
            className="bg-inherit max-lg:placeholder:text-xs lg:placeholder:text-sm px-4 py-1 focus:outline-none"
            placeholder="enter your email"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </section>

        {renderDropdown(
          "certificationYear",
          "3. When did you begin practicing?"
        )}

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            4. Do you have any specialties or sub-specialties?
          </label>
          <div className="md:flex md:flex-row gap-3 max-md:space-y-3">
            <div className="w-full text-xs border flex px-8 divide-x py-2 lg:py-3 gap-5 items-center border-black">
              <span className="flex items-center gap-2 ">
                <input
                  type="radio"
                  className="w-2 cursor-pointer"
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
                  className="w-2 cursor-pointer"
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
              }  w-full `}
            >
               {renderDropdown(
                "specialties"
            )}
            </div>
          </div>
        </section>

        {/* {renderDropdown(
          "treatments",
          "5. Select treatments and procedures you provide."
        )} */}

        <div className="flex flex-col lg:flex-row lg:gap-5 gap-6">
          {renderDropdown(
            "currentPractice",
            "6. How many clinics do you currently practice at?"
          )}
          {/* <div className="flex flex-col gap-1">
            <label
              className="text-sm md:text-base cursor-default"
              htmlFor="clinicLocation"
            >
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
              className="focus:outline-none bg-inherit px-4 py-1 lg:py-2  max-lg:placeholder:text-xs lg:placeholder:text-sm"
            />
          </div> */}
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

        <section className="flex flex-col gap-1 max-h-[300px]">
          <label className="text-sm md:text-base cursor-default">
            9. Upload a professional photo for your Calabashe profile?
          </label>
          <div className="w-full text-xs border bg-white flex px-8 md divide-x py-2 gap-5 items-center border-black">
            <span className="flex items-center gap-2">
              <input
                type="file"
                className="hidden w-full"
                name="profilePhoto"
                id="profile-photo"
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      profilePhoto: file,
                    }));
                  }
                }}
              />
              <label htmlFor="profile-photo" className="cursor-pointer">
                {formData.profilePhoto ? 
                  <span className="font-medium text-green-600">Image attached</span> :
                  <div className="flex gap-2 items-center">
                    <FaPaperclip className="rotate-45"/>
                    Attach your image here
                  </div>             
                }
              </label>
            </span>
          </div>
        </section>
        {renderDropdown("languages", "10. What languages do you speak?")}

        {/* <section className="flex flex-col gap-1 max-h-[300px]">
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
        )} */}

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

        {/* {renderDropdown(
          "consultationFee",
          "14. What is your consultation fee range?"
        )} */}

        {/* {renderDropdown(
          "services",
          "15. Do you offer any special services or programs (e.g., wellness programs, preventive care)?"
        )} */}

        {/* <section className="flex flex-col gap-1 max-h-[300px]">
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
        </section> */}

        {/* {renderDropdown(
          "workingHours",
          "17. What are your typical working hours and available days?"
        )} */}

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
