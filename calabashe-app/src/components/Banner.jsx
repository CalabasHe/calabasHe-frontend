// import doctorsAppointment from "../assets/images/dentist-appointment.jpg";
// import microscope from "../assets/images/microscope.jpg";
// import specialist from "../assets/images/doctor-2.jpg";
// import patron from "../assets/images/excited-patron.jpg";
// import doctorInScrubs from "../assets/images/doctor-in-scrubs.jpg";
import Picture from "../assets/images/picture bubbles.png";
import SearchButton from "./searchButton";
import PictureWEBP from "../assets/images/picture bubbles.webp";
const Banner = () => {
  return (
    <>
      <section className="bg-[#04DA8D] w-full pt-8 md:py-14 md:pt-16 space-y-6 md:space-y-0 md:flex flex-row lg:pl-[3%] lg:py-24 ">
        <div className=" md:w-[55%] px-4 md:px-5 space-y-3 lg:space-y-[20px]">
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
          <SearchButton />
        </div>

        <div className="relative flex  gap-10 justify-end flex-grow ">
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
