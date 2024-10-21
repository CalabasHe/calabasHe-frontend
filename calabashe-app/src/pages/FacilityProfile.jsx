import Header from "../components/Header";
import { useParams} from "react-router-dom";
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
        const data = await fetchFacilityBySlug(slug);
        // console.log('API Response:', data);
        const FacilityDetails = {
          id: data.id,
          name: data.name,
          contact: data.phone,
          region: data.region?.name,
          address: data.address,
          location: data.location,
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
