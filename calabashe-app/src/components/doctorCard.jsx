/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import StarRating from './rating';

const DoctorCard = ({ doctor }) => {
  return (
    <Link
      to={`/doctors/${doctor.slug}`}
      className="cursor-pointer lg:hover:scale-[1.01] duration-300 mt-4 border  bg-white shadow-md h-[165px] sm:h-36 md:h-40 lg:h-48 rounded-md md:rounded-xl w-[98%] max-w-[380px] md:w-[85%] md:max-w-[800px] sm:max-w-[600px] lg:w-full lg:max-w-[650px] p-1 lg:px-4 flex gap-4 md:gap-6 min-[400px]:gap-6"
    >
      {/* Profile image */}
      <div className="relative h-[full] mt-2 lg:self-center lg:h-[90%] w-[35%] max-w-[120px] sm:max-w-[150px] max-md:max-w-[180px] lg:w-[150px] flex items-center justify-center border rounded-md">
        <svg
          className="w-16 sm:w-18 md:w-20 fill-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
        </svg>
        {doctor.verified && (
          <svg
            className="absolute size-6 -top-2 -right-2 fill-current text-[#205CD4]"
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
          >
            <path d="M12,24c-1.617,0-3.136-.708-4.176-1.92-1.587,.124-3.166-.451-4.31-1.595-1.144-1.145-1.717-2.719-1.595-4.31-1.212-1.039-1.92-2.558-1.92-4.175s.708-3.136,1.92-4.175c-.122-1.591,.451-3.166,1.595-4.31,1.144-1.143,2.723-1.712,4.31-1.595,1.04-1.212,2.559-1.92,4.176-1.92s3.136,.708,4.176,1.92c1.587-.119,3.167,.452,4.31,1.595,1.144,1.145,1.717,2.719,1.595,4.31,1.212,1.039,1.92,2.558,1.92,4.175s-.708,3.136-1.92,4.175c.122,1.591-.451,3.166-1.595,4.31-1.143,1.144-2.722,1.719-4.31,1.595-1.04,1.212-2.559,1.92-4.176,1.92Zm-3.274-4.095l.37,.549c.653,.968,1.739,1.546,2.904,1.546s2.251-.578,2.904-1.546l.37-.549,.649,.126c1.148,.223,2.323-.136,3.147-.96,.824-.825,1.183-2.001,.96-3.146l-.127-.65,.55-.37c.968-.653,1.546-1.739,1.546-2.904s-.578-2.251-1.546-2.904l-.55-.37,.127-.65c.223-1.145-.136-2.322-.96-3.146-.824-.824-2-1.182-3.147-.96l-.649,.126-.37-.549c-.653-.968-1.739-1.546-2.904-1.546s-2.251,.578-2.904,1.546l-.37,.549-.649-.126c-1.147-.22-2.323,.136-3.147,.96-.824,.825-1.183,2.001-.96,3.146l.127,.65-.55,.37c-.968,.653-1.546,1.739-1.546,2.904s.578,2.251,1.546,2.904l.55,.37-.127,.65c-.223,1.145,.136,2.322,.96,3.146,.824,.823,1.998,1.182,3.147,.96l.649-.126Zm3.184-4.485l5.793-5.707-1.404-1.425-5.809,5.701-2.793-2.707-1.393,1.437,2.782,2.696c.391,.391,.903,.585,1.416,.585s1.021-.193,1.407-.58Z" />
          </svg>
        )}
      </div>

      {/* Profile Data */}
      <section className="antialiased lg:self-center grow flex flex-col max-sm:max-w-[60%] sm:flex-row justify-between py-1">
        <div className="px-1 mb-auto overflow-hidden">
          <h2 className="text-xs md:text-base lg:text-base xl:text-lg font-black max-md:max-w-[250px] md:max-w-[280px] lg:max-w-[250px] xl:max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap">
            Dr.&nbsp; {doctor.lastName} {doctor.firstName}
          </h2>
          <p className="text-[10px]  md:text-xs font-[400] max-md:max-w-[250px] md:max-w-[280px] lg:max-w-[250px] xl:max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap">
            {doctor.specialty}
          </p>

          <div className="mt-2">
            <StarRating rating={doctor.rating} />
          </div>
          <div className="text-xs font-semibold mt-1">
            {doctor.reviews.length !== 0 ? (
              <>
                <span className="mb-[1px]">Patients Tell Us:</span>
                {doctor.reviews.slice(0, 2).map((review) => (
                  <p
                    key={review.id}
                    className=" font-medium text-[10px] sm:text-xs md:pl-2 "
                  >
                    &#8226;{" "}
                    {review.title.charAt(0).toUpperCase() +
                      review.title.slice(1).toLowerCase()}
                  </p>
                ))}
              </>
            ) : (
              <div className="mt-[1px] font-light">No reviews yet</div>
            )}
          </div>
        </div>
        <div className="mt-auto sm:hidden">
          <div className="block w-full">
            <button className="w-full h-[inherit] p-1 text-center bg-[#D3D3B1] rounded-md text-sm sm:text-base font-bold">
              View Profile
            </button>
          </div>
        </div>

        {/* View profile lg*/}
        <div className="max-lg:w-[150px] lg:w-[150px] xl:w-[200px] p-2 rounded-md hidden sm:flex flex-col justify-between gap-2 bg-[#E9E9D8]">
          <svg
            className="p-1"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.3571 2.85714C13.3571 2.09938 13.0561 1.37266 12.5203 0.836838C11.9845 0.30102 11.2578 0 10.5 0C9.74224 0 9.01551 0.30102 8.47969 0.836838C7.94388 1.37266 7.64286 2.09938 7.64286 2.85714V5.71429H4.78571C3.64907 5.71429 2.55898 6.16582 1.75526 6.96954C0.951529 7.77327 0.5 8.86336 0.5 10L0.5 35.7143C0.5 36.8509 0.951529 37.941 1.75526 38.7447C2.55898 39.5485 3.64907 40 4.78571 40H36.2143C37.3509 40 38.441 39.5485 39.2447 38.7447C40.0485 37.941 40.5 36.8509 40.5 35.7143V10C40.5 8.86336 40.0485 7.77327 39.2447 6.96954C38.441 6.16582 37.3509 5.71429 36.2143 5.71429H33.3571V2.85714C33.3571 2.09938 33.0561 1.37266 32.5203 0.836838C31.9845 0.30102 31.2578 0 30.5 0C29.7422 0 29.0155 0.30102 28.4797 0.836838C27.9439 1.37266 27.6429 2.09938 27.6429 2.85714V5.71429H13.3571V2.85714ZM17.5571 15.5086C17.5571 14.8886 18.06 14.3886 18.68 14.3886H22.3229C22.94 14.3886 23.4429 14.8886 23.4429 15.5086V19.9657H27.9C28.52 19.9657 29.02 20.4686 29.02 21.0857V24.7286C29.0204 24.8759 28.9917 25.0218 28.9356 25.1581C28.8794 25.2943 28.797 25.4181 28.693 25.5224C28.5889 25.6267 28.4653 25.7094 28.3293 25.7659C28.1932 25.8224 28.0473 25.8514 27.9 25.8514H23.4429V30.3086C23.4429 30.6056 23.3249 30.8905 23.1148 31.1005C22.9048 31.3106 22.6199 31.4286 22.3229 31.4286H18.6771C18.3801 31.4286 18.0952 31.3106 17.8852 31.1005C17.6751 30.8905 17.5571 30.6056 17.5571 30.3086V25.8514H13.1C12.9527 25.8514 12.8068 25.8224 12.6707 25.7659C12.5347 25.7094 12.4111 25.6267 12.307 25.5224C12.203 25.4181 12.1206 25.2943 12.0644 25.1581C12.0083 25.0218 11.9796 24.8759 11.98 24.7286V21.0857C11.98 20.4686 12.48 19.9657 13.1 19.9657H17.5571V15.5086Z"
              fill="black"
            />
          </svg>

          <p className="font-regular p-2 text-sm lg:text-sm xl:text-base">
            Do you want to leave a review?
          </p>
          <div className="block w-full ">
            <button className="w-full h-[inherit] p-1 text-center bg-[#D3D3B1] rounded-md text-sm sm:text-base font-bold">
              View Profile
            </button>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default DoctorCard;