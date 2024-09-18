import { useState, useEffect } from "react";
import { fetchCurrentReviews } from "../api/getCategoriesData";
import formatDate from "../utils/dateConversion";
import StarRating from "./rating";
import { FaUser } from "react-icons/fa";
import '../stylesheets/reviews.css'
import { FadeInOut } from "./ComponentAnimations";

const RecentReviews = () => {
  const [reviews, setReviews] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchReview = async () => {
    try {
      const data = await fetchCurrentReviews();
      // console.log('API Response:', data);
      if (Array.isArray(data) && data.length > 0) {
        const reviewDetails = data.map((review) => ({
          id: review.id, 
          rating: review.rating,
          description: review.description,  
          subject: review.subject,
          type: review.review_type,
          date: formatDate(review.created_at.split('T')[0]) ,
          user: review.user
        }));
        setReviews(reviewDetails);
        // console.log(reviews)
      } else {
        setReviews([]); 
      }
    } catch (err) {
      console.error('Error fetching doctor:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchReview();
  const intervalId = setInterval(fetchReview, 120000);

  return () => clearInterval(intervalId);
}, []);

if (isLoading) return (
  <div className="h-[120px] w-full flex items-center justify-center">
  <h1 className="text-black text-xl sm:text-2xl font-bold animate-bounce">
    Calabas<span className="text-[#04DA8D]">he</span>
  </h1>
</div>
)
if (error) return <div>{error}</div>;
const displayCount = reviews ? (window.innerWidth >= 1280 ? 10 : 8) : 0;
  return ( 
    <>
      <FadeInOut>
        <div className="w-full mt-2  lg:mt-6 lg:mr-2 space-y-4 lg:space-y-6  pb-2 lg:pb-6">
          <h1 className="text-center  md:text-2xl text-xl font-bold">Recent Reviews</h1>

          <section className="overflow-hidden flex lg:hidden">
            
            
            <div className="carousel flex">
              {reviews && [...reviews, ...reviews].map((review, index) => (
                <div key={`${review.id}-${index}`} className="card cursor-pointer h-[fit-content] mx-2 lg:mx-6 select-none  rounded-lg w-[250px] md:w-[280px] bg-white border px-3 md:px-5 py-4 ">
                  <div className="flex gap-4 items-center">
                    <div className="w-[fit-content] p-1 pb-[1px] rounded-full border-2 border-black">
                      <FaUser className=" rounded-[50%] w-6 h-6 md:w-8 md:h-8 "/>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  
                    <p className="font-medium text-sm md:text-lg">{review.user} reviewed <span className="font-bold ">{`${review.type === "doctor" ? 'Dr. ' + review.subject.split(' ')[0] : review.subject}`}</span></p>

                    <p className="text-xs md:text-base">&quot;{review.description}&quot;</p>
                </div>
              )
              )}
              
            </div>
          </section>

          <section className="w-full hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-4 content-evenly mr-4">
      {reviews && reviews.slice(0, displayCount).map((review, index) => (
        <div key={`${review.id}-${index}`} className="cursor-pointer h-[260px] overflow-hidden mx-2 lg:mx-3 select-none rounded-lg bg-white border px-3 md:px-4 py-4">
          <div className="flex gap-4 items-center">
            <div className="w-[fit-content] p-1 pb-[1px] rounded-full border-2 border-black">
              <FaUser className="rounded-[50%] w-6 h-6 md:w-8 md:h-8" />
            </div>
            <StarRating rating={review.rating} />
          </div>
          
          <p className="font-medium text-sm md:text-base mt-2">{review.user} reviewed <span className="font-bold">{`${review.type === "doctor" ? 'Dr. ' + review.subject.split(' ')[0] : review.subject}`}</span></p>

          <p className="text-xs md:text-sm mt-2">&quot;{review.description.slice(0, 80)}&quot;</p>
        </div>
      ))}
    </section>
        </div>
      </FadeInOut>
    </>
   );
}
 
export default RecentReviews;