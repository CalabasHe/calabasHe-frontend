import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./rating";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import { toast } from "sonner";
import HandleAdjective from "../utils/handleRatingAdjective";

// eslint-disable-next-line react/prop-types
const FacilityProfileSm = ({ facility = [] }) => {
  const { isLoggedIn } = useAuth();
  const handleLinkClick = () => {
    if (!isLoggedIn) {
      toast.info("Sign in to leave a review");
    }
  };
  return (
    <>
      <main className="md:hidden w-full mt-8 sm:mt-[80px] pb-8 flex flex-col gap-6 items-center ">
        <div className="w-full flex flex-col gap-8">
        <section className="w-full px-2 pt-12 pb-6 flex gap-6  items-center bg-white border-b">
          <div className="size-24 rounded-full bg-gray-300/40 flex items-center justify-center">
            <svg
              className="size-12 fill-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-bold">
              {facility.name}
            </h2>
            <div className="flex items-center font-medium text-[#6A6A67] text-xs gap-3 lg:gap-4">
              <p className={`font-normal`}>
                {" "}
                {facility.totalReviews.length > 0 ? facility.totalReviews : 'No' } {facility.totalReviews.length > 1 ? 'reviews' : 'review'}
              </p>
              <div className="w-2 h-2 rounded-full bg-[#6A6A67]"></div>
              <p className="">{HandleAdjective(facility.rating)}</p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={facility.rating} />
              <p className="text-[#6A6A67]">{facility.rating.toFixed(1)}</p>
             </div>
            </div>
          </section>
          <div className="w-full px-4">
          </div>

        </div>

        <section className="px-4 space-y-8">
          {/* Write a review */}
          <div className="w-full bg-[#205CD4] text-center py-3 rounded-3xl">
            <Link
            to={isLoggedIn ? `/review/${facility.slug}` : "/sign_in"}
            onClick={handleLinkClick} 
            state={{
                    message: [facility.name, "facility", facility.id],
                    from: `/review/${facility.slug}`,
                  }}
              className="text-white">
                Write a review
            </Link>
          </div>

          {/* Ratings */}
          <section className="w-full space-y-4 max-w-[700px]">
            <div className="bg-white border py-6 px-4 rounded-lg space-y-6">
            <h3 className="text-lg font-bold"> Ratings</h3>
              <div className="space-y-2">
              <div className="">
  <p className="text-4xl font-black">
    {facility.rating}
  </p>
  <p className="text-sm font-light text-[#A0AAB3]">
    {facility.totalReviews === 1 ? facility.totalReviews + ' review' : facility.totalReviews + ' reviews'}
  </p>
</div>
                <StarRating profile={true} rating={parseFloat(facility.rating)} />
              </div>
              <ul className="pr-6 space-y-3">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <li
                    key={star}
                    className="text-base md:text-lg lg:text-xl font-medium grid grid-cols-[2.5rem_1fr_3rem] items-center gap-2"
                  >
                    <label htmlFor={`${star}star`} className="whitespace-nowrap">
                      {star} star
                    </label>
                    <div className="w-full pl-[6%] flex items-center justify-center ">
                      <progress
                        id={`${star}star`}
                        value={facility.ratingPercentages[index].percentage}
                        max="100"
                        className=" max-w-[430px]  h-3 md:h-4"
                      ></progress>
                    </div>
                    <p className="text-[#A0AAB3] text-right">
                      {facility.ratingPercentages[index].percentage}%
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Reviews */}
          <section className="w-full space-y-4 md:w-[80%] md:max-w-[700px] select-none">
            <h3 className="text-lg md:text-xl font-bold ">Reviews</h3>
            {!facility.reviews.length > 0 ? (
              <p className="text-base text-[#A0AAB3]  border-b border-[#D0D0D0] pb-4">
                No reviews yet
              </p>
            ) : (
              <p className="text-sm md:text-base border-b border-[#D0D0D0] pb-4">
                All reviews have been left by actual patients.
              </p>
            )}
            <div className="flex flex-col gap-4 md:gap-8">
              {facility.reviews.slice(0, 4).map((review) => (
                <div
                key={review.id}
                className="w-full border shadow-sm bg-white px-4 py-6 flex flex-col gap-4 rounded-lg "
              >
                <div className="flex justify-between items-center ">
                  <StarRating rating={review.rating} />
                  <p className="text-xs text-[#333333] opacity-50">
                    {formatDate(review.created_at.split("T")[0])}
                  </p>
                </div>

                <p className="text-sm ">{review.description}</p>
              </div>
              ))}
            </div>
          </section>
          
          {/* About Section */}
          <section className="w-full space-y-3">
              <div className="border space-y-3 bg-white pt-4 pb-4 px-4 rounded-xl">
                <section className="pb-8 border-b-2 space-y-4">
                  <h3 className="text-base font-[800] ">
                    About {facility.name}
                  </h3>
                  <p className="text-xs max-w-[90%] leading-loose ">
                   {facility.description ? facility.description : 
                   <span>
                    {facility.name} is a {facility.type.toLowerCase()} located at {facility.location} in the {facility.region}.
                    
                    At {facility.name}, personalised care is provided, tailored to each patient&apos;s unique circumstances to ensure the highest quality of service and support.
                    
                    
                    {facility.name} offers welcoming and modern environment designed to make patients feel comfortable and relaxed.
                    
                    The staff is dedicated to fostering a culture of kindness and openness, maintaining the highest standards of care through continual training and auditing.
                    {facility.name} looks forward to welcoming patients, where their health and happiness are the top priorities.
                    </span>
                   }
                  </p>
                </section>

                <section className="w-full space-y-4 pt-8 lg:pt-12">
                  <h3 className="text-base font-bold">Contact Details</h3>
                  <ul className="space-y-2">
                    <li></li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="size-4"
                        width="21"
                        height="25"
                        viewBox="0 0 21 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.0482 3.63002C14.1432 -0.211228 7.81198 -0.211228 3.90698 3.63002C2.97984 4.53582 2.24312 5.61781 1.74013 6.81241C1.23714 8.00701 0.978027 9.2901 0.978027 10.5863C0.978027 11.8824 1.23714 13.1655 1.74013 14.3601C2.24312 15.5547 2.97984 16.6367 3.90698 17.5425L10.977 24.4988L18.0482 17.5425C18.9754 16.6367 19.7121 15.5547 20.2151 14.3601C20.7181 13.1655 20.9772 11.8824 20.9772 10.5863C20.9772 9.2901 20.7181 8.00701 20.2151 6.81241C19.7121 5.61781 18.9754 4.53582 18.0482 3.63002ZM10.977 13.8738C10.142 13.8738 9.35823 13.5488 8.76698 12.9588C8.18167 12.3722 7.85295 11.5774 7.85295 10.7488C7.85295 9.92013 8.18167 9.12533 8.76698 8.53877C9.35698 7.94877 10.142 7.62377 10.977 7.62377C11.812 7.62377 12.597 7.94877 13.187 8.53877C13.7723 9.12533 14.101 9.92013 14.101 10.7488C14.101 11.5774 13.7723 12.3722 13.187 12.9588C12.597 13.5488 11.812 13.8738 10.977 13.8738Z"
                          fill="#205CD4"
                        />
                      </svg>
                      <p className="text-xs self-center font-normal">
                        {facility.region}, Ghana
                      </p>
                    </li>
                  </ul>
                </section>
              </div>

              <div className="bg-white  flex flex-col gap-4 lg:gap-6 pt-8 lg:pt-12  pb-4 lg:pb-6 px-4 lg:px-8 border rounded-xl">
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-xl lg:2xl font-bold">
                    Share your experience
                  </h3>
                  <p className="text-sm lg:text-base">
                    We value your feedback and look forward to hearing about your
                    experiences with our services. Your insights help us improve
                    and provide the best care possible.
                  </p>
                </div>

                <Link
                  to={isLoggedIn ? `/review/${facility.slug}` : "/sign_in"}
                  onClick={handleLinkClick}
                  state={{
                    message: [facility.lastName, "facility", facility.id],
                    from: `/review/${facility.slug}`,
                  }}
                  className="w-full  hover:scale-[1.01] duration-100"
                >
                  <button
                    className="w-full mt-4 flex items-center justify-center gap-2 text-lg font-bold bg-[#FEE330] px-2 py-3 rounded-md"
                    aria-label={`Leave a review for Dr. ${facility.slug}`}
                  >
                    <p className="text-center text-lg lg:text-xl font-bold">
                      Leave a Review
                    </p>
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 0.968994H3C1.35 0.968994 0 2.31899 0 3.96899V30.969L6 24.969H27C28.65 24.969 30 23.619 30 21.969V3.96899C30 2.31899 28.65 0.968994 27 0.968994ZM6 18.969V15.264L16.32 4.94399C16.62 4.64399 17.085 4.64399 17.385 4.94399L20.04 7.59899C20.34 7.89899 20.34 8.36399 20.04 8.66399L9.705 18.969H6ZM22.5 18.969H12.75L15.75 15.969H22.5C23.325 15.969 24 16.644 24 17.469C24 18.294 23.325 18.969 22.5 18.969Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </section>
        </section>    
      </main>
    </>
  );
};

export default FacilityProfileSm;
