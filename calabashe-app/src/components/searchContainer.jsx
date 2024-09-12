import { useState } from "react";
import SearchButtonSm from './searchButton';
import SearchBarSm from './searchBarSm';

const SearchContainer = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchBarVisible(true);
  };

  const handleSearchBarClose = () => {
    setIsSearchBarVisible(false);
  };

  return (
    <div>
      <SearchButtonSm onSearchClick={handleSearchClick} />
      <SearchBarSm 
        isVisible={isSearchBarVisible} 
        onClose={handleSearchBarClose}
        display={isSearchBarVisible ? "block" : "hidden"}
        setDisplay={(value) => setIsSearchBarVisible(value === "block")}
      />
    </div>
  );
};

export default SearchContainer;