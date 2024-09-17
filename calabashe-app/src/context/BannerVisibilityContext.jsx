import { createContext, useState, useContext } from 'react';

const BannerVisibilityContext = createContext();

export const BannerVisibilityProvider = ({ children }) => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);

  const updateBannerVisibility = (isHidden) => {
    setIsBannerHidden(isHidden);
  };

  return (
    <BannerVisibilityContext.Provider value={{ isBannerHidden, updateBannerVisibility }}>
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