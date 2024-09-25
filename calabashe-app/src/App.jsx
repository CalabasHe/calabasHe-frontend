import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Homepage";
import Review from "./pages/Reviews";
import Facilities from "./pages/Facilities";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyUser from "./pages/Verification";
import DocProfile from "./pages/DocProfile";
import FacilityProfile from "./pages/FacilityProfile";
import { BannerVisibilityProvider } from "./context/BannerVisibilityContext";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <BannerVisibilityProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/review/:slug" element={<Review />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route
              path="/facilities/:type/:slug"
              element={<FacilityProfile />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:slug" element={<DocProfile />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/verification" element={<VerifyUser />} />
            <Route path="/results" element={<SearchResultsPage />} />
          </Routes>
        </AnimatePresence>
      </BannerVisibilityProvider>
    </AuthProvider>
  );
}

export default App;
