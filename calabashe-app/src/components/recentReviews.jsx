import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentReviews } from "../api/getCategoriesData";
import formatDate from "../utils/dateConversion";
import StarRating from "./rating";
import { FaUser } from "react-icons/fa";
import '../stylesheets/reviews.css';
import { FadeInOut } from "./ComponentAnimations";

const ReviewCard = ({ review }) => (
  <div className="cursor-pointer h-fit min-w-[260px] overflow-hidden select-none rounded-lg bg-white border px-3 md:px-4 py-4">
    <div className="flex gap-4 items-center">
      <div className="p-1 pb-[1px] rounded-full border-2 border-black">
        <FaUser className="rounded-[50%] w-6 h-6 md:w-8 md:h-8" />
      </div>
      <StarRating rating={review.rating} />
    </div>
    
    <p className="font-medium text-sm md:text-base mt-2">
      {review.user} reviewed <Link  to={review.type === 'doctor' ? '/doctors/'+ review.slug : '/facilities/'+review.facilityType+'s/'+review.slug} className="font-bold">
        {review.type === "doctor" ? `Dr. ${review.subject.split(' ')[0]}` : review.subject}
      </Link>
    </p>

    <p className="text-xs md:text-sm mt-2">&quot;{review.description}&quot;</p>
  </div>
);



const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const reviewIntervalRef = useRef(null);


  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await fetchCurrentReviews();
        // console.log(data)
        if (Array.isArray(data) && data.length > 0) {
          const reviewDetails = data.map((review) => ({
            id: review.id, 
            rating: review.rating,
            description: review.description,  
            subject: review.subject,
            type: review.review_type,
            date: formatDate(review.created_at.split('T')[0]),
            user: review.user,
            slug: review.subject_slug,
            facilityType: review?.facility_type_slug

          }));
          setReviews(reviewDetails);
        } else {
          setReviews([]); 
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
    const intervalId = setInterval(fetchReview, 120000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if (reviews.length > 0) {
      reviewIntervalRef.current = setInterval(() => {
        setOffset((prevOffset) => {
          const newOffset = prevOffset + 1;
          // Reset to 0 if we reach the end, but we want to keep the animation going
          return newOffset >= reviews.length ? 0 : newOffset;
        });
      }, 7000);

      return () => clearInterval(reviewIntervalRef.current);
    }
  }, [reviews.length]);

  if (isLoading) return (
    <div className="h-[120px] w-full flex items-center justify-center">
      <h1 className="text-black text-xl sm:text-2xl font-bold animate-bounce">
        Calabas<span className="text-[#04DA8D]">he</span>
      </h1>
    </div>
  );

  if (error) return <div>{error}</div>;

  // Duplicate reviews for continuous scrolling
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <FadeInOut>
      <div className="w-full mt-2 lg:mt-6 lg:mr-2 space-y-4 lg:space-y-8 pb-2 lg:pb-6">
        <h1 className="text-center md:text-2xl text-xl font-bold">Recent Reviews</h1>

        <div className="w-full overflow-hidden pt-4">
          <div 
            className="grid grid-rows-2 auto-cols-[260px] grid-flow-col gap-4 transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(-${offset * 120}px)`, 
              width: `${duplicatedReviews.length * 268}px`,
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </FadeInOut>
  );
}

export default RecentReviews;
