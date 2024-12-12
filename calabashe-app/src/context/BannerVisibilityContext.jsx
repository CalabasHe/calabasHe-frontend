import { createContext, useState, useContext } from 'react';

const BannerVisibilityContext = createContext();

export const BannerVisibilityProvider = ({ children }) => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const updateBannerVisibility = (isHidden) => {
    setIsBannerHidden(isHidden);
  };

  const showSearchBar = () => {
    setIsSearchBarVisible(true);
  };

  const hideSearchBar = () => {
    setIsSearchBarVisible(false);
  };

  return (
    <BannerVisibilityContext.Provider
      value={{
        isBannerHidden,
        updateBannerVisibility,
        isSearchBarVisible,
        showSearchBar,
        hideSearchBar,
      }}
    >
      {children}
    </BannerVisibilityContext.Provider>
  );
};

export const useBannerVisibility = () => {
  const context = useContext(BannerVisibilityContext);
  if (!context) {
    throw new Error('useBannerVisibility must be used within a BannerVisibilityProvider');
  }
  return context;
};
