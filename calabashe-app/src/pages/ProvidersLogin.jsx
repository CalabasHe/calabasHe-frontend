import Footer from "../components/Footer";
import Header from "../components/Header";
import ProviderLoginForm from "../components/ProvidersLoginForm";

const ProvidersLogin = () => {
  return (
    <div className="z-50 bg-red-50 overflow-hidden relative w-full min-h-screen flex flex-col items-center justify-center pt-32">
    <Header />
    <main>
    <ProviderLoginForm/>
    </main>
    <Footer />
    </div>



  );
}

export default ProvidersLogin;