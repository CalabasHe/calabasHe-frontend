import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";

const SecondaryForms = () => {
  const [currentYear] = useState(new Date().getFullYear()); // Sets current year only once
  const [selectedYear, setSelectedYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  // Close the dropdown if clicked outside
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
      <main className="mt-[10vh] lg:mt-[15vh] w-full  px-2 md:px-8 lg:px-16 space-y-8">
        <h2 className="font-semibold lg:text-lg underline select-none">
          Fill the following forms to get your profile set up <br/> on Calabashe
        </h2>

        <form className="flex flex-col w-full md:w-[80vw] md:max-w-[800px] lg:gap-4 select-none">

          <div className="flex flex-col gap-1 max-h-[300px]">
            <label className="text-sm md:text-base cursor-default">
              1. When did you begin practicing?
            </label>
            <div className="relative flex justify-between" ref={dropdownRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-inherit py-2 px-4 max-lg:text-sm w-full text-left border border-black focus:outline-none"
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
          </div>

          <div>
            
          </div>
        </form>
      </main>
    </div>
  );
};

export default SecondaryForms;
