import { createContext, useState } from "react";

export const SpecialtyContext = createContext();

// eslint-disable-next-line react/prop-types
export const SpecialtyProvider = ({ children }) => {
  const [subSpecialties, setSubSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedSubSpecialty, setSelectedSubSpecialty] = useState("all");

  const updateSubSpecialties = (newSubSpecialties) => {
    if (Array.isArray(newSubSpecialties) && newSubSpecialties.length > 0) {
      setSubSpecialties(newSubSpecialties);
    }
  };

  const updateSelectedSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);

    setSelectedSubSpecialty("all");

    setSubSpecialties([]);
  };

  const updateSelectedSubSpecialty = (subSpecialty) => {
    setSelectedSubSpecialty(subSpecialty);
  };

  return (
    <SpecialtyContext.Provider
      value={{
        subSpecialties,
        updateSubSpecialties,
        selectedSpecialty,
        updateSelectedSpecialty,
        selectedSubSpecialty,
        updateSelectedSubSpecialty,
      }}
    >
      {children}
    </SpecialtyContext.Provider>
  );
};
