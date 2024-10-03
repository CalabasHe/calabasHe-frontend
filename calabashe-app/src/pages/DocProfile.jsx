import Header from "../components/Header";
import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDoctorBySlug } from "../api/getProfileData";
import Footer from "../components/Footer";
import "../stylesheets/profile.css";
import AnimatePage from "../components/AnimatePage";
import DocProfileSm from "../components/docProfileSm";
import DocProfileMd from "../components/docProfilemd";

const DocProfile = () => {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await fetchDoctorBySlug(slug);
        // console.log('API Response:', data);
        const doctorDetails = {
          qrCode: data.qr_code,
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          rating: data.average_rating,
          specialty: data.specialty?.name,
          slug: data.slug,
          patientsTellUs: data.reviews?.title,
          location: data.region?.name,
          ratingPercentages: data.rating_percentages,
          reviews: data.reviews,
          totalReviews: data.total_reviews,
          verified: data.is_verified
        };
        // console.log('Processed doctor details:', doctorDetails);
        setDoctor(doctorDetails);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
    const intervalId = setInterval(fetchDoctor, 120000);

    return () => clearInterval(intervalId);
  }, [slug]);

  if (isLoading)
    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <AnimatePage>
        <DocProfileSm doctor={doctor} />
        <DocProfileMd doctor={doctor} />
      </AnimatePage>

      <Footer />
    </>
  );
};

export default DocProfile;
