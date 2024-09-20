import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./rating";
import { MdLocationOn } from "react-icons/md";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
const FacilityProfileSm = ({ facility = [] }) => {
  const { isLoggedIn } = useAuth();
  const handleLinkClick = () => {
    if (!isLoggedIn) {
      toast.info('Sign in to leave a review')
    }
  }
  return (
    <>
      <main className="md:hidden w-full mt-12 sm:mt-[80px] px-4  pb-8 flex flex-col gap-6 items-center ">
        <section className="bg-white shadow-md p-4 px-6 border space-y-2 rounded-2xl w-full max-sm:max-w-[500px]  ">
          <div className="w-full h-[130px] flex items-center justify-center border rounded-lg">
            <svg
              className="w-16 sm:w-18  fill-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </div>
          <div className="w-full grid grid-cols-5">
            <div className="pt-4 space-y-2 col-span-3">
              <div>
                <h2 className="text-sm font-semibold">{facility.name}</h2>
                <p className="text-xs font-light ">{facility.type}</p>
              </div>
              <StarRating rating={facility.rating} />

              {/* Patients tell us */}
              <ul className="text-xs font-bold">
                Patients tell us:
                {facility.reviews.slice(0, 3).map((titles) => (
                  <li
                    key={titles.id}
                    className="font-light md:font-normal text-xs "
                  >
                    &#8226; {titles.title}
                  </li>
                ))}
                {/* <li>{patientsTellUs[0]}</li> */}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="bg-[#D3D3B1] rounded-md space-y-3 col-span-2 p-2">
              <svg
                className=""
                width="35"
                height="34"
                viewBox="0 0 57 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.625 1H7.33333C4.11167 1 1.5 3.61167 1.5 6.83333V49.125C1.5 52.3467 4.11167 54.9583 7.33333 54.9583H49.625C52.8467 54.9583 55.4583 52.3467 55.4583 49.125V6.83333C55.4583 3.61167 52.8467 1 49.625 1Z"
                  stroke="black"
                  strokeWidth="1.45833"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M41.2393 21.4167C39.5955 21.4167 38.019 20.7637 36.8567 19.6014C35.6943 18.439 35.0413 16.8626 35.0413 15.2188C35.0413 13.575 34.3883 11.9985 33.226 10.8362C32.0637 9.67387 30.4872 9.02087 28.8434 9.02087H28.1143C26.4705 9.02087 24.894 9.67387 23.7317 10.8362C22.5693 11.9985 21.9163 13.575 21.9163 15.2188C21.9163 16.8626 21.2633 18.439 20.101 19.6014C18.9387 20.7637 17.3622 21.4167 15.7184 21.4167C14.0746 21.4167 12.4982 22.0697 11.3358 23.232C10.1735 24.3944 9.52051 25.9708 9.52051 27.6146V28.3438C9.52051 29.9876 10.1735 31.564 11.3358 32.7264C12.4982 33.8887 14.0746 34.5417 15.7184 34.5417C17.3622 34.5417 18.9387 35.1947 20.101 36.357C21.2633 37.5194 21.9163 39.0958 21.9163 40.7396C21.9163 42.3834 22.5693 43.9599 23.7317 45.1222C24.894 46.2845 26.4705 46.9375 28.1143 46.9375H28.8434C30.4872 46.9375 32.0637 46.2845 33.226 45.1222C34.3883 43.9599 35.0413 42.3834 35.0413 40.7396C35.0413 39.0958 35.6943 37.5194 36.8567 36.357C38.019 35.1947 39.5955 34.5417 41.2393 34.5417C42.883 34.5417 44.4595 33.8887 45.6218 32.7264C46.7842 31.564 47.4372 29.9876 47.4372 28.3438V27.6146C47.4372 25.9708 46.7842 24.3944 45.6218 23.232C44.4595 22.0697 42.883 21.4167 41.2393 21.4167Z"
                  stroke="black"
                  strokeWidth="1.45833"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.1437 32.3614C40.9816 31.1991 40.3287 29.6228 40.3287 27.9791C40.3287 26.3355 40.9816 24.7592 42.1437 23.5968C43.3059 22.4345 43.9587 20.8582 43.9587 19.2145C43.9587 17.5709 43.3059 15.9946 42.1437 14.8323L41.6275 14.316C40.4652 13.1539 38.8888 12.501 37.2452 12.501C35.6015 12.501 34.0252 13.1539 32.8629 14.316C32.2873 14.8917 31.604 15.3483 30.852 15.6599C30.0999 15.9714 29.2939 16.1318 28.4799 16.1318C27.6658 16.1318 26.8598 15.9714 26.1077 15.6599C25.3557 15.3483 24.6724 14.8917 24.0968 14.316C22.9345 13.1539 21.3582 12.501 19.7145 12.501C18.0709 12.501 16.4946 13.1539 15.3323 14.316L14.816 14.8308C13.6539 15.9931 13.001 17.5694 13.001 19.2131C13.001 20.8567 13.6539 22.4331 14.816 23.5954C15.3917 24.1709 15.8483 24.8542 16.1599 25.6063C16.4714 26.3583 16.6318 27.1644 16.6318 27.9784C16.6318 28.7924 16.4714 29.5985 16.1599 30.3505C15.8483 31.1026 15.3917 31.7859 14.816 32.3614C13.6539 33.5237 13.001 35.1001 13.001 36.7437C13.001 38.3874 13.6539 39.9637 14.816 41.126L15.3308 41.6423C16.4931 42.8044 18.0694 43.4573 19.7131 43.4573C21.3567 43.4573 22.9331 42.8044 24.0954 41.6423C24.6709 41.0666 25.3542 40.61 26.1063 40.2984C26.8583 39.9868 27.6644 39.8265 28.4784 39.8265C29.2924 39.8265 30.0985 39.9868 30.8505 40.2984C31.6026 40.61 32.2859 41.0666 32.8614 41.6423C34.0237 42.8044 35.6001 43.4573 37.2437 43.4573C38.8874 43.4573 40.4637 42.8044 41.626 41.6423L42.1423 41.1275C43.3044 39.9652 43.9573 38.3888 43.9573 36.7452C43.9573 35.1015 43.3044 33.5252 42.1423 32.3629"
                  stroke="black"
                  strokeWidth="1.45833"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm lg:text-lg ">54 years of superb service</p>
              <ul className="hidden sm:flex flex-col text-xs font-bold">
                Services offered:
                {facility.services.slice(0, 3).map((services) => (
                  <li
                    key={services.id}
                    className="font-light md:font-normal text-xs "
                  >
                    &#8226; {services.name}
                  </li>
                ))}
                {/* <li>{patientsTellUs[0]}</li> */}
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-white mb-4 w-full p-2  pl-4 flex items-center justify-between border rounded-lg">
              <div className=" flex grow items-center gap-3 mr-1 ">
                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-300/40 rounded-full"></div>

                <Link
                  to={isLoggedIn ? `/review/${facility.slug}` : "/sign_in"}
                  onClick={handleLinkClick}
                  state={{
                    message: [facility.lastName, "facility", facility.id],
                    from: `/review/${facility.slug}`,
                  }}
                  className="text-xs lg:text-sm font-[600] text-[#205CD4]"
                >
                  <p className="">Write a review</p>
                </Link>
              </div>
              <Link
                to={isLoggedIn ? `/review/${facility.slug}` : "/sign_in"}
                onClick={handleLinkClick}
                state={{
                  message: [facility.lastName, "facility", facility.id],
                  from: `/review/${facility.slug}`,
                }}
              >
                <StarRating rating={0} />
              </Link>
            </div>

        {/* About Section */}
        <section className="w-full space-y-1 ">
          <h3 className="text-lg font-bold ">About {facility.name}</h3>
          <p className="text-sm sm:text-base">{facility.description}</p>
        </section>
        <section className="w-full space-y-4 ">
          <h3 className="mb-3 text-lg font-bold ">Contact Details</h3>
          <address className="flex  flex-col gap-4">
            <div className="flex gap-4">
              <aside className="relative inline-block">
                <FaPhoneAlt size={24} className="text-[#B6D9DA]" />
                <span className="absolute text-[14px] text-[#B6D9DA] -top-[5px] -right-[5px] font-bold">
                  +
                </span>
              </aside>
              <a
                href={`tel: ${facility.contact}`}
                className="text-base self-center font-medium"
              >
                {facility.contact}
              </a>
            </div>
            <div className="flex gap-3">
              <MdLocationOn size={28} className="text-[#B6D9DA] " />
              <p className="text-base self-center font-medium">
                {facility.location}, Ghana
              </p>
            </div>
          </address>
        </section>

        {/* Ratings */}
        <section className="w-full space-y-4 max-w-[700px]">
          <h3 className="text-lg font-bold"> Ratings</h3>
          <div className="bg-white py-12 px-4 md:px-8 rounded-lg border space-y-6">
            <div className="space-y-2">
              <p className="text-4xl font-black">
                {facility.rating}
                <span className="text-lg font-light md:font-normal text-[#A0AAB3]">
                  ({facility.totalReviews})
                </span>
              </p>
              <StarRating profile={true} rating={parseFloat(facility.rating)} />
            </div>
            <ul className="pr-6 space-y-3">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <li
                  key={star}
                  className="text-base font-medium grid grid-cols-[2.5rem_1fr_3rem] items-center gap-2"
                >
                  <label htmlFor={`${star}star`} className="whitespace-nowrap">
                    {star} star
                  </label>
                  <div className="w-full pl-1 flex items-center justify-center ">
                    <progress
                      id={`${star}star`}
                      value={facility.ratingPercentages[index].percentage}
                      max="100"
                      className=" max-w-[430px] h-4"
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
        <section className="w-full space-y-4  select-none">
          <h3 className="text-lg font-bold ">Reviews</h3>
          {!facility.reviews.length > 0 ? (
            <p className="text-base text-[#A0AAB3]  border-b border-[#D0D0D0] pb-4">
              No reviews yet
            </p>
          ) : (
            <p className="text-sm border-b border-[#D0D0D0] pb-4">
              All reviews have been left by actual patients.
            </p>
          )}
          <div className="flex flex-col gap-4 md:gap-8">
            {facility.reviews.slice(0, 4).map((review) => (
              <div key={review.id} className="w-full space-y-2 ">
                <StarRating rating={review.rating} />
                <div>
                  <p className="text-sm ">{review.description}</p>
                  <p className="text-xs text-[#333333] opacity-50">
                    {formatDate(review.created_at.split("T")[0])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full space-y-2 ">
          <h3 className="text-lg font-bold ">Share your experience</h3>
          <p className="text-xs sm:text-sm font-medium max-w-[85%]">
            We value your feedback and look forward to hearing about your
            experiences with our services. Your insights help us improve and
            provide the best care possible.
          </p>
        </section>

        {/* Leave a Review */}
        <Link
          to={isLoggedIn ? `/review/${facility.slug}` : "/sign_in"}
          onClick={handleLinkClick}
          state={{
            message: [facility.name, "facility", facility.id],
            from: `/review/${facility.slug}`,
          }}
          className="w-full"
        >
          <button
            className="w-full flex items-center justify-center gap-4 md:gap-8 p-2 bg-[#FEE330] rounded-xl"
            aria-label={`Leave a review for ${facility.name}`}
          >
            <p className="text-center text-lg font-bold">Leave a Review</p>
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
      </main>
    </>
  );
};

export default FacilityProfileSm;
