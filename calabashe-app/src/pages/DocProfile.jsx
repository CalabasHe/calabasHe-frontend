import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
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
  const go = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await fetchDoctorBySlug(slug);
        if(!data){
          go('/doctors');
          return;
        }
        const doctorDetails = {
          qrCode: data.qr_code,
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          rating: data.average_rating,
          specialty: data.specialty_name,
          specialtyTag: data.specialty?.tag,
          image: data.profile_image,
          slug: data.slug,
          patientsTellUs: data.reviews?.title,
          region: data.region_name,
          ratingPercentages: data.rating_percentages,
          reviews: data.reviews,
          totalReviews: data.total_reviews,
          verified: data.is_verified,
          conditionsAndTreatments: data.conditions_and_treatments,
          about: data.about
        };
        // console.log('Processed doctor details:', doctorDetails);
        setDoctor(doctorDetails);
      }  catch (err) {
        if (err.response?.status === 404) {
          setError('Doctor not found');
          go('/doctors');
        } else {
          setError('An error occurred while fetching doctor details');
        }
        console.error("Error fetching doctor:", err);
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
  if (error) return <div className="w-full h-screen flex items-center justify-center text-center">{error}</div>;

  return (
    <div className="">
      <div className="min-h-screen 2xl:container 2xl:border-x mx-auto">
        <Header />
        <AnimatePage>
          <DocProfileSm doctor={doctor} />
          <DocProfileMd doctor={doctor} />
        </AnimatePage>
        <Footer />
      </div>
    </div>
  );
};

export default DocProfile;
