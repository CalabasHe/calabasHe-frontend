// import doctorsAppointment from "../assets/images/dentist-appointment.jpg";
// import microscope from "../assets/images/microscope.jpg";
// import specialist from "../assets/images/doctor-2.jpg";
// import patron from "../assets/images/excited-patron.jpg";
// import doctorInScrubs from "../assets/images/doctor-in-scrubs.jpg";
import Picture from '../assets/images/picture bubbles.png';
import SearchButton from "./searchButton";

const Banner = () => {
  return (
    <>
      <section className="bg-[#04DA8D] w-full pt-8 md:py-14 md:pt-16 space-y-6 md:space-y-0 md:flex flex-row lg:pl-[3%] lg:py-24 ">
        <div className=" md:w-[55%] px-4 md:px-5 space-y-3 lg:space-y-[20px]">
          <div className="text-lg sm:text-xl font-bold md:text-xl lg:text-4xl lg:space-y-3">
            <p className="">
              Find reviews on Ghanaian doctors.
            </p>
            {/* <p className="hidden lg:flex leading-relaxed">
              Find reviews on Ghanaian: 
              <br/>doctors, clinics and
              <br/>health services
            </p> */}
            <p>Leave your review.</p>
            <p className="font-semibold text-sm sm:text-lg lg:text-xl italic">Search for reputable physicians and clinics.</p>
          </div>
          {/* <p className="text-xs lg:text-sm hidden md:flex">
            Empowering Healthcare: <br />
            Trusted Reviews for Doctors and Hospitals in Ghana
          </p> */}
          <SearchButton/>
        </div>

        <div className="relative flex  gap-10 justify-end flex-grow ">
        {/* <img className="" src={Picture} alt=""></img> */}
        <svg  width="603" height="290" viewBox="0 0 603 290" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M419.431 47.0328C419.431 25.1208 437.194 7.35767 459.106 7.35767H603V86.7079H459.106C437.194 86.7079 419.431 68.9447 419.431 47.0328V47.0328Z" fill="#56EEAD"/>
<path d="M60.8978 199.805C60.8978 150.44 100.916 110.422 150.281 110.422H603V289.188H150.281C100.916 289.188 60.8978 249.17 60.8978 199.805V199.805Z" fill="#56EEAD"/>
<ellipse cx="350.593" cy="46.5767" rx="48.7605" ry="46.5156" fill="#56EEAD"/>
<ellipse cx="538.942" cy="257.265" rx="22.9461" ry="21.8897" fill="#03D68A"/>
<ellipse cx="16.4398" cy="61.6258" rx="15.7755" ry="15.0492" fill="#F75A91"/>
</svg>

        </div>
      </section>
    </>
  );
};

export default Banner;
