import Banner from "../components/Banner";
import ExploreCategories from "../components/Categories";
import DoctorQuote from "../components/DoctorQuote";
import FaqSection from "../components/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecentReviews from "../components/recentReviews";

const Home = () => {

  return (
        <div className="overflow-hidden">
            <Header/>
            <main className='bg-[#FCFBF2] w-full mt-8 flex flex-col gap-3 md:gap-5 items-center'>
              <Banner />

              {/* <Review/>        */}
              {/* <p className="font-semibold text-2xl sm:text-4xl ">Heyy there!!👋😁</p>
              <p className="font-semibold text-2xl sm:text-4xl ">Welcome to:</p>
              <h1 className="z-1 mt-4 text-4xl sm:text-6xl font-black animate-bounce ">Calabas<span className="text-[#04DA8D]">He</span></h1>  */}
              <ExploreCategories/>
              <RecentReviews/>
              <DoctorQuote/>
              <FaqSection/>
            </main>
            <Footer/>

        </div>
    )
}
 
export default Home;