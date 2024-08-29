import { useEffect } from 'react';
import { Route} from 'react-router-dom';

function ScrollToTopRoute({ element, ...rest }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Route {...rest} element={element} />;
}

export default ScrollToTopRoute;
