import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./ratingStars";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import { toast } from "sonner";
import HandleAdjective from "../utils/handleRatingAdjective";
import { useState } from "react";
import Calender from "./calender";

// eslint-disable-next-line react/prop-types
const DocProfileSm = ({ doctor = [] }) => {
  const go = useNavigate();
  const [sliceNum, setSliceNum] = useState(10);

  // const handleLinkClick = () => {
  //   if (!isLoggedIn) {
  //     toast.info("Sign in to leave a review");
  //   }
  // };

  const [popUpDetails] = useState({
    id: doctor.id,
    image: doctor.image,
    name: `Dr. ${doctor.lastName}`,
    rating: doctor.rating,
    totalReviews: doctor.totalReviews,
    email: doctor.email,
  });


  const writeAReview = (lastName, slug, id) => {
    const state = {
      message: [lastName, "doctor", id],
      from: `/review/${slug}`,
    };
    go(`/review/${slug}`, { state });
  };

  const showMore = () => {
    setSliceNum(sliceNum + 6)
  }
  const { isLoggedIn } = useAuth();
  return (
    <>
      <main className="md:hidden w-full mt-8 sm:mt-[80px] pb-8 flex flex-col gap-8 items-center ">
        <div className="w-full flex flex-col gap-8">
          <section className="w-full px-2 pt-12 pb-6 flex gap-6  items-center bg-white border-b">
            <div className="relative size-24 rounded-full bg-gray-300/40 flex items-center justify-center">
              {
                doctor.image ?
                  <img className='object-cover text-xs text-center w-full h-full rounded-[inherit]' src={doctor.image} alt={`image of doctor ${doctor.lastName}`} />
                  :
                  <svg
                    className="size-12 fill-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                  </svg>
              }
              <svg
                className={` ${doctor.verified ? "flex" : "hidden"
                  } absolute size-6 top-2 right-0 fill-current text-[#205CD4]`}
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="M12,24c-1.617,0-3.136-.708-4.176-1.92-1.587,.124-3.166-.451-4.31-1.595-1.144-1.145-1.717-2.719-1.595-4.31-1.212-1.039-1.92-2.558-1.92-4.175s.708-3.136,1.92-4.175c-.122-1.591,.451-3.166,1.595-4.31,1.144-1.143,2.723-1.712,4.31-1.595,1.04-1.212,2.559-1.92,4.176-1.92s3.136,.708,4.176,1.92c1.587-.119,3.167,.452,4.31,1.595,1.144,1.145,1.717,2.719,1.595,4.31,1.212,1.039,1.92,2.558,1.92,4.175s-.708,3.136-1.92,4.175c.122,1.591-.451,3.166-1.595,4.31-1.143,1.144-2.722,1.719-4.31,1.595-1.04,1.212-2.559,1.92-4.176,1.92Zm-3.274-4.095l.37,.549c.653,.968,1.739,1.546,2.904,1.546s2.251-.578,2.904-1.546l.37-.549,.649,.126c1.148,.223,2.323-.136,3.147-.96,.824-.825,1.183-2.001,.96-3.146l-.127-.65,.55-.37c.968-.653,1.546-1.739,1.546-2.904s-.578-2.251-1.546-2.904l-.55-.37,.127-.65c.223-1.145-.136-2.322-.96-3.146-.824-.824-2-1.182-3.147-.96l-.649,.126-.37-.549c-.653-.968-1.739-1.546-2.904-1.546s-2.251,.578-2.904,1.546l-.37,.549-.649-.126c-1.147-.22-2.323,.136-3.147,.96-.824,.825-1.183,2.001-.96,3.146l.127,.65-.55,.37c-.968,.653-1.546,1.739-1.546,2.904s.578,2.251,1.546,2.904l.55,.37-.127,.65c-.223,1.145,.136,2.322,.96,3.146,.824,.823,1.998,1.182,3.147,.96l.649-.126Zm3.184-4.485l5.793-5.707-1.404-1.425-5.809,5.701-2.793-2.707-1.393,1.437,2.782,2.696c.391,.391,.903,.585,1.416,.585s1.021-.193,1.407-.58Z" />
              </svg>
            </div>

            <div className="space-y-1">
              <div>
                <h2 className="text-sm font-bold">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h2>
                <p className="text-xs font-light text-gray-600 ">
                  {doctor.specialtyTag}
                </p>
              </div>
              <div className="flex items-center font-medium text-xs text-[#6A6A67] gap-3 lg:gap-4">
                <p className="font-normal">
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
          </section>
          <div className="w-full px-4">
            <Link
              to="/initial_form"
              state={{ message: [doctor.firstName, doctor.lastName] }}
              className={`${!doctor.verified ? "flex" : "hidden"
                }  w-full px-[7%] py-3 flex items-center justify-between border-[#205CD4] border rounded-md`}
            >
              <div className="text-sm space-y-1">
                <div className="flex font-semibold items-center gap-2">
                  <svg
                    className="size-3"
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
                  <p className="">
                    Are you Dr. {doctor.firstName.split(" ")[0]}?
                  </p>
                </div>
                <p className="font-light text-xs">Verify your account</p>
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
          </div>
        </div>

        <section className="px-4 flex flex-col gap-8">
          {/* Write a review */}
          <button
            onClick={() =>
              writeAReview(doctor.lastName, doctor.slug, doctor.id)
            }
            className="w-full bg-[#205CD4] text-white text-center py-3 rounded-3xl"
          >
            Write a review
          </button>
          {/* Ratings */}
          <section className="w-full order-2 space-y-4 max-w-[700px]">
            <div className="bg-white border py-6 px-4 rounded-lg space-y-6">
              <h3 className="text-lg font-bold"> Ratings</h3>
              <div className="space-y-2">
                <div className="">
                  <p className="text-4xl font-black">{doctor.rating}</p>
                  <p className="text-sm font-light text-[#A0AAB3]">
                    {doctor.totalReviews === 1
                      ? doctor.totalReviews + " review"
                      : doctor.totalReviews + " reviews"}
                  </p>
                </div>
                <StarRating profile={true} rating={parseFloat(doctor.rating)} />
              </div>
              <ul className="pr-6 space-y-3">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <li
                    key={star}
                    className="text-base md:text-lg lg:text-xl font-medium grid grid-cols-[2.5rem_1fr_3rem] items-center gap-2"
                  >
                    <label
                      htmlFor={`${star}star`}
                      className="whitespace-nowrap"
                    >
                      {star} star
                    </label>
                    <div className="w-full pl-[6%] flex items-center justify-center ">
                      <progress
                        id={`${star}star`}
                        value={doctor.ratingPercentages[index].percentage}
                        max="100"
                        className=" max-w-[430px] h-3 md:h-4"
                      ></progress>
                    </div>
                    <p className="text-[#A0AAB3] text-right">
                      {doctor.ratingPercentages[index].percentage}%
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Reviews */}
          <section className="w-full order-3 space-y-4 md:w-[80%] md:max-w-[700px] select-none">
            <h3 className="text-lg md:text-xl font-bold ">Reviews</h3>
            {!doctor.reviews.length > 0 ? (
              <p className="text-base text-[#A0AAB3]  border-b border-[#D0D0D0] pb-4">
                No reviews yet
              </p>
            ) : (
              <>
                <p className="text-sm md:text-base border-b border-[#D0D0D0] pb-4">
                  All reviews have been left by actual patients.
                </p>
                <div className="flex flex-col gap-4 md:gap-8 h-[300px] overflow-auto scrollbar-thin">
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

                      <p className="text-sm ">{review.description}</p>
                    </div>
                  ))}
                </div>
              </>

            )}

          </section>

          {/* About Section */}
          <section className="w-full space-y-3">
            <div className="border space-y-3 bg-white pt-4 pb-4 px-4 rounded-xl">
              <section className="pb-8 border-b-2 space-y-4">
                <h3 className="text-base font-[800] ">
                  About Dr. {doctor.firstName.split(" ")[0]}{" "}
                </h3>
                {(doctor.about.length > 0)? 
                (
                  <div className="text-xs max-w-[90%] leading-loose">
                  <p className={`${moreDescription ? "h-72 overflow-hidden transition-all" : "h-max"}`}>
                    {doctor.about}
                  </p>
                  <button onClick={handleMoreDescription} className="text-blue-600">{moreDescription ? 'show more' : 'show less'}</button>
                </div>
                ):
                (
                  <p className="text-xs max-w-[90%] leading-loose ">
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
                )}
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
                      {doctor.region}
                    </p>
                  </li>
                </ul>
              </section>

            </div>
            {
              doctor.conditionsAndTreatments.length > 0 && (
                <section className="w-full space-y-3 border-t border-b px-2 py-5 my-4">
                  <div className="flex items-center gap-1">
                    <svg className="size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.06641 12H3.60938L12 20.3906L18.8906 13.5H21.0117L12 22.5117L1.86328 12.3867C1.58984 12.1133 1.34766 11.8203 1.13672 11.5078C0.925781 11.1953 0.742188 10.8594 0.585938 10.5H3.43359L6.75 7.19531L12 12.4336L15.75 8.69531L17.5664 10.5H21.7266C21.9766 10.1016 22.168 9.67969 22.3008 9.23438C22.4336 8.78906 22.5 8.33203 22.5 7.86328C22.5 7.18359 22.375 6.55078 22.125 5.96484C21.875 5.37891 21.5273 4.87109 21.082 4.44141C20.6367 4.01172 20.1211 3.67188 19.5352 3.42188C18.9492 3.17188 18.3125 3.04688 17.625 3.04688C16.9688 3.04688 16.3867 3.14844 15.8789 3.35156C15.3711 3.55469 14.9023 3.82813 14.4727 4.17188C14.043 4.51563 13.6328 4.89453 13.2422 5.30859C12.8516 5.72266 12.4375 6.15625 12 6.60938C11.5781 6.1875 11.168 5.76172 10.7695 5.33203C10.3711 4.90234 9.95703 4.51563 9.52734 4.17188C9.09766 3.82813 8.625 3.54688 8.10938 3.32813C7.59375 3.10938 7.01562 3 6.375 3C5.70312 3 5.07422 3.125 4.48828 3.375C3.90234 3.625 3.38672 3.97266 2.94141 4.41797C2.49609 4.86328 2.14844 5.37891 1.89844 5.96484C1.64844 6.55078 1.51953 7.18359 1.51172 7.86328C1.51172 8.23047 1.55469 8.60938 1.64062 9H0.105469C0.0664062 8.8125 0.0429688 8.625 0.0351562 8.4375C0.0273438 8.25 0.0195312 8.0625 0.0117188 7.875C0.0117188 6.99219 0.175781 6.16406 0.503906 5.39063C0.832031 4.61719 1.28516 3.94141 1.86328 3.36328C2.44141 2.78516 3.11719 2.33203 3.89062 2.00391C4.66406 1.67578 5.49219 1.50781 6.375 1.5C7.02344 1.5 7.60156 1.57422 8.10938 1.72266C8.61719 1.87109 9.08594 2.07422 9.51562 2.33203C9.94531 2.58984 10.3594 2.90625 10.7578 3.28125C11.1562 3.65625 11.5703 4.05859 12 4.48828C12.4297 4.05078 12.8398 3.64844 13.2305 3.28125C13.6211 2.91406 14.0352 2.60156 14.4727 2.34375C14.9102 2.08594 15.3828 1.87891 15.8906 1.72266C16.3984 1.56641 16.9766 1.49219 17.625 1.5C18.5 1.5 19.3242 1.66406 20.0977 1.99219C20.8711 2.32031 21.543 2.77344 22.1133 3.35156C22.6836 3.92969 23.1367 4.60156 23.4727 5.36719C23.8086 6.13281 23.9766 6.95703 23.9766 7.83984C23.9766 8.59766 23.8438 9.33203 23.5781 10.043C23.3125 10.7539 22.9336 11.4062 22.4414 12H16.9336L15.75 10.8047L12 14.5664L6.75 9.30469L4.06641 12Z" fill="black" />
                    </svg>
                    <p className="text-sm font-semibold">ALL CONDITIONS AND TREATMENTS</p>
                  </div>
                  <div className="w-full flex flex-col text-xs gap-2">
                    {doctor.conditionsAndTreatments.slice(0, sliceNum).map((cAndT) => (
                      <p className="line-clamp-1" key={cAndT.id}>
                        {cAndT.name}
                      </p>
                    ))}

                  </div>
                  <button onClick={() => showMore()} className={`${doctor.conditionsAndTreatments.length < sliceNum ? 'hidden' : ''} text-xs underline`}>Show more</button>
                </section>
              )
            }
          </section>
          <div className="order-3">
           <Calender popUpDetails={popUpDetails}/>
          </div>
        </section>
      </main>
    </>
  );
};

export default DocProfileSm;
