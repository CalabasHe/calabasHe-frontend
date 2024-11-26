import AboutSection from "../components/AboutSection";
import Banner from "../components/Banner";
import ExploreCategories from "../components/Categories";
import DoctorQuote from "../components/DoctorQuote";
import FaqSection from "../components/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JoinUs from "../components/JoinUs";
import RecentReviews from "../components/recentReviews";
import WhyUs from "../components/WhyUs";

const About = () => {
  return (
    <div className="bg-red-50">
      <div className="overflow-hidden 2xl:container mx-auto 2xl:border-x">
        <Header />
        <main className="bg-[#FCFBF2] w-full mt-8 flex flex-col gap-4 md:gap-6 items-center">
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default About;
