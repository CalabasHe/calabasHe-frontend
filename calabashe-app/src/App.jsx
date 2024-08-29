import { Route, Routes, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Homepage';
import Review from './pages/Reviews';
import Hospitals from './pages/Hospitals';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyUser from './pages/Verification';

function App() {
  const location = useLocation()
  return (
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/review' element={<Review />} />
          <Route path='/hospitals' element={<Hospitals />} />
          <Route path='/services' element={<Services />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/sign_up' element={<SignUp />} />
          <Route path='/sign_in' element={<SignIn />} />
          <Route path='/verification' element={<VerifyUser />} />
        </Routes>
      </AnimatePresence>
  );
}

export default App;
