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
      console.log('API Response:', data);
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
        console.log(reviews)  
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
  return ( 
    <>
      <FadeInOut>
        <div className="w-full mt-2 space-y-4 pb-2">
          <h1 className=" pl-4 text-lg font-bold">Recent Reviews</h1>

          <section className="w-full overflow-hidden flex">
            
            <div className="flex gap-2 relative carousel transform-gpu ">
              {reviews.map( (review) => (
                <div key={review.id} className=" h-[fit-content] space-y-2 rounded-lg w-[250px] bg-white border px-3 py-4 ">
                  <div className="flex gap-4 items-center">
                    <div className="w-[fit-content] p-1 pb-[1px] rounded-full border-2 border-black">
                      <FaUser className=" rounded-[50%] w-6 h-6 "/>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  
                    <p className="font-medium text-sm">{review.user.slice(0,8)} reviewed <span className="font-bold ">{`${review.type === "doctor" ? 'Dr. ' + review.subject.split(' ')[0] : review.subject}`}</span></p>

                    <p className="text-xs">&quot;{review.description}&quot;</p>
                </div>
              )
              )}
              
            </div>
          </section>
        </div>
      </FadeInOut>
    </>
   );
}
 
export default RecentReviews;