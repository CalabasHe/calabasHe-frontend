import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
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
      <FadeInOut>
        <div className="md:hidden">
          <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%]  bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <div className="z-0 absolute top-[120px] sm:top-[165px] h-3  w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
          <aside className=" mt-[65px] sm:mt-[76px] select-none ">
            <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
              <Link to="/doctors">
                Review Your <br /> Healthcare Providers
              </Link>
            </h1>
          </aside>
        </div>
      </FadeInOut>

      <AnimatePage>
        <DocProfileSm doctor={doctor} />
        <DocProfileMd doctor={doctor} />
      </AnimatePage>

      <Footer />
    </>
  );
};

export default DocProfile;
