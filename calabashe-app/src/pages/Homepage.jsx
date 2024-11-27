import Banner from "../components/Banner";
import ExploreCategories from "../components/Categories";
import DoctorQuote from "../components/DoctorQuote";
import FaqSection from "../components/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JoinUs from "../components/JoinUs";
import Offering from "../components/Offering";
import RecentReviews from "../components/recentReviews";
import TopSearched from "../components/topSearched";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <div className="bg-red-50">

      <div className="overflow-hidden 2xl:container mx-auto 2xl:border-x">
        <Header />
        <main className="bg-[#FCFBF2] w-full mt-8 flex flex-col gap-4 md:gap-6 items-center">
          <Banner />

          {/* <Review/>        */}
          {/* <p className="font-semibold text-2xl sm:text-4xl ">Heyy there!!👋😁</p>
              <p className="font-semibold text-2xl sm:text-4xl ">Welcome to:</p>
              <h1 className="z-1 mt-4 text-4xl sm:text-6xl font-black animate-bounce ">Calabas<span className="text-[#04DA8D]">He</span></h1>  */}
          <ExploreCategories />
          <RecentReviews />
          <Offering/>
          <WhyUs/>
          <TopSearched/>
          {/* <DoctorQuote /> */}
          <FaqSection />
          <JoinUs />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
