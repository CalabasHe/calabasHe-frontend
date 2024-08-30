import { Route, Routes, ScrollRestoration, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Homepage';
import Review from './pages/Reviews';
import Hospitals from './pages/Hospitals';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyUser from './pages/Verification';
import DocProfile from './pages/DocProfile';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode='wait'>
        {/* <ScrollRestoration /> */}
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/review/:slug' element={<Review />} />
          <Route path='/hospitals' element={<Hospitals />} />
          <Route path='/services' element={<Services />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:slug' element={<DocProfile />} />
          <Route path='/sign_up' element={<SignUp />} />
          <Route path='/sign_in' element={<SignIn />} />
          <Route path='/verification' element={<VerifyUser />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;