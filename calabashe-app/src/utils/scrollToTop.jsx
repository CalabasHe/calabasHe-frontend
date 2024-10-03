import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ScrollToTop = ({ delay = 150 }) => {
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [location, delay]);

  return null; // This component does not render anything
};

export default ScrollToTop