import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./ratingStars";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import Stars from "./Star";
import { toast } from "sonner";
import HandleAdjective from "../utils/handleRatingAdjective";
import Calender from "./calender";

// eslint-disable-next-line react/prop-types
const DocProfileMd = ({ doctor = [] }) => {
  const [rating, setRating] = useState();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()
  const [sliceNum, setSliceNum] = useState(18);

  const handleLinkClick = (newRating) => {
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
    // console.log(rating)
  };

  const showMore = () => {
    setSliceNum(sliceNum + 8)
  }
  return (
    <>
      <main className="w-full hidden md:block py-12 2xl:border-x">
        <section className="px-8 lg:px-[100px] pt-12 pb-6 flex lg:gap-3 xl:gap-8  items-center bg-white border-b">
          <div className="relative size-36 lg:size-44 rounded-full mr-2 xl:mr-0 bg-gray-300/40 flex items-center justify-center">
            {doctor.image ? (
              <img
                className="object-cover w-full h-full rounded-[inherit]"
                src={doctor.image}
                alt={`image of doctor ${doctor.lastName}`}
              />
            ) : (
              <svg
                className="size-16 lg:size-24 fill-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <div>
              <h2 className="text-lg lg:text-xl xl:text-2xl font-bold">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-sm lg:text-base font-light text-gray-600 ">
                {doctor.specialtyTag}
              </p>
            </div>
            <div className="flex font-semibold text-[#6A6A67] items-center gap-3 lg:gap-4">
              <p className="font-medium">
                {" "}
                {doctor.totalReviews === 0 ? "No" : doctor.totalReviews}{" "}
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
          <section className="w-[57%] flex flex-col gap-4">
            <div className="mb-4 bg-white w-full p-2 lg:p-4 pl-4 flex items-center justify-between rounded-lg border">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-300/40 rounded-full"></div>

                <Link
                  to={`/review/${doctor.slug}`}
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
              <Link
                  to={`/review/${doctor.slug}`}
                  onClick={() => handleLinkClick(rating)}
                  state={{
                    message: [doctor.lastName, "doctor", doctor.id],
                    from: `/review/${doctor.slug}`,
                  }}
                  className="text-xs lg:text-sm font-[600] text-[#205CD4]"
                >
                <Stars rating={rating} onRatingChange={handleRatingChange} />
              </Link>
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
            {doctor.conditionsAndTreatments.length > 0 && (
              <section className="w-full space-y-3 px-1.5 border-t border-b py-5 my-4">
                <div className="flex items-center gap-1">
                  <svg
                    className="size-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.06641 12H3.60938L12 20.3906L18.8906 13.5H21.0117L12 22.5117L1.86328 12.3867C1.58984 12.1133 1.34766 11.8203 1.13672 11.5078C0.925781 11.1953 0.742188 10.8594 0.585938 10.5H3.43359L6.75 7.19531L12 12.4336L15.75 8.69531L17.5664 10.5H21.7266C21.9766 10.1016 22.168 9.67969 22.3008 9.23438C22.4336 8.78906 22.5 8.33203 22.5 7.86328C22.5 7.18359 22.375 6.55078 22.125 5.96484C21.875 5.37891 21.5273 4.87109 21.082 4.44141C20.6367 4.01172 20.1211 3.67188 19.5352 3.42188C18.9492 3.17188 18.3125 3.04688 17.625 3.04688C16.9688 3.04688 16.3867 3.14844 15.8789 3.35156C15.3711 3.55469 14.9023 3.82813 14.4727 4.17188C14.043 4.51563 13.6328 4.89453 13.2422 5.30859C12.8516 5.72266 12.4375 6.15625 12 6.60938C11.5781 6.1875 11.168 5.76172 10.7695 5.33203C10.3711 4.90234 9.95703 4.51563 9.52734 4.17188C9.09766 3.82813 8.625 3.54688 8.10938 3.32813C7.59375 3.10938 7.01562 3 6.375 3C5.70312 3 5.07422 3.125 4.48828 3.375C3.90234 3.625 3.38672 3.97266 2.94141 4.41797C2.49609 4.86328 2.14844 5.37891 1.89844 5.96484C1.64844 6.55078 1.51953 7.18359 1.51172 7.86328C1.51172 8.23047 1.55469 8.60938 1.64062 9H0.105469C0.0664062 8.8125 0.0429688 8.625 0.0351562 8.4375C0.0273438 8.25 0.0195312 8.0625 0.0117188 7.875C0.0117188 6.99219 0.175781 6.16406 0.503906 5.39063C0.832031 4.61719 1.28516 3.94141 1.86328 3.36328C2.44141 2.78516 3.11719 2.33203 3.89062 2.00391C4.66406 1.67578 5.49219 1.50781 6.375 1.5C7.02344 1.5 7.60156 1.57422 8.10938 1.72266C8.61719 1.87109 9.08594 2.07422 9.51562 2.33203C9.94531 2.58984 10.3594 2.90625 10.7578 3.28125C11.1562 3.65625 11.5703 4.05859 12 4.48828C12.4297 4.05078 12.8398 3.64844 13.2305 3.28125C13.6211 2.91406 14.0352 2.60156 14.4727 2.34375C14.9102 2.08594 15.3828 1.87891 15.8906 1.72266C16.3984 1.56641 16.9766 1.49219 17.625 1.5C18.5 1.5 19.3242 1.66406 20.0977 1.99219C20.8711 2.32031 21.543 2.77344 22.1133 3.35156C22.6836 3.92969 23.1367 4.60156 23.4727 5.36719C23.8086 6.13281 23.9766 6.95703 23.9766 7.83984C23.9766 8.59766 23.8438 9.33203 23.5781 10.043C23.3125 10.7539 22.9336 11.4062 22.4414 12H16.9336L15.75 10.8047L12 14.5664L6.75 9.30469L4.06641 12Z"
                      fill="black"
                    />
                  </svg>
                  <p className="font-medium">ALL CONDITIONS AND TREATMENTS</p>
                </div>
                <div className="w-full grid grid-cols-2 text-sm gap-y-2 gap-x-1 items-center justify-between">
                  {doctor.conditionsAndTreatments
                    .slice(0, sliceNum)
                    .map((cAndT) => (
                      <p className="line-clamp-1" key={cAndT.id}>
                        {cAndT.name}
                      </p>
                    ))}
                </div>
                <button
                  onClick={() => showMore()}
                  className={`${
                    doctor.conditionsAndTreatments.length < sliceNum
                      ? "hidden"
                      : ""
                  } text-sm underline`}
                >
                  Show more
                </button>
              </section>
            )}

            <section className="w-full ">
              <div className="w-full flex flex-col gap-4  lg:gap-6 h-[400px] overflow-y-auto scrollbar-thin">
                {doctor.reviews.slice(0, 10).map((review) => (
                  <div
                    key={review.id}
                    className="w-full border bg-white px-4 py-6 flex flex-col gap-4 rounded-lg "
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
                      {doctor.region}
                    </p>
                  </li>
                </ul>
              </section>
            </div>
            <Calender/>
          </section>
        </section>
      </main>
    </>
  );
};

export default DocProfileMd;
