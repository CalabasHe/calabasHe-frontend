import { Link } from "react-router-dom";
import StarRating from "./rating";

const DoctorCard = () => {
  return ( 
    <>
      <div className="cursor-pointer bg-white lg:hover:scale-[1.05] duration-300 mt-4 border shadow-md h-28 sm:h-36 md:h-40 lg:h-44 rounded-md w-[95%] max-w-[350px] md:w-[70%] md:max-w-[600px] p-1 flex gap-3 min-[400px]:gap-4">
        <div className="h-full w-[35%] flex items-center justify-center border  rounded-md">
          <svg className="w-16 sm:w-18 md:w-20 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
          </svg>
        </div>
        <div className=" grow flex flex-col justify-between gap-1 sm:gap-2 md:gap-3 sm:pt-2">
          <div className="px-1">
            <h2 className="text-sm sm:text-base md:text-lg font-bold ">Dr. Wayo Jessica</h2>
            <p className="text-xs sm:text-sm md:text-base font-thin">Surgeon</p>
          </div>
          <div className="pl-1">
            <StarRating rating={4.5}/>
          </div>
          <Link to='' className="flex grow text-sm sm:text-base font-bold w-full rounded-md ">
            <button className="w-full text-center bg-[#D3D3B1] rounded-[inherit]">View Profile</button>
          </Link>
        </div>
      </div>
    </>
   );
}
 
export default DoctorCard ;