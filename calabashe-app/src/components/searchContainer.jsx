import { useState } from "react";
import SearchButtonSm from './searchButton';
import SearchBarSm from './searchBarSm';
import { useBannerVisibility } from "../context/BannerVisibilityContext";
const SearchContainer = () => {
  const { isSearchBarVisible, showSearchBar, hideSearchBar } = useBannerVisibility();

  return (
    <div>
      <SearchButtonSm onSearchClick={showSearchBar} />
      <SearchBarSm 
        isVisible={isSearchBarVisible} 
        onClose={hideSearchBar}
        display={isSearchBarVisible ? "block" : "hidden"}
        setDisplay={(value) => value === "block" ? showSearchBar() : hideSearchBar()}
      />
    </div>
  );
};

export default SearchContainer;