import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "../components/rating";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import Stars from "./Star";
import { toast } from "sonner";
import HandleAdjective from "../utils/handleRatingAdjective";

// eslint-disable-next-line react/prop-types
const DocProfileMd = ({ doctor = [] }) => {
  const [rating, setRating] = useState();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()

  const handleLinkClick = (newRating) => {
    if (!isLoggedIn) {
      toast.info("Sign in to leave a review");
      return
    }
    setRating(newRating);
    navigate(`/review/${doctor.slug}`, {
      state: {
        message: [doctor.lastName, "doctor", doctor.id],
        from: `/review/${doctor.slug}`,
        ratings: newRating
      }
    });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(rating)
  };
  return (
    <>
      <main className="w-full hidden md:block py-12">
        <section className="px-8 lg:px-[100px] pt-12 pb-6 flex lg:gap-3 xl:gap-8  items-center bg-white border-b">
          <div className="relative size-36 lg:size-44 rounded-full mr-2 xl:mr-0 bg-gray-300/40 flex items-center justify-center">
            <svg
              className="size-16 lg:size-24 fill-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
            <svg className={` ${doctor.verified ? 'flex' : 'hidden'} absolute size-8 top-2 right-1 lg:right-3 lg:top-3  fill-current text-[#205CD4]`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                <path d="M12,24c-1.617,0-3.136-.708-4.176-1.92-1.587,.124-3.166-.451-4.31-1.595-1.144-1.145-1.717-2.719-1.595-4.31-1.212-1.039-1.92-2.558-1.92-4.175s.708-3.136,1.92-4.175c-.122-1.591,.451-3.166,1.595-4.31,1.144-1.143,2.723-1.712,4.31-1.595,1.04-1.212,2.559-1.92,4.176-1.92s3.136,.708,4.176,1.92c1.587-.119,3.167,.452,4.31,1.595,1.144,1.145,1.717,2.719,1.595,4.31,1.212,1.039,1.92,2.558,1.92,4.175s-.708,3.136-1.92,4.175c.122,1.591-.451,3.166-1.595,4.31-1.143,1.144-2.722,1.719-4.31,1.595-1.04,1.212-2.559,1.92-4.176,1.92Zm-3.274-4.095l.37,.549c.653,.968,1.739,1.546,2.904,1.546s2.251-.578,2.904-1.546l.37-.549,.649,.126c1.148,.223,2.323-.136,3.147-.96,.824-.825,1.183-2.001,.96-3.146l-.127-.65,.55-.37c.968-.653,1.546-1.739,1.546-2.904s-.578-2.251-1.546-2.904l-.55-.37,.127-.65c.223-1.145-.136-2.322-.96-3.146-.824-.824-2-1.182-3.147-.96l-.649,.126-.37-.549c-.653-.968-1.739-1.546-2.904-1.546s-2.251,.578-2.904,1.546l-.37,.549-.649-.126c-1.147-.22-2.323,.136-3.147,.96-.824,.825-1.183,2.001-.96,3.146l.127,.65-.55,.37c-.968,.653-1.546,1.739-1.546,2.904s.578,2.251,1.546,2.904l.55,.37-.127,.65c-.223,1.145,.136,2.322,.96,3.146,.824,.823,1.998,1.182,3.147,.96l.649-.126Zm3.184-4.485l5.793-5.707-1.404-1.425-5.809,5.701-2.793-2.707-1.393,1.437,2.782,2.696c.391,.391,.903,.585,1.416,.585s1.021-.193,1.407-.58Z"/>
            </svg>
          </div>

          <div className="space-y-1">
            <div>
              <h2 className="text-lg lg:text-xl xl:text-2xl font-bold">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-sm lg:text-base font-light text-gray-600 ">{doctor.specialty}</p>
            </div>
            <div className="flex font-semibold text-[#6A6A67] items-center gap-3 lg:gap-4">
              <p className="font-medium">
                {" "}
                {doctor.totalReviews === 0 ? 'No' : doctor.totalReviews }{" "}
                {doctor.totalReviews === 1 ? "review" : "reviews"}
              </p>
              <div className="w-2 h-2 rounded-full bg-[#6A6A67]"></div>
              <p className="">{HandleAdjective(doctor.rating)}</p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={doctor.rating} />
              <p className="text-[#6A6A67]">{doctor.rating.toFixed(1)}</p>
            </div>
          </div>

          <Link
            to="/initial_form"
            state={{ message: [doctor.firstName, doctor.lastName] }}
            className={`${
              !doctor.verified ? "flex" : "hidden"
            } border ml-5 lg:ml-12 -translate-y-8 w-fit gap-2 lg:gap-6 items-center md:text-xs px-5 py-2 font-semibold rounded-md border-[#205CD4]`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2L4.2 2C3.08 2 2.52 2 2.092 2.218C1.71569 2.40974 1.40974 2.71569 1.218 3.092C1 3.52 1 4.08 1 5.2L1 12.8C1 13.92 1 14.48 1.218 14.908C1.40974 15.2843 1.71569 15.5903 2.092 15.782C2.519 16 3.079 16 4.197 16H11.803C12.921 16 13.48 16 13.907 15.782C14.284 15.59 14.59 15.284 14.782 14.908C15 14.48 15 13.921 15 12.803L15 11M16 6L16 1M16 1L11 1M16 1L9 8"
                    stroke="#1F44FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="pt-1">
                  Are you Dr. {doctor.firstName.split(" ")[0]}?
                </p>
              </div>
              <p className="font-light">Verify your account</p>
            </div>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8L10.5 0.5L9.4425 1.5575L15.1275 7.25L0 7.25V8.75L15.1275 8.75L9.4425 14.4425L10.5 15.5L18 8Z"
                fill="#1F44FF"
              />
            </svg>
          </Link>
        </section>

        <section className="w-full px-16 lg:px-[100px] pt-12 lg:pt-24 flex gap-2 lg:gap-4">
          <section className="w-[54%] flex flex-col gap-4">
            <div className="mb-4 bg-white w-full p-2 lg:p-4 pl-4 flex items-center justify-between rounded-lg border">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-300/40 rounded-full"></div>

                <Link
                  to={isLoggedIn ? `/review/${doctor.slug}` : "/sign_in"}
                  onClick={() => handleLinkClick(rating)}
                  state={{
                    message: [doctor.lastName, "doctor", doctor.id],
                    from: `/review/${doctor.slug}`,
                  }}
                  className="text-xs lg:text-sm font-[600] text-[#205CD4]"
                >
                  Write a review
                </Link>
              </div>
              <div
                onClick={() => handleLinkClick(rating)}
              >
                <Stars rating={rating} onRatingChange={handleRatingChange} />
              </div>
            </div>

            <section className="w-full py-4 lg:py-6 pb-6 lg:pb-8 px-4 rounded-lg border bg-white space-y-4 lg:space-y-6">
              <h3 className="text-base lg:text-lg font-bold"> Ratings</h3>
              <div className="space-y-6">
                <p className="text-4xl md:text-5xl font-black">
                  {doctor.rating.toFixed(1)}
                </p>
                <StarRating profile={true} rating={doctor.rating} />
                <p className="text-lg md:font-medium text-black">
                  {doctor.totalReviews}{" "}
                  {doctor.totalReviews < 2 ? "review" : "reviews"}
                </p>
                <ul className="pr-6 space-y-3">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <li
                      key={star}
                      className="text-base md:text-lg lg:text-xl font-light grid grid-cols-[2.5rem_1fr_3rem] items-center gap-4"
                    >
                      <label
                        htmlFor={`${star}star`}
                        className="whitespace-nowrap"
                      >
                        {star} star
                      </label>
                      <div className="w-full pl-[5%] flex items-center justify-center ">
                        <progress
                          id={`${star}star`}
                          value={doctor.ratingPercentages[index].percentage}
                          max="100"
                          className=" max-w-[430px] h-3 md:h-4"
                        ></progress>
                      </div>
                      <p className="text-[#A0AAB3] text-right font-normal">
                        {doctor.ratingPercentages[index].percentage}%
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="w-full ">
              <div className="w-full flex flex-col gap-4  lg:gap-6 ">
                {doctor.reviews.slice(0, 4).map((review) => (
                  <div
                    key={review.id}
                    className="w-full border shadow-md bg-white px-4 py-6 flex flex-col gap-4 rounded-lg "
                  >
                    <div className="flex justify-between items-center ">
                      <StarRating rating={review.rating} />
                      <p className="text-xs text-[#333333] opacity-50">
                        {formatDate(review.created_at.split("T")[0])}
                      </p>
                    </div>

                    <p className="text-base ">{review.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          {/* Right Side */}

          <section className="w-[46%] space-y-3 lg:space-y-4">
            <div className="border space-y-3 bg-white pt-8 lg:py-12 pb-4 px-4 lg:px-8 rounded-xl">
              <section className="pb-8 lg:pb-14  border-b-2 space-y-3 lg:space-y-5">
                <h3 className="text-lg lg:text-xl font-[800] ">
                  About Dr. {doctor.firstName}{" "}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed">
                  Dr. {doctor.firstName + " " + doctor.lastName} is a licensed
                  medical doctor practicing General Medicine.
                  <br />
                  In Ghana, General Practitioners (GPs) provide primary
                  healthcare, handling a wide range of conditions and referring
                  patients to specialists when needed. GPs complete six years of
                  medical school and a two-year housemanship, gaining practical
                  experience before receiving full licensing from the Medical
                  and Dental Council of Ghana.
                </p>
              </section>

              <section className="w-full space-y-4 pt-8 lg:pt-12">
                <h3 className="text-xl lg:2xl font-bold">Contact Details</h3>
                <ul className="space-y-2">
                  <li></li>
                  <li className="flex gap-3">
                    <svg
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
                    <p className="text-sm lg:text-base self-center font-normal">
                      {doctor.region}, Ghana
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
                to={isLoggedIn ? `/review/${doctor.slug}` : "/sign_in"}
                onClick={handleLinkClick}
                state={{
                  message: [doctor.lastName, "doctor", doctor.id],
                  from: `/review/${doctor.slug}`,
                }}
                className="w-full  hover:scale-[1.01] duration-100"
              >
                <button
                  className="w-full mt-4 flex items-center justify-center gap-2 text-lg font-bold bg-[#FEE330] px-2 py-3 rounded-md"
                  aria-label={`Leave a review for Dr. ${doctor.slug}`}
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

export default DocProfileMd;
