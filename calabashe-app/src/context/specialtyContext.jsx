import { createContext, useState } from "react";

export const SpecialtyContext = createContext();

export const SpecialtyProvider = ({ children }) => {
  const [subSpecialties, setSubSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedSubSpecialty, setSelectedSubSpecialty] = useState("all");

  const updateSubSpecialties = (newSubSpecialties) => {
    setSubSpecialties(Array.isArray(newSubSpecialties) ? newSubSpecialties : []);
  };

  const updateSelectedSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedSubSpecialty("all");
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