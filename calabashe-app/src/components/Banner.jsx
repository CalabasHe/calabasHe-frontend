// import doctorsAppointment from "../assets/images/dentist-appointment.jpg";
// import microscope from "../assets/images/microscope.jpg";
// import specialist from "../assets/images/doctor-2.jpg";
// import patron from "../assets/images/excited-patron.jpg";
// import doctorInScrubs from "../assets/images/doctor-in-scrubs.jpg";
import Picture from "../assets/images/picture bubbles.png";
import SearchContainer from "./searchContainer";
import PictureWEBP from "../assets/images/picture bubbles.webp";
import BannerSearch from "./bannerSearchMd";
const Banner = () => {
  return (
    <>
      <section className="bg-[#04DA8D] w-full pt-8 md:py-14 md:pt-16 space-y-6 md:space-y-0 md:flex flex-row lg:pl-[3%] lg:py-24 ">
        <div className=" flex flex-col md:w-[60%] px-4 md:px-5 space-y-3 lg:justify-between  lg:pb-4">
          <div className="text-lg sm:text-xl font-bold md:text-xl lg:text-4xl lg:space-y-3">
            <p className="">Find reviews on Ghanaian doctors.</p>
            {/* <p className="hidden lg:flex leading-relaxed">
              Find reviews on Ghanaian: 
              <br/>doctors, clinics and
              <br/>health services
            </p> */}
            <p>Leave your review.</p>
            <p className="font-semibold text-sm sm:text-lg lg:text-xl italic">
              Search for reputable physicians and clinics.
            </p>
          </div>
          {/* <p className="text-xs lg:text-sm hidden md:flex">
            Empowering Healthcare: <br />
            Trusted Reviews for Doctors and Hospitals in Ghana
          </p> */}
          <SearchContainer />
          <div className="relative">
            <BannerSearch/>
          </div>
        </div>

        <div className="relative flex  gap-10 justify-end w-full md:w-[50%] min-md:max-w-[450px] lg:w-[50%] h-full">
          <picture>
            <source
              className=""
              srcSet={PictureWEBP}
              type="image/webp"
              alt=""
            ></source>
            <img className="" src={Picture} alt=""></img>
          </picture>
        </div>
      </section>
    </>
  );
};

export default Banner;
