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
import AccountClaim from "./pages/AccountClaim";
import SubServices from "./pages/SubServices";
import ServiceProviders from "./pages/ServiceProviders";
import { SpecialtyProvider } from "./context/specialtyContext";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <SpecialtyProvider>
        <BannerVisibilityProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />} />
              <Route path="/review/:slug" element={<Review />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route
                path="/facilities/:type/:slug"
                element={<FacilityProfile />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:subservices" element={<SubServices />} />
              <Route
                path="/services/:subservices/:providers"
                element={<ServiceProviders />}
              />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:slug" element={<DocProfile />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route path="/sign_in" element={<SignIn />} />
              <Route path="/verification" element={<VerifyUser />} />
              <Route path="/results" element={<SearchResultsPage />} />
              <Route path="/initial_form" element={<AccountClaim />} />
            </Routes>
          </AnimatePresence>
        </BannerVisibilityProvider>
      </SpecialtyProvider>
    </AuthProvider>
  );
}

export default App;
