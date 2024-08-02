// import doctorsAppointment from "../assets/images/dentist-appointment.jpg";
// import microscope from "../assets/images/microscope.jpg";
// import specialist from "../assets/images/doctor-2.jpg";
// import patron from "../assets/images/excited-patron.jpg";
// import doctorInScrubs from "../assets/images/doctor-in-scrubs.jpg";

const Banner = () => {
  return (
    <>
      <section className="bg-[#04DA8D] w-full pt-8 md:py-14 md:pt-16 space-y-[150px] md:space-y-0 md:flex flex-row  ">
        <div className="md:w-[50%] px-4 md:px-5 space-y-3">
          <p className=" text-xl font-bold md:text-2xl">
            The leading platform for doctors and hospital review in Ghana.
          </p>
          <p className="text-xs lg:text-sm hidden md:flex">
            Empowering Healthcare: <br />
            Trusted Reviews for Doctors and Hospitals in Ghana
          </p>
          <div className="max-w-[455px]  text-xs font-medium">
            <input
              type="text"
              className="h-10 w-full border-[1px] border-black rounded-3xl placeholder:text-[#5E5E5E] caret-[#34c759] outline-none px-6"
              placeholder="Doctors, Clinics or Services"
            />
          </div>
        </div>

        <div className="flex justify-end md:self-end grow-1">
          <div className=" relative w-[80%] max-[350px]:h-20 h-24 bg-[#56EEAD] rounded-l-[9999px]">
            
            <div className="absolute -bottom-0  left-[15%] min-[420px]:left-[25%] max-[350px]:h-[180px] h-[200px] min-[350px]:w-[25%] w-[50%] rounded-xl bg-blue-300 rounded-b-none">
              {/* <img
                src={doctorsAppointment}
                className=" object-cover absolute -bottom-0   min-[420px]:left-[25%] w-[100%] h-[100%] rounded-[inherit] rounded-b-none "
                alt="Patient in a dentist appointment"
              ></img> */}
            </div>

            <div className="space-y-3 absolute -top-16 -left-[18%]  min-[420px]:left-[28%]" id="left-images">
              
              <div className=" relative z-10 max-[350px]:h-12 h-16 max-[350px]:w-16 w-20 bg-blue-300 rounded-lg">

                <div className=" absolute top-1 -left-[20%] z-0  bg-[#F75A91] h-5 w-5 rounded-full "></div>
              
                {/* <img
                  src={microscope}
                  className="relative z-10 object-cover w-[inherit] h-[inherit] rounded-[inherit]"
                  alt="Patient in a dentist appointment"
                /> */}
              </div>

              <div className="max-[350px]:h-12 h-16 max-[350px]:w-16 w-20 bg-blue-300 rounded-lg">

                {/* <img
                  src={specialist}
                  className="object-cover object-top w-[inherit] h-[inherit] rounded-[inherit]"
                  alt="Patient in a dentist appointment"
                /> */}
              </div>
            </div>

            <div className="space-y-3 absolute -top-28 right-[5%]" id="right-images">
              <div className="max-[350px]:h-12 h-16 max-[350px]:w-16 w-20 bg-blue-300 rounded-lg">
                {/* <img
                  src={patron}
                  className="object-cover w-[inherit] h-[inherit] rounded-[inherit]"
                  alt="Patient in a dentist appointment"
                /> */}
              </div>
              <div className="max-[350px]:h-12 h-16 max-[350px]:w-16 w-20 bg-blue-300 rounded-lg">
                {/* <img
                  src={doctorInScrubs}
                  className="object-cover w-[inherit] h-[inherit] rounded-[inherit]"
                  alt="Patient in a dentist appointment"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
