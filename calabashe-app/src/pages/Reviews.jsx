import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createDoctorReview, createFacilityReview } from "../api/review";
import { FadeInOut } from "../components/ComponentAnimations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Stars from "../components/Star";
import { getUserId } from "../utils/getUserId";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import ReviewPopUp from "../components/ReviewPopUp";
import { guestReviews } from "../api/anonReviews";

const Review = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [reviewee, setReviewee] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const location = useLocation();
  const go = useNavigate();
  const isLoggedIn = useAuth();

  const prevLocationState = useRef(null);
  const { ratings } = location.state || {};
  if (ratings) {
    setRating(ratings);
  }

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUser(userId);
    };

    if (prevLocationState.current?.message !== location.state?.message) {
      const [revieweeName, revieweeType, revieweeId] =
        location.state?.message || [];
      setReviewee({ name: revieweeName, type: revieweeType, id: revieweeId });
      // setRating(reviewee.rating)
      // console.log(ratings)
      prevLocationState.current = location.state;
    }
    fetchUserId();
  }, [location.state]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    try {
      setIsSubmitting(true);
      if (reviewee.type === "doctor") {
        await createDoctorReview({
          user,
          rating,
          title,
          description,
          doctor: reviewee.id,
        });
      } else {
        await createFacilityReview({
          user,
          rating,
          title,
          description,
          facility: reviewee.id,
        });
      }

      toast.success("Review successful");
      go("/");
    } catch (error) {
      setIsSubmitting(false);
      let errorMessage = "Failed to submit review. Please try again.";

      if (error.non_field_errors && Array.isArray(error.non_field_errors)) {
        const maxReviewsError = error.non_field_errors.find((err) =>
          err.toLowerCase().includes("maximum number of reviews")
        );

        if (maxReviewsError) {
          errorMessage = "You've reached your daily limit for reviews.";
        }
      }
      toast.info(errorMessage);
      go("/");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 5) {
      toast.error("Title must be at least 5 characters long");
      return;
    } else if (description.length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    if (rating === 0) {
      toast.error("Kindly rate the doctor");
      return;
    }
    // else if (!user) {
    //   toast.error("Sign in to leave a review");
    //   go("/sign_in");
    //   return;
    // }

    if (isLoggedIn.isLoggedIn) {
      submitReview();
    }
    else {
      setShowPopUp(true);
    }
  };

  const submitGuestReview = async (username, email) => {
    if (reviewee.type === "doctor") {
      await guestReviews({ email, username, rating, title, description, doctor: reviewee.id });
    }
    else if (reviewee.type === "facility") {
      await guestReviews({ email, username, rating, title, description, facility: reviewee.id });
    }
  };

  const hidePopUp = () => {
    setShowPopUp(false);
  }

  return (
    <div className="relative 2xl:container mx-auto 2xl:border-x">
      <Header />
      <FadeInOut>
        <div className="z-0 absolute top-[60px] sm:top-[73px] w-[29%]  bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
        <div className="z-0 absolute top-[120px] sm:top-[165px] h-3  w-[33%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
        <aside className=" mt-[65px] sm:mt-[76px] ">
          <h1 className="z-10 relative max-[460px]:mx-[14%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
            We&apos;d Love to Hear
            <br /> From You
          </h1>
        </aside>
      </FadeInOut>
      <ReviewPopUp showPopUp={showPopUp} hidePopUp={hidePopUp} submitGuestReview={submitGuestReview} />
      <main className="w-full mt-12 sm:mt-[80px] lg:mt-[105px] px-2  pb-8 flex flex-col gap-12 items-center ">
        <section className="p-4 px-2 md:px-12 lg:px-16 md:py-8 lg:py-12 md:border space-y-2 bg-white shadow-md border rounded-2xl w-full max-sm:max-w-[500px] md:w-[80%] md:max-w-[700px] ">
          <div className="w-full flex flex-col gap-2">
            <div className=" self-center w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] flex justify-center items-center p-4 border-2 rounded-full">
              <svg
                className="w-12 sm:w-18 md:w-20 fill-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            </div>
            <h2 className="md:text-left text-center text-lg font-semibold border-b-[1px] border-gray-400 pb-3 md:pb-6 lg:pb-8">
              Your review of{" "}
              {reviewee.type === "doctor"
                ? "Dr. " + reviewee.name
                : reviewee.name}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-2 md:mt-3 lg:mt-4 flex flex-col gap-4 md:gap-6 lg:gap-8"
            >
              <p className="font-[400] text-base md:font-[600]">
                <span className="md:hidden">
                  How likely are you to <br /> recommend provider?
                </span>
                <span className="hidden md:flex">
                  {" "}
                  How likely are you to recommend provider?
                </span>
              </p>
              <div className="space-y-2">
                <p className="text-gray-500 ">Select Rating</p>
                <Stars
                  rating={reviewee.rating ? reviewee.rating : rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <div className="mt-2 space-y-3">
                <label
                  className="text-base md:text-[20px] font-medium"
                  htmlFor="title"
                >
                  Give your review a title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[90%] border-none bg-[#ECECCF] text-base p-2 rounded-lg"
                  type="text"
                  min={5}
                  id="title"
                  required
                ></input>
              </div>

              <div className="mt-2 space-y-3">
                <label
                  className="text-base md:text-[20px] font-medium"
                  htmlFor="review"
                >
                  Tell us more about your visit
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-[80px] border-none bg-[#ECECCF] text-base p-2 rounded-lg"
                  type="text"
                  min={10}
                  id="review"
                  required
                ></textarea>
              </div>

              <button
                id="submitButton"
                className="w-full mt-4 flex items-center justify-center gap-2 md:px-6 md:w-[250px] text-lg font-bold bg-[#FEE330] py-3 rounded-md"
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault;
                }}
              >
                <p className="text-center">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </p>
                {!isSubmitting && (
                  <div className="hidden md:flex">
                    <svg
                      className="h-6 w-6"
                      width="38"
                      height="41"
                      viewBox="0 0 38 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.2249 18.35L8.5999 6.17498C6.6999 5.14998 4.4999 6.92499 5.0999 8.99998L8.1999 19.85C8.3249 20.3 8.3249 20.75 8.1999 21.2L5.0999 32.05C4.4999 34.125 6.6999 35.9 8.5999 34.875L31.2249 22.7C31.6109 22.4891 31.933 22.1782 32.1574 21.7999C32.3818 21.4216 32.5002 20.9898 32.5002 20.55C32.5002 20.1101 32.3818 19.6784 32.1574 19.3001C31.933 18.9218 31.6109 18.6109 31.2249 18.4V18.35Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
export default Review;
