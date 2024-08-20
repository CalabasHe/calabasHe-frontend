// import doctorsAppointment from "../assets/images/dentist-appointment.jpg";
// import microscope from "../assets/images/microscope.jpg";
// import specialist from "../assets/images/doctor-2.jpg";
// import patron from "../assets/images/excited-patron.jpg";
// import doctorInScrubs from "../assets/images/doctor-in-scrubs.jpg";

const Banner = () => {
  return (
    <>
      <section className="bg-[#04DA8D] w-full pt-8 md:py-14 md:pt-16 space-y-6 md:space-y-0 md:flex flex-row lg:pl-[3%] ">
        <div className=" md:w-[50%] px-4 md:px-5 space-y-3">
          <div className="text-lg sm:text-xl font-bold md:text-2xl">
            <p className="pt-1">
              Find reviews on Ghanaian doctors.
            </p>
            <p>Leave your review.</p>
            <p className="pt-1 font-semibold text-base sm:text-lg italic">Find Doctors and Clinics you can trust.</p>
          </div>
          {/* <p className="text-xs lg:text-sm hidden md:flex">
            Empowering Healthcare: <br />
            Trusted Reviews for Doctors and Hospitals in Ghana
          </p> */}
          <div className="max-w-[455px]  text-xs font-medium">
            <input
              type='search'
              className="h-10 w-full border-[1px] border-black rounded-3xl text-base placeholder:text-[#5E5E5E] caret-[#34c759] outline-none px-6"
              placeholder="Doctors, Clinics or Services"
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-10 justify-end flex-grow ">
          <div className='w-full flex justify-end items-end gap-[30%] md:gap-6'>
            <div className=" flex bg-white/40 w-12 h-12 -translate-y-2 rounded-full" ></div>
            <div className=" flex bg-white/40 w-[22%] h-10 translate-x-1 rounded-l-3xl" ></div> 
          </div>

          <div className="w-full flex justify-end items-end">
            <div className="relative flex bg-white/40 w-[80%] h-16 md:h-20 lg:h-24 rounded-l-[2rem]" >
              <div className="absolute  bottom-1 right-4 h-6 w-6 bg-[#03D68A] rounded-full hidden md:flex"></div>
            </div> 
          </div>

          <div className="absolute botton-0 left-5  w-full h-[90%] flex max-md:gap-6 px-2">    
            <div className="flex flex-col gap-3 max-w-[100px] self-start pl-2">
              <div className="bg-white/40 w-[55px] h-[50px] rounded-lg "></div>
              <div className="bg-white/40 w-[55px] h-[50px] rounded-lg "></div>
              <div className="bg-white/40 w-[55px] h-[50px] rounded-lg hidden "></div>
            </div>
            <div className="flex h-[100%] w-[38%] rounded-t-md bg-white/40 justify-self-center"></div>
            <div className="flex flex-col gap-3 max-w-[100px] self-start">
              <div className="bg-white/40 w-[55px] h-[50px] rounded-lg "></div>
              <div className="bg-white/40 w-[55px] h-[50px] rounded-lg "></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
