import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentReviews } from "../api/getCategoriesData";
import formatDate from "../utils/dateConversion";
import StarRating from "./ratingStars";
import { FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../stylesheets/reviews.css';
import { FadeInOut } from "./ComponentAnimations";

const MAX_REVIEWS = 30;

const ReviewCard = ({ review }) => (
  <div className="hover:scale-105 duration-200 cursor-pointer max-h-[200px] h-fit w-[260px] overflow-hidden select-none rounded-lg bg-white border px-3 md:px-4 py-4">
    <Link to={review.type === 'doctor' ? '/doctors/' + review.slug : '/facilities/' + review.facilityType + 's/' + review.slug} className="w-full" >
      <div className="flex gap-4 items-center">
        <div className="p-1 pb-[1px] rounded-full border-2 border-black">
          <FaUser className="rounded-[50%] w-6 h-6 md:w-8 md:h-8" />
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="font-medium text-sm md:text-base mt-2">
        {review.user} <span className="text-slate-500 text-xs md:text-sm font-normal">reviewed </span>
        <span className="font-bold">
          {review.type === "doctor" ? `Dr. ${review.subject.split(' ')[0]}` : review.subject}
        </span>
      </p>

      <p className="text-xs md:text-sm line-clamp-3 mt-2">&quot;{review.description}&quot;</p>
    </Link>
  </div>
);

const NavigationButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:border-none border border-green-700 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    aria-label={`Scroll ${direction}`}
  >
    {direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
);

const RecentReviews = () => {
  const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const [reviews, setReviews] = useState(storedReviews);
  const [isLoading, setIsLoading] = useState(storedReviews.length === 0);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollAmount = 1;
  const maxIndex = Math.max(0, Math.ceil(reviews.length / 2) - 3);

  const handleScroll = useCallback((direction) => {
    setCurrentIndex(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - scrollAmount);
      } else {
        return Math.min(maxIndex, prev + scrollAmount);
      }
    });
  }, [maxIndex]);

  const updateLocalStorage = (newReviews) => {
    const limitedReviews = newReviews.slice(0, MAX_REVIEWS);
    localStorage.setItem("reviews", JSON.stringify(limitedReviews));
  };

  const fetchReviewsFromAPI = async () => {
    try {
      const data = await fetchCurrentReviews();
      const reviewDetails = (Array.isArray(data) && data.length > 0)
        ? data.map((review) => ({
          id: review.id,
          rating: review.rating,
          description: review.description,
          subject: review.subject,
          type: review.review_type,
          date: formatDate(review.created_at.split('T')[0]),
          user: review.user,
          slug: review.subject_slug,
          facilityType: review?.facility_type_slug
        }))
        : [];
      return reviewDetails;
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
      return [];
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      const apiReviews = await fetchReviewsFromAPI();
      if (apiReviews.length !== reviews.length || JSON.stringify(apiReviews) !== JSON.stringify(reviews)) {
        setReviews(apiReviews);
        updateLocalStorage(apiReviews);
      }
      setIsLoading(false);
    };

    if (storedReviews.length === 0) {
      loadReviews();
    } else {
      setIsLoading(false);
    }

    const fetchInterval = setInterval(loadReviews, 120000);
    return () => clearInterval(fetchInterval);
  }, []);

  if (isLoading) return (
    <div className="h-[120px] w-full flex items-center justify-center">
      <h1 className="text-black text-xl sm:text-2xl font-bold animate-bounce">
        Calabas<span className="text-[#04DA8D]">he</span>
      </h1>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <FadeInOut>
      <div className="w-full mt-2 lg:mt-6 lg:mx-4 lg:mr-2 space-y-3 lg:space-y-8 pb-4 lg:pb-8">
        <div className="w-full lg:px-4 xl:px-12 lg:flex items-center justify-between">
          <h1 className="text-center md:text-2xl text-xl font-bold">Recent Reviews</h1>
          <div className="flex gap-2">
            <NavigationButton
              direction="left"
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}
            />
            <NavigationButton
              direction="right"
              onClick={() => handleScroll('right')}
              disabled={currentIndex >= maxIndex}
            />
          </div>

        </div>

        <div className="relative w-full px-2 lg:px-4 xl:px-12">
          {/* <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10">
            <NavigationButton 
              direction="left" 
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}
            />
           
          </div> */}

          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-thin snap-x snap-mandatory lg:overflow-x-hidden pt-2 lg:px-4">
            <div 
              className="grid grid-rows-2 pb-4 auto-cols-[260px] grid-flow-col gap-2 lg:transition-transform lg:duration-300"
              style={{
                transform: `translateX(-${currentIndex * 268}px)`,
              }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="snap-start">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10">
            <NavigationButton 
              direction="right" 
              onClick={() => handleScroll('right')}
              disabled={currentIndex >= maxIndex}
            />
          </div> */}
        </div>
      </div>
    </FadeInOut>
  );
};

export default RecentReviews;