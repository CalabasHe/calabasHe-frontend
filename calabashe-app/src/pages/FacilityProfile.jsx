import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFacilityBySlug } from "../api/getProfileData";
import Footer from "../components/Footer";
import "../stylesheets/profile.css";
import AnimatePage from "../components/AnimatePage";
import FacilityProfileSm from "../components/facilityProfileSm";
import FacilityProfileMd from "../components/facilityProfileMd";

const FacilityProfile = () => {
  const { type, slug } = useParams();
  const [facility, setFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await fetchFacilityBySlug(type, slug);
        // console.log('API Response:', data);
        const FacilityDetails = {
          id: data.id,
          name: data.name,
          contact: data.phone,
          location: data.location,
          address: data.address,
          rating: data.average_rating,
          services: data.services,
          type: data.facility_type.name,
          slug: data.slug,
          description: data.description,
          ratingPercentages: data.rating_percentages,
          reviews: data.reviews,
          totalReviews: data.total_reviews,
        };
        // console.log('Processed facility details:', FacilityDetails);
        setFacility(FacilityDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacility();
    const intervalId = setInterval(fetchFacility, 3600000);

    return () => clearInterval(intervalId);
  }, [type, slug]);

  if (isLoading)
    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <FadeInOut>
        <div className="md:hidden">
          <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%]  bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <div className="z-0 absolute top-[120px] sm:top-[165px] h-3  w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
          <aside className=" mt-[68px] sm:mt-[76px] select-none ">
            <h1 className="z-10 leading-tight relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
              <Link to="/facilities">
                Review Your <br /> Healthcare Providers
              </Link>
            </h1>
          </aside>
        </div>
      </FadeInOut>

      <AnimatePage>
        <main>
          <FacilityProfileSm facility={facility} />
          <FacilityProfileMd facility={facility} />
        </main>
      </AnimatePage>

      <Footer />
    </>
  );
};

export default FacilityProfile;
