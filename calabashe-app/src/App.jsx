import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Homepage.jsx";
import Review from "./pages/Reviews.jsx";
import Facilities from "./pages/Facilities.jsx";
import Services from "./pages/Services.jsx";
import Doctors from "./pages/Doctors.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import VerifyUser from "./pages/Verification.jsx";
import DocProfile from "./pages/DocProfile.jsx";
import FacilityProfile from "./pages/FacilityProfile.jsx";
import { BannerVisibilityProvider } from "./context/BannerVisibilityContext.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import AccountClaim from "./pages/AccountClaim.jsx";
import SubServices from "./pages/SubServices.jsx";
import ServiceProviders from "./pages/ServiceProviders.jsx";
import { SpecialtyProvider } from "./context/specialtyContext.jsx";
import SecondaryForms from "./pages/SecondaryForm.jsx";
import About from "./pages/AboutUs.jsx";
import ProvidersLogin from "./pages/ProvidersLogin.jsx";
import ManageAccount from "./pages/ManageAccount.jsx";
import PrivateRoutes from "./components/protectedRoutes.jsx";
import VideoCallPage from "./pages/VideoCallPage.jsx";
import AvailableDoctors from "./pages/AvailableDoctors.jsx";
import Conditions from "./pages/Conditions.jsx";
import ConditionDetail from "./pages/ConditionDetail.jsx";
function App() {
  const location = useLocation();

  // useEffect(() => {
  //   initGA()
  // }, []);
  //
  // useEffect(() => {
  //  logPageView()
  // }, [location]);


  const NoResult = () => {
    return (
      <div className="w-full h-screen flex flex-col lg:text-lg gap-2 items-center justify-center">
        <h2>Nothing to see here 😶‍🌫️😶‍🌫️</h2>
        <Link className="text-emerald-500 font-semibold hover:underline" to={'/'}>&lt;&lt; Go home</Link>
      </div>
    )
  }

  return (
    <AuthProvider>
      <SpecialtyProvider>
        <BannerVisibilityProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route element={<PrivateRoutes />}>
                <Route path="/manage_account" element={<ManageAccount />} />
                <Route path="/video_call/:id" element={<VideoCallPage/>}/>
              </Route>
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
              <Route path="available-doctors" element={<AvailableDoctors/>} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/conditions/:slug" element={<ConditionDetail />} />
              <Route path="/providers_login"element={<ProvidersLogin/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:slug" element={<DocProfile />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route path="/sign_in" element={<SignIn />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/verification" element={<VerifyUser />} />
              <Route path="/results" element={<SearchResultsPage />} />
              <Route path="/initial_form" element={<AccountClaim />} />
              <Route path="/secondary_form" element={<SecondaryForms/>} />
              
              <Route path="*" element={<NoResult/>} />

            </Routes>
          </AnimatePresence>
        </BannerVisibilityProvider>
      </SpecialtyProvider>
    </AuthProvider>
  );
}

export default App;
