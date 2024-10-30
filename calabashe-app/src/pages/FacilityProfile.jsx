import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
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
  const go = useNavigate();

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await fetchFacilityBySlug(slug);
          if(!data){
            go('/facilities');
            return;
          }
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
          type: data.facility_type_name,
          image: data.image_thumbnail,
          slug: data.slug,
          description: data.description,
          ratingPercentages: data.rating_percentages,
          reviews: data.reviews,
          totalReviews: data.total_reviews,
        };
        // console.log('Processed facility details:', FacilityDetails);
        setFacility(FacilityDetails);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Facility not found');
          go('/facilities');
        } else {
          setError('An error occurred while fetching facilities details');
        }
        console.error("Error fetching doctor:", err);
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
  if (error) return <div className="w-full h-screen flex items-center justify-center text-center">{error}</div>;

  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <AnimatePage>
        <main>
          <FacilityProfileSm facility={facility} />
          <FacilityProfileMd facility={facility} />
        </main>
      </AnimatePage>

      <Footer />
    </div>
  );
};

export default FacilityProfile;
